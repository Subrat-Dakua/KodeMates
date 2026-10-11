import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/**
 * Kodmates Interactive 3D Software Ecosystem
 * Step 02B Visual Correction Pass:
 * - Substantially increased visual scale on desktop (fills ~48-52% hero width)
 * - Studio lighting & PMREM reflection environment revealing dark graphite PBR materials
 * - Optically centered ecosystem with platform grounded above capability row
 * - All six modules clearly legible and interactive
 * - Seamless desktop framing fitting Header + Hero + Capability Row within first viewport
 */
export class HeroEcosystem3D {
  constructor(options = {}) {
    this.container = options.container;
    this.fallbackEl = options.fallbackEl;
    this.heroSectionEl = options.heroSectionEl || document.getElementById('hero');
    this.modelUrl = options.modelUrl || '/assets/kodmates_hero.glb';

    this.isWebGLSupported = this._checkWebGL();
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.pmremGenerator = null;
    this.loader = null;

    // Hierarchy handles
    this.rootGroup = null; // Container group for parallax & scroll transforms
    this.heroModelRoot = null; // KODMATES_HERO object from GLB
    this.coreGroup = null;
    this.modulesGroup = null;
    this.connectionsGroup = null;
    this.platformGroup = null;
    this.environmentGroup = null;

    // Module objects for hover interaction
    this.moduleObjects = new Map();
    this.moduleBaseScales = new Map();
    this.moduleHoverStates = new Map();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(-999, -999);
    this.hoveredModule = null;

    // Pulse objects for subtle hardware activity
    this.pulseObjects = [];

    // Animation & Interaction tracking
    this.animId = null;
    this.clock = new THREE.Clock();
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scroll = { y: 0, targetY: 0 };
    this.isLoaded = false;
    this.isDestroyed = false;
    this.isVisible = true;
    this.observer = null;
    this.pointerNeedsCheck = false;

    // Bound listeners
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerLeave = this._onPointerLeave.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onMotionPreferenceChange = this._onMotionPreferenceChange.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._animate = this._animate.bind(this);
  }

