/* ============================================================================
   viewer.js — interactive CAD viewer, loaded on demand.
   Mesh formats natively (STL / OBJ / 3MF / PLY / GLB / GLTF) and STEP, IGES,
   BREP through the OpenCascade WASM importer.
   ========================================================================== */
import * as THREE from "three";
import { OrbitControls } from "../vendor/three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "../vendor/three/examples/jsm/environments/RoomEnvironment.js";

const MESH_LOADERS = {
  stl:  ["../vendor/three/examples/jsm/loaders/STLLoader.js",  "STLLoader"],
  obj:  ["../vendor/three/examples/jsm/loaders/OBJLoader.js",  "OBJLoader"],
  ply:  ["../vendor/three/examples/jsm/loaders/PLYLoader.js",  "PLYLoader"],
  "3mf":["../vendor/three/examples/jsm/loaders/3MFLoader.js",  "ThreeMFLoader"],
  glb:  ["../vendor/three/examples/jsm/loaders/GLTFLoader.js", "GLTFLoader"],
  gltf: ["../vendor/three/examples/jsm/loaders/GLTFLoader.js", "GLTFLoader"]
};
const OCCT = { step: 1, stp: 1, iges: 1, igs: 1, brep: 1 };
const MM_PER_IN = 25.4;

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
function ext(path) {
  const i = path.lastIndexOf(".");
  return i < 0 ? "" : path.slice(i + 1).toLowerCase();
}

/* ---------- STEP / IGES / BREP via OpenCascade WASM ---------------------- */
let occtPromise = null;
function getOcct() {
  if (occtPromise) return occtPromise;
  occtPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "vendor/occt/occt-import-js.js";
    s.onload = () => {
      if (!window.occtimportjs) return reject(new Error("occt global missing"));
      window.occtimportjs({
        locateFile: (f) => "vendor/occt/" + f
      }).then(resolve).catch(reject);
    };
    s.onerror = () => reject(new Error("occt script failed to load"));
    document.head.appendChild(s);
  });
  return occtPromise;
}

async function loadOcctModel(url, kind, onProgress) {
  const [occt, buf] = await Promise.all([getOcct(), fetchBuf(url, onProgress)]);
  const bytes = new Uint8Array(buf);
  const fn = kind === "brep" ? "ReadBrepFile"
           : (kind === "iges" || kind === "igs") ? "ReadIgesFile" : "ReadStepFile";
  const res = occt[fn](bytes, null);
  if (!res || !res.success || !res.meshes || !res.meshes.length) {
    throw new Error("could not read " + kind.toUpperCase());
  }
  const group = new THREE.Group();
  for (const m of res.meshes) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(m.attributes.position.array, 3));
    if (m.attributes.normal) {
      g.setAttribute("normal", new THREE.Float32BufferAttribute(m.attributes.normal.array, 3));
    }
    if (m.index) g.setIndex(new THREE.Uint32BufferAttribute(m.index.array, 1));
    if (!m.attributes.normal) g.computeVertexNormals();
    group.add(new THREE.Mesh(g));
  }
  return group;
}

function fetchBuf(url, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => (xhr.status < 400 ? resolve(xhr.response) : reject(new Error("HTTP " + xhr.status)));
    xhr.onerror = () => reject(new Error("network error"));
    xhr.send();
  });
}

async function loadMeshModel(url, kind, onProgress) {
  const spec = MESH_LOADERS[kind];
  if (!spec) throw new Error("unsupported format: " + kind);
  const mod = await import(spec[0]);
  const Loader = mod[spec[1]];
  const loader = new Loader();
  const result = await new Promise((res, rej) =>
    loader.load(url, res, (e) => {
      if (e && e.lengthComputable && onProgress) onProgress(e.loaded / e.total);
    }, rej));
  if (result && result.isBufferGeometry) {
    const g = new THREE.Group();
    if (!result.attributes.normal) result.computeVertexNormals();
    g.add(new THREE.Mesh(result));
    return g;
  }
  if (result && result.scene) return result.scene;
  return result;
}

