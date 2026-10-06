import * as THREE from 'three';

/**
 * Kodmates Interactive 3D Software Ecosystem
 * High-end digital software core with engineered physical 3D modules,
 * integrated recessed K identity aperture, 3D depth, and architectural data conduits.
 */
export class HeroEcosystem3D {
  constructor(options = {}) {
    this.container = options.container;
    this.fallbackEl = options.fallbackEl;
    this.isWebGLSupported = this._checkWebGL();
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.rootGroup = null;
    this.coreGroup = null;
    this.coreSphere = null;
    this.latticeGroup = null;
    this.apertureGroup = null;
    this.nodes = [];
    this.connections = [];

    this.animId = null;
    this.clock = new THREE.Clock();

    // Interaction targets
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scroll = { y: 0, targetY: 0 };

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
    this._animate = this._animate.bind(this);
  }

  _checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
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
      this._createSoftwareCore();
      this._createPhysicalModules();
      this._createDataConduits();
      this._bindEvents();

      if (this.fallbackEl) {
        this.fallbackEl.style.display = 'none';
      }

      this._animate();
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
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 8.2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;

    this.container.appendChild(this.renderer.domElement);

    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);
  }

  _createStudioLighting() {
    // 1. Soft Warm Key Light (Top-Right-Front)
    const keyLight = new THREE.DirectionalLight(0xFEEFB8, 2.2);
    keyLight.position.set(4.0, 4.0, 5.0);
    this.scene.add(keyLight);

    // 2. Controlled Champagne Rim Light (Top-Left-Back for metallic edge separation)
    const rimLight = new THREE.DirectionalLight(0xE4D7A5, 2.8);
    rimLight.position.set(-4.5, 3.5, -4.0);
    this.scene.add(rimLight);

    // 3. Subtle graphite fill light (Bottom-Left)
    const fillLight = new THREE.DirectionalLight(0x22282A, 1.0);
    fillLight.position.set(-2.0, -3.0, 3.0);
    this.scene.add(fillLight);

    // 4. Ambient dark studio environment
    const ambientLight = new THREE.AmbientLight(0x121517, 1.2);
    this.scene.add(ambientLight);

    // 5. Internal Core Point Light with warm golden bloom
    this.coreLight = new THREE.PointLight(0xFEEFB8, 1.6, 6.0, 1.2);
    this.coreLight.position.set(0, 0, 0.6);
    this.rootGroup.add(this.coreLight);
  }

  _createSoftwareCore() {
    this.coreGroup = new THREE.Group();
    this.rootGroup.add(this.coreGroup);

    // A. Dark Graphite Metallic Sphere Core (Brushed satin-metallic finish)
    const sphereGeo = new THREE.SphereGeometry(1.42, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x101416,
      metalness: 0.85,
      roughness: 0.38,
    });
    this.coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.coreGroup.add(this.coreSphere);

    // B. Architectural Rotating Lattice & Coordinate Tracks
    this.latticeGroup = new THREE.Group();
    this.coreGroup.add(this.latticeGroup);

    const gridMat = new THREE.LineBasicMaterial({
      color: 0xFEEFB8,
      transparent: true,
      opacity: 0.20
    });

    const createTrack = (radius, y) => {
      const trackGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 72;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
      }
      trackGeo.setFromPoints(points);
      return new THREE.Line(trackGeo, gridMat);
    };

    // Concentric coordinate rings
    this.latticeGroup.add(createTrack(1.43, 0));
    this.latticeGroup.add(createTrack(1.24, 0.72));
    this.latticeGroup.add(createTrack(1.24, -0.72));
    this.latticeGroup.add(createTrack(0.86, 1.14));
    this.latticeGroup.add(createTrack(0.86, -1.14));

    // Angled Architecture Trajectory Ring
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0xFEEFB8,
      transparent: true,
      opacity: 0.32
    });
    const orbitTrack = createTrack(1.72, 0);
    orbitTrack.material = orbitMat;
    orbitTrack.rotation.x = 1.05;
    orbitTrack.rotation.y = 0.45;
    this.latticeGroup.add(orbitTrack);

    // Small glowing terminal data beads along orbit
    const beadGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const beadMat = new THREE.MeshBasicMaterial({ color: 0xFEEFB8 });
    for (let i = 0; i < 4; i++) {
      const theta = (i / 4) * Math.PI * 2 + 0.3;
      const bead = new THREE.Mesh(beadGeo, beadMat);
      bead.position.set(Math.cos(theta) * 1.72, 0, Math.sin(theta) * 1.72);
      orbitTrack.add(bead);
    }

    // C. Integrated Recessed Kodmates K Identity Aperture (Engineered into front surface)
    this._createIntegratedCoreAperture();
  }

  _createIntegratedCoreAperture() {
    this.apertureGroup = new THREE.Group();
    // Positioned recessed on the front of the sphere, cleanly visible above sphere radius (1.42)
    this.apertureGroup.position.set(0, 0, 1.43);

    // 1. Dark metallic outer bezel ring
    const bezelGeo = new THREE.TorusGeometry(0.38, 0.042, 16, 48);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x14181A,
      metalness: 0.95,
      roughness: 0.22,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.z = 0.01;
    this.apertureGroup.add(bezelMesh);

    // 2. Chamfer gold rim highlight
    const chamferGeo = new THREE.RingGeometry(0.32, 0.342, 48);
    const chamferMat = new THREE.MeshBasicMaterial({
      color: 0xFEEFB8,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    const chamferMesh = new THREE.Mesh(chamferGeo, chamferMat);
    chamferMesh.position.z = 0.02;
    this.apertureGroup.add(chamferMesh);

    // 3. Recessed dark aperture face with illuminated Kodmates K mark
    const discGeo = new THREE.CircleGeometry(0.33, 48);
    const kTexture = this._createIlluminatedKTexture();
    const discMat = new THREE.MeshBasicMaterial({
      map: kTexture,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.position.z = 0.015;
    this.apertureGroup.add(discMesh);

    this.coreGroup.add(this.apertureGroup);
  }

  _createIlluminatedKTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 256, 256);

    // Dark graphite metallic recessed aperture base
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, '#101416');
    grad.addColorStop(0.8, '#080A0B');
    grad.addColorStop(1, '#050708');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(128, 128, 124, 0, Math.PI * 2);
    ctx.fill();

    // Subtle internal warm glow aura
    const aura = ctx.createRadialGradient(128, 128, 0, 128, 128, 80);
    aura.addColorStop(0, 'rgba(254, 239, 184, 0.22)');
    aura.addColorStop(1, 'rgba(254, 239, 184, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(128, 128, 80, 0, Math.PI * 2);
    ctx.fill();

    // Kodmates SVG mark [< cleanly integrated
    ctx.strokeStyle = '#FEEFB8';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(254, 239, 184, 0.55)';
    ctx.shadowBlur = 10;

    // Left bracket
    ctx.beginPath();
    ctx.moveTo(106, 76);
    ctx.lineTo(88, 76);
    ctx.arcTo(74, 76, 74, 90, 14);
    ctx.lineTo(74, 166);
    ctx.arcTo(74, 180, 88, 180, 14);
    ctx.lineTo(106, 180);
    ctx.stroke();

    // Chevron
    ctx.beginPath();
    ctx.moveTo(174, 82);
    ctx.lineTo(114, 128);
    ctx.lineTo(174, 174);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  _createPhysicalModules() {
    // 6 physical 3D modules with real 3D depth distribution (varying Z positions)
    const moduleDefs = [
      { id: 'web', label: 'WEB', sys: 'MOD // 01', pos: [-2.1, 1.25, 1.35], scale: 1.05 },     // Foreground Left (Z: +1.35)
      { id: 'android', label: 'ANDROID', sys: 'MOD // 02', pos: [0.25, 2.3, 0.55], scale: 1.0 },  // Mid-top (Z: +0.55)
      { id: 'cloud', label: 'CLOUD', sys: 'MOD // 03', pos: [2.35, 1.45, -0.85], scale: 0.92 },  // Deep Background Right (Z: -0.85)
      { id: 'api', label: 'API', sys: 'MOD // 04', pos: [2.45, -0.45, 0.75], scale: 1.02 },     // Foreground Right (Z: +0.75)
      { id: 'database', label: 'DATABASE', sys: 'MOD // 05', pos: [-2.25, -1.15, 0.45], scale: 0.98 }, // Mid-depth Left (Z: +0.45)
      { id: 'business', label: 'BUSINESS', sys: 'MOD // 06', pos: [-0.35, -2.25, -0.65], scale: 0.94 }  // Deep Bottom (Z: -0.65)
    ];

    moduleDefs.forEach((def, index) => {
      const moduleGroup = new THREE.Group();
      moduleGroup.position.set(def.pos[0], def.pos[1], def.pos[2]);

      // Physical module dimensions: 0.68 wide x 0.44 high x 0.14 deep
      const boxGeo = new THREE.BoxGeometry(0.68, 0.44, 0.14);
      
      // Dark graphite metallic chassis material
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x111516,
        metalness: 0.88,
        roughness: 0.25,
      });

      // Front faceplate with micro-engineered hardware graphics
      const faceTexture = this._createModuleFaceTexture(def.label, def.sys, def.id);
      const faceMat = new THREE.MeshBasicMaterial({ map: faceTexture });

      const materials = [
        chassisMat, chassisMat, chassisMat, chassisMat,
        faceMat, chassisMat // +Z face has the faceplate texture
      ];

      const chassisMesh = new THREE.Mesh(boxGeo, materials);
      moduleGroup.add(chassisMesh);

      // Chamfer wireframe edge highlight in warm ivory/gold
      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xFEEFB8,
        transparent: true,
        opacity: 0.42
      });
      const wireframe = new THREE.LineSegments(edges, edgeMat);
      moduleGroup.add(wireframe);

      // Miniature status LED on the chassis corner
      const ledGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xFEEFB8 });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0.26, 0.14, 0.075);
      moduleGroup.add(ledMesh);

      this.rootGroup.add(moduleGroup);

      this.nodes.push({
        group: moduleGroup,
        basePos: new THREE.Vector3(...def.pos),
        phase: index * 1.1,
        speed: 1.1 + index * 0.12,
        id: def.id
      });
    });
  }

  _createModuleFaceTexture(label, sysCode, id) {
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 220;
    const ctx = canvas.getContext('2d');

    // Dark matte chassis surface
    ctx.fillStyle = '#0E1213';
    ctx.fillRect(0, 0, 340, 220);

    // Subtle beveled inner border
    ctx.strokeStyle = 'rgba(254, 239, 184, 0.35)';
    ctx.lineWidth = 3;
    this._roundRect(ctx, 6, 6, 328, 208, 14);
    ctx.stroke();

    // Top Header: System code & active green/gold micro-dot
    ctx.fillStyle = 'rgba(254, 239, 184, 0.55)';
    ctx.font = '600 13px "Inter", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(sysCode, 24, 34);

    // Active status indicator dot
    ctx.fillStyle = '#FEEFB8';
    ctx.beginPath();
    ctx.arc(310, 28, 4, 0, Math.PI * 2);
    ctx.fill();

    // Subtle divider line
    ctx.strokeStyle = 'rgba(254, 239, 184, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, 46);
    ctx.lineTo(316, 46);
    ctx.stroke();

    // Hardware icon
    ctx.save();
    ctx.translate(60, 118);
    this._drawHardwareIcon(ctx, id);
    ctx.restore();

    // Primary Module Label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '1.5px';
    ctx.fillText(label, 110, 118);

    // Bottom Subtext: Engineered protocol status
    ctx.fillStyle = 'rgba(240, 242, 238, 0.45)';
    ctx.font = '500 12px "Inter", monospace';
    ctx.fillText('ONLINE // READY', 24, 188);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  _drawHardwareIcon(ctx, id) {
    ctx.strokeStyle = '#FEEFB8';
    ctx.fillStyle = '#FEEFB8';
    ctx.lineWidth = 2.8;

    switch (id) {
      case 'web':
        ctx.strokeRect(-18, -14, 36, 28);
        ctx.beginPath();
        ctx.moveTo(-18, -5);
        ctx.lineTo(18, -5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-11, -9.5, 1.8, 0, Math.PI * 2);
        ctx.arc(-4, -9.5, 1.8, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'android':
        ctx.strokeRect(-12, -16, 24, 32);
        ctx.beginPath();
        ctx.arc(0, 10, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-6, -11);
        ctx.lineTo(6, -11);
        ctx.stroke();
        break;
      case 'cloud':
        ctx.beginPath();
        ctx.arc(-6, 2, 9, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(5, -4, 11, Math.PI * 1.0, Math.PI * 1.9);
        ctx.arc(12, 4, 7, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'api':
        ctx.beginPath();
        ctx.arc(-11, 0, 4.5, 0, Math.PI * 2);
        ctx.arc(11, 0, 4.5, 0, Math.PI * 2);
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-7, 0);
        ctx.lineTo(-4, 0);
        ctx.moveTo(4, 0);
        ctx.lineTo(7, 0);
        ctx.stroke();
        break;
      case 'database':
        ctx.beginPath();
        ctx.ellipse(0, -9, 16, 5.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-16, -9);
        ctx.lineTo(-16, 9);
        ctx.ellipse(0, 9, 16, 5.5, 0, 0, Math.PI);
        ctx.lineTo(16, -9);
        ctx.stroke();
        break;
      case 'business':
      default:
        ctx.strokeRect(-16, -14, 14, 14);
        ctx.strokeRect(2, -14, 14, 14);
        ctx.strokeRect(-16, 4, 14, 14);
        ctx.strokeRect(2, 4, 14, 14);
        break;
    }
  }

  _roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  _createDataConduits() {
    this.nodes.forEach((node) => {
      const modulePos = node.basePos;
      // Core docking port on the surface of the sphere
      const corePort = modulePos.clone().normalize().multiplyScalar(1.42);

      // 3D architectural conduit spline
      const midPoint = modulePos.clone().lerp(corePort, 0.45);
      midPoint.x += (Math.random() - 0.5) * 0.35;
      midPoint.y += (Math.random() - 0.5) * 0.35;
      midPoint.z += 0.4;

      const curve = new THREE.QuadraticBezierCurve3(modulePos, midPoint, corePort);
      const points = curve.getPoints(42);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xFEEFB8,
        transparent: true,
        opacity: 0.28
      });

      const conduitLine = new THREE.Line(lineGeo, lineMat);
      this.rootGroup.add(conduitLine);

      // Terminal docking point on the core
      const portGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const portMat = new THREE.MeshBasicMaterial({ color: 0xFEEFB8 });
      const portMesh = new THREE.Mesh(portGeo, portMat);
      portMesh.position.copy(corePort);
      this.coreGroup.add(portMesh);

      // Moving data packet along the conduit
      const pulseGeo = new THREE.SphereGeometry(0.04, 10, 10);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xFEEFB8 });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      this.rootGroup.add(pulseMesh);

      this.connections.push({
        curve,
        conduitLine,
        pulseMesh,
        progress: Math.random(),
        speed: 0.22 + Math.random() * 0.15
      });
    });
  }

  _bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });
  }

  _onMouseMove(event) {
    const normX = (event.clientX / window.innerWidth) * 2 - 1;
    const normY = -(event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = normX * 0.24;
    this.mouse.targetY = normY * 0.18;
  }

  _onScroll() {
    this.scroll.targetY = window.scrollY * 0.0006;
  }

  _onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  _animate() {
    this.animId = requestAnimationFrame(this._animate);

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    if (!this.prefersReducedMotion) {
      // Rotate the architectural coordinate tracks and orbital lattice
      if (this.latticeGroup) {
        this.latticeGroup.rotation.y += delta * 0.12;
      }

      // Mouse parallax smooth dampening
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.045;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.045;
      this.scroll.y += (this.scroll.targetY - this.scroll.y) * 0.045;

      this.rootGroup.rotation.y = this.mouse.x + this.scroll.y * 1.2;
      this.rootGroup.rotation.x = -this.mouse.y;
      this.rootGroup.position.y = this.scroll.y * 0.6;

      // Independent micro-floating for each physical module
      this.nodes.forEach((node) => {
        const floatOffset = Math.sin(time * node.speed + node.phase) * 0.045;
        node.group.position.y = node.basePos.y + floatOffset;
        node.group.rotation.y = Math.sin(time * 0.5 + node.phase) * 0.03;
      });

      // Data pulses traveling through conduits
      this.connections.forEach((conn) => {
        conn.progress += delta * conn.speed;
        if (conn.progress > 1) conn.progress = 0;
        const pos = conn.curve.getPoint(conn.progress);
        conn.pulseMesh.position.copy(pos);
      });

      // Subtle breathing on internal core light and aperture glow
      if (this.coreLight) {
        this.coreLight.intensity = 1.6 + Math.sin(time * 1.8) * 0.3;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('scroll', this._onScroll);
    window.removeEventListener('resize', this._onResize);

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
