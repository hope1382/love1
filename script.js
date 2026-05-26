// ── Default Cozy Data (Nadia Ishrar) ──
const DEFAULT_DATA = {
  name: "Nadia Ishrar",
  handle: "@nadiaishrar",
  bio: "student at sltpsc · anime lover · professional overthinker #stcpsc 🌸",
  status: "kind & lovely soul ✨",
  avatar: "https://i.imgur.com/0ZCIEQH.jpeg",
  badge: "🌸",
  tags: "🧠 overthinker, 🎓 sltpsc student, 🎌 anime lover, 💖 kind, ✨ lovely",
  posts: "1",
  followers: "630",
  following: "363",
  instagram: "https://instagram.com/nadia_israr/",
  tiktok: "https://tiktok.com",
  email: "mailto:nishat2625@gmail.com",
  password: "admin123"
};

// Plasma Instance
let plasmaInstance = null;

// DecryptedText Instance
let decryptedInstance = null;
let currentRoleIndex = 0;

// ── Load data from localStorage or use defaults ──
function getData() {
  const saved = localStorage.getItem("profileData");
  let data = saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : { ...DEFAULT_DATA };
  
  // Data migration: Force update if name is old or key stats changed
  if (
    data.name === "Imane Anys" || 
    !data.bio.includes("#stcpsc") || 
    data.followers === "12.4k" ||
    !data.instagram.includes("nadia_israr") ||
    !data.avatar.includes("imgur.com")
  ) {
    data = { ...DEFAULT_DATA };
    saveData(data);
  }
  return data;
}

function saveData(data) {
  localStorage.setItem("profileData", JSON.stringify(data));
}

// ── Decrypted Text Engine ──
function initDecryptedRoles() {
  const target = document.getElementById("typewriter-role");
  if (!target) return;

  const roles = [
    "a professional overthinker",
    "a student",
    "an anime lover",
    "a singer",
    "a girl",
    "a poetress"
  ];

  if (!decryptedInstance) {
    decryptedInstance = new DecryptedText(target, {
      text: roles[0],
      speed: 50,
      maxIterations: 12,
      sequential: true,
      revealDirection: 'center',
      className: 'revealed',
      encryptedClassName: 'encrypted',
      onComplete: () => {
        setTimeout(() => {
          currentRoleIndex = (currentRoleIndex + 1) % roles.length;
          decryptedInstance.setText(roles[currentRoleIndex]);
          decryptedInstance.start();
        }, 2500); // Wait before next role
      }
    });
    decryptedInstance.start();
  }
}

// ── Apply data to the page dynamically ──
function applyData(data) {
  // Page & Logo title
  document.title = `${data.name} | Creator Profile`;
  document.getElementById("profile-display-name").textContent = data.name;
  
  // Set logo to first word of her name
  const firstWord = data.name.trim().split(" ")[0] || "Nadia";
  document.getElementById("logo-name").textContent = firstWord;

  // Bio & stats
  document.getElementById("profile-bio").textContent = data.bio;
  document.getElementById("profile-status").textContent = data.status;
  document.getElementById("profile-avatar").src = data.avatar;
  document.getElementById("profile-badge").textContent = data.badge;
  
  document.getElementById("stat-posts").textContent = data.posts;
  document.getElementById("stat-followers").textContent = data.followers;
  document.getElementById("stat-following").textContent = data.following;

  // CTAs
  const instagramHref = data.instagram.startsWith("http") ? data.instagram : "https://" + data.instagram;
  const emailHref = data.email.startsWith("mailto:") ? data.email : "mailto:" + data.email;

  document.getElementById("link-instagram").href = instagramHref;
  document.getElementById("link-email").href = emailHref;

  // iOS Dock buttons update
  document.getElementById("dock-insta-btn").href = instagramHref;

  // Tags rendering
  const tagsEl = document.getElementById("profile-tags");
  if (tagsEl) {
    tagsEl.innerHTML = "";
    data.tags.split(",").map(t => t.trim()).filter(Boolean).forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
  }

  // Launch Decrypted Text Roles
  initDecryptedRoles();
}

// ── Tab Switching Logic (Sleek GPU-accelerated transition) ──
function switchTab(tabId, clickedElement) {
  // 1. Hide all active panes
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.remove("active");
  });
  
  // 2. Open the designated pane
  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add("active");
  }
  
  // 3. Highlight bottom dock elements
  document.querySelectorAll(".dock-item").forEach(item => {
    item.classList.remove("active");
  });
  
  if (clickedElement) {
    clickedElement.classList.add("active");
  } else {
    // If called via headers/logos, fetch the matching tab selector in the dock
    let matchingId = "dock-home";
    if (tabId === 'tab-about') matchingId = "dock-about";
    if (tabId === 'tab-email') matchingId = "dock-email-btn";
    
    const matchingBtn = document.getElementById(matchingId);
    if (matchingBtn) {
      matchingBtn.classList.add("active");
    }
  }
}

