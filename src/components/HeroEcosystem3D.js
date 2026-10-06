import * as THREE from 'three';

/**
 * Kodmates Interactive 3D Software Ecosystem
 * Digital Software Sphere / System Core with floating technical nodes,
 * curved golden data connections, subtle Kodmates K identity, and mouse/scroll parallax.
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
    this.coreSphere = null;
    this.nodes = [];
    this.connections = [];
    this.particles = null;

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
      this._createLighting();
      this._createSystemCore();
      this._createFloatingNodes();
      this._createConnections();
      this._createAmbientDataParticles();
      this._bindEvents();

      if (this.fallbackEl) {
        // Keep fallback hidden when WebGL is active
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
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 600;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.8);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.container.appendChild(this.renderer.domElement);

    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);
  }

  _createLighting() {
    // Warm champagne directional light
    const keyLight = new THREE.DirectionalLight(0xFEEFB8, 2.0);
    keyLight.position.set(4, 5, 5);
    this.scene.add(keyLight);

    // Subtle dark ambient fill
    const ambientLight = new THREE.AmbientLight(0x121617, 1.2);
    this.scene.add(ambientLight);

    // Subtle internal core point light
    const coreLight = new THREE.PointLight(0xFEEFB8, 1.4, 8);
    coreLight.position.set(0, 0, 0);
    this.rootGroup.add(coreLight);
  }

  _createSystemCore() {
    // 1. Dark graphite metallic sphere
    const sphereGeo = new THREE.SphereGeometry(1.4, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0A0D0E,
      metalness: 0.88,
      roughness: 0.22,
    });
    this.coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    this.rootGroup.add(this.coreSphere);

    // 2. Technical latitude & longitude rings in subtle warm gold
    const ringsGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xFEEFB8,
      transparent: true,
      opacity: 0.18
    });

    const createLatRing = (radius, y) => {
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(points);
      return new THREE.Line(ringGeo, ringMat);
    };

    ringsGroup.add(createLatRing(1.41, 0));
    ringsGroup.add(createLatRing(1.22, 0.7));
    ringsGroup.add(createLatRing(1.22, -0.7));
    ringsGroup.add(createLatRing(0.85, 1.1));
    ringsGroup.add(createLatRing(0.85, -1.1));

    // Vertical orbital rings
    const meridianRing = new THREE.Line(ringsGroup.children[0].geometry.clone(), ringMat);
    meridianRing.rotation.x = Math.PI / 2;
    ringsGroup.add(meridianRing);

    const tiltedRing = new THREE.Line(ringsGroup.children[0].geometry.clone(), new THREE.LineBasicMaterial({
      color: 0xFEEFB8,
      transparent: true,
      opacity: 0.28
    }));
    tiltedRing.scale.set(1.18, 1.18, 1.18);
    tiltedRing.rotation.x = 0.8;
    tiltedRing.rotation.y = 0.5;
    ringsGroup.add(tiltedRing);

    this.coreSphere.add(ringsGroup);

    // 3. Central Kodmates K identity badge on the core surface
    const badgeTexture = this._createKodmatesBadgeTexture();
    const badgeGeo = new THREE.PlaneGeometry(0.72, 0.72);
    const badgeMat = new THREE.MeshBasicMaterial({
      map: badgeTexture,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(0, 0, 1.42);
    this.coreSphere.add(badgeMesh);
  }

  _createKodmatesBadgeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 256, 256);

    // Subtle dark badge rounded square
    ctx.fillStyle = 'rgba(10, 13, 14, 0.85)';
    ctx.strokeStyle = 'rgba(254, 239, 184, 0.35)';
    ctx.lineWidth = 4;
    this._roundRect(ctx, 24, 24, 208, 208, 24);
    ctx.fill();
    ctx.stroke();

    // Kodmates SVG mark icon: [<
    ctx.strokeStyle = '#FEEFB8';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Left bracket
    ctx.beginPath();
    ctx.moveTo(102, 68);
    ctx.lineTo(84, 68);
    ctx.arcTo(68, 68, 68, 84, 16);
    ctx.lineTo(68, 172);
    ctx.arcTo(68, 188, 84, 188, 16);
    ctx.lineTo(102, 188);
    ctx.stroke();

    // Chevron
    ctx.beginPath();
    ctx.moveTo(182, 72);
    ctx.lineTo(112, 128);
    ctx.lineTo(182, 184);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  _createFloatingNodes() {
    const nodeDefs = [
      { id: 'web', label: 'WEB', pos: [-2.2, 1.25, 0.4] },
      { id: 'android', label: 'ANDROID', pos: [0.15, 2.35, 0.55] },
      { id: 'cloud', label: 'CLOUD', pos: [2.35, 1.35, -0.15] },
      { id: 'api', label: 'API', pos: [2.4, -0.7, 0.45] },
      { id: 'database', label: 'DATABASE', pos: [-2.15, -1.2, 0.35] },
      { id: 'business', label: 'BUSINESS', pos: [-0.4, -2.3, 0.5] }
    ];

    nodeDefs.forEach((def, index) => {
      const texture = this._createNodeTexture(def.label, def.id);
      
      // Compact 3D card/cube
      const boxGeo = new THREE.BoxGeometry(0.72, 0.46, 0.08);
      const faceMat = new THREE.MeshBasicMaterial({ map: texture });
      const sideMat = new THREE.MeshStandardMaterial({
        color: 0x0A0D0E,
        metalness: 0.9,
        roughness: 0.3
      });

      const materials = [
        sideMat, sideMat, sideMat, sideMat,
        faceMat, sideMat // Front face has texture
      ];

      const mesh = new THREE.Mesh(boxGeo, materials);
      mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);

      // Subtle edge highlight
      const edges = new THREE.EdgesGeometry(boxGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xFEEFB8,
        transparent: true,
        opacity: 0.35
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      this.rootGroup.add(mesh);
      this.nodes.push({
        mesh,
        basePos: new THREE.Vector3(...def.pos),
        phase: index * 1.05,
        speed: 1.2 + index * 0.15
      });
    });
  }

  _createNodeTexture(label, id) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');

    // Dark graphite metallic surface
    ctx.fillStyle = '#0B0E0F';
    ctx.fillRect(0, 0, 256, 160);

    // Subtle warm border
    ctx.strokeStyle = 'rgba(254, 239, 184, 0.38)';
    ctx.lineWidth = 3;
    this._roundRect(ctx, 4, 4, 248, 152, 12);
    ctx.stroke();

    // Node glyph/icon indicator
    ctx.fillStyle = '#FEEFB8';
    ctx.strokeStyle = '#FEEFB8';
    ctx.lineWidth = 2.5;

    ctx.save();
    ctx.translate(128, 52);
    this._drawNodeIcon(ctx, id);
    ctx.restore();

    // Text Label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText(label, 128, 116);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    return texture;
  }

  _drawNodeIcon(ctx, id) {
    switch (id) {
      case 'web':
        ctx.strokeRect(-16, -14, 32, 24);
        ctx.beginPath();
        ctx.moveTo(-16, -6);
        ctx.lineTo(16, -6);
        ctx.stroke();
        break;
      case 'android':
        ctx.strokeRect(-11, -15, 22, 30);
        ctx.beginPath();
        ctx.arc(0, 10, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'cloud':
        ctx.beginPath();
        ctx.arc(-6, 2, 8, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(4, -4, 10, Math.PI * 1.0, Math.PI * 1.9);
        ctx.arc(10, 4, 6, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'api':
        ctx.beginPath();
        ctx.arc(-10, 0, 4, 0, Math.PI * 2);
        ctx.arc(10, 0, 4, 0, Math.PI * 2);
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-4, 0);
        ctx.moveTo(4, 0);
        ctx.lineTo(6, 0);
        ctx.stroke();
        break;
      case 'database':
        ctx.beginPath();
        ctx.ellipse(0, -8, 14, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-14, -8);
        ctx.lineTo(-14, 8);
        ctx.ellipse(0, 8, 14, 5, 0, 0, Math.PI);
        ctx.lineTo(14, -8);
        ctx.stroke();
        break;
      case 'business':
      default:
        ctx.strokeRect(-14, -12, 12, 12);
        ctx.strokeRect(2, -12, 12, 12);
        ctx.strokeRect(-14, 4, 12, 12);
        ctx.strokeRect(2, 4, 12, 12);
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

  _createConnections() {
    this.nodes.forEach((node) => {
      // Connect each node to surface of core sphere
      const start = node.mesh.position.clone();
      const end = node.mesh.position.clone().normalize().multiplyScalar(1.4);
      
      // Curved control point
      const mid = start.clone().lerp(end, 0.5);
      mid.x += (Math.random() - 0.5) * 0.4;
      mid.y += (Math.random() - 0.5) * 0.4;
      mid.z += 0.35;

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xFEEFB8,
        transparent: true,
        opacity: 0.22
      });

      const lineMesh = new THREE.Line(lineGeo, lineMat);
      this.rootGroup.add(lineMesh);

      // Glowing data pulse along connection
      const pulseGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xFEEFB8
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      this.rootGroup.add(pulseMesh);

      this.connections.push({
        curve,
        lineMesh,
        pulseMesh,
        progress: Math.random(),
        speed: 0.28 + Math.random() * 0.2
      });
    });
  }

  _createAmbientDataParticles() {
    const count = 42;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 1.8 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xFEEFB8,
      size: 0.045,
      transparent: true,
      opacity: 0.55
    });

    this.particles = new THREE.Points(geo, mat);
    this.rootGroup.add(this.particles);
  }

  _bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });
  }

  _onMouseMove(event) {
    const normX = (event.clientX / window.innerWidth) * 2 - 1;
    const normY = -(event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = normX * 0.22;
    this.mouse.targetY = normY * 0.18;
  }

  _onScroll() {
    this.scroll.targetY = window.scrollY * 0.0008;
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
      // Idle slow rotation
      this.coreSphere.rotation.y += delta * 0.12;

      // Mouse parallax lerp
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;
      this.scroll.y += (this.scroll.targetY - this.scroll.y) * 0.04;

      this.rootGroup.rotation.y = this.mouse.x + this.scroll.y * 1.5;
      this.rootGroup.rotation.x = -this.mouse.y;
      this.rootGroup.position.y = this.scroll.y * 0.8;

      // Animate floating nodes
      this.nodes.forEach((node) => {
        const floatOffset = Math.sin(time * node.speed + node.phase) * 0.06;
        node.mesh.position.y = node.basePos.y + floatOffset;
        node.mesh.rotation.y = Math.sin(time * 0.6 + node.phase) * 0.04;
      });

      // Animate connection pulses
      this.connections.forEach((conn) => {
        conn.progress += delta * conn.speed;
        if (conn.progress > 1) conn.progress = 0;
        const pos = conn.curve.getPoint(conn.progress);
        conn.pulseMesh.position.copy(pos);
      });

      // Subtle particle float
      if (this.particles) {
        this.particles.rotation.y = time * 0.03;
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
