// Floating 3D cat toys for the hero. Loaded lazily so the first paint stays light.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Kind = 'yarn' | 'fish' | 'paw' | 'mouse' | 'bell';
interface Toy { kind: Kind; group: THREE.Group; home: THREE.Vector3; spin: number; phase: number; alive: number; size: number; push: THREE.Vector2 }

const COLORS = { mint: 0x7de6d1, peach: 0xffa06a, cream: 0xfff3e4, pink: 0xff9fb0, lilac: 0xc6bbf7, ink: 0x0a1020, gold: 0xf2c46b };
const lines: Record<Kind, string[]> = {
  yarn: ['Клубок! Дай поиграть!', 'Мой клубок, не трогать. Ну ладно, трогать.'],
  fish: ['Рыбка! Это мне?', 'Пахнет обедом. 🐟'],
  paw: ['Это моя лапка. Буп!', 'Дай пять! 🐾'],
  mouse: ['Мышь! Держите её!', 'Опять убежала…'],
  bell: ['Дзынь! Кто звал котика?', 'Звонок на обед?'],
};

const mat = (color: number, roughness = .45, extra: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness, clearcoat: .35, clearcoatRoughness: .4, ...extra });

function yarn() {
  const group = new THREE.Group();
  const wool = mat(COLORS.mint, .85, { clearcoat: 0, sheen: 1, sheenColor: new THREE.Color(0xd8fff6) });
  group.add(new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), wool));
  const strand = mat(0x9df0de, .8, { clearcoat: 0 });
  for (let index = 0; index < 7; index++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.005, .045, 8, 80), strand);
    ring.rotation.set(index * .9, index * 1.7, index * .4);
    group.add(ring);
  }
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(.7, -.7, .2), new THREE.Vector3(1.3, -1.2, .5), new THREE.Vector3(1.9, -1.0, .3), new THREE.Vector3(2.4, -1.5, .1)]);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, .045, 8), strand));
  return group;
}

function fish() {
  const shape = new THREE.Shape();
  shape.moveTo(-1.2, 0);
  shape.bezierCurveTo(-1.0, .75, .35, .8, .75, .1);
  shape.lineTo(1.35, .55); shape.lineTo(1.2, 0); shape.lineTo(1.35, -.55); shape.lineTo(.75, -.1);
  shape.bezierCurveTo(.35, -.8, -1.0, -.75, -1.2, 0);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: .3, bevelEnabled: true, bevelThickness: .2, bevelSize: .16, bevelSegments: 8, curveSegments: 32 });
  geometry.center();
  const group = new THREE.Group();
  group.add(new THREE.Mesh(geometry, mat(COLORS.peach, .35)));
  const eye = new THREE.Mesh(new THREE.SphereGeometry(.12, 16, 16), mat(COLORS.ink, .2));
  eye.position.set(-.72, .14, .38); group.add(eye);
  const glint = new THREE.Mesh(new THREE.SphereGeometry(.04, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  glint.position.set(-.75, .19, .48); group.add(glint);
  const gill = new THREE.Mesh(new THREE.TorusGeometry(.32, .035, 8, 24, Math.PI * .7), mat(0xf59a66, .4));
  gill.position.set(-.35, 0, .36); gill.rotation.z = -Math.PI * .35; group.add(gill);
  return group;
}

function paw() {
  const group = new THREE.Group();
  const fur = mat(COLORS.cream, .6), bean = mat(COLORS.pink, .35, { emissive: new THREE.Color(COLORS.pink), emissiveIntensity: 0 });
  const pad = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28), fur); pad.scale.set(1.05, .9, .5); group.add(pad);
  const main = new THREE.Mesh(new THREE.SphereGeometry(.42, 32, 20), bean); main.scale.set(1.15, .85, .35); main.position.set(0, -.18, .44); group.add(main);
  [-.62, -.22, .22, .62].forEach((x, index) => {
    const y = index === 0 || index === 3 ? .72 : .95;
    const toe = new THREE.Mesh(new THREE.SphereGeometry(.34, 28, 18), fur); toe.scale.set(1, 1, .55); toe.position.set(x * 1.05, y, .05); group.add(toe);
    const toeBean = new THREE.Mesh(new THREE.SphereGeometry(.16, 20, 12), bean); toeBean.scale.set(1, 1.1, .4); toeBean.position.set(x * 1.05, y - .02, .24); group.add(toeBean);
  });
  group.userData.bean = bean;
  return group;
}

