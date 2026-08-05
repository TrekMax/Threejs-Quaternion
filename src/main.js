import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="topbar">
    <a class="brand" href="#top" aria-label="回到顶部">
      <span class="brand-mark">Q</span>
      <span>旋转的另一种语言</span>
    </a>
    <nav class="nav" aria-label="章节导航">
      <a href="#complex">复数</a>
      <a href="#bridge">从 2D 到 3D</a>
      <a href="#quaternion">四元数</a>
      <a href="#practice">实践</a>
    </nav>
    <div class="progress-wrap" aria-label="阅读进度"><span id="reading-progress"></span></div>
  </header>

  <main id="top">
    <section class="hero section-shell">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span> INTERACTIVE MATH · 01</div>
        <h1>旋转，不只是<br><em>转一个角度。</em></h1>
        <p class="hero-lead">从复平面上的一个乘法出发，走进三维空间，最终理解四元数为什么是描述旋转最自然的语言之一。</p>
        <div class="hero-actions">
          <a class="primary-btn" href="#complex">开始探索 <span>↓</span></a>
          <button class="text-btn" id="toggle-motion" type="button"><span class="play-dot">Ⅱ</span> 暂停动画</button>
        </div>
        <div class="hero-note">
          <span>建议</span>
          <p>拖拽右侧模型。你不需要先记住公式，只需观察「什么在转」。</p>
        </div>
      </div>
      <div class="hero-visual reveal">
        <div class="canvas-shell hero-canvas-shell">
          <canvas id="hero-canvas" aria-label="从复平面到三维旋转的交互模型"></canvas>
          <div class="canvas-label label-z">z</div>
          <div class="canvas-label label-y">y</div>
          <div class="canvas-label label-x">x</div>
          <div class="drag-hint">拖拽观察 <span>↗</span></div>
        </div>
        <div class="equation-float">
          <span class="eq-label">核心对象</span>
          <div>q = <b>cos</b> θ⁄₂ + <b>u</b> sin θ⁄₂</div>
        </div>
      </div>
      <div class="chapter-index">01 <span>/ 04</span></div>
    </section>

    <section class="concept-strip" aria-label="学习路线">
      <div><span>01</span><p><b>复数</b><br>平面中的旋转</p></div>
      <i>→</i>
      <div><span>02</span><p><b>空间</b><br>三维中的难题</p></div>
      <i>→</i>
      <div><span>03</span><p><b>四元数</b><br>旋转的新语言</p></div>
      <i>→</i>
      <div><span>04</span><p><b>应用</b><br>把直觉写成代码</p></div>
    </section>

    <section class="lesson section-shell" id="complex">
      <div class="section-heading reveal">
        <div class="eyebrow"><span></span> CHAPTER 01</div>
        <div class="heading-row">
          <h2>从复数开始：<br><em>二维旋转的秘密</em></h2>
          <p>复数不是两个实数拼在一起。把它看作平面中的箭头后，乘法会显露出一种漂亮的几何意义：<strong>缩放，再旋转。</strong></p>
        </div>
      </div>

      <div class="interactive-card reveal">
        <div class="complex-stage">
          <canvas id="complex-canvas" aria-label="复平面旋转交互"></canvas>
          <div class="stage-badge">RE · IM</div>
        </div>
        <div class="control-panel">
          <div class="step-tag">实验 01</div>
          <h3>让 <span class="math">z</span> 乘以一个单位复数</h3>
          <p class="muted">拖动角度，观察红色向量。它的长度没有改变，方向却发生了变化。</p>

          <div class="equation-box">
            <div><span class="math">z′</span> = z · (<span id="cos-value">0.71</span> + <i>i</i> · <span id="sin-value">0.71</span>)</div>
            <span>= z · e<sup>iθ</sup></span>
          </div>

          <label class="range-label" for="angle-slider">
            <span>旋转角 θ</span><output id="angle-output">45°</output>
          </label>
          <input class="range" id="angle-slider" type="range" min="0" max="360" value="45" />

          <div class="observation">
            <span class="observe-icon">◎</span>
            <div><b>你刚刚看到了什么？</b><p>乘以 <span class="math">e<sup>iθ</sup></span>，等价于在平面中逆时针旋转 θ。</p></div>
          </div>
        </div>
      </div>

      <div class="formula-walkthrough reveal">
        <div class="formula-step"><span>①</span><div class="big-math">z = x + yi</div><p>一个复数<br>对应平面中的一个点</p></div>
        <div class="formula-arrow">×</div>
        <div class="formula-step"><span>②</span><div class="big-math">r = cosθ + i sinθ</div><p>一个模长为 1 的复数<br>只携带角度</p></div>
        <div class="formula-arrow">=</div>
        <div class="formula-step accent-step"><span>③</span><div class="big-math">z′ = zr</div><p>长度不变<br>方向增加 θ</p></div>
      </div>
    </section>

    <section class="bridge-section" id="bridge">
      <div class="section-shell">
        <div class="section-heading light reveal">
          <div class="eyebrow"><span></span> CHAPTER 02</div>
          <div class="heading-row">
            <h2>升到三维，<br><em>一个角度不够了</em></h2>
            <p>二维旋转只需一个“垂直于平面”的轴。进入三维后，旋转轴本身也可以指向任意方向。</p>
          </div>
        </div>

        <div class="bridge-grid">
          <div class="bridge-copy reveal">
            <div class="number-line"><span>二维</span><i></i><b>1 个角度</b></div>
            <div class="number-line"><span>三维</span><i></i><b>1 根轴 + 1 个角度</b></div>
            <h3>欧拉角看似简单，<br>却把三个旋转<strong>绑在顺序上。</strong></h3>
            <p>依次绕 X、Y、Z 轴旋转时，后一个轴已经被前一个旋转带走。某些姿态下，两根轴会重合——这就是万向节死锁。</p>
            <button class="outline-btn" id="gimbal-button" type="button">演示万向节死锁 <span>→</span></button>
          </div>
          <div class="gimbal-card reveal">
            <canvas id="gimbal-canvas" aria-label="万向节与四元数旋转对比"></canvas>
            <div class="mode-switch" role="group" aria-label="旋转模式">
              <button class="active" data-mode="euler" type="button">欧拉角</button>
              <button data-mode="quaternion" type="button">四元数</button>
            </div>
            <div class="gimbal-status"><span></span><b id="mode-status">三层旋转轴</b><small id="mode-detail">旋转顺序：Y → X → Z</small></div>
          </div>
        </div>
      </div>
    </section>

    <section class="lesson quaternion-section section-shell" id="quaternion">
      <div class="section-heading reveal">
        <div class="eyebrow"><span></span> CHAPTER 03</div>
        <div class="heading-row">
          <h2>四元数：<br><em>把轴与角度装进一个数</em></h2>
          <p>四元数有四个分量，却不应该被想成“四维旋转”。对单位四元数而言，它只是把<strong>旋转轴 u</strong> 与<strong>旋转角 θ</strong>打包在一起。</p>
        </div>
      </div>

      <div class="quaternion-map reveal">
        <div class="q-equation">
          <div class="q-symbol">q</div><div class="equals">=</div>
          <div class="scalar-term"><span>w</span><b>cos(θ/2)</b><small>旋转的一半角度</small></div>
          <div class="plus">+</div>
          <div class="vector-term"><span>xi + yj + zk</span><b>u · sin(θ/2)</b><small>轴的方向 × 一半角度</small></div>
        </div>
        <div class="q-explanation">
          <div><span class="q-dot scalar"></span><b>标量部 w</b><p>记录半角余弦</p></div>
          <div><span class="q-dot vector"></span><b>向量部 (x, y, z)</b><p>指向旋转轴</p></div>
          <div><span class="q-dot unit"></span><b>单位长度</b><p>w²+x²+y²+z² = 1</p></div>
        </div>
      </div>

      <div class="half-angle-card reveal">
        <div>
          <span class="step-tag">最容易困惑的地方</span>
          <h3>为什么公式里是 θ⁄2？</h3>
          <p>旋转向量 <span class="math">v</span> 时，我们做的是一次“夹心乘法”：</p>
          <div class="sandwich"><span>v′</span> = <b>q</b> · v · <b>q<sup>−1</sup></b></div>
          <p class="muted">在 q · v · q⁻¹ 的共轭作用中，参数对应的几何转角会加倍；因此 q 只需编码 θ⁄2，最终作用在向量上的才是完整的 θ。</p>
        </div>
        <div class="half-visual" aria-hidden="true">
          <div class="orbit orbit-a"><span>θ⁄2</span></div>
          <div class="orbit orbit-b"><span>θ⁄2</span></div>
          <div class="theta-total">θ</div>
        </div>
      </div>

      <div class="takeaway reveal">
        <span>一句话理解</span>
        <blockquote>复数用一个平面内的单位圆描述二维旋转；<br>四元数用四维中的单位球面，平滑地编码三维旋转。</blockquote>
      </div>
    </section>

    <section class="practice-section" id="practice">
      <div class="section-shell">
        <div class="section-heading light reveal">
          <div class="eyebrow"><span></span> CHAPTER 04</div>
          <div class="heading-row">
            <h2>把直觉，<br><em>写进 Three.js</em></h2>
            <p>Three.js 内部使用单位四元数保存物体姿态。多数时候你不需要手算四个分量，只需提供轴与角度。</p>
          </div>
        </div>

        <div class="code-lab reveal">
          <div class="code-side">
            <div class="code-top"><span>rotation.js</span><button id="copy-code" type="button">复制代码</button></div>
            <pre><code><span class="comment">// 1. 定义旋转轴，并归一化</span>
