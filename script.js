// Реплики ИИ
const isGuest = new URLSearchParams(window.location.search).get('guest') === 'true';
if (isGuest) document.body.classList.add('guest-mode');

const aiScripts = {
    1: "Здравствуйте, друзья! Сегодня мы отправимся в путешествие во времени. Мы перенесемся в Алматы 30-х годов прошлого века, чтобы увидеть город-сад глазами писателя Юрия Домбровского. Добро пожаловать на открытый урок 7 «А» класса!",
    2: "Давайте настроимся на работу. Посмотрите на экран. Улыбнитесь друг другу, почувствуйте поддержку ваших одноклассников. С хорошим настроением любые задачи по плечу!",
    3: "Пришло время разделиться на две команды. Выберите одну из карточек на столе. Если вам достался циркуль — вы «Архитекторы». А если компас — вы «Путешественники».",
    4: "Прежде чем приступить к заданиям, вспомним правила работы в команде. Уважайте мнение каждого, говорите вполголоса, будьте активны и умейте слушать. Только вместе мы сможем достичь отличного результата!",
    5: "Прежде чем мы начнем основную часть, возьмите свои физические оценочные листы, которые лежат на партах. Пожалуйста, честно оценивайте свой личный вклад на каждом этапе урока.",
    6: "Давайте проверим домашнее задание. На прошлом уроке мы изучали роман Владимира Обручева «Земля Санникова». Вы должны были составить «Дерево предсказаний» и сравнить ваши варианты развития событий с концовкой автора. Кто хочет поделиться?",
    7: "А теперь перейдем к главной теме. Посмотрите на старую Алма-Ату. Юрий Домбровский в своем романе 'Хранитель древностей' описывает удивительный город-сад, где сплелись воедино архитектура природы и творение человека.",
    8: "Главный герой прибывает из хмурой весенней Москвы. Посмотрите на экран. Домбровский пишет, что он 'очутился среди южного лета'. Город встретил его буйством красок и зелени.",
    9: "Среди этого зеленого моря возвышается Вознесенский кафедральный собор. Инженер Андрей Зенков построил это чудо из дерева. Это здание выстояло в страшном землетрясении 1911 года!",
    10: "Опираясь на текст, давайте составим ассоциативный куст к понятию 'Алматы'. Какие слова и образы возникают у вас? Нажимайте на ветви, чтобы открыть понятия.",
    11: "А теперь пришло время небольшой физминутки! Давайте разомнемся.",
    12: "А теперь давайте закрепим знания. Откройте рабочие тетради и выполните письменное задание на экране. На это у вас есть 5 минут.",
    13: "Время для творческой работы! Сейчас вы будете защищать свои постеры на тему 'Алматы — город-сад'. У каждой команды есть заданное время. Удачи!",
    14: "Наш урок подошел к концу. Выберите на доске листик, который отражает ваше настроение, и запишите домашнее задание. До новых встреч!"
};

let currentSlide = 1;
const totalSlides = 14;
let isSpeaking = false;
let currentAudio = null; // Хранит текущий объект Audio

// Таймер
let timerInterval = null;
let defaultTimerMinutes = 15;
let timerTime = defaultTimerMinutes * 60; 
let initialTime = timerTime;

// Preloader
const resourcesToPreload = [
    'images/bg_almaty.jpg',
    'images/old_almaty1.jpg',
    'images/old_almaty2.jpg',
    'images/homework.jpg',
    'images/zenkov.jpg',
    'images/almaty_green_tiers.jpg',
    'video/break.mp4',
    'video/физминутка.mp4',
    'audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3', 'audio/4.mp3',
    'audio/5.mp3', 'audio/6.mp3', 'audio/7.mp3', 'audio/8.mp3',
    'audio/9.mp3', 'audio/10.mp3', 'audio/11.mp3', 'audio/12.mp3', 'audio/13.mp3',
    'audio/time_warning.mp3', 'audio/time_up.mp3',
    'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3'
];

let loadedCount = 0;