// Expose globally
window.switchTab = switchTab;

// ── Admin Modal Handlers ──
function openAdmin() {
  document.getElementById("admin-modal").classList.add("open");
  document.getElementById("admin-password").value = "";
  document.getElementById("pw-error").style.display = "none";
  document.getElementById("password-gate").style.display = "block";
  document.getElementById("admin-form").style.display = "none";
}

function closeAdmin() {
  document.getElementById("admin-modal").classList.remove("open");
}

function checkPassword() {
  const data = getData();
  const input = document.getElementById("admin-password").value;
  if (input === data.password) {
    document.getElementById("password-gate").style.display = "none";
    loadFormValues(data);
    document.getElementById("admin-form").style.display = "block";
  } else {
    document.getElementById("pw-error").style.display = "block";
  }
}

function loadFormValues(data) {
  document.getElementById("edit-name").value = data.name;
  document.getElementById("edit-handle").value = data.handle;
  document.getElementById("edit-bio").value = data.bio;
  document.getElementById("edit-status").value = data.status;
  document.getElementById("edit-avatar").value = data.avatar;
  document.getElementById("edit-badge").value = data.badge;
  document.getElementById("edit-tags").value = data.tags;
  document.getElementById("edit-posts").value = data.posts;
  document.getElementById("edit-followers").value = data.followers;
  document.getElementById("edit-following").value = data.following;
  document.getElementById("edit-instagram").value = data.instagram;
  document.getElementById("edit-tiktok").value = data.tiktok;
  document.getElementById("edit-email").value = data.email;
  document.getElementById("edit-password").value = "";
}

function saveChanges() {
  const data = getData();
  const newPassword = document.getElementById("edit-password").value.trim();

  const updated = {
    ...data,
    name:      document.getElementById("edit-name").value.trim() || data.name,
    handle:    document.getElementById("edit-handle").value.trim() || data.handle,
    bio:       document.getElementById("edit-bio").value.trim() || data.bio,
    status:    document.getElementById("edit-status").value.trim() || data.status,
    avatar:    document.getElementById("edit-avatar").value.trim() || data.avatar,
    badge:     document.getElementById("edit-badge").value.trim() || data.badge,
    tags:      document.getElementById("edit-tags").value.trim() || data.tags,
    posts:     document.getElementById("edit-posts").value.trim() || data.posts,
    followers: document.getElementById("edit-followers").value.trim() || data.followers,
    following: document.getElementById("edit-following").value.trim() || data.following,
    instagram: document.getElementById("edit-instagram").value.trim() || data.instagram,
    tiktok:    document.getElementById("edit-tiktok").value.trim() || data.tiktok,
    email:     document.getElementById("edit-email").value.trim() || data.email,
    password:  newPassword || data.password,
  };

  saveData(updated);
  applyData(updated);

  const msg = document.getElementById("saved-msg");
  msg.classList.add("show");
  setTimeout(() => {
    msg.classList.remove("show");
    closeAdmin();
  }, 2000);
}

// Close modal on overlay click
document.getElementById("admin-modal").addEventListener("click", function(e) {
  if (e.target === this) closeAdmin();
});

// Enter key on password input
document.getElementById("admin-password").addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkPassword();
});

// ── Interactive Sparkle Particles Generator ──
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  container.innerHTML = "";

  const colors = ["#ff75a0", "#b588f7", "#7ad1ff", "#ffd3b6", "#fff0f5"];
  const symbols = ["✦", "✧", "♡", "✿", "★", "🌸", "⭐"];

  const count = window.innerWidth < 480 ? 12 : 25;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "particle";

    const useSymbol = Math.random() > 0.4;
    if (useSymbol) {
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.fontSize = (Math.random() * 12 + 10) + "px";
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
    } else {
      const size = Math.random() * 6 + 4;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
    }

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = (Math.random() * 10 + 8) + "s";
    el.style.animationDelay = (Math.random() * 8) + "s";

    container.appendChild(el);
  }
}

// ── Three.js WebGL Beams Animation Engine ──
const noiseGLSL = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