<span class="kw">const</span> axis = <span class="kw">new</span> THREE.<span class="fn">Vector3</span>(<span class="num">1</span>, <span class="num">1</span>, <span class="num">0</span>).<span class="fn">normalize</span>();

<span class="comment">// 2. 从轴和角创建四元数</span>
<span class="kw">const</span> q = <span class="kw">new</span> THREE.<span class="fn">Quaternion</span>();
q.<span class="fn">setFromAxisAngle</span>(axis, Math.PI / <span class="num">3</span>);

<span class="comment">// 3. 应用到物体</span>
cube.quaternion.<span class="fn">copy</span>(q);</code></pre>
          </div>
          <div class="code-result">
            <div class="mini-scene" id="mini-scene" aria-label="代码执行效果"></div>
            <div class="result-meta"><span>LIVE RESULT</span><p>绕轴 <b>(1, 1, 0)</b> 旋转 <b>60°</b></p></div>
          </div>
        </div>

        <div class="benefit-grid reveal">
          <article><span>01</span><h3>没有死锁</h3><p>姿态不依赖三根轴的嵌套关系。</p></article>
          <article><span>02</span><h3>平滑插值</h3><p>SLERP 能自然地产生匀速转向。</p></article>
          <article><span>03</span><h3>组合高效</h3><p>四元数相乘即可连接多个旋转。</p></article>
          <article><span>04</span><h3>数值稳定</h3><p>归一化后容易保持有效旋转。</p></article>
        </div>
      </div>
    </section>

    <section class="closing section-shell reveal">
      <div class="closing-mark">Q</div>
      <div>
        <span class="eyebrow"><span></span> YOU MADE IT</span>
        <h2>现在，你不必“害怕”<br><em>四元数了。</em></h2>
        <p>记住最重要的图景：<strong>一根轴，一个角度，一个单位四元数。</strong></p>
      </div>
      <a href="#top" class="back-top" aria-label="返回顶部">↑</a>
    </section>
  </main>

  <footer>
    <span>Quaternion · Interactive Guide</span>
    <span>Built with Three.js</span>
  </footer>