/* ---------- mount ------------------------------------------------------- */
export function mount(el) {
  const url = el.dataset.cad;
  const kind = ext(url);
  const stage = el.querySelector(".cad-stage");
  const state = el.querySelector(".cad-state");
  const bar = el.querySelector(".cad-bar");
  const fill = bar ? bar.querySelector("i") : null;
  const tools = el.querySelector(".cad-tools");
  const hud = el.querySelector(".cad-hud");
  const loadBtn = el.querySelector("[data-cad-load]");

  if (!MESH_LOADERS[kind] && !OCCT[kind]) {
    state.hidden = false;
    state.querySelector("p:last-of-type").textContent =
      "This format cannot be shown in a browser. Export the part as STEP or STL.";
    return;
  }
  if (loadBtn) loadBtn.hidden = true;
  if (bar) bar.hidden = false;
  const setP = (f) => { if (fill) fill.style.width = Math.round(Math.max(0.02, f) * 100) + "%"; };
  setP(0.04);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  renderer.localClippingEnabled = true;
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(2.4, 3.2, 2.0);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(38, stage.clientWidth / stage.clientHeight, 0.1, 8000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.rotateSpeed = 0.85;
  controls.panSpeed = 0.7;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = 0.55;
  renderer.domElement.addEventListener("pointerdown", () => { controls.autoRotate = false; }, { once: true });
  renderer.domElement.addEventListener("wheel", () => { controls.autoRotate = false; }, { once: true, passive: true });

  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
  const surface = new THREE.MeshStandardMaterial({
    color: 0xd9d8d3, metalness: 0.32, roughness: 0.38,
    envMapIntensity: 1.0, clippingPlanes: [], clipShadows: true, side: THREE.DoubleSide
  });
  const model = new THREE.Group();
  scene.add(model);
  let edges = null, box = new THREE.Box3(), sphere = new THREE.Sphere(), units = el.dataset.units || "mm";

  function frame() {
    box.setFromObject(model);
    box.getBoundingSphere(sphere);
    const d = sphere.radius / Math.sin((camera.fov * Math.PI / 180) / 2);
    const dir = new THREE.Vector3(0.85, 0.62, 1).normalize();
    camera.position.copy(sphere.center).add(dir.multiplyScalar(d * 1.18));
    camera.near = Math.max(d / 800, 0.01);
    camera.far = d * 12;
    camera.updateProjectionMatrix();
    controls.target.copy(sphere.center);
    controls.minDistance = sphere.radius * 0.4;
    controls.maxDistance = d * 6;
    controls.update();
  }

  function writeHud() {
    const s = box.getSize(new THREE.Vector3());
    const f = units === "in" ? 1 / MM_PER_IN : 1;
    const u = units === "in" ? "in" : "mm";
    const n = (v) => (v * f).toFixed(units === "in" ? 2 : 1);
    hud.hidden = false;
    hud.innerHTML =
      "<span>BOUNDING BOX &nbsp;<b>" + n(s.x) + " &times; " + n(s.y) + " &times; " + n(s.z) +
      "</b> " + u + "</span>" +
      "<span>FORMAT &nbsp;<b>" + kind.toUpperCase() + "</b> &nbsp; TRIANGLES &nbsp;<b>" +
      triCount().toLocaleString() + "</b></span>";
  }
  function triCount() {
    let t = 0;
    model.traverse((o) => {
      if (o.isMesh && o.geometry) {
        const g = o.geometry;
        t += g.index ? g.index.count / 3 : g.attributes.position.count / 3;
      }
    });
    return Math.round(t);
  }

  function buildEdges() {
    if (edges) { model.remove(edges); edges = null; }
    const grp = new THREE.Group();
    const col = new THREE.Color(cssVar("--ink", "#23201c"));
    model.traverse((o) => {
      if (!o.isMesh || !o.geometry) return;
      const eg = new THREE.EdgesGeometry(o.geometry, 24);
      const ls = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({
        color: col, transparent: true, opacity: 0.55, clippingPlanes: surface.clippingPlanes
      }));
      o.matrixWorld.decompose(ls.position, ls.quaternion, ls.scale);
      grp.add(ls);
    });
    edges = grp;
    return grp;
  }

  let mode = "shaded";
  function setMode(m) {
    mode = m;
    if (edges) edges.visible = (m === "edges");
    model.traverse((o) => {
      if (!o.isMesh) return;
      o.visible = true;
      o.material.wireframe = (m === "wire");
      o.material.opacity = 1;
      o.material.transparent = false;
      o.material.needsUpdate = true;
    });
    el.querySelectorAll("[data-cad-mode]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.cadMode === m)));
  }

  let raf = 0, running = true;
  function tick() {
    if (!running) return;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(() => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
  ro.observe(stage);

  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      running = e.isIntersecting;
      if (running && !raf) tick(); else if (!running) { cancelAnimationFrame(raf); raf = 0; }
    });
  }, { rootMargin: "120px" });
  io.observe(el);

  const loader = OCCT[kind] ? loadOcctModel : loadMeshModel;
  loader(url, kind, setP).then((obj) => {
    obj.traverse((o) => { if (o.isMesh) o.material = surface.clone(); });
    model.add(obj);
    model.add(buildEdges());
    frame();
    writeHud();
    setMode("shaded");
    state.hidden = true;
    tools.hidden = false;
    setP(1);
    tick();

    /* ---- toolbar wiring ---- */
    el.querySelectorAll("[data-cad-mode]").forEach((b) =>
      b.addEventListener("click", () => setMode(b.dataset.cadMode)));
    const fitBtn = el.querySelector('[data-cad-view="fit"]');
    if (fitBtn) fitBtn.addEventListener("click", () => { controls.autoRotate = false; frame(); });
    const uBtn = el.querySelector("[data-cad-units]");
    if (uBtn) uBtn.addEventListener("click", () => {
      units = units === "mm" ? "in" : "mm";
      uBtn.textContent = units === "mm" ? "mm / in" : "in / mm";
      writeHud();
    });
    const shot = el.querySelector("[data-cad-shot]");
    if (shot) shot.addEventListener("click", () => {
      renderer.render(scene, camera);
      const a = document.createElement("a");
      a.href = renderer.domElement.toDataURL("image/png");
      a.download = (url.split("/").pop() || "model") + ".png";
      a.click();
    });
    const slice = el.querySelector("[data-cad-slice]");
    if (slice) slice.addEventListener("input", () => {
      const t = Number(slice.value) / 100;
      if (t >= 0.999) {
        surface.clippingPlanes = [];
        model.traverse((o) => { if (o.isMesh) o.material.clippingPlanes = []; });
        if (edges) edges.traverse((o) => { if (o.material) o.material.clippingPlanes = []; });
      } else {
        const min = box.min.y, max = box.max.y;
        clip.constant = min + (max - min) * t;
        const planes = [clip];
        model.traverse((o) => { if (o.isMesh) o.material.clippingPlanes = planes; });
        if (edges) edges.traverse((o) => { if (o.material) o.material.clippingPlanes = planes; });
        surface.clippingPlanes = planes;
      }
      renderer.render(scene, camera);
    });
  }).catch((err) => {
    console.error("[cad]", err);
    state.hidden = false;
    if (bar) bar.hidden = true;
    state.querySelector("p:last-of-type").textContent =
      "Could not load this model (" + err.message + "). The file is still downloadable below.";
    if (tools) tools.hidden = false;
  });

  /* keep edge colour correct when the theme flips */
  new MutationObserver(() => {
    if (!edges) return;
    const col = new THREE.Color(cssVar("--ink", "#23201c"));
    edges.traverse((o) => { if (o.material && o.material.color) o.material.color.copy(col); });
    renderer.render(scene, camera);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}