  _checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }

  init() {
    if (!this.container) return;

    if (!this.isWebGLSupported) {
      this._showFallback();
      return;
    }

    try {
      this._setupScene();
      this._createStudioLighting();
      this._bindEvents();
      this._loadGLB();
    } catch (err) {
      console.warn('3D initialization failed, falling back to static presentation:', err);
      this._showFallback();
    }
  }

  _showFallback() {
    if (this.fallbackEl) {
      this.fallbackEl.style.display = 'block';
    }
    if (this.container) {
      const canvas = this.container.querySelector('canvas');
      if (canvas) canvas.style.display = 'none';
    }
  }

  _setupScene() {
    const width = this.container.clientWidth || 720;
    const height = this.container.clientHeight || 620;

    this.scene = new THREE.Scene();

    // Perspective camera framing the ecosystem
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Studio Environment for soft PBR reflections on graphite metallic surfaces
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    this.scene.environment = this.pmremGenerator.fromScene(roomEnv, 0.04).texture;
    this.scene.environmentIntensity = 0.35;

    // Progressive fade-in
    this.renderer.domElement.style.opacity = '0';
    this.renderer.domElement.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    this.renderer.domElement.style.display = 'block';

    this.container.appendChild(this.renderer.domElement);

    // Root group for all interactive transforms
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    this._updateCameraFraming(width, height);
  }

  _updateCameraFraming(width, height) {
    if (!this.camera) return;
    const aspect = width / Math.max(height, 1);
    this.camera.aspect = aspect;

    const isDesktop = window.innerWidth >= 900;

    if (this.heroModelRoot) {
      // Scale GLB so ecosystem dominates ~48-52% of hero visual width on desktop
      const modelScale = isDesktop ? 1.08 : 0.82;
      this.heroModelRoot.scale.setScalar(modelScale);

      // Optically center core vertically at ~48-52% of content height
      // and position platform comfortably above capability row (~74%)
      const posY = isDesktop ? 0.22 : 0.05;
      const posX = isDesktop ? 0.04 : 0.0;
      this.heroModelRoot.position.set(posX, posY, 0);
    }

    const fov = 40;
    this.camera.fov = fov;
    const tanHalf = Math.tan((fov * Math.PI) / 360);

    // Frame required bounds so all 6 modules, K core, and platform fit with generous breathing room
    const reqW = isDesktop ? 8.6 : 8.0;
    const reqH = isDesktop ? 8.4 : 7.6;
    const zH = reqH / (2 * tanHalf);
    const zW = (reqW / Math.max(aspect, 0.4)) / (2 * tanHalf);
    let targetZ = Math.max(zH, zW);

    targetZ = Math.min(Math.max(targetZ, 9.5), 16.5);
    this.camera.position.set(0, 0, targetZ);
    this.camera.lookAt(0, isDesktop ? 0.18 : 0, 0);
    this.camera.updateProjectionMatrix();
  }

  _createStudioLighting() {
    // 1. Warm Champagne Key Light (Grazing top-right edge, soft fill honoring Blender #FEEFB8 key)
    const keyLight = new THREE.DirectionalLight(0xFEEFB8, 1.25);
    keyLight.position.set(5.2, 4.2, 1.5);
    this.scene.add(keyLight);

    // 2. Warm Champagne Rim Light (Rear-Left catching module bevels & core silhouette)
    const rimLight = new THREE.DirectionalLight(0xFEEFB8, 2.2);
    rimLight.position.set(-5.5, 4.2, -3.5);
    this.scene.add(rimLight);

    // 3. Warm Champagne Edge / Grazing Light (Rear-Right edge separation)
    const rimLightRight = new THREE.DirectionalLight(0xFEEFB8, 1.6);
    rimLightRight.position.set(5.0, 1.8, -3.0);
    this.scene.add(rimLightRight);

    // 4. Overhead Bevel Definition Light (Catches top-edge rims of module cards)
    const overheadLight = new THREE.DirectionalLight(0xFEEFB8, 1.2);
    overheadLight.position.set(0, 6.2, 0.8);
    this.scene.add(overheadLight);

    // 5. Platform Grazing Uplight (Gently defines stepped metallic platform base rings)
    const platformLight = new THREE.DirectionalLight(0xFEEFB8, 1.25);
    platformLight.position.set(0, -3.8, 1.8);
    this.scene.add(platformLight);

    // 6. Studio Hemisphere Light (Warm graphite fill, prevents pitch-black void while keeping floor deep black)
    const hemiLight = new THREE.HemisphereLight(0x221E1A, 0x050607, 1.35);
    this.scene.add(hemiLight);

    // 7. Dark Ambient Studio Base
    const ambientLight = new THREE.AmbientLight(0x0A0D0E, 0.85);
    this.scene.add(ambientLight);
  }

  _loadGLB() {
    this.loader = new GLTFLoader();

    this.loader.load(
      this.modelUrl,
      (gltf) => {
        if (this.isDestroyed) return;
        this._onGLBLoaded(gltf);
      },
      undefined,
      (err) => {
        console.warn('Error loading Kodmates Hero GLB asset, using fallback:', err);
        this._showFallback();
      }
    );
  }

  _onGLBLoaded(gltf) {
    const heroRoot = gltf.scene.getObjectByName('KODMATES_HERO') || gltf.scene;
    this.heroModelRoot = heroRoot;

    // Attach to rootGroup
    this.rootGroup.add(heroRoot);

    // Discover and index hierarchy components
    this.coreGroup = heroRoot.getObjectByName('CORE');
    this.modulesGroup = heroRoot.getObjectByName('MODULES');
    this.connectionsGroup = heroRoot.getObjectByName('CONNECTIONS');
    this.platformGroup = heroRoot.getObjectByName('PLATFORM');
    this.environmentGroup = heroRoot.getObjectByName('ENVIRONMENT');

    // Step 6: Platform, Module_Business, and Connection_Business geometry and positions
    // are now authoritatively crafted and verified directly within the Step 6 GLB asset.

    // Hide GLB background polygons so the ecosystem floats cleanly on the studio background
    if (this.environmentGroup) {
      this.environmentGroup.visible = false;
    }

    // Index the six technology modules for hover interactivity
    const moduleNames = [
      'Module_Web',
      'Module_Android',
      'Module_Cloud',
      'Module_API',
      'Module_Database',
      'Module_Business'
    ];

    moduleNames.forEach((name) => {
      const modObj = heroRoot.getObjectByName(name);
      if (modObj) {
        this.moduleObjects.set(name, modObj);
        this.moduleBaseScales.set(name, modObj.scale.clone());
        this.moduleHoverStates.set(name, {
          targetScale: 1.0,
          currentScale: 1.0,
          baseEmissive: this._extractEmissive(modObj)
        });
      }
    });

    // PBR Material enhancement & calibration:
    // Ensures metallic graphite reflects studio environment, gold bevels catch champagne sheen,
    // and 3D typography is crisp and legible
    heroRoot.traverse((child) => {
      // Hide any mountain / atmosphere background meshes from GLB
      if (child.name === 'Background_Mountains' || child.name === 'Atmosphere' || child.name === 'ENVIRONMENT') {
        child.visible = false;
        return;
      }

      // Deep dark recessed cavity behind the illuminated K
      if (child.name === 'CoreInnerShell' && child.isMesh) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color(0x010202);
        child.material.roughness = 0.98;
        child.material.metalness = 0.0;
        child.material.envMapIntensity = 0.0;
        return;
      }

      // Strengthen visual weight and stroke readability of the central brand K
      if (child.name === 'CoreK' && child.isMesh) {
        child.scale.set(1.30, 1.30, 1.30);
        child.material = child.material.clone();
        child.material.color = new THREE.Color(0xFFF0B8);
        child.material.emissive = new THREE.Color(0xFEEFB8);
        child.material.emissiveIntensity = 2.6;
        child.material.roughness = 0.18;
        child.material.metalness = 0.45;
        child.material.envMapIntensity = 0.80;
        return;
      }

      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          mat.toneMapped = true;

          const matName = mat.name || '';
          if (matName.includes('CoreBody')) {
            // Satin-finished graphite with diffused, even sheen (no harsh specular spots)
            mat.roughness = 0.58;
            mat.metalness = 0.65;
            mat.envMapIntensity = 0.45;
          } else if (matName.includes('CasingGraphite')) {
            mat.roughness = 0.42;
            mat.metalness = 0.75;
            mat.envMapIntensity = 0.60;
          } else if (matName.includes('DarkMetal')) {
            mat.roughness = 0.52;
            mat.metalness = 0.72;
            mat.envMapIntensity = 0.45;
          } else if (matName.includes('SecGraphite')) {
            mat.roughness = 0.45;
            mat.metalness = 0.72;
            mat.envMapIntensity = 0.55;
          } else if (matName.includes('GoldAccent')) {
            // Warm champagne bevel rims, module frames, connection ports, K bezel
            mat.roughness = 0.24;
            mat.metalness = 0.88;
            mat.emissive = new THREE.Color(0xFEEFB8);
            mat.emissiveIntensity = 0.85;
            mat.envMapIntensity = 1.1;
          } else if (matName.includes('GoldEmissive')) {
            // Illuminated equator grooves, pulse nodes
            mat.emissive = new THREE.Color(0xFEEFB8);
            mat.emissiveIntensity = 2.4;
          } else if (matName.includes('GoldGlow')) {
            mat.emissive = new THREE.Color(0xFEEFB8);
            mat.emissiveIntensity = 1.8;
          } else if (matName.includes('WarmText')) {
            // Crisp, legible module typography
            mat.emissive = new THREE.Color(0xFFF8E7);
            mat.emissiveIntensity = 2.0;
          } else if (matName.includes('PlatformGlow')) {
            // Concentric platform rings
            mat.emissive = new THREE.Color(0xFEEFB8);
            mat.emissiveIntensity = 1.8;
          }
        });

        if (child.name.includes('_Pulse')) {
          this.pulseObjects.push(child);
        }
      }
    });

    // Apply framing & scaling
    const width = this.container.clientWidth || 720;
    const height = this.container.clientHeight || 620;
    this._updateCameraFraming(width, height);

    // Reduce duplicate mountain silhouette on website background
    if (this.heroSectionEl) {
      const ambientLandscape = this.heroSectionEl.querySelector('.hero-ambient-landscape');
      if (ambientLandscape) {
        ambientLandscape.style.transition = 'opacity 0.8s ease';
        ambientLandscape.style.opacity = '0.04';
      }
    }

    // Hide fallback and fade in canvas gently
    if (this.fallbackEl) {
      this.fallbackEl.style.display = 'none';
    }

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.style.opacity = '1';
    }

    this.isLoaded = true;
    this._animate();
  }

  _extractEmissive(obj) {
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        return obj.material.map(m => (m.emissiveIntensity !== undefined ? m.emissiveIntensity : 1.0));
      }
      return obj.material.emissiveIntensity !== undefined ? obj.material.emissiveIntensity : 1.0;
    }
    return 1.0;
  }

  _bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });

    if (this.container) {
      this.container.addEventListener('pointermove', this._onPointerMove, { passive: true });
      this.container.addEventListener('pointerleave', this._onPointerLeave, { passive: true });
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', this._onMotionPreferenceChange);
    }

    // IntersectionObserver to pause rendering when hero is off-screen
    const targetObs = this.heroSectionEl || this.container;
    if ('IntersectionObserver' in window && targetObs) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this._onVisibilityChange(entry.isIntersecting);
        });
      }, { threshold: 0.05 });
      this.observer.observe(targetObs);
    }
  }

  _onVisibilityChange(isVisible) {
    if (this.isVisible === isVisible) return;
    this.isVisible = isVisible;
    if (this.isVisible && !this.animId && this.isLoaded && !this.isDestroyed) {
      this.clock.start();
      this._animate();
    } else if (!this.isVisible && this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  _onMotionPreferenceChange(e) {
    this.prefersReducedMotion = e.matches;
    if (this.prefersReducedMotion && this.rootGroup) {
      this.rootGroup.rotation.set(0, 0, 0);
      this.rootGroup.position.set(0, 0, 0);
    }
  }

  _onMouseMove(event) {
    // Subtle mouse parallax (max ±2° rotation X, ±3° rotation Y)
    const normX = (event.clientX / window.innerWidth) * 2 - 1;
    const normY = -(event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = normX * 0.052; // ±3 deg
    this.mouse.targetY = normY * 0.035; // ±2 deg
  }

  _onPointerMove(event) {
    if (event.pointerType === 'touch') return;
    if (!this.container || !this.isLoaded) return;

    const rect = this.container.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.pointerNeedsCheck = true;
  }

  _onPointerLeave() {
    this.pointer.set(-999, -999);
    this.pointerNeedsCheck = false;
    this._clearHover();
  }

  _checkRaycast() {
    if (!this.camera || !this.isLoaded || this.moduleObjects.size === 0) return;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const targets = Array.from(this.moduleObjects.values());
    const intersects = this.raycaster.intersectObjects(targets, true);

    if (intersects.length > 0) {
      let hit = intersects[0].object;
      let matchedName = null;

      while (hit && hit !== this.rootGroup && hit !== this.scene) {
        if (this.moduleObjects.has(hit.name)) {
          matchedName = hit.name;
          break;
        }
        hit = hit.parent;
      }

      if (matchedName) {
        this._setHover(matchedName);
        return;
      }
    }

    this._clearHover();
  }

  _setHover(name) {
    if (this.hoveredModule === name) return;
    this.hoveredModule = name;

    this.moduleHoverStates.forEach((state, modName) => {
      state.targetScale = modName === name ? 1.042 : 1.0;
    });

    if (this.container) {
      this.container.style.cursor = 'pointer';
    }
  }

  _clearHover() {
    if (!this.hoveredModule) return;
    this.hoveredModule = null;

    this.moduleHoverStates.forEach((state) => {
      state.targetScale = 1.0;
    });

    if (this.container) {
      this.container.style.cursor = 'default';
    }
  }

  _onScroll() {
    this.scroll.targetY = window.scrollY * 0.00045;
  }

  _onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this._updateCameraFraming(width, height);
    this.renderer.setSize(width, height);
  }

  _animate() {
    if (this.isDestroyed || !this.isVisible) return;
    this.animId = requestAnimationFrame(this._animate);

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Frame-synced raycasting check (avoids redundant work on high-polling mice)
    if (this.pointerNeedsCheck) {
      this._checkRaycast();
      this.pointerNeedsCheck = false;
    }

    if (this.isLoaded && this.rootGroup) {
      if (!this.prefersReducedMotion) {
        // Smooth parallax interpolation
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.055;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.055;
        this.scroll.y += (this.scroll.targetY - this.scroll.y) * 0.055;

        // Subtle restrained idle breathing sway (0.06 rad/sec, K remains legible and facing front)
        const idleSwayY = Math.sin(time * 0.38) * 0.022; // ±1.2 degrees
        const idleFloatY = Math.sin(time * 0.55) * 0.035;

        this.rootGroup.rotation.y = this.mouse.x + idleSwayY + (this.scroll.y * 0.5);
        this.rootGroup.rotation.x = -this.mouse.y;
        this.rootGroup.position.y = idleFloatY + (this.scroll.y * 0.4);

        // Subtle breathing pulse glow on connection beads
        if (this.pulseObjects.length > 0) {
          const pulseIntensity = 1.0 + Math.sin(time * 2.2) * 0.25;
          this.pulseObjects.forEach((pulse) => {
            if (pulse.material && pulse.material.emissiveIntensity !== undefined) {
              pulse.material.emissiveIntensity = pulseIntensity;
            }
          });
        }
      } else {
        this.rootGroup.rotation.set(0, 0, 0);
        this.rootGroup.position.set(0, 0, 0);
      }

      // Smooth module hover scaling (active in both standard and reduced motion for crisp UI responsiveness)
      this.moduleObjects.forEach((modObj, name) => {
        const state = this.moduleHoverStates.get(name);
        const baseScale = this.moduleBaseScales.get(name);
        if (state && baseScale) {
          state.currentScale += (state.targetScale - state.currentScale) * 0.12;
          modObj.scale.set(
            baseScale.x * state.currentScale,
            baseScale.y * state.currentScale,
            baseScale.z * state.currentScale
          );
        }
      });
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    this.isDestroyed = true;
    if (this.animId) cancelAnimationFrame(this.animId);

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onResize);

    if (this.container) {
      this.container.removeEventListener('pointermove', this._onPointerMove);
      this.container.removeEventListener('pointerleave', this._onPointerLeave);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.removeEventListener) {
      motionQuery.removeEventListener('change', this._onMotionPreferenceChange);
    }

    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }

    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }

    if (this.renderer) {
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
    }
  }
}