function mouse() {
  const group = new THREE.Group();
  const points = Array.from({ length: 14 }, (_, i) => { const t = i / 13; return new THREE.Vector2(Math.sin(Math.PI * t) * (0.25 + .7 * t * (1 - t) * 2.2) * .9, (t - .5) * 2.3); });
  const body = new THREE.Mesh(new THREE.LatheGeometry(points, 40), mat(COLORS.lilac, .5));
  body.rotation.z = Math.PI / 2; body.scale.set(1, 1, .9); group.add(body);
  const pink = mat(COLORS.pink, .45);
  [-1, 1].forEach(side => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, .08, 28), pink);
    ear.rotation.x = Math.PI / 2; ear.rotation.z = side * .3; ear.position.set(-.55, .62, side * .32); group.add(ear);
  });
  const nose = new THREE.Mesh(new THREE.SphereGeometry(.09, 12, 12), pink); nose.position.set(-1.16, 0, 0); group.add(nose);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 12), mat(COLORS.ink, .2)); eye.position.set(-.82, .2, .3); group.add(eye);
  const tail = new THREE.CatmullRomCurve3([new THREE.Vector3(1.1, 0, 0), new THREE.Vector3(1.6, .3, .1), new THREE.Vector3(2, -.1, 0), new THREE.Vector3(2.4, .25, -.1)]);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(tail, 40, .045, 8), pink));
  return group;
}

function bell() {
  const group = new THREE.Group();
  const gold = mat(COLORS.gold, .22, { metalness: .9, clearcoat: .6 });
  group.add(new THREE.Mesh(new THREE.SphereGeometry(.85, 40, 28), gold));
  const band = new THREE.Mesh(new THREE.TorusGeometry(.86, .06, 12, 60), gold); band.rotation.x = Math.PI / 2; band.position.y = .12; group.add(band);
  const loop = new THREE.Mesh(new THREE.TorusGeometry(.2, .07, 12, 30), gold); loop.position.y = .95; group.add(loop);
  const slot = new THREE.Mesh(new THREE.CapsuleGeometry(.06, .5, 6, 12), mat(0x3a2a12, .6)); slot.rotation.z = Math.PI / 2; slot.position.set(0, -.42, .7); slot.rotation.x = -.5; group.add(slot);
  const hole = new THREE.Mesh(new THREE.SphereGeometry(.11, 16, 12), mat(0x3a2a12, .6)); hole.position.set(0, -.3, .76); group.add(hole);
  const ribbon = new THREE.Mesh(new THREE.TorusGeometry(.62, .09, 10, 40, Math.PI * 1.2), mat(COLORS.mint, .5));
  ribbon.position.y = 1.35; ribbon.rotation.z = Math.PI * 1.4; group.add(ribbon);
  return group;
}

const makers: Record<Kind, () => THREE.Group> = { yarn, fish, paw, mouse, bell };

// x/y are fractions of the hero box; placed in the empty margins around the content.
const desktopLayout: Array<[Kind, number, number, number]> = [
  ['yarn', .435, .2, .62], ['fish', .9, .08, .5], ['paw', .45, .8, .56], ['mouse', .2, .9, .46], ['bell', .955, .72, .4],
];
const mobileLayout: Array<[Kind, number, number, number]> = [
  ['yarn', .9, .03, .3], ['fish', .8, .5, .34],
];

