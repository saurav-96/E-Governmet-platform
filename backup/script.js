document.addEventListener('DOMContentLoaded', () => {

    /* --- INTRO PRELOADER --- */
    setTimeout(() => {
        const preloader = document.getElementById('intro-preloader');
        if(preloader) preloader.classList.add('hidden');
    }, 2500);

    /* --- DARK THEME TOGGLE --- */
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeBtn.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    /* --- LANGUAGE TOGGLE --- */
    const langToggleBtn = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');
    let currentLang = 'EN';
    
    langToggleBtn?.addEventListener('click', () => {
        currentLang = currentLang === 'EN' ? 'NP' : 'EN';
        currentLangSpan.textContent = currentLang;
        
        const elementsToTranslate = document.querySelectorAll('[data-lang-en]');
        elementsToTranslate.forEach(el => {
            const translatedText = currentLang === 'EN' ? el.getAttribute('data-lang-en') : el.getAttribute('data-lang-np');
            
            // If the element has internal HTML (like the hero title with <span>), assign to innerHTML
            if (el.innerHTML.includes('<') && el.innerHTML.includes('span')) {
                el.innerHTML = translatedText;
            } else {
                el.textContent = translatedText;
            }
        });
    });

    /* --- MOBILE MENU --- */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    mobileBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    /* --- AI CHATBOT LOGIC --- */
    const chatWidget = document.getElementById('ai-chat-widget');
    const closeChatBtn = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat');

    const triggerChat = () => chatWidget.classList.remove('hidden');
    
    document.getElementById('ai-trigger-nav')?.addEventListener('click', triggerChat);
    document.getElementById('ai-trigger-hero')?.addEventListener('click', triggerChat);
    
    closeChatBtn?.addEventListener('click', () => {
        chatWidget.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'm') {
            e.preventDefault();
            chatWidget.classList.toggle('hidden');
            if(!chatWidget.classList.contains('hidden')) chatInput.focus();
        }
    });

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleSend = () => {
        const text = chatInput.value.trim();
        if(!text) return;
        
        addMessage(text, 'user');
        chatInput.value = '';
        
        // Mock AI thinking
        setTimeout(() => {
            addMessage("I am a simulated AI assistant for this demo. To access real-time data, please ensure backend services are connected to your government dashboard.", 'bot');
        }, 1000);
    };

    sendChatBtn?.addEventListener('click', handleSend);
    chatInput?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleSend();
    });

    /* --- 3D NEPAL RELATED BACKGROUND (THREE.JS PARTICLES) --- */
    if (window.THREE) {
        init3DCanvas();
    }
});

function init3DCanvas() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create particles resembling stars/nodes
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    
    const posArray = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color(0x3B82F6); 
    const redColor = new THREE.Color(0xEF4444);  
    const whiteColor = new THREE.Color(0xFFFFFF); 

    for(let i = 0; i < particleCount * 3; i+=3) {
        // Random spread
        posArray[i] = (Math.random() - 0.5) * 800;     // x
        posArray[i+1] = (Math.random() - 0.5) * 800;   // y
        posArray[i+2] = (Math.random() - 0.5) * 800;   // z

        // Random assign national colors
        let r = Math.random();
        let color = r > 0.6 ? blueColor : (r > 0.3 ? redColor : whiteColor);
        
        colorsArray[i] = color.r;
        colorsArray[i+1] = color.g;
        colorsArray[i+2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    // Creating particle material
    const particleMaterial = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.1;
        mouseY = (event.clientY - windowHalfY) * 0.1;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Slow rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        // Mouse Parallax effect
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
    }
    animate();

    // Window Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
