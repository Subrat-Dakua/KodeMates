import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Kodmates Interactive 3D Software Ecosystem
 * Step 02B: Final Approved Blender GLB Integration
 * 
 * Loads the production GLB asset (/assets/kodmates_hero.glb),
 * sets up restrained studio lighting to honor approved Cycles renders,
 * provides smooth mouse parallax, restrained idle sway, subtle module hover raycasting,
 * scroll depth linkage, prefers-reduced-motion support, and graceful fallback handling.
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

    // Bound listeners
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerLeave = this._onPointerLeave.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onMotionPreferenceChange = this._onMotionPreferenceChange.bind(this);
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
    const width = this.container.clientWidth || 640;
    const height = this.container.clientHeight || 560;

    this.scene = new THREE.Scene();

    // Perspective camera framing the ecosystem
    this.camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    this._updateCameraFraming(width, height);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Initial canvas opacity 0 for gentle progressive fade-in
    this.renderer.domElement.style.opacity = '0';
    this.renderer.domElement.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    this.renderer.domElement.style.display = 'block';

    this.container.appendChild(this.renderer.domElement);

    // Root group for all interactive transforms
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);
  }

  _updateCameraFraming(width, height) {
    if (!this.camera) return;
    const aspect = width / Math.max(height, 1);
    this.camera.aspect = aspect;

    // Model occupies approx 7.2 wide by 6.4 high.
    // Dynamically calculate camera Z so model fits with comfortable padding across viewports.
    let targetZ = 11.8;
    if (aspect < 1.0) {
      // Narrow / mobile portrait containers
      targetZ = 12.2 / aspect;
    } else if (aspect < 1.3) {
      targetZ = 12.4;
    } else {
      targetZ = 11.6;
    }

    // Restrain bounds
    targetZ = Math.min(Math.max(targetZ, 11.2), 16.5);
    this.camera.position.set(0, 0, targetZ);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
  }

  _createStudioLighting() {
    // 1. Warm Champagne Key Light (Front / Upper-Right, honoring Blender #FEEFB8 key)
    const keyLight = new THREE.DirectionalLight(0xFEEFB8, 2.4);
    keyLight.position.set(4.5, 4.2, 6.0);
    this.scene.add(keyLight);

    // 2. Soft Ivory Rim Light (Rear / Upper-Left to sculpt module bevels and core silhouette)
    const rimLight = new THREE.DirectionalLight(0xFFF8E7, 2.2);
    rimLight.position.set(-4.5, 3.8, -4.5);
    this.scene.add(rimLight);

    // 3. Subtle Graphite Fill Light (Lower-Left to soften deep shadows without washing out dark tones)
    const fillLight = new THREE.DirectionalLight(0x283034, 1.1);
    fillLight.position.set(-3.0, -3.2, 3.5);
    this.scene.add(fillLight);

    // 4. Overhead Accent Light (Directly above core for top-edge rim definition)
    const overheadLight = new THREE.DirectionalLight(0xFFF8E7, 0.9);
    overheadLight.position.set(0, 6.0, 1.5);
    this.scene.add(overheadLight);

    // 5. Dark Ambient Studio Base (Maintains rich near-black floor without total darkness)
    const ambientLight = new THREE.AmbientLight(0x0E1214, 1.3);
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

    // Discover data pulses along conduits
    heroRoot.traverse((child) => {
      if (child.isMesh) {
        // Ensure proper tone mapping on all PBR materials
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => { m.toneMapped = true; });
        } else if (child.material) {
          child.material.toneMapped = true;
        }

        if (child.name.includes('_Pulse')) {
          this.pulseObjects.push(child);
        }
      }
    });

    // Compare with website background:
    // When the 3D scene loads with its own environment, reduce HTML ambient landscape
    // to avoid duplicate mountain silhouettes
    if (this.heroSectionEl) {
      const ambientLandscape = this.heroSectionEl.querySelector('.hero-ambient-landscape');
      if (ambientLandscape) {
        ambientLandscape.style.transition = 'opacity 0.8s ease';
        ambientLandscape.style.opacity = '0.04'; // Subtle depth without duplicate silhouette clash
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
  }

  _onMotionPreferenceChange(e) {
    this.prefersReducedMotion = e.matches;
    if (this.prefersReducedMotion && this.rootGroup) {
      this.rootGroup.rotation.set(0, 0, 0);
      this.rootGroup.position.set(0, 0, 0);
    }
  }

  _onMouseMove(event) {
    // Subtle mouse parallax:
    // Maximum ±2 degrees rotation X (~0.035 rad), ±3 degrees rotation Y (~0.052 rad)
    const normX = (event.clientX / window.innerWidth) * 2 - 1;
    const normY = -(event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = normX * 0.052; // ±3 deg
    this.mouse.targetY = normY * 0.035; // ±2 deg
  }

  _onPointerMove(event) {
    // Don't raycast on touch devices to avoid sticky hover states
    if (event.pointerType === 'touch') return;
    if (!this.container || !this.isLoaded) return;

    const rect = this.container.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this._checkRaycast();
  }

  _onPointerLeave() {
    this.pointer.set(-999, -999);
    this._clearHover();
  }

  _checkRaycast() {
    if (!this.camera || !this.isLoaded || this.moduleObjects.size === 0) return;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const targets = Array.from(this.moduleObjects.values());
    const intersects = this.raycaster.intersectObjects(targets, true);

    if (intersects.length > 0) {
      // Find the parent module
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
    // Subtle scroll-linked Hero depth behavior
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
    if (this.isDestroyed) return;
    this.animId = requestAnimationFrame(this._animate);

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    if (this.isLoaded && this.rootGroup) {
      if (!this.prefersReducedMotion) {
        // Smooth parallax interpolation (lerp)
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.055;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.055;
        this.scroll.y += (this.scroll.targetY - this.scroll.y) * 0.055;

        // Subtle restrained idle breathing sway (0.06 rad/sec, K remains legible and facing front)
        const idleSwayY = Math.sin(time * 0.38) * 0.022; // ±1.2 degrees
        const idleFloatY = Math.sin(time * 0.55) * 0.04;

        this.rootGroup.rotation.y = this.mouse.x + idleSwayY + (this.scroll.y * 0.6);
        this.rootGroup.rotation.x = -this.mouse.y;
        this.rootGroup.position.y = idleFloatY + (this.scroll.y * 0.5);

        // Smooth module hover scaling
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
        // Reduced motion: purely static
        this.rootGroup.rotation.set(0, 0, 0);
        this.rootGroup.position.set(0, 0, 0);
      }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    this.isDestroyed = true;
    if (this.animId) cancelAnimationFrame(this.animId);

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

    // Traverse and dispose Three.js resources
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