export function startCatToys(canvas: HTMLCanvasElement, host: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  scene.environmentIntensity = .55;
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  camera.position.z = 22;
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-4, 6, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(COLORS.mint, 2.2); rim.position.set(6, -2, -4); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x0a1020, .6));

  let toys: Toy[] = [];
  let width = 1, height = 1, unit = 1;
  const sparks: Array<{ mesh: THREE.Mesh; velocity: THREE.Vector3; life: number }> = [];
  const sparkGeometry = new THREE.OctahedronGeometry(.09);

  function layout() {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height; camera.updateProjectionMatrix();
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    unit = visibleHeight / height; // world units per CSS pixel
    toys.forEach(toy => scene.remove(toy.group));
    const plan = width < 820 ? mobileLayout : desktopLayout;
    toys = plan.map(([kind, fx, fy, size], index) => {
      const group = makers[kind]();
      const home = new THREE.Vector3((fx - .5) * width * unit, (.5 - fy) * height * unit, (index % 2 ? -1 : .5));
      const scale = size * Math.min(1.4, Math.max(.7, width / 1300)) * 1.6;
      group.scale.setScalar(scale); group.position.copy(home);
      if (kind === 'mouse') group.rotation.set(.2, -.5, .1); else group.rotation.set(.3 * index, -.4 + index * .5, .2 * index);
      scene.add(group);
      return { kind, group, home, spin: .15 + index * .04, phase: index * 1.7, alive: 0, size: scale, push: new THREE.Vector2() };
    });
  }

  const pointer = new THREE.Vector2(-9, -9), ndc = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  function hit(event: PointerEvent) {
    const box = canvas.getBoundingClientRect();
    ndc.set(((event.clientX - box.left) / box.width) * 2 - 1, -((event.clientY - box.top) / box.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const found = raycaster.intersectObjects(toys.map(toy => toy.group), true)[0];
    let node: THREE.Object3D | null = found?.object ?? null;
    while (node) { const owner = toys.find(toy => toy.group === node); if (owner) return owner; node = node.parent; }
    return undefined;
  }
  const blocked = (event: Event) => event.target instanceof Element && Boolean(event.target.closest('a, button, input, [role="button"], .showcase-stage, .hero-copy p, h1'));

  function onMove(event: PointerEvent) {
    const box = canvas.getBoundingClientRect();
    pointer.set((event.clientX - box.left - width / 2) * unit, -(event.clientY - box.top - height / 2) * unit);
    const toy = blocked(event) ? undefined : hit(event);
    if (toy) host.dataset.cursor = 'Оживить'; else delete host.dataset.cursor;
    host.style.cursor = toy ? 'pointer' : '';
  }
  function onLeave() { pointer.set(-99, -99); delete host.dataset.cursor; host.style.cursor = ''; }
  const lineIndex: Record<string, number> = {};
  function onClick(event: PointerEvent) {
    if (blocked(event)) return;
    const toy = hit(event);
    if (!toy || toy.alive > 0) return;
    toy.alive = 1;
    const list = lines[toy.kind]; const at = (lineIndex[toy.kind] = ((lineIndex[toy.kind] ?? -1) + 1) % list.length);
    window.dispatchEvent(new CustomEvent('cat:say', { detail: list[at] }));
    for (let index = 0; index < 10; index++) {
      const mesh = new THREE.Mesh(sparkGeometry, new THREE.MeshBasicMaterial({ color: index % 3 ? COLORS.mint : COLORS.peach, transparent: true }));
      mesh.position.copy(toy.group.position);
      const angle = index / 10 * Math.PI * 2;
      sparks.push({ mesh, velocity: new THREE.Vector3(Math.cos(angle), Math.sin(angle), Math.random() - .5).multiplyScalar(.09 + Math.random() * .05), life: 1 });
      scene.add(mesh);
    }
    if (reduced) render(performance.now());
  }

  const clock = new THREE.Clock();
  function animateToy(toy: Toy, time: number, delta: number) {
    const { group, home } = toy;
    // drift away a little from the pointer
    const dx = home.x - pointer.x, dy = home.y - pointer.y, dist = Math.hypot(dx, dy), radius = toy.size * 2.6;
    const force = dist < radius ? (1 - dist / radius) * toy.size * .9 : 0;
    toy.push.lerp(new THREE.Vector2(dist ? dx / dist * force : 0, dist ? dy / dist * force : 0), .08);
    const bob = Math.sin(time * .8 + toy.phase) * toy.size * .12;
    group.position.set(home.x + toy.push.x, home.y + bob + toy.push.y, home.z);
    group.rotation.y += toy.spin * delta;
    group.rotation.x = Math.sin(time * .5 + toy.phase) * (toy.kind === 'mouse' ? .1 : .25);
    group.scale.setScalar(toy.size);
    if (toy.alive <= 0) return;
    const t = 1 - toy.alive; // 0 → 1 over the animation
    const ease = Math.sin(Math.PI * t);
    toy.alive = Math.max(0, toy.alive - delta / 1.3);
    if (toy.kind === 'yarn') { group.rotation.y += delta * 14 * (1 - t); group.position.y += ease * toy.size * 1.4; }
    if (toy.kind === 'fish') { group.rotation.x = t * Math.PI * 2; group.rotation.z = Math.sin(t * 30) * .35 * (1 - t); group.position.y += ease * toy.size * 1.8; }
    if (toy.kind === 'paw') {
      const squash = 1 - Math.sin(Math.min(1, t * 2.4) * Math.PI) * .28;
      group.scale.set(toy.size / Math.sqrt(squash), toy.size * squash, toy.size);
      (group.userData.bean as THREE.MeshPhysicalMaterial).emissiveIntensity = ease * .9;
    }
    if (toy.kind === 'mouse') {
      const angle = t * Math.PI * 2;
      group.position.x += Math.sin(angle) * toy.size * 2.4; group.position.y += (1 - Math.cos(angle)) * toy.size * .6;
      group.rotation.set(0, Math.PI, Math.sin(t * 40) * .12);
    }
    if (toy.kind === 'bell') group.rotation.z = Math.sin(t * 36) * .55 * (1 - t);
  }

  let frame = 0, running = false;
  function render(now: number) {
    const delta = Math.min(.05, clock.getDelta());
    const time = now / 1000;
    toys.forEach(toy => animateToy(toy, reduced ? 0 : time, reduced ? 0 : delta));
    for (let index = sparks.length - 1; index >= 0; index--) {
      const spark = sparks[index];
      spark.life -= delta * 1.4; spark.mesh.position.add(spark.velocity); spark.velocity.multiplyScalar(.94);
      spark.mesh.rotation.x += .2; (spark.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, spark.life);
      if (spark.life <= 0) { scene.remove(spark.mesh); (spark.mesh.material as THREE.Material).dispose(); sparks.splice(index, 1); }
    }
    renderer.render(scene, camera);
  }
  function loop(now: number) { render(now); frame = requestAnimationFrame(loop); }
  function setRunning(next: boolean) {
    if (reduced) { if (next) render(performance.now()); return; }
    if (next === running) return;
    running = next;
    if (running) { clock.getDelta(); frame = requestAnimationFrame(loop); } else cancelAnimationFrame(frame);
  }

  layout();
  const resize = new ResizeObserver(() => { layout(); if (!running) render(performance.now()); });
  resize.observe(canvas);
  let onScreen = true;
  const visibility = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; setRunning(onScreen && !document.hidden); });
  visibility.observe(host);
  const onVisibility = () => setRunning(onScreen && !document.hidden);
  document.addEventListener('visibilitychange', onVisibility);
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);
  host.addEventListener('click', onClick as EventListener);
  setRunning(true);
  canvas.classList.add('is-ready');

  return () => {
    setRunning(false); resize.disconnect(); visibility.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); host.removeEventListener('click', onClick as EventListener);
    scene.traverse(object => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); (Array.isArray(object.material) ? object.material : [object.material]).forEach(item => item.dispose()); } });
    pmrem.dispose(); renderer.dispose();
  };
}
