window.addEventListener('load', function() {
    // --- 1. تعريف العناصر ---
    const mainMenuScreen = document.getElementById('main-menu-screen');
    const difficultyScreen = document.getElementById('difficulty-screen');
    const settingsScreen = document.getElementById('settings-screen');
    const gameCanvas = document.getElementById('game-canvas');
    
    const startBtn = document.getElementById('start-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const backBtns = document.querySelectorAll('.btn-back');
    const difficultyBtns = document.querySelectorAll('.btn-difficulty');
    
    const languageToggle = document.getElementById('language-toggle');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const langText = document.querySelector('.lang-text');

    // --- 2. إدارة اللغة ---
    const translations = {
        en: {
            gameTitle: "Super Runner",
            start: "Start",
            selectDifficulty: "Select Difficulty",
            easy: "Easy",
            normal: "Normal",
            hard: "Hard",
            settings: "Settings",
            language: "Language",
            music: "Music",
            back: "Back",
        },
        ar: {
            gameTitle: "العداء الخارق",
            start: "ابدأ",
            selectDifficulty: "اختر المستوى",
            easy: "سهل",
            normal: "عادي",
            hard: "صعب",
            settings: "الإعدادات",
            language: "اللغة",
            music: "الموسيقى",
            back: "رجوع",
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langText.textContent = lang === 'ar' ? 'AR' : 'EN';
        
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.dataset.lang;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        localStorage.setItem('gameLanguage', lang);
    }

    // --- 3. إدارة الموسيقى ---
    function toggleMusic(play) {
        if (play) {
            backgroundMusic.play().catch(e => console.log("User interaction needed to play music."));
        } else {
            backgroundMusic.pause();
        }
        localStorage.setItem('musicEnabled', play);
    }
    
    // --- 4. إدارة التنقل بين الشاشات ---
    function showScreen(screenToShow) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        screenToShow.classList.add('active');
    }

    startBtn.addEventListener('click', () => showScreen(difficultyScreen));
    settingsBtn.addEventListener('click', () => showScreen(settingsScreen));
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => showScreen(mainMenuScreen));
    });

    // --- 5. بدء اللعبة ---
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const difficulty = btn.dataset.difficulty;
            console.log(`Starting game with difficulty: ${difficulty}`);
            // إخفاء كل الواجهات وإظهار لوحة اللعبة
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            gameCanvas.style.display = 'block';
            // هنا سنستدعي دالة بدء اللعبة الفعلية
            // startGame(difficulty);
        });
    });

    // --- 6. التحكم في الإعدادات ---
    languageToggle.addEventListener('change', (e) => {
        const lang = e.target.checked ? 'en' : 'ar';
        setLanguage(lang);
    });

    musicToggle.addEventListener('change', (e) => {
        toggleMusic(e.target.checked);
    });

    // --- 7. التحميل الأولي للإعدادات ---
    function initializeSettings() {
        const savedLang = localStorage.getItem('gameLanguage') || 'ar';
        languageToggle.checked = savedLang === 'en';
        setLanguage(savedLang);

        const musicEnabled = JSON.parse(localStorage.getItem('musicEnabled') !== 'false'); // true by default
        musicToggle.checked = musicEnabled;
        // لا نشغل الموسيقى تلقائياً، ننتظر أول ضغطة
    }
    
    initializeSettings();
});