function initPreloader() {
    const total = resourcesToPreload.length;
    if (total === 0) return lessonReady();

    resourcesToPreload.forEach(src => {
        fetch(src, { cache: "force-cache" })
            .then(response => {
                if(!response.ok) throw new Error("Network error");
                return response.blob();
            })
            .then(() => assetLoaded(total))
            .catch(e => {
                console.warn(`Failed to preload ${src}`, e);
                assetLoaded(total); // Не блокируем запуск при ошибке
            });
    });
}

function assetLoaded(total) {
    loadedCount++;
    const percent = Math.round((loadedCount / total) * 100);
    const bar = document.getElementById('preloader-bar');
    const text = document.getElementById('preloader-text');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `Загрузка ресурсов: ${percent}%`;
    
    if (loadedCount >= total) {
        lessonReady();
    }
}

function lessonReady() {
    const text = document.getElementById('preloader-text');
    const btn = document.getElementById('preloader-start-btn');
    if (text) text.textContent = "Ресурсы загружены! Урок готов.";
    if (btn) btn.style.display = 'block';
    
    // Генерируем QR код для гостей
    const qrImg = document.getElementById('guest-qr');
    if (qrImg) {
        let currentUrl = window.location.origin + window.location.pathname.replace('index.html', '') + 'guest.html';
        if(window.location.protocol === 'file:') {
            currentUrl = "https://pwaaai.vercel.app/guest.html"; 
        }
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}&color=2A9D8F`;
    }
    
    if (isGuest) {
        startLesson();
    }
}

function startLesson() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            preloader.style.display = 'none';
            updateSlides();
        }, 500);
    } else {
        updateSlides();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    updateTimerDisplay(); // Устанавливаем таймер по умолчанию
    
    // Управление с клавиатуры
    document.addEventListener('keydown', handleKeyPress);
});

// Обработка клавиатуры
function handleKeyPress(e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
    } else if (e.key === ' ' || e.key === 'Enter') {
        // Пробел - запуск/пауза ИИ (если активна не кнопка ввода)
        if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            playCurrentAiAudio();
        }
    } else if (e.key.toLowerCase() === 'f') {
        toggleFullScreen();
    }
}

// Полноэкранный режим
function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// Полноэкранный режим для видео по двойному клику
function toggleVideoFullScreen(vid) {
    if (!document.fullscreenElement &&    
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  
        if (vid.requestFullscreen) {
            vid.requestFullscreen();
        } else if (vid.msRequestFullscreen) {
            vid.msRequestFullscreen();
        } else if (vid.mozRequestFullScreen) {
            vid.mozRequestFullScreen();
        } else if (vid.webkitRequestFullscreen) {
            vid.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        // Рестарт анимаций путем перерисовки
        const oldSlide = document.getElementById(`slide-${currentSlide}`);
        oldSlide.classList.remove('active');
        
        currentSlide++;
        updateSlides();
        stopAiAudio();
        
        if(currentSlide === 11) {
            resetTimer(); // Сброс при входе на слайд таймера
        } else if (timerInterval) {
            pauseTimer();
        }
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        const oldSlide = document.getElementById(`slide-${currentSlide}`);
        oldSlide.classList.remove('active');
        
        currentSlide--;
        updateSlides();
        stopAiAudio();
        
        if (timerInterval) pauseTimer();
    }
}

function updateSlides() {
    // Делаем небольшую задержку перед показом нового, чтобы анимации в CSS сработали красиво
    setTimeout(() => {
        const activeSlide = document.getElementById(`slide-${currentSlide}`);
        if (activeSlide) {
            activeSlide.classList.add('active');
        }
    }, 50);
    
    document.getElementById('current-slide').textContent = currentSlide;

    // Фоновая музыка
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.15; // Пониженная громкость
        if (currentSlide === 2 || currentSlide === 13) {
            bgMusic.play().catch(e => console.log('Autoplay prevented', e));
        } else {
            bgMusic.pause();
        }
    }

    
    const bubble = document.getElementById('ai-bubble');
    const aiText = document.getElementById('ai-text');
    aiText.textContent = aiScripts[currentSlide];
    bubble.classList.remove('show'); 
}

// === ИИ ===
function showAiBubble(text) {
    const bubble = document.getElementById('ai-bubble');
    document.getElementById('ai-text').textContent = text;
    bubble.classList.add('show');
}

function hideAiBubble() {
    document.getElementById('ai-bubble').classList.remove('show');
}

function toggleAiMenu() {
    const bubble = document.getElementById('ai-bubble');
    if(bubble.classList.contains('show')) {
        hideAiBubble();
    } else {
        document.getElementById('ai-text').textContent = aiScripts[currentSlide];
        bubble.classList.add('show');
    }
}

let animationFrameId = null;

function updateTextProgress() {
    if (!currentAudio || !isSpeaking) return;
    
    const text = aiScripts[currentSlide];
    const el = document.getElementById('ai-text');
    
    const progress = (currentAudio.duration) ? (currentAudio.currentTime / currentAudio.duration) : 0;
    // Делаем появление текста на 25% быстрее, чем идет аудио
    const acceleratedProgress = Math.min(1.0, progress * 1.25);
    const charsToShow = Math.floor(text.length * acceleratedProgress);
    
    el.textContent = text.substring(0, charsToShow);
    
    animationFrameId = requestAnimationFrame(updateTextProgress);
}

function playCurrentAiAudio() {
    if (isSpeaking) {
        stopAiAudio();
        return;
    }

    const text = aiScripts[currentSlide];
    const bubble = document.getElementById('ai-bubble');
    
    if (isGuest) {
        document.getElementById('ai-text').textContent = text;
        bubble.classList.add('show');
        return; // Для гостей просто показываем текст, без аудио
    }

    document.getElementById('ai-text').textContent = ""; // Очищаем перед началом
    bubble.classList.add('show');
    
    // Используем готовые MP3 файлы
    currentAudio = new Audio(`audio/${currentSlide}.mp3`);
    
    isSpeaking = true;
    document.querySelector('.ai-avatar').classList.add('speaking');
    const icon = document.querySelector('.ai-action i');
    if(icon) {
        icon.classList.remove('fa-comment-dots');
        icon.classList.add('fa-stop');
    }

    // Синхронизация текста
    animationFrameId = requestAnimationFrame(updateTextProgress);

    currentAudio.onended = () => {
        document.getElementById('ai-text').textContent = text; // Убеждаемся, что весь текст показан
        setTimeout(() => {
            stopSpeakingVisuals();
            hideAiBubble();
        }, 1500); // Закрываем через 1.5 секунды после окончания
    };
    
    currentAudio.onerror = (e) => {
        console.error("Ошибка воспроизведения аудио:", e);
        document.getElementById('ai-text').textContent = text;
        stopSpeakingVisuals();
    };

    currentAudio.play().catch(e => {
        console.error("Автовоспроизведение заблокировано браузером", e);
        document.getElementById('ai-text').textContent = text;
        stopSpeakingVisuals();
    });
}

function stopSpeakingVisuals() {
    isSpeaking = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    const avatar = document.querySelector('.ai-avatar');
    if (avatar) avatar.classList.remove('speaking');
    const icon = document.querySelector('.ai-action i');
    if(icon) {
        icon.classList.remove('fa-stop');
        icon.classList.add('fa-comment-dots');
    }
}

function stopAiAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    // Если остановили вручную, покажем весь текст и оставим баббл открытым
    document.getElementById('ai-text').textContent = aiScripts[currentSlide];
    stopSpeakingVisuals();
}

// === Слайд 5: Интерактив ===
function revealBranch(element) {
    element.classList.toggle('revealed');
}

// === Слайд 6: Таймер ===
function adjustTimer(minutes) {
    if (timerInterval) return; // Нельзя менять на ходу
    defaultTimerMinutes += minutes;
    if (defaultTimerMinutes < 1) defaultTimerMinutes = 1;
    if (defaultTimerMinutes > 60) defaultTimerMinutes = 60;
    
    document.getElementById('timer-setting').textContent = defaultTimerMinutes;
    resetTimer();
}

function updateTimerDisplay() {
    const display = document.getElementById('timer-display');
    const bar = document.getElementById('timer-bar');
    
    const minutes = Math.floor(timerTime / 60);
    const seconds = timerTime % 60;
    
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Прогресс бар
    const percentage = (timerTime / initialTime) * 100;
    bar.style.width = `${percentage}%`;
    
    // Цвет при истечении
    if (timerTime <= 60 && initialTime > 60) {
        display.classList.add('warning');
        bar.classList.add('warning');
    } else {
        display.classList.remove('warning');
        bar.classList.remove('warning');
    }
}

function startTimer() {
    if (timerInterval) return; 
    
    // Если запускают когда 0, делаем ресет
    if (timerTime <= 0) resetTimer();
    
    document.getElementById('timer-icon').classList.add('running');
    
    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            updateTimerDisplay();
            
            // Триггер на 2 минуты (120 секунд)
            if (timerTime === 120) {
                showAiBubble("Внимание, команды! Осталось всего 2 минуты. Поторопитесь собрать все идеи на постере!");
                let warningAudio = new Audio('audio/time_warning.mp3');
                warningAudio.play().catch(e => {
                    if ('speechSynthesis' in window) {
                        let u = new SpeechSynthesisUtterance("Внимание, команды! Осталось всего 2 минуты. Поторопитесь!");
                        u.lang = "ru-RU";
                        window.speechSynthesis.speak(u);
                    }
                });
                setTimeout(hideAiBubble, 6000);
            }
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('timer-icon').classList.remove('running');
            
            // Таймер завершен
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
            audio.play().catch(e => console.log(e));
            
            // ИИ сообщает об окончании
            showAiBubble("Время закончилось! Пожалуйста, завершайте свою работу.");
            
            // Попытка воспроизвести аудио файл, если есть. Иначе - синтез речи.
            let endAudio = new Audio('audio/time_up.mp3');
            endAudio.play().catch(e => {
                if ('speechSynthesis' in window) {
                    let u = new SpeechSynthesisUtterance("Время закончилось! Пожалуйста, завершайте свою работу.");
                    u.lang = "ru-RU";
                    window.speechSynthesis.speak(u);
                }
            });
            
            setTimeout(hideAiBubble, 6000);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('timer-icon').classList.remove('running');
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerTime = defaultTimerMinutes * 60;
    initialTime = timerTime;
    
    document.getElementById('timer-icon').classList.remove('running');
    document.getElementById('timer-display').classList.remove('warning');
    document.getElementById('timer-bar').classList.remove('warning');
    
    updateTimerDisplay();
}

// === Слайд 7: Листья ===
function addLeaf(color) {
    const container = document.getElementById('tree-canvas');
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    
    let bgColor = '';
    if (color === 'green') bgColor = '#6A994E';
    if (color === 'yellow') bgColor = '#E9C46A';
    if (color === 'red') bgColor = '#E76F51';
    
    leaf.style.backgroundColor = bgColor;
    
    const leftPos = Math.random() * 80 + 10;
    const topPos = Math.random() * 60 + 10;
    
    leaf.style.left = `${leftPos}%`;
    leaf.style.top = `${topPos}%`;
    
    container.appendChild(leaf);
}


// Touch Support for mobile / guest mode
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
        nextSlide(); // swipe left
    }
    if (touchEndX > touchStartX + threshold) {
        prevSlide(); // swipe right
    }
}

// Auto-scaling presentation to maintain 16:9 aspect ratio
function resizePresentation() {
    const presentation = document.getElementById('presentation');
    if (!presentation) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const baseWidth = 1920;
    const baseHeight = 1080;
    
    const scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);
    
    presentation.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
}

window.addEventListener('resize', resizePresentation);
// Инициализируем при загрузке
document.addEventListener('DOMContentLoaded', resizePresentation);
resizePresentation();


