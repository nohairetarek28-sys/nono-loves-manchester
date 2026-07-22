// 1. إعداد المشهد والكاميرا
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 4, 10);

// 2. إعداد المصير (Renderer)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. أداة التحكم (OrbitControls)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 14; 
controls.minDistance = 2;
controls.maxPolarAngle = Math.PI / 2 + 0.1; 

// 4. الإضاءة 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffeedd, 1.5, 50);
pointLight.position.set(0, 8, 0);
scene.add(pointLight);

// 5. بناء هيكل المتحف (الأرضية والسقف والحوائط)
const floorGeo = new THREE.PlaneGeometry(20, 30);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x8B0000, roughness: 0.9 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const ceilingGeo = new THREE.PlaneGeometry(20, 30);
const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 10;
scene.add(ceiling);

const wallMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 1 });

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMat);
backWall.position.set(0, 5, -15);
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), wallMat);
leftWall.position.set(-10, 5, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), wallMat);
rightWall.position.set(10, 5, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// 6. تحميل الصور المحلية من فولدر assets
const textureLoader = new THREE.TextureLoader();

// الشعار (في الواجهة)
const logoMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('assets/logo.png'), transparent: true })
);
logoMesh.position.set(0, 6, -14.9);
scene.add(logoMesh);

// رونالدو (يسار - بالخلف)
const ronaldoMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 5.5),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('assets/ronaldo.png') })
);
ronaldoMesh.position.set(-9.9, 5, -5);
ronaldoMesh.rotation.y = Math.PI / 2;
scene.add(ronaldoMesh);

// جيجز (يسار - بالأمام)
const giggsMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 5.5),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('assets/giggs.png') })
);
giggsMesh.position.set(-9.9, 5, 4);
giggsMesh.rotation.y = Math.PI / 2;
scene.add(giggsMesh);

// برونو (يمين - بالخلف)
const brunoMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 5.5),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('assets/bruno.png') })
);
brunoMesh.position.set(9.9, 5, -5);
brunoMesh.rotation.y = -Math.PI / 2;
scene.add(brunoMesh);

// روني (يمين - بالأمام)
const rooneyMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 5.5),
    new THREE.MeshBasicMaterial({ map: textureLoader.load('assets/rooney.png') })
);
rooneyMesh.position.set(9.9, 5, 4);
rooneyMesh.rotation.y = -Math.PI / 2;
scene.add(rooneyMesh);

// 7. دالة بناء الكؤوس الذهبية
// ==========================================
// 7. بناء الكؤوس المخصصة (دوري إنجليزي - أبطال - كرة ذهبية)
// ==========================================

// الخامات المستخدمة في الكؤوس
const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1, roughness: 0.2 });
const silverMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, metalness: 1, roughness: 0.1 });
const darkGreenMat = new THREE.MeshStandardMaterial({ color: 0x002200, roughness: 0.8 }); // لقاعدة الدوري الإنجليزي
const darkRockMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }); // لقاعدة الكرة الذهبية

// 1. دالة بناء كأس الدوري الإنجليزي (Premier League)
function createPremierLeague() {
    const group = new THREE.Group();
    
    // القاعدة الخضراء
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32), darkGreenMat);
    base.position.y = 0.15;
    group.add(base);

    // جسم الكأس الفضي
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.2, 32), silverMat);
    body.position.y = 0.9;
    group.add(body);

    // التاج الذهبي فوق الكأس
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.2, 0.3, 32), goldMat);
    crown.position.y = 1.65;
    group.add(crown);

    // الأيادي الجانبية (مقابض الكأس)
    const handleGeo = new THREE.TorusGeometry(0.4, 0.05, 16, 32, Math.PI); 
    
    const leftHandle = new THREE.Mesh(handleGeo, silverMat);
    leftHandle.position.set(-0.35, 1.0, 0);
    leftHandle.rotation.z = Math.PI / 2;
    group.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeo, silverMat);
    rightHandle.position.set(0.35, 1.0, 0);
    rightHandle.rotation.z = -Math.PI / 2;
    group.add(rightHandle);

    return group;
}

// 2. دالة بناء دوري أبطال أوروبا (Champions League - ذات الأذنين)
function createChampionsLeague() {
    const group = new THREE.Group();
    
    // القاعدة الفضية
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.3, 32), silverMat);
    base.position.y = 0.15;
    group.add(base);

    // الرقبة
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.6, 32), silverMat);
    stem.position.y = 0.6;
    group.add(stem);

    // الوعاء العلوي
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.2, 0.8, 32), silverMat);
    bowl.position.y = 1.3;
    group.add(bowl);

    // الأذنين الكبار
    const earGeo = new THREE.TorusGeometry(0.45, 0.05, 16, 32);
    
    const leftEar = new THREE.Mesh(earGeo, silverMat);
    leftEar.position.set(-0.55, 1.4, 0);
    leftEar.rotation.y = Math.PI / 2;
    leftEar.scale.set(1, 1.5, 1); // مط الشكل بالطول
    group.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, silverMat);
    rightEar.position.set(0.55, 1.4, 0);
    rightEar.rotation.y = Math.PI / 2;
    rightEar.scale.set(1, 1.5, 1); // مط الشكل بالطول
    group.add(rightEar);

    return group;
}

// 3. دالة بناء الكرة الذهبية (Ballon d'Or)
function createBallonDor() {
    const group = new THREE.Group();
    
    // القاعدة الداكنة (صخرة)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.4, 32), darkRockMat);
    base.position.y = 0.2;
    group.add(base);

    // الكرة الذهبية اللامعة
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), goldMat);
    ball.position.y = 0.9;
    group.add(ball);

    return group;
}

// ==========================================
// توزيع القواعد والكؤوس في القاعة
// ==========================================

const pedestalMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
const pedestalGeo = new THREE.BoxGeometry(1.5, 2.5, 1.5);
const positions = [-4, 0, 4]; // إحداثيات القواعد (يسار، وسط، يمين)

// بناء القواعد الـ 3
for(let i = 0; i < 3; i++) {
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(positions[i], 1.25, -5);
    scene.add(pedestal);
}

// 1. وضع كأس الدوري الإنجليزي (يسار)
const plTrophy = createPremierLeague();
plTrophy.scale.set(0.7, 0.7, 0.7);
plTrophy.position.set(-4, 2.5, -5);
scene.add(plTrophy);

// 2. وضع دوري أبطال أوروبا (في المنتصف)
const uclTrophy = createChampionsLeague();
uclTrophy.scale.set(0.7, 0.7, 0.7);
uclTrophy.position.set(0, 2.5, -5);
scene.add(uclTrophy);

// 3. وضع الكرة الذهبية (يمين)
const ballonDor = createBallonDor();
ballonDor.scale.set(0.8, 0.8, 0.8);
ballonDor.position.set(4, 2.5, -5);
scene.add(ballonDor);

// 8. حلقة التحريك والتحديث
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
animate();

// تجاوب الأبعاد مع تغيير حجم الشاشة
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});