function createStackedPlanesGeometry(n, width, height, spacing, heightSegments) {
  const geometry = new THREE.BufferGeometry();
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const positions = new Float32Array(numVertices * 3);
  const indices = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVertices * 2);

  let vertexOffset = 0;
  let indexOffset = 0;
  let uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = Math.random() * 300;
    const uvYOffset = Math.random() * 300;

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      const v0 = [xOffset, y, 0];
      const v1 = [xOffset + width, y, 0];
      positions.set([...v0, ...v1], vertexOffset * 3);

      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);

      if (j < heightSegments) {
        const a = vertexOffset;
        const b = vertexOffset + 1;
        const c = vertexOffset + 2;
        const d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset);
        indexOffset += 6;
      }
      vertexOffset += 2;
      uvOffset += 4;
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}

function initBeams() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById("beams-canvas");
  if (!canvas) return;

  // 1. Setup Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true // Make WebGL canvas background fully transparent so body gradient shines through
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Setup Scene
  const scene = new THREE.Scene();

  // 3. Setup Camera (placed direct front looking at coordinates 0,0,0)
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 20);

  // 4. Uniform Parameters
  const uniforms = {
    time: { value: 0 },
    uSpeed: { value: 1.8 },
    uNoiseIntensity: { value: 1.75 },
    uScale: { value: 1.5 } // Scaled up displacement amplitude
  };

  // 5. Custom Self-Illuminated Shader Material
  // Employs a direct glowing pookie-themed (soft pink and lilac pastel gradients) blend
  const beamMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      varying float vGlow;
      uniform float time;
      uniform float uSpeed;
      uniform float uScale;
      
      ${noiseGLSL}
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Ripple displacement over the y axis
        float noiseVal = cnoise(vec3(pos.x * 0.08, pos.y * 0.12 - time * uSpeed * 0.2, time * 0.05)) * uScale;
        pos.z += noiseVal * 4.5;
        
        vGlow = noiseVal;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vGlow;
      uniform float time;
      uniform float uNoiseIntensity;
      
      float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
      
      void main() {
        // High-end cozy Pookie Theme Colors (soft pink, glowing lavender lilac, and warm peach)
        vec3 pookiePink = vec3(1.0, 0.46, 0.63);   // #ff75a0
        vec3 pookieLilac = vec3(0.71, 0.53, 0.97);  // #b588f7
        vec3 pookiePeach = vec3(1.0, 0.83, 0.71);  // #ffd3b6
        
        // Smooth dynamic wave gradient shifting with time
        vec3 baseColor = mix(pookiePink, pookieLilac, vUv.y + sin(time * 0.12) * 0.2);
        baseColor = mix(baseColor, pookiePeach, sin(vUv.x * 3.14 + time * 0.3) * 0.5 + 0.5);
        
        // Volumetric height intensity glow
        float intensity = smoothstep(-1.2, 1.2, vGlow) * 0.75 + 0.25;
        
        // Soft ribbon horizontal edges
        float edgeGlow = sin(vUv.x * 3.14159);
        vec3 finalColor = baseColor * intensity * edgeGlow * 1.8;
        
        // Film grain texture noise overlay
        float grain = rand(gl_FragCoord.xy) * 0.07 * uNoiseIntensity;
        finalColor -= vec3(grain);
        
        // Translucent Alpha mapping to blend with standard CSS background
        float alpha = edgeGlow * 0.68 * (intensity * 0.68 + 0.32);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    uniforms: uniforms,
    transparent: true,
    side: THREE.DoubleSide
  });

  // 6. Geometry & Mesh Stack
  // beamWidth = 2, beamHeight = 15, beamNumber = 12, spacing = 0.1
  const beamGeometry = createStackedPlanesGeometry(12, 2.0, 15.0, 0.1, 100);
  const mesh = new THREE.Mesh(beamGeometry, beamMaterial);

  // Group and rotate to display tilted glowing beams in background
  const group = new THREE.Group();
  group.rotation.z = -12 * (Math.PI / 180);
  group.add(mesh);
  scene.add(group);

  // 7. Tick Frame Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    uniforms.time.value += delta;
    renderer.render(scene, camera);
  }
  animate();

  // 8. Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ── Plasma Initialization ──
function initPlasma() {
  const container = document.getElementById("plasma-bg");
  if (!container) return;

  plasmaInstance = new Plasma(container, {
    color: "#FFB6C1", // Coquette Bow Pink from Pookie Palette
    speed: 0.6,
    direction: "forward",
    scale: 1.1,
    opacity: 0.8,
    mouseInteractive: true
  });
}

// ── Init on load ──
document.addEventListener("DOMContentLoaded", () => {
  const activeData = getData();
  applyData(activeData);
  createParticles();

  // Launch Background Systems
  initBeams();
  initPlasma();

  window.addEventListener("resize", () => {
    createParticles();
  });
});