`;

const colors = {
  ink: 0x171713,
  paper: 0xf2efe7,
  orange: 0xe9572b,
  coral: 0xf06a42,
  blue: 0x315bff,
  lime: 0xd4f43b,
  dim: 0x77766f,
};

let motionEnabled = true;
const scenes = [];

function makeRenderer(canvas, alpha = true) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

function fitRenderer(renderer, camera) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== Math.floor(width * renderer.getPixelRatio()) || canvas.height !== Math.floor(height * renderer.getPixelRatio())) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function lineBetween(a, b, color, opacity = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
  return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }));
}

function createArrow(direction, origin, length, color, headLength = .16, headWidth = .09) {
  return new THREE.ArrowHelper(direction.clone().normalize(), origin, length, color, headLength, headWidth);
}

// Hero: a tactile abstract model connecting plane and spatial rotation.
function initHero() {
  const canvas = document.querySelector('#hero-canvas');
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(colors.paper, .035);
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.set(5.4, 4, 6.5);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 10;

  const group = new THREE.Group();
  group.rotation.set(-.15, .25, .05);
  scene.add(group);

  const plane = new THREE.Mesh(
    new THREE.CircleGeometry(2.25, 64),
    new THREE.MeshBasicMaterial({ color: 0xe8e4da, transparent: true, opacity: .72, side: THREE.DoubleSide })
  );
  plane.rotation.x = -Math.PI / 2;
  group.add(plane);

  const grid = new THREE.GridHelper(4.5, 8, 0xaaa69d, 0xd6d1c5);
  grid.material.transparent = true;
  grid.material.opacity = .7;
  group.add(grid);

  const ringMat = new THREE.MeshBasicMaterial({ color: colors.orange, transparent: true, opacity: .9 });
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.55, .018, 8, 96), ringMat);
  orbit.rotation.x = Math.PI / 2;
  orbit.rotation.y = -.35;
  group.add(orbit);

  group.add(createArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-2.3, .01, 0), 4.6, colors.ink, .12, .07));
  group.add(createArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1.2, 0), 3.9, colors.blue, .18, .1));
  group.add(createArrow(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, .01, 2.3), 4.6, colors.ink, .12, .07));

  const vectorPivot = new THREE.Group();
  vectorPivot.add(createArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, .06, 0), 1.75, colors.orange, .24, .13));
  group.add(vectorPivot);

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(.13, 24, 24), new THREE.MeshBasicMaterial({ color: colors.orange }));
  sphere.position.set(1.75, .06, 0);
  vectorPivot.add(sphere);

  const dotted = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, .01, 4, 84),
    new THREE.MeshBasicMaterial({ color: 0xaaa69d, transparent: true, opacity: .5 })
  );
  dotted.rotation.set(.6, .25, -.4);
  group.add(dotted);

  function render(t) {
    fitRenderer(renderer, camera);
    if (motionEnabled) {
      vectorPivot.rotation.y = -t * .00042;
      dotted.rotation.z = t * .00009;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  scenes.push(render);
}

// Complex plane, drawn entirely in Three.js with a responsive orthographic camera.
function initComplex() {
  const canvas = document.querySelector('#complex-canvas');
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-3.2, 3.2, 2.65, -2.65, .1, 20);
  camera.position.z = 5;

  const gridGroup = new THREE.Group();
  scene.add(gridGroup);
  for (let n = -3; n <= 3; n += .5) {
    const major = Number.isInteger(n);
    gridGroup.add(lineBetween(new THREE.Vector3(n, -2.6, 0), new THREE.Vector3(n, 2.6, 0), major ? 0xbeb9ae : 0xded9cf, major ? .6 : .5));
    gridGroup.add(lineBetween(new THREE.Vector3(-3.2, n, 0), new THREE.Vector3(3.2, n, 0), major ? 0xbeb9ae : 0xded9cf, major ? .6 : .5));
  }
  scene.add(createArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-3, 0, .1), 6, colors.ink, .12, .07));
  scene.add(createArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -2.45, .1), 4.9, colors.ink, .12, .07));

  const circle = new THREE.Mesh(
    new THREE.RingGeometry(1.79, 1.81, 96),
    new THREE.MeshBasicMaterial({ color: 0xaaa59a, transparent: true, opacity: .7, side: THREE.DoubleSide })
  );
  scene.add(circle);

  const baseArrow = createArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, .25), 1.8, colors.blue, .2, .11);
  baseArrow.line.material.transparent = true;
  baseArrow.line.material.opacity = .3;
  baseArrow.cone.material.transparent = true;
  baseArrow.cone.material.opacity = .3;
  scene.add(baseArrow);

  const rotated = new THREE.Group();
  const activeArrow = createArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, .3), 1.8, colors.orange, .22, .13);
  rotated.add(activeArrow);
  const point = new THREE.Mesh(new THREE.CircleGeometry(.09, 24), new THREE.MeshBasicMaterial({ color: colors.orange }));
  point.position.set(1.8, 0, .32);
  rotated.add(point);
  scene.add(rotated);

  const arcGeometry = new THREE.BufferGeometry();
  const arc = new THREE.Line(arcGeometry, new THREE.LineBasicMaterial({ color: colors.orange }));
  scene.add(arc);

  const slider = document.querySelector('#angle-slider');
  const angleOut = document.querySelector('#angle-output');
  const cosOut = document.querySelector('#cos-value');
  const sinOut = document.querySelector('#sin-value');
  let angle = THREE.MathUtils.degToRad(Number(slider.value));

  function update() {
    angle = THREE.MathUtils.degToRad(Number(slider.value));
    rotated.rotation.z = angle;
    const points = [];
    const segments = Math.max(3, Math.ceil(Math.abs(angle) * 24));
    for (let i = 0; i <= segments; i++) {
      const a = angle * i / segments;
      points.push(new THREE.Vector3(Math.cos(a) * .55, Math.sin(a) * .55, .2));
    }
    arc.geometry.dispose();
    arc.geometry = new THREE.BufferGeometry().setFromPoints(points);
    angleOut.textContent = `${slider.value}°`;
    cosOut.textContent = Math.cos(angle).toFixed(2);
    sinOut.textContent = Math.sin(angle).toFixed(2);
  }
  slider.addEventListener('input', update);
  update();

  function render() {
    fitRenderer(renderer, camera);
    renderer.render(scene, camera);
  }
  scenes.push(render);
}

function createRing(radius, tube, color) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 10, 80),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .92 })
  );
}

function initGimbal() {
  const canvas = document.querySelector('#gimbal-canvas');
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.set(5.3, 3.4, 6.6);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 5;
  controls.maxDistance = 9;

  const light = new THREE.HemisphereLight(0xffffff, 0x25251f, 2.8);
  scene.add(light);
  const key = new THREE.DirectionalLight(0xffffff, 3.4);
  key.position.set(3, 6, 5);
  scene.add(key);

  const root = new THREE.Group();
  scene.add(root);
  const ringY = createRing(2, .035, colors.lime);
  ringY.rotation.x = Math.PI / 2;
  root.add(ringY);
  const pivotX = new THREE.Group();
  root.add(pivotX);
  const ringX = createRing(1.65, .035, colors.coral);
  ringX.rotation.y = Math.PI / 2;
  pivotX.add(ringX);
  const pivotZ = new THREE.Group();
  pivotX.add(pivotZ);
  const ringZ = createRing(1.32, .035, colors.blue);
  pivotZ.add(ringZ);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, .72, 2.05),
    new THREE.MeshStandardMaterial({ color: 0xe8e4d8, roughness: .5, metalness: .05 })
  );
  pivotZ.add(cube);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(.22, .65, 4), new THREE.MeshStandardMaterial({ color: colors.orange }));
  nose.rotation.x = Math.PI / 2;
  nose.position.z = 1.3;
  cube.add(nose);

  const axis = createArrow(new THREE.Vector3(1, 1, 0).normalize(), new THREE.Vector3(-2, -2, 0), 4, colors.lime, .22, .13);
  axis.visible = false;
  scene.add(axis);

  let mode = 'euler';
  let demoStart = 0;
  const modeButtons = [...document.querySelectorAll('.mode-switch button')];
  const status = document.querySelector('#mode-status');
  const detail = document.querySelector('#mode-detail');

  function setMode(next) {
    mode = next;
    demoStart = performance.now();
    modeButtons.forEach((button) => button.classList.toggle('active', button.dataset.mode === mode));
    const quaternion = mode === 'quaternion';
    ringY.visible = !quaternion;
    ringX.visible = !quaternion;
    ringZ.visible = !quaternion;
    axis.visible = quaternion;
    status.textContent = quaternion ? '一根轴 · 一次旋转' : '三层旋转轴';
    detail.textContent = quaternion ? '不依赖欧拉角顺序' : '旋转顺序：Y → X → Z';
  }
  modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
  document.querySelector('#gimbal-button').addEventListener('click', () => {
    setMode('euler');
    demoStart = performance.now();
    canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function render(t) {
    fitRenderer(renderer, camera);
    if (motionEnabled) {
      const elapsed = (t - demoStart) * .001;
      if (mode === 'euler') {
        root.rotation.y = Math.sin(elapsed * .45) * .55;
        pivotX.rotation.x = Math.min(Math.PI / 2, elapsed * .55);
        pivotZ.rotation.z = Math.sin(elapsed * .9) * .65;
      } else {
        const q1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 1, 0).normalize(), Math.sin(elapsed * .7) * 1.7);
        pivotZ.quaternion.slerp(q1, .08);
      }
    }
    controls.update();
    renderer.render(scene, camera);
  }
  scenes.push(render);
}

function initMiniScene() {
  const host = document.querySelector('#mini-scene');
  const canvas = document.createElement('canvas');
  host.appendChild(canvas);
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 50);
  camera.position.set(4, 3, 5.5);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x20201c, 3));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 5, 4);
  scene.add(light);
  const grid = new THREE.GridHelper(5, 10, 0x76766c, 0x30302c);
  grid.material.transparent = true;
  grid.material.opacity = .45;
  scene.add(grid);
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 1.55, 1.55),
    new THREE.MeshStandardMaterial({ color: colors.coral, roughness: .5, metalness: .08 })
  );
  scene.add(cube);
  const axisDirection = new THREE.Vector3(1, 1, 0).normalize();
  scene.add(createArrow(axisDirection, axisDirection.clone().multiplyScalar(-2), 4, colors.lime, .2, .1));
  const targetQ = new THREE.Quaternion().setFromAxisAngle(axisDirection, Math.PI / 3);
  let start = performance.now();

  function render(t) {
    fitRenderer(renderer, camera);
    if (motionEnabled) {
      const pulse = (Math.sin((t - start) * .0012) + 1) / 2;
      cube.quaternion.identity().slerp(targetQ, pulse);
    }
    renderer.render(scene, camera);
  }
  scenes.push(render);
}

initHero();
initComplex();
initGimbal();
initMiniScene();

function animate(time) {
  scenes.forEach((render) => render(time));
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

document.querySelector('#toggle-motion').addEventListener('click', (event) => {
  motionEnabled = !motionEnabled;
  event.currentTarget.innerHTML = motionEnabled
    ? '<span class="play-dot">Ⅱ</span> 暂停动画'
    : '<span class="play-dot">▶</span> 继续动画';
});

document.querySelector('#copy-code').addEventListener('click', async (event) => {
  const code = `const axis = new THREE.Vector3(1, 1, 0).normalize();\nconst q = new THREE.Quaternion();\nq.setFromAxisAngle(axis, Math.PI / 3);\ncube.quaternion.copy(q);`;
  await navigator.clipboard.writeText(code);
  event.currentTarget.textContent = '已复制 ✓';
  setTimeout(() => { event.currentTarget.textContent = '复制代码'; }, 1600);
});

const progress = document.querySelector('#reading-progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, scrollY / max * 100)}%`;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

window.addEventListener('resize', () => scenes.forEach((render) => render(performance.now())));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  motionEnabled = false;
}
