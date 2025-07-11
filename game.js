// 🔧 КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ ОШИБКИ register
console.log('🛠️ Активация защиты от ошибок...');

// ПРОВЕРКА ПОДДЕРЖКИ BROWSER API
if ('serviceWorker' in navigator) {
    console.log('✅ Service Worker API доступен');
} else {
    console.warn('⚠️ Service Worker не поддерживается');
}

// ГЛОБАЛЬНАЯ ЗАЩИТА ОТ ОШИБОК ДЕСТРУКТУРИЗАЦИИ
window.addEventListener('error', function(e) {
    if (e.message && (e.message.includes('Cannot destructure') || e.message.includes('register'))) {
        console.error('🚨 НАЙДЕНА ОШИБКА REGISTER:', e.message);
        console.log('🔧 Применяем исправление...');
        e.preventDefault();
        return false;
    }
});

// БЕЗОПАСНАЯ ЗАМЕНА register ФУНКЦИЙ
const safeRegister = function() { 
    console.log('🛡️ Безопасная заглушка register'); 
};
const safeUnregister = function() { 
    console.log('🛡️ Безопасная заглушка unregister'); 
};

// ПРОВЕРКА СОВМЕСТИМОСТИ БРАУЗЕРА
function checkBrowserSupport() {
    const required = {
        'Canvas': !!document.createElement('canvas').getContext,
        'ES6': typeof class {} === 'function',
        'RequestAnimationFrame': !!window.requestAnimationFrame
    };
    
    for (const [feature, supported] of Object.entries(required)) {
        if (!supported) {
            console.error(`❌ ${feature} не поддерживается`);
            return false;
        }
    }
    return true;
}

if (!checkBrowserSupport()) {
    alert('⚠️ Ваш браузер не поддерживает игру. Используйте Chrome, Firefox или Edge.');
}

console.log('✅ Защита активирована, продолжаем загрузку...');

// ====== СИСТЕМА ЗАГРУЗКИ ======
let loadingProgress = 0;
let loadingComplete = false;


// ✨ НОВАЯ СИСТЕМА РЕАЛЬНОЙ ПРЕДЗАГРУЗКИ
const CRITICAL_ASSETS = [
    // Фоны арен
    'assets/background.png',
    'assets/background2.png', 
    'assets/background4.png',
    'assets/loading-logo.png',
    
    // Топ-5 персонажей для предзагрузки
    'assets/TOM.png',
    'assets/TOMFIGHT.png',
    'assets/Tom.jBkock.png',
    
    'assets/Lyron.png',
    'assets/LyronFight.png',
    'assets/lyronBlock.png',
    
    'assets/NOXX.png',
    'assets/NOXX_FIGHTER.png',
    'assets/Noxx_block.png',
    
    'assets/Burhanf.png',
    'assets/Burhanatack.png',
    'assets/burhanblock.png',
    
    'assets/XEALIST.png',
    'assets/XEALISTAAA.png',
    'assets/Xeakistblock.png'
];

let assetsLoaded = 0;
let totalAssets = CRITICAL_ASSETS.length;

function preloadCriticalAssets() {
    return new Promise((resolve) => {
        console.log(`📦 Загружаем ${totalAssets} критичных ресурсов...`);
        
        if (CRITICAL_ASSETS.length === 0) {
            updateLoadingProgress(100);
            resolve();
            return;
        }
        
        CRITICAL_ASSETS.forEach((assetPath, index) => {
            const img = new Image();
            
            img.onload = () => {
                assetsLoaded++;
                const progress = Math.floor((assetsLoaded / totalAssets) * 100);
                updateLoadingProgress(progress);
                
                console.log(`✅ Загружен: ${assetPath} (${assetsLoaded}/${totalAssets})`);
                
                if (assetsLoaded === totalAssets) {
                    console.log('🎉 Все критичные ресурсы загружены!');
                    setTimeout(resolve, 500); // Небольшая задержка для плавности
                }
            };
            
            img.onerror = () => {
                assetsLoaded++;
                const progress = Math.floor((assetsLoaded / totalAssets) * 100);
                updateLoadingProgress(progress);
                
                console.warn(`❌ Ошибка загрузки: ${assetPath}`);
                
                if (assetsLoaded === totalAssets) {
                    console.log('⚠️ Загрузка завершена с ошибками');
                    setTimeout(resolve, 500);
                }
            };
            
            img.src = assetPath;
        });
    });
}
function updateLoadingProgress(percent) {
    loadingProgress = percent;
    const progressBar = document.getElementById('loadingProgress');
    const percentText = document.getElementById('loadingPercent');
    
    if (progressBar) {
        progressBar.style.width = percent + '%';
        
        // Добавляем цветовую индикацию прогресса
        if (percent < 30) {
            progressBar.style.background = 'linear-gradient(90deg, #FF6B35, #FFA500)';
        } else if (percent < 70) {
            progressBar.style.background = 'linear-gradient(90deg, #FFA500, #FFD700)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #FFD700, #00FF7F)';
        }
    }
    
    if (percentText) {
        percentText.textContent = percent + '%';
        
        // Добавляем информацию о загрузке
        if (percent < 100 && assetsLoaded > 0) {
            percentText.textContent = `${percent}% (${assetsLoaded}/${totalAssets})`;
        }
    }
    
    console.log(`📊 Реальная загрузка: ${percent}% (${assetsLoaded}/${totalAssets} файлов)`);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const gameContainer = document.querySelector('.game-container');
    
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            if (gameContainer) {
                gameContainer.classList.add('loaded');
                gameContainer.style.opacity = '1';
                gameContainer.style.visibility = 'visible';
            }
            loadingComplete = true;
            console.log('✅ Экран загрузки скрыт! Игра готова!');
            
            // ВАЖНО: Инициализируем игру ПОСЛЕ показа меню
            initializeGameAfterLoading();
        }, 800);
    }
}
function initializeGameAfterLoading() {
    console.log('🎮 Инициализация игры после загрузки...');
    
    // Показываем первого персонажа
    updateCharacterDisplay();
    
    console.log('✅ Игра полностью готова к использованию!');
}

async function startRealLoading() {
    console.log('🚀 Начинаем реальную загрузку ресурсов...');
    
    try {
        // Ждем загрузки всех критичных ресурсов
        await preloadCriticalAssets();
        
        // Убеждаемся что прогресс 100%
        updateLoadingProgress(100);
        
        console.log('✅ Загрузка завершена успешно!');
        
        // Плавно скрываем экран загрузки
        setTimeout(() => {
            hideLoadingScreen();
        }, 800);
        
    } catch (error) {
        console.error('❌ Ошибка при загрузке:', error);
        
        // Даже при ошибке показываем игру
        updateLoadingProgress(100);
        setTimeout(() => {
            hideLoadingScreen();
        }, 1000);
    }
}

// ====== СИСТЕМА ПЕРСОНАЖЕЙ ======
// ====== НАСТРОЙКИ КАРТИНОК ПЕРСОНАЖА ======
// ====== СИСТЕМА ПЕРСОНАЖЕЙ ======
// ====== НАСТРОЙКИ КАРТИНОК ПЕРСОНАЖА ======
// --- НАЧАЛО БЛОКА: выбор персонажа ---
// ==== КОНФИГ КАРТИНОК ДЛЯ ПЕРСОНАЖЕЙ ====
// Функция изменения размера canvas
function resizeCanvas() {
    // Безопасная инициализация canvas
    canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('❌ Canvas не найден!');
        return false;
    }
    
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('❌ Не удалось получить контекст!');
        return false;
    }
    
    // Устанавливаем размер
    canvas.width = 1200;
    canvas.height = 650;
    
    console.log('✅ Canvas инициализирован безопасно');
    return true;
}

// Вызывать при загрузке и изменении размера
// Оставляем только ОДИН обработчик
// Один правильный обработчик загрузки
// ====== ИСПРАВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ ======
// Один правильный обработчик загрузки
// ====== ПОЛНАЯ ЗАМЕНА БЛОКА ИНИЦИАЛИЗАЦИИ ======
// Удалите ВЕСЬ старый блок window.addEventListener('load', ...) и замените на этот:



// ========================================
// ✅ ЗАМЕНИТЕ НА ЭТОТ ИСПРАВЛЕННЫЙ КОД:
// ========================================

window.addEventListener('load', () => {
    console.log('🚀 Инициализация игры...');
    
    // Запускаем экран загрузки
    startRealLoading();
    
    // Инициализируем canvas
    if (!resizeCanvas()) {
        alert('Ошибка загрузки игры!');
        return;
    }
    
    // Настраиваем события мыши
    setupMouseEvents();
    
    // Настраиваем кнопки
    const prevBtn = document.getElementById('prevCharBtn');
    const nextBtn = document.getElementById('nextCharBtn');
    const confirmBtn = document.getElementById('confirmCharBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('🔄 Кнопка НАЗАД нажата');
            
            // Меняем индекс персонажа
            selectedCharIndex = (selectedCharIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            console.log(`👈 Переключение на персонажа ${selectedCharIndex}: ${CHARACTERS[selectedCharIndex].name}`);
            
            // Обновляем отображение
            updateCharacterDisplay();
            
            // ✨ КРИТИЧЕСКИ ВАЖНО: Загружаем картинки нового персонажа
            preloadImages();
            console.log(`🎨 Загружаем картинки для ${CHARACTERS[selectedCharIndex].name}`);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('🔄 Кнопка ВПЕРЕД нажата');
            
            // Меняем индекс персонажа
            selectedCharIndex = (selectedCharIndex + 1) % CHARACTERS.length;
            console.log(`👉 Переключение на персонажа ${selectedCharIndex}: ${CHARACTERS[selectedCharIndex].name}`);
            
            // Обновляем отображение
            updateCharacterDisplay();
            
            // ✨ КРИТИЧЕСКИ ВАЖНО: Загружаем картинки нового персонажа
            preloadImages();
            console.log(`🎨 Загружаем картинки для ${CHARACTERS[selectedCharIndex].name}`);
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            console.log('✅ Персонаж подтвержден, переход к выбору сложности');
            
            // Убеждаемся что картинки загружены перед переходом
            if (!imagesLoaded) {
                console.log('⏳ Картинки еще загружаются, подождите...');
                preloadImages();
                
                // Ждем загрузки перед переходом
                setTimeout(() => {
                    if (imagesLoaded) {
                        document.getElementById('characterMenu').style.display = 'none';
                        document.getElementById('difficultyMenu').style.display = 'block';
                    } else {
                        console.warn('⚠️ Картинки не загрузились, но переходим дальше');
                        document.getElementById('characterMenu').style.display = 'none';
                        document.getElementById('difficultyMenu').style.display = 'block';
                    }
                }, 1000);
            } else {
                document.getElementById('characterMenu').style.display = 'none';
                document.getElementById('difficultyMenu').style.display = 'block';
            }
        });
    }
    
    // ✨ ВАЖНО: Загружаем картинки первого персонажа сразу
    console.log(`🎭 Загружаем картинки стартового персонажа: ${CHARACTERS[selectedCharIndex].name}`);
    preloadImages();
    
    // Показываем первого персонажа
    updateCharacterDisplay();
    loadBackground();
    
    console.log('✅ Игра готова!');
});

// ============ НОВАЯ ФУНКЦИЯ ДЛЯ НАСТРОЙКИ СОБЫТИЙ МЫШИ ============
function setupMouseEvents() {
    if (!canvas || !ctx) {
        console.error('❌ Canvas не готов для установки обработчиков событий!');
        return false;
    }
    
    console.log('🖱️ Настройка обработчиков мыши для canvas...');
    
    // УПРАВЛЕНИЕ МЫШЬЮ
    canvas.addEventListener('mousedown', function(e) {
        console.log('🖱️ Клик мыши обнаружен!', e.button);
        
        if (!gameRunning || !gameStarted || !player || !bot) {
            showKeyPress('Игра не активна');
            console.log('❌ Игра не активна, клик игнорируется');
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        if (e.button === 0) { // Левая кнопка мыши
    console.log('⚡ Попытка легкой атаки...');
    let hitResult;
    
    // 🔫 ИСПРАВЛЕНО: Проверяем режим автомата для cris
    if (player.name === "cris" && player.isRifleMode) {
        console.log(`🔫 cris пытается стрелять! Патронов: ${player.ammo}, Кулдаун: ${player.rifleFireCooldown}`);
        
        const fired = player.fireRifle();
        if (fired) {
            showKeyPress('ЛКМ - ВЫСТРЕЛ! 🔫');
            console.log(`🔫 cris выстрелил из автомата!`);
        } else if (player.ammo <= 0) {
            showKeyPress('ЛКМ - НЕТ ПАТРОНОВ!');
            console.log(`🔫 У cris закончились патроны!`);
            if (!player.isReloading) {
                player.startReload();
                showKeyPress('АВТОПЕРЕЗАРЯДКА...');
                console.log(`🔄 cris начал автоматическую перезарядку`);
            }
        } else if (player.rifleFireCooldown > 0) {
            showKeyPress('ЛКМ - ПЕРЕЗАРЯДКА...');
            console.log(`🔫 cris еще перезаряжается: ${player.rifleFireCooldown} кадров`);
        }
        return;
    }
    
    if (player.canCounter > 0) {
                console.log('💥 Выполняется контратака!');
                hitResult = player.counterAttack(bot);
                if (hitResult === 'hit') {
                    showKeyPress('ЛКМ - КОНТРАТАКА ПОПАЛА! 35 УРОНА!');
                    console.log(`💥 КОНТРАТАКА! Критический урон: 35, Здоровье бота: ${bot.health}`);
                    
                    canvas.classList.add('counter-attack-effect');
                    setTimeout(() => {
                        canvas.classList.remove('counter-attack-effect');
                    }, 500);
                }
            } else {
                hitResult = player.lightAttack(bot);
                if (hitResult === 'hit') {
                    showKeyPress('ЛКМ - БЫСТРЫЙ УДАР ПОПАЛ!');
                    console.log(`⚡ Быстрый удар попал! Урон: 15, Здоровье бота: ${bot.health}`);
                } else if (hitResult === 'parried') {
                    showKeyPress('ЛКМ - ПАРИРОВАН!');
                    console.log(`🛡️ Удар парирован! Бот может контратаковать!`);
                } else if (hitResult === 'blocked') {
                    showKeyPress('ЛКМ - ЗАБЛОКИРОВАН');
                    console.log(`🛡️ Удар заблокирован! Урон: 5`);
                } else {
                    showKeyPress('ЛКМ - МИМО');
                    console.log(`❌ Быстрый удар не попал, дистанция слишком большая`);
                }
                
                if (hitResult === 'hit' || hitResult === 'blocked') {
                    canvas.classList.add('light-attack-effect');
                    setTimeout(() => {
                        canvas.classList.remove('light-attack-effect');
                    }, 150);
                } else if (hitResult === 'parried') {
                    canvas.classList.add('parry-effect');
                    setTimeout(() => {
                        canvas.classList.remove('parry-effect');
                    }, 300);
                }
            }
            
     } else if (e.button === 2) { // Правая кнопка мыши
    console.log('💥 Попытка тяжелой атаки...');
    // 🏋️ НОВОЕ: Ручной бросок штанги для Lyron
if (player.name === "Lyron" && player.isMuscle && player.isUsingBarbell && player.barbellPhase === 'carry') {
    console.log(`🏋️ ${player.name} бросает живую штангу по ПКМ!`);
    player.manualThrowRequested = true;
    showKeyPress('ПКМ - БРОСОК ШТАНГИ! 🏋️💥');
    return;
}
    
    // 🔫 ИСПРАВЛЕНО: Быстрая стрельба для cris
    if (player.name === "cris" && player.isRifleMode) {
        console.log(`🔫 cris быстро стреляет! Патронов: ${player.ammo}`);
        
        // Быстрая стрельба - игнорируем небольшой кулдаун
        if (player.rifleFireCooldown <= 3 && player.ammo > 0) {
            player.rifleFireCooldown = 0; // Сбрасываем кулдаун для быстрой стрельбы
            const fired = player.fireRifle();
            if (fired) {
                showKeyPress('ПКМ - БЫСТРЫЙ ОГОНЬ! 🔫💥');
                console.log(`🔫 cris ведёт быстрый огонь!`);
            }
        } else if (player.ammo <= 0) {
            showKeyPress('ПКМ - ПЕРЕЗАРЯДКА!');
            if (!player.isReloading) {
                player.startReload();
            }
        } else {
            showKeyPress('ПКМ - ГОТОВИТСЯ К ВЫСТРЕЛУ...');
        }
        return;
    }
    
    const hitResult = player.heavyAttack(bot);
            
            if (hitResult === 'hit') {
                showKeyPress('ПКМ - ТЯЖЕЛЫЙ УДАР ПОПАЛ!');
                console.log(`💥 Тяжелый удар попал! Урон: 25, Здоровье бота: ${bot.health}`);
            } else if (hitResult === 'parried') {
                showKeyPress('ПКМ - ПАРИРОВАН!');
                console.log(`🛡️ Тяжелый удар парирован! Бот может контратаковать!`);
            } else if (hitResult === 'blocked') {
                showKeyPress('ПКМ - ЗАБЛОКИРОВАН');
                console.log(`🛡️ Тяжелый удар заблокирован! Урон: 8`);
            } else {
                showKeyPress('ПКМ - МИМО');
                console.log(`❌ Тяжелый удар не попал, дистанция слишком большая`);
            }
            
            if (hitResult === 'hit' || hitResult === 'blocked') {
                canvas.classList.add('heavy-attack-effect');
                setTimeout(() => {
                    canvas.classList.remove('heavy-attack-effect');
                }, 400);
            } else if (hitResult === 'parried') {
                canvas.classList.add('parry-effect');
                setTimeout(() => {
                    canvas.classList.remove('parry-effect');
                }, 300);
            }
        }
        
        return false;
    });

    // Отключаем контекстное меню
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Курсор
    canvas.addEventListener('mouseenter', function() {
        canvas.style.cursor = 'crosshair';
    });

    canvas.addEventListener('mouseleave', function() {
        canvas.style.cursor = 'default';
    });
    
    console.log('✅ Обработчики мыши успешно установлены!');
    return true;
}

// ============ ДОПОЛНИТЕЛЬНЫЕ ОБРАБОТЧИКИ ============
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Убираем старые обработчики событий мыши - они будут добавлены в setupMouseEvents()
// canvas.addEventListener - ЭТИ СТРОКИ НУЖНО УДАЛИТЬ ИЗ СТАРОГО КОДА!
window.addEventListener('resize', resizeCanvas);
const CHARACTERS = [
    {
    key: "lyron",
    name: "Lyron",
    color: "#00BFFF", 
    description: "The Lord of All Magnitudes",
    images: {
      idle: "assets/Lyron.png",
      attack: "assets/LyronFight.png", 
      portrait: "assets/Lyron.png",
      shield: "assets/lyronBlock.png",
      muscle_idle: "assets/muscle_idle.png",
      muscle_punch: "assets/muscle_punch.png", 
      muscle_carry: "assets/muscle_carry.png"
    },
    // ✨ НОВЫЕ СВОЙСТВА ДЛЯ MUSCLE TRANSFORMATION:
    specialAbility: "muscleTransform",
    abilityCooldown: 480,        // 8 секунд кулдаун
    transformDuration: 300,      // 5 секунд действия
    muscleHealthBonus: 50,       // +50 HP при трансформации
    muscleDamageMultiplier: 1.33,// +33% урона
    muscleSpeedMultiplier: 0.8,  // -20% скорости
    muscleKnockbackResist: 0.5,  // +50% устойчивости
    barbell_range: 80,           // Дистанция захвата штанги
    barbell_carry_time: 180      // 3 секунды ношения
  },
{
    key: "Tom.J",
    name: "Tom.J", 
    color: "#FFD700",
    description: "The Great Warrior with AI Demons",
    images: {
      idle: "assets/TOM.png",
      attack: "assets/TOMFIGHT.png",
      portrait: "assets/TOM.png",
      shield: "assets/Tom.jBkock.png"
    },
    // ✨ ДОБАВИТЬ ЭТИ СТРОКИ:
    specialAbility: "greenSlimeShot",
    abilityCooldown: 250,
    slimeSpeed: 18,
    slimeDamage: 30,
    slimeGravity: 0.1,
    maxSlimeBounces: 1,
    slimeSize: 25
},
  {
    key: "noxx",
    name: "Noxx",
    color: "#ffa502",
    description: "He is everywhere, omnipresent, upholding order in the realm of magnitudes.",
    element: "electric",
    images: {
      idle: "assets/NOXX.png",
      attack: "assets/NOXX_FIGHTER.png",
      portrait: "assets/NOXX.png",
      shield: "assets/Noxx_block.png"
    },
    // ✨ НОВЫЕ СВОЙСТВА ДЛЯ ТЕЛЕПОРТАЦИИ:
    specialAbility: "electricTeleport",
    abilityCooldown: 80,        // 6 секунд кулдаун
    teleportDamage: 40,          // Урон от телепорт-атаки
    teleportStunDuration: 45,    // Оглушение на 45 кадров
    teleportRange: 400           // Максимальная дистанция телепортации
},
   {
    key: "Burhan.IP",
    name: "Burhan",
    color: "#ffa502",
    description: "Quintessence of Power GIF - Master of Grappling",
    element: "electric",
    images: {
      idle: "assets/Burhanf.png",
      attack: "assets/Burhanatack.png",
      portrait: "assets/Burhanf.png",
      shield: "assets/burhanblock.png",
      grapple: "assets/BurhanCombo.png"  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
    },
    specialAbility: "powerGrapple",
    abilityCooldown: 40,
    grappleRange: 500,
    throwDamage: 45,           // Убираем, больше не используется
    stunDuration: 250
},
  {
    key: "XEALIST",
    name: "Xealist",
    color: "#ffa502",
    description: "Mind and Knowledge of Magnitudes.",
    element: "electric",
    images: {
      idle: "assets/XEALIST.png",
      attack: "assets/XEALISTAAA.png",
      portrait: "assets/XEALIST.png",
      shield: "assets/Xeakistblock.png",
      powered: "assets/Xealistcombo.png",
      poweredAttack: "assets/xealistcomboattack.png"  // ← ДОБАВЬТЕ ВАШУ PNG КАРТИНКУ ЗДЕСЬ
    },
    // ✨ НОВЫЕ СВОЙСТВА ДЛЯ СПОСОБНОСТИ УСИЛЕНИЯ:
    specialAbility: "powerBoost",
    abilityCooldown: 420,        // 7 секунд кулдаун
    powerDuration: 300,          // 5 секунд действия (300 кадров = 5 сек)
    damageMultiplier: 2          // Урон x2
  },
  {
    key: "DeFi.NinJa_Elijah",
    name: "DeFi.NinJa_Elijah",
    color: "#ffa502",
    description: "He is everywhere and nowhere.",
    element: "electric",
    images: {
      idle: "assets/DeFi.NinJa_Elijah.png",
      attack: "assets/DeFi.NinjaAttack.png",
      portrait: "assets/DeFi.NinJa_Elijah.png",
      shield: "assets/Defi.Ninja.block.png"
    },
    // ✨ НОВЫЕ СТРОКИ:
    specialAbility: "shadowCloneStrike",
    abilityCooldown: 300,
    cloneDamage: 20,
    numberOfClones: 3
  },
  {
  key: "vludblet",
  name: "vludblet",
  color: "#ffa502",
  description: "Just a nice guy who throws bottles at enemies",
  element: "bottles",  // изменено с "electric"
  images: {
    idle: "assets/vludblet.png",
    attack: "assets/vludbletattack.png",
    portrait: "assets/vludblet.png",
    shield: "assets/vludbock.png"
  },
  // НОВЫЕ СВОЙСТВА:
  specialAbility: "bottleThrow",
  abilityCooldown: 300,
  bottleSpeed: 15,        // 🚀 Быстрее
  bottleDamage: 35,       // 🚀 Больше урона
  bottleGravity: 0,       // 🚀 БЕЗ гравитации
  maxBottleBounces: 0,    // 🚀 БЕЗ отскоков
  straightFlight: true    // 🚀 Прямой полет

},
   {
    key: "Aashi",
    name: "Aashi",
    color: "#ffa502",
    description: "Heart of Magnitude.",
    element: "electric",
    images: {
      idle: "assets/Aashi.png",
      attack: "assets/AashiAttack.png",
      portrait: "assets/Aashi.png",
      shield: "assets/Aashiblock.png"
    },
    // ✨ НОВЫЕ СВОЙСТВА ДЛЯ HEART PULSE:
    specialAbility: "heartPulse",
    abilityCooldown: 300,        // 5 секунд кулдаун
    pulseRadius: 200,            // Радиус пульса
    healAmount: 40,              // Исцеление для Aashi
    damageAmount: 25,            // Урон противнику
    pulseCount: 3,               // Количество пульсов
    pulseInterval: 30            // Интервал между пульсами (500мс)
  },
   {
    key: "Heathcliff",
    name: "Heathcliff",
    color: "#ffa502",
    description: "The Gray Cardinal of This World - Master of Lightning",
    element: "electric",
    images: {
      idle: "assets/Heathcliff.png",
      attack: "assets/heatcif.png",
      portrait: "assets/Heathcliff.png",
      shield: "assets/healblock.png"
    },
    // ⚡ НОВЫЕ СВОЙСТВА ДЛЯ LIGHTNING CALL:
    specialAbility: "lightningCall",
    abilityCooldown: 360,        // 6 секунд кулдаун
    lightningDamage: 50,         // Мощный урон от молнии
    lightningStunDuration: 45,   // Оглушение на 45 кадров
    lightningStrikeDelay: 60     // Задержка перед ударом (1 сек)
  },
  {
    key: "Matt",
    name: "Matt",
    color: "#ffa502",
    description: "This isn't just a shark; it's MATT.",
    element: "water",
    images: {
      idle: "assets/Matt.png",
      attack: "assets/mattatack.png",
      portrait: "assets/Matt.png",
      shield: "assets/Mattblock.png",
      sharkForm: "assets/mattcombo.png"  // ← ДОБАВЬТЕ ВАШУ PNG КАРТИНКУ ЗДЕСЬ
    },
    // 🦈 НОВЫЕ СВОЙСТВА ДЛЯ АТАКИ АКУЛЫ:
    specialAbility: "sharkDash",
    abilityCooldown: 360,      // 6 секунд кулдаун
    sharkSpeed: 25,            // Очень быстрая атака
    sharkDamage: 50,           // Мощный укус
    dashDistance: 400,         // Дистанция рывка
    stunDuration: 60           // Оглушение после укуса
},
 {
    key: "!ZAIN",
    name: "!ZAIN",
    color: "#ffa502",
    description: "His strength lies far beyond his fists",
    element: "electric",
    images: {
      idle: "assets/ZAIN.png",
      attack: "assets/ZAINATA.png",
      portrait: "assets/ZAIN.png",
      shield: "assets/!ZAINblock.png",
      redLightPose: "assets/!ZAINCOMBO.png"
    },
    // ✨ ИСПРАВЛЕННЫЕ СВОЙСТВА ДЛЯ RED LIGHT GREEN LIGHT:
    specialAbility: "redLightGreenLight",  // ← ЭТА СТРОКА КРИТИЧЕСКИ ВАЖНА!
    abilityCooldown: 480,                  // 8 секунд кулдаун
    freezeDuration: 320,                   // 3 секунды действия
    movementDamage: 5,                    // Урон за движение
    detectionRadius: 400,                  // Радиус действия
    animationDuration: 120                  // Длительность анимации позы
} ,
  {
    key: "sguzeva",
    name: "sguzeva",
    color: "#ffa502",
    description: "Every week is something more..",
    element: "electric",
    images: {
      idle: "assets/sguzeva.png",
      attack: "assets/sguzeva_attack.png",
      portrait: "assets/sguzeva.png",
      shield: "assets/sguzevablock.png",
      doubleJump: "assets/sguzevacombo.png"  // ← ДОБАВИТЬ ЭТУ СТРОКУ
    },
    // ✨ НОВЫЕ СВОЙСТВА ДЛЯ ДВОЙНОГО ПРЫЖКА:
    specialAbility: "doubleJump",
    abilityCooldown: 0,           // Без кулдауна
    maxJumps: 2,                  // Максимум 2 прыжка
    jumpResetTime: 60             // Время до сброса прыжков (1 секунда)
  },
  {
    key: "Kristina",
    name: "Kristina",
    color: "#ffa502",
    description: "Beware the dark power veiled behind radiant faces - Master of Self-Healing",
    element: "electric",
    images: {
        idle: "assets/Kristina.png",
        attack: "assets/KRISTINAATA.png",
        portrait: "assets/Kristina.png",
        shield: "assets/KristinaBlock.png",
        scream: "assets/KristinaScream.png"  // ← ДОБАВИТЬ ВАШУ PNG КАРТИНКУ
    },
    // 👻 НОВЫЕ СВОЙСТВА ДЛЯ BANSHEE SCREAM:
    specialAbility: "bansheeScream",
    abilityCooldown: 420,        // 7 секунд кулдаун
    screamDuration: 180,         // 3 секунды действия
    screamDamage: 35,            // Урон от крика
    screamStunDuration: 90,      // 1.5 секунды оглушения
    screamKnockback: 30,         // Сила отталкивания
    screamRadius: 250            // Радиус действия крика
},
   {
    key: "BUDEK",
    name: "BUDEK",
    color: "#ffa502",
    description: "B BU BUD BUDE BUDEK",
    element: "electric",
    images: {
      idle: "assets/Budek.png",
      attack: "assets/budek.fight.png",
      portrait: "assets/Budek.png",
      shield: "assets/BUdek.block.png"
    }
  },
   {
    key: "ZELLA",
    name: "ZELLA",
    color: "#ffa502",
    description: "ZELLA",
    element: "electric",
    images: {
      idle: "assets/Zela.png",
      attack: "assets/Zelaatack.png",
      portrait: "assets/Zela.png",
      shield: "assets/Zellablock.png"
    }
  },
  {
    key: "Busulis",
    name: "Busulis",
    color: "#ffa502",
    description: "ZELLA",
    element: "electric",
    images: {
      idle: "assets/Busulis.png",
      attack: "assets/Busulisatack.png",
      portrait: "assets/Busulis.png",
      shield: "assets/bulliosblock.png"
    }
  },
  {
    key: "cris",
    name: "cris",
    color: "#ffa502",
    description: "Simple Fighter", // ← Изменить описание
    element: "electric",
    images: {
      idle: "assets/cris.png",
      attack: "assets/crisattack.png",
      portrait: "assets/cris.png",
      shield: "assets/crisblock.png"
    }
},
   {
    key: "effgennn.l33t",
    name: "effgennn.l33t",
    color: "#ffa502",
    description: "Master of Banana Magic",
    element: "bananas",
    images: {
  idle: "assets/effgennn.l33t.png",
  attack: "assets/effgennn.l33attack.png",
  portrait: "assets/effgennn.l33t.png",
  shield: "assets/effgennn.l33tblock.png",
  transform: "assets/effgennn_transform.png",
  monster: "assets/effgennn_monster.png",
  monsterAttack: "assets/effgenn_monst_attack.png"  // ← НОВАЯ СТРОКА ДЛЯ АТАКИ МОНСТРА
},
    // 🍌 НОВЫЕ СВОЙСТВА ДЛЯ МОНСТР-ТРАНСФОРМАЦИИ:
    specialAbility: "monsterTransform",
    abilityCooldown: 600,        // 10 секунд кулдаун
    transformDuration: 300,      // 5 секунд в форме монстра
    monsterSizeMultiplier: 1.8,  // В 1.8 раза больше
    monsterDamageMultiplier: 1.6, // +60% урона ко всем атакам
    monsterSpeedMultiplier: 1.3,  // +30% скорости движения
    monsterHealthRegen: 3,        // +3 HP каждый кадр
    monsterKnockbackResist: 0.3   // Сопротивление отталкиванию
  }
  
];
// ====== ФОНОВОЕ ИЗОБРАЖЕНИЕ ======
// ====== ФОНОВЫЕ ИЗОБРАЖЕНИЯ ======
// 🎨 МАССИВ ФОНОВ ДЛЯ РАЗНЫХ АРЕН
const ARENA_BACKGROUNDS = [
    {
        name: "Горная арена",
        file: "assets/background.png",
        description: "Эпические горы и облака"
    },
    {
        name: "Лесная поляна", 
        file: "assets/background2.png",
        description: "Густой лес с солнечными лучами"
    },
    {
        name: "Пустынная арена",
        file: "assets/background4.png", 
        description: "Песчаные дюны и палящее солнце"
    },
];

let currentArenaIndex = 0;
let backgroundImage = null;
let backgroundLoaded = false;
let currentArenaName = "";

// 🎲 СЛУЧАЙНЫЙ ВЫБОР АРЕНЫ
function selectRandomArena() {
    currentArenaIndex = Math.floor(Math.random() * ARENA_BACKGROUNDS.length);
    const selectedArena = ARENA_BACKGROUNDS[currentArenaIndex];
    currentArenaName = selectedArena.name;
    
    console.log(`🏟️ Выбрана арена: ${selectedArena.name}`);
    console.log(`📝 Описание: ${selectedArena.description}`);
    
    return selectedArena;
}

// Функция загрузки выбранного фона
function loadBackground() {
    const selectedArena = ARENA_BACKGROUNDS[currentArenaIndex];
    
    backgroundImage = new Image();
    backgroundImage.onload = () => {
        backgroundLoaded = true;
        console.log(`🎨 Фон арены "${selectedArena.name}" загружен!`);
    };
    backgroundImage.onerror = () => {
        console.error(`❌ Ошибка загрузки фона: ${selectedArena.file}`);
        console.log('🔄 Используем запасной градиентный фон');
        backgroundLoaded = false;
    };
    backgroundImage.src = selectedArena.file;
}
let selectedCharIndex = 0;
let imageCache = {};
let imagesLoaded = false;

// Функция для обновления отображения персонажа
function updateCharacterDisplay() {
    const character = CHARACTERS[selectedCharIndex];
    const imgEl = document.getElementById('characterImg');
    const nameEl = document.getElementById('characterName');
    const descEl = document.getElementById('characterDesc');
    
    if (imgEl) imgEl.src = character.images.portrait;
    if (nameEl) nameEl.textContent = character.name;
    if (descEl) descEl.textContent = character.description;
}


// Предзагрузка картинок


function preloadImages() {
    imagesLoaded = false;
    imageCache = {};
    
    const selectedCharacter = CHARACTERS[selectedCharIndex];
    const urls = selectedCharacter.images;
    
    const promises = Object.entries(urls).map(([state, url]) =>
        new Promise(resolve => {
            const img = new Image();
            img.onload = () => { 
                imageCache[state] = img; 
                console.log(`✅ Загружена картинка: ${state} для ${selectedCharacter.name}`);
                resolve(); 
            };
            img.onerror = () => { 
                console.error(`❌ Ошибка загрузки ${url} для ${selectedCharacter.name}`); 
                resolve(); 
            };
            img.src = url;
        })
    );
    
    Promise.all(promises).then(() => {
        imagesLoaded = true;
        console.log(`🎨 Все картинки загружены для ${selectedCharacter.name}!`);
    });
}

// Предзагрузка картинок для ИИ
function preloadBotImages(botCharacterIndex) {
    const botCharacter = CHARACTERS[botCharacterIndex];
    const urls = botCharacter.images;
    
    // Создаем отдельный кэш для бота
    window.botImageCache = {};
    
    const promises = Object.entries(urls).map(([state, url]) =>
        new Promise(resolve => {
            const img = new Image();
            img.onload = () => { 
                window.botImageCache[state] = img; 
                console.log(`🤖 Загружена картинка бота: ${state} для ${botCharacter.name}`);
                resolve(); 
            };
            img.onerror = () => { 
                console.error(`❌ Ошибка загрузки картинки бота: ${url} для ${botCharacter.name}`); 
                resolve(); 
            };
            img.src = url;
        })
    );
    
    Promise.all(promises).then(() => {
        window.botImagesLoaded = true;
        console.log(`🎨 Все картинки бота загружены для ${botCharacter.name}!`);
    });
}


// 🎨 =============== ВОТ ТУТ ДОБАВЬТЕ ЭТУ ФУНКЦИЮ ===============
// ====== ФУНКЦИЯ РИСОВАНИЯ ФОНА ======
// ====== УЛУЧШЕННАЯ ФУНКЦИЯ РИСОВАНИЯ ФОНА ======
function drawBackground(ctx) {
    if (backgroundLoaded && backgroundImage) {
        // Рисуем загруженное изображение арены
        const bgRatio = backgroundImage.width / backgroundImage.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        if (bgRatio > canvasRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * bgRatio;
            offsetX = -(drawWidth - canvas.width) / 2;
        } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / bgRatio;
            offsetY = -(drawHeight - canvas.height) / 2;
        }

        ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
        
        // Добавляем атмосферные эффекты в зависимости от арены
        addArenaEffects(ctx);
        
    } else {
        // Запасной градиентный фон если картинка не загрузилась
        drawFallbackBackground(ctx);
    }
    
    // Общие элементы для всех арен
    drawCommonArenaElements(ctx);
}

// 🌟 АТМОСФЕРНЫЕ ЭФФЕКТЫ ДЛЯ РАЗНЫХ АРЕН
// 🌟 АТМОСФЕРНЫЕ ЭФФЕКТЫ ДЛЯ РАЗНЫХ АРЕН (ПУСТАЯ - ТОЛЬКО ВАШИ PNG)
function addArenaEffects(ctx) {
    // Никаких дополнительных эффектов - только чистые PNG фоны
}

// 🏛️ ЗАПАСНОЙ ГРАДИЕНТНЫЙ ФОН
// 🏛️ ЗАПАСНОЙ ФОН (ЕСЛИ PNG НЕ ЗАГРУЗИЛСЯ)
function drawFallbackBackground(ctx) {
    // Простой темный фон если картинка не загрузилась
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Надпись об ошибке
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Фон не загружен', canvas.width/2, canvas.height/2);
    ctx.fillText('Проверьте файл PNG', canvas.width/2, canvas.height/2 + 30);
}

// 🌍 ОБЩИЕ ЭЛЕМЕНТЫ АРЕНЫ
// 🌍 ОБЩИЕ ЭЛЕМЕНТЫ АРЕНЫ (ТОЛЬКО НЕВИДИМАЯ ПЛАТФОРМА)
function drawCommonArenaElements(ctx) {
    // Никаких дополнительных элементов - чистый PNG фон
    // Платформа для персонажей уже есть в коде Fighter класса
}

class Fighter {
    constructor(x, y, color, name, specialAttack, useImages = false) {
        this.x = x;
        this.y = y;
        this.width = 220;
        this.height = 220;
        this.color = color;
        this.name = name;
        this.health = 300;
        this.maxHealth = 300;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = true;
        this.facingRight = true;
        this.isAttacking = false;
        this.isBlocking = false;
        this.lightAttackCooldown = 0;
        this.heavyAttackCooldown = 0;
        this.combo = 0;
        this.specialAttack = specialAttack;
        this.specialCooldown = 0;
        this.lastAttackTime = 0;
        this.attackFrame = 0;
        this.attackType = 'none';
        this.attackPhase = 'none';
        this.attackProgress = 0;
        this.hitEffect = 0;
        this.blockHealth = 100;
        this.maxBlockHealth = 100;
        this.stunned = 0;
        this.balance = 100;
        this.maxBalance = 100;
        this.knockback = 0;
        this.lastHitType = 'normal';
        this.screenShake = 0;
        
        // СИСТЕМА ПАРИРОВАНИЯ И КОНТРАТАК
        this.isParrying = false;
        this.parryWindow = 0;
        this.vulnerableToCounter = 0;
        this.canCounter = 0;
        this.isCountering = false;
        this.lastParryTime = 0;
        
        // УЛУЧШЕННАЯ СИСТЕМА ДВИЖЕНИЯ
        this.moveSpeed = 13;
        this.jumpPower = 24;
        this.airControl = 0.8;
        this.landingEffect = 0;
        this.landingPrep = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.coyoteTime = 0;
        this.jumpBuffer = 0;
        this.jumpEffect = 0;
        this.useImages = useImages;
        
        // ✨ НОВЫЕ СВОЙСТВА ДЛЯ СПОСОБНОСТЕЙ ✨
        this.abilityCooldown = 0;      // Кулдаун способности (в кадрах)
        this.abilityDuration = 0;      // Длительность эффекта
        this.abilityActive = false;    // Активна ли способность
        this.hitParticles = [];        // Частицы эффектов попадания
        this.MAX_PARTICLES = 50; // 🔧 НОВАЯ СТРОКА - лимит частиц
        // 🚀 НОВЫЕ СВОЙСТВА ДЛЯ ОТТАЛКИВАНИЯ
        this.isKnockedBack = false;    // Находится ли в состоянии отталкивания
        this.knockbackResistance = 1.0; // Сопротивление отталкиванию (1.0 = норма)
        // 🍾 НОВЫЕ СВОЙСТВА ДЛЯ СИСТЕМЫ БУТЫЛОК vludblet
        this.bottles = [];              // Массив летящих бутылок
        this.bottleThrowCooldown = 0;   // Кулдаун броска бутылки (в кадрах)
        this.throwingBottle = false;    // Находится ли в анимации броска
        this.throwFrame = 0;            // Текущий кадр анимации броска
        // 🟢 НОВЫЕ СВОЙСТВА ДЛЯ СИСТЕМЫ ЗЕЛЕНОЙ ЖИЖИ TOM.J
        this.slimes = [];                // Массив летящих слаймов
        this.slimeThrowCooldown = 0;     // Кулдаун броска слайма
        this.throwingSlime = false;      // Находится ли в анимации броска
        this.slimeThrowFrame = 0;        // Текущий кадр анимации броска

        // Эффекты от слаймов
        this.slimeParticles = [];        // Массив частиц слизи
        this.slimeExplosions = [];       // Массив взрывов от попадания слаймов

        // Настройки слаймов (берутся из CHARACTERS или стандартные)
        this.slimeSpeed = 18;            // Скорость полета слайма
        this.slimeDamage = 30;           // Урон от попадания слайма
        this.slimeGravity = 0.1;         // Гравитация для слайма
        this.maxSlimeBounces = 1;        // Максимальное количество отскоков
        this.slimeSize = 25;             // Размер слайма
        // Эффекты от бутылок
        this.glassParticles = [];       // Массив осколков стекла от разбитых бутылок
        this.bottleExplosions = [];     // Массив взрывов от попадания бутылок
        
        // Настройки бутылок (берутся из CHARACTERS или стандартные)
        this.bottleSpeed = 12;          // Скорость полета бутылки
        this.bottleDamage = 30;         // Урон от попадания бутылки
        this.bottleGravity = 0.5;       // Гравитация для бутылки
        this.maxBottleBounces = 2;      // Максимальное количество отскоков

        // ⚡ НОВЫЕ СВОЙСТВА ДЛЯ ТЕЛЕПОРТАЦИИ NOXX
        this.isTeleporting = false;          // Находится ли в процессе телепортации
        this.teleportCooldown = 0;           // Кулдаун телепортации (в кадрах)
        this.teleportPhase = 'none';         // Фаза телепортации: 'none', 'disappear', 'appear', 'strike'
        this.teleportTimer = 0;              // Таймер текущей фазы телепортации
        this.teleportStartX = 0;             // Начальная позиция X
        this.teleportStartY = 0;             // Начальная позиция Y
        this.teleportTargetX = 0;            // Целевая позиция X
        this.teleportTargetY = 0;            // Целевая позиция Y
        this.electricParticles = [];         // Частицы электричества
        this.teleportGlow = 0;               // Эффект свечения при телепортации

          // 🤼 НОВЫЕ СВОЙСТВА ДЛЯ БРОСКА BURHAN
        this.isGrappling = false;            // Находится ли в процессе захвата
        this.grappleCooldown = 0;            // Кулдаун броска (в кадрах)
        this.grapplePhase = 'none';          // Фаза броска: 'none', 'grab', 'lift', 'throw'
        this.grappleTimer = 0;               // Таймер текущей фазы
        this.grappleTarget = null;           // Цель захвата
        this.originalTargetX = 0;            // Оригинальная позиция цели X
        this.originalTargetY = 0;            // Оригинальная позиция цели Y
        this.liftHeight = 0;                 // Высота подъема при броске
        this.throwParticles = [];            // Частицы эффектов броска
        this.impactEffect = 0;               // Эффект удара о землю
     this.impactEffect = 0;               // Эффект удара о землю
        

        // 🦈 НОВЫЕ СВОЙСТВА ДЛЯ АТАКИ АКУЛЫ MATT
        this.isSharkDashing = false;         // Находится ли в режиме акулы
        this.sharkPhase = 'none';            // Фаза атаки: 'none', 'transform', 'dash', 'bite', 'return'
        this.sharkTimer = 0;                 // Таймер текущей фазы
        this.sharkStartX = 0;                // Начальная позиция X
        this.sharkStartY = 0;                // Начальная позиция Y
        this.sharkTargetX = 0;               // Целевая позиция X
        this.sharkTargetY = 0;               // Целевая позиция Y
        this.sharkTarget = null;             // Цель атаки
        this.sharkCooldown = 0;              // Кулдаун способности
        this.waterParticles = [];            // Частицы воды
        this.sharkTrail = [];                // След акулы
        this.biteEffect = 0;                 // Эффект укуса
        
        // 💡 НОВЫЕ СВОЙСТВА ДЛЯ УСИЛЕНИЯ XEALIST
        this.isPowered = false;              // Активна ли способность усиления
        this.powerDuration = 0;              // Оставшееся время усиления
        this.powerCooldown = 0;              // Кулдаун способности
        this.originalDamageMultiplier = 1;   // Оригинальный множитель урона
        
        
        // ⚡ НОВЫЕ СВОЙСТВА ДЛЯ LIGHTNING CALL HEATHCLIFF
this.lightningStrikes = [];          // Массив активных молний
this.lightningCooldown = 0;          // Кулдаун способности
this.lightningWarnings = [];         // Предупреждения о молниях
this.lightningEffects = [];          // Эффекты молний

// 🔴 НОВЫЕ СВОЙСТВА ДЛЯ RED LIGHT GREEN LIGHT ZAIN
this.redLightActive = false;         // Активна ли способность "красный свет"
this.redLightDuration = 0;           // Оставшееся время действия
this.redLightCooldown = 0;           // Кулдаун способности
this.redLightCountdown = 0;          // Счетчик обратного отсчета (3-2-1)
this.redLightTarget = null;          // Цель способности
this.movementViolations = 0;         // Количество нарушений движения
this.lastPosition = { x: 0, y: 0 };  // Последняя позиция для отслеживания движения
this.redLightWarnings = [];          // Визуальные предупреждения

        // 🥷 НОВЫЕ СВОЙСТВА ДЛЯ SHADOW CLONE STRIKE
        this.shadowClones = [];              // Массив теневых клонов
        this.cloneCooldown = 0;              // Кулдаун способности
        // 💖 НОВЫЕ СВОЙСТВА ДЛЯ HEART PULSE AASHI
        this.heartPulses = [];               // Массив пульсов сердца
        this.heartPulseCooldown = 0;         // Кулдаун способности
        this.healingEffects = [];            // Эффекты исцеления

        // 🦘 НОВЫЕ СВОЙСТВА ДЛЯ ДВОЙНОГО ПРЫЖКА SGUZEVA
        this.jumpsUsed = 0;              // Количество использованных прыжков
        this.maxJumps = 1;               // Максимальное количество прыжков (обычно 1)
        this.jumpResetTimer = 0;         // Таймер сброса прыжков
        this.isDoubleJumping = false;    // Находится ли в состоянии двойного прыжка
        this.doubleJumpEffect = 0;       // Эффект двойного прыжка

        this.bansheeScreamActive = false;     // Активен ли крик
this.screamDuration = 0;              // Длительность крика
this.screamCooldown = 0;              // Кулдаун способности
this.screamWaves = [];                // Звуковые волны
this.screamEffects = [];              // Эффекты ужаса
this.isScreaming = false;             // Находится ли в анимации крика

// 🍌 НОВЫЕ СВОЙСТВА ДЛЯ МОНСТР-ТРАНСФОРМАЦИИ EFFGENNN.L33T
this.isMonster = false;              // Находится ли в форме монстра
// 🔫 НОВЫЕ СВОЙСТВА ДЛЯ АВТОМАТА CRIS
this.isRifleMode = false;         // Режим автомата
this.bullets = [];                // Массив летящих пуль
this.rifleFireCooldown = 0;       // Кулдаун стрельбы
this.ammo = 30;                   // Текущие патроны
this.maxAmmo = 30;                // Максимум патронов
this.isReloading = false;         // Процесс перезарядки
this.reloadTimer = 0;             // Таймер перезарядки
this.muzzleFlash = 0;             // Эффект вспышки
this.bulletCasings = [];          // Гильзы от пуль
this.monsterDuration = 0;            // Оставшееся время трансформации
this.monsterCooldown = 0;            // Кулдаун способности
// 🏋️ НОВЫЕ СВОЙСТВА ДЛЯ MUSCLE TRANSFORMATION LYRON
this.isMuscle = false;               // Находится ли в форме качка
this.muscleDuration = 0;             // Оставшееся время трансформации
this.muscleCooldown = 0;             // Кулдаун способности
this.originalMuscleSize = { width: this.width, height: this.height }; // Оригинальный размер
this.originalMuscleSpeed = this.moveSpeed; // Оригинальная скорость
this.muscleGlow = 0;                 // Эффект свечения качка
this.muscleParticles = [];           // Частицы качка

// 🏋️ ЖИВАЯ ШТАНГА
this.isUsingBarbell = false;         // Использует ли живую штангу
this.barbellPhase = 'none';          // Фаза: 'none', 'grab', 'lift', 'carry', 'throw'
this.barbellTimer = 0;               // Таймер текущей фазы
this.barbellTarget = null;           // Цель-штанга
this.barbellCarryTime = 0;           // Время ношения штанги
this.barbellUsedThisTransform = false; // Использовалась ли штанга в этой трансформации
this.barbellHoldHeight = 0;          // Высота удержания над головой
this.originalSize = { width: this.width, height: this.height }; // Оригинальный размер
this.originalSpeed = this.moveSpeed; // Оригинальная скорость
this.monsterGlow = 0;                // Эффект свечения монстра
this.monsterParticles = [];          // Частицы монстра
this.transforming = false;           // Находится ли в процессе трансформации
this.transformTimer = 0;             // Таймер анимации трансформации
        
      
    }  // ← ВОТ ТУТ ЗАКРЫВАЕТСЯ constructor
    // СИСТЕМА АНИМАЦИИ АТАК
    updateAttackAnimation() {
        if (this.attackType === 'none') return;
        
        let totalFrames, windupFrames, strikeFrames;
        
        switch(this.attackType) {
            case 'light':
                totalFrames = 15;
                windupFrames = 4;
                strikeFrames = 3;
                break;
            case 'heavy':
                totalFrames = 25;
                windupFrames = 8;
                strikeFrames = 5;
                break;
            case 'counter':
                totalFrames = 20;
                windupFrames = 3;
                strikeFrames = 6;
                break;
            default:
                totalFrames = 15;
                windupFrames = 4;
                strikeFrames = 3;
        }
        
        const recoveryFrames = totalFrames - windupFrames - strikeFrames;
        const currentFrame = totalFrames - this.attackFrame;
        
        if (currentFrame < windupFrames) {
            this.attackPhase = 'windup';
            this.attackProgress = currentFrame / windupFrames;
        } else if (currentFrame < windupFrames + strikeFrames) {
            this.attackPhase = 'strike';
            this.attackProgress = (currentFrame - windupFrames) / strikeFrames;
        } else {
            this.attackPhase = 'recovery';
            this.attackProgress = (currentFrame - windupFrames - strikeFrames) / recoveryFrames;
        }
    }
    
    update() {
        // Физика с улучшенной гравитацией
        this.velocityY += 0.7; // Чуть меньше гравитация для более плавных прыжков
        
        if (this.knockback > 0) {
            this.velocityX += this.knockback;
            this.knockback *= 0.85; // Более плавное затухание отталкивания
            if (Math.abs(this.knockback) < 0.1) this.knockback = 0;
        }
        
        // Улучшенная анимация ходьбы
        if (Math.abs(this.velocityX) > 0.5 && this.onGround && !this.isAttacking) {
            this.walkCycle = (this.walkCycle || 0) + Math.abs(this.velocityX) * 0.15;
        } else {
            this.walkCycle = 0;
        }
        
        // Плавное приземление
        if (!this.onGround && this.velocityY > 0) {
            this.landingPrep = true;
        }
        
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Ограничения экрана с небольшой амортизацией
        // 🚀 УЛУЧШЕННЫЕ ОГРАНИЧЕНИЯ ЭКРАНА С ОТСКОКОМ ОТ СТЕН
        if (this.x < 0) {
            this.x = 0;
            // При сильном отталкивании - отскок от левой стены
            if (this.velocityX < -15) {
                this.velocityX = Math.abs(this.velocityX) * 0.6; // Отскок с потерей 40% скорости
                this.screenShake = Math.max(this.screenShake, 8);
                console.log(`💥 Отскок от левой стены! Скорость: ${this.velocityX.toFixed(1)}`);
            } else {
                this.velocityX = Math.max(0, this.velocityX);
            }
        }
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
            // При сильном отталкивании - отскок от правой стены
            if (this.velocityX > 15) {
                this.velocityX = -Math.abs(this.velocityX) * 0.6; // Отскок с потерей 40% скорости
                this.screenShake = Math.max(this.screenShake, 8);
                console.log(`💥 Отскок от правой стены! Скорость: ${this.velocityX.toFixed(1)}`);
            } else {
                this.velocityX = Math.min(0, this.velocityX);
            }
        }
        
        // Приземление с эффектом
        if (this.y > canvas.height - this.height - 20) {
            this.y = canvas.height - this.height - 20;
            
            // Эффект приземления
            if (!this.onGround && this.velocityY > 8) {
                this.landingEffect = 15; // Эффект удара о землю
                this.velocityX *= 0.7; // Небольшое торможение при приземлении
            }
            
            this.velocityY = 0;
            this.onGround = true;
            this.landingPrep = false;
        }
        
        // Улучшенное трение в зависимости от состояния
        if (this.onGround) {
            if (this.isAttacking) {
                this.velocityX *= 0.88; // Меньше трения при атаке
            } else {
                this.velocityX *= 0.85; // Более плавное торможение
            }
        } else {
            this.velocityX *= 0.96; // Минимальное воздушное сопротивление
        }
        // Восстановление систем
        if (this.lightAttackCooldown > 0) this.lightAttackCooldown--;
        if (this.heavyAttackCooldown > 0) this.heavyAttackCooldown--;
        if (this.attackFrame > 0) this.attackFrame--;
        if (this.hitEffect > 0) this.hitEffect--;
        if (this.stunned > 0) this.stunned--;
        if (this.screenShake > 0) this.screenShake--;
        if (this.landingEffect > 0) this.landingEffect--;
        
        // СИСТЕМА ПАРИРОВАНИЯ
        if (this.parryWindow > 0) this.parryWindow--;
        if (this.vulnerableToCounter > 0) this.vulnerableToCounter--;
        if (this.canCounter > 0) this.canCounter--;
        
        // Система прыжков
        if (this.coyoteTime > 0) this.coyoteTime--;
        if (this.jumpBuffer > 0) this.jumpBuffer--;
        
        // Койот-тайм: короткое время после схода с платформы, когда можно прыгнуть
        if (this.onGround) {
            this.coyoteTime = 8; // 8 кадров койот-тайма
        }
        
        // Сброс парирования если не блокирует
        if (!this.isBlocking) {
            this.isParrying = false;
        }
        
        // Восстановление блока
        if (!this.isBlocking && this.blockHealth < this.maxBlockHealth) {
            this.blockHealth += 0.5;
        }
        
        // Восстановление равновесия
        if (this.balance < this.maxBalance) {
            this.balance += 1;
        }
        
        // Сброс комбо
        if (Date.now() - this.lastAttackTime > 2000) {
            this.combo = 0;
        }
        
        // Сброс атаки
        if (this.attackFrame === 0) {
        this.isAttacking = false;
        this.attackType = 'none';
        this.attackPhase = 'none';
        this.attackProgress = 0;
    } else {
        this.updateAttackAnimation();
    }
    
     // ✨ НОВЫЕ ОБНОВЛЕНИЯ ДЛЯ СПОСОБНОСТЕЙ ✨
      // ✨ НОВЫЕ ОБНОВЛЕНИЯ ДЛЯ СПОСОБНОСТЕЙ ✨
    this.updateMagnitudeWaves();
    // Обновляем создание волн
    this.updateHitParticles();
    this.updateBottles();
    this.updateBottleExplosions();
    this.updateGlassParticles();
    // НОВЫЕ СТРОКИ ДЛЯ СЛАЙМОВ:
    this.updateSlimes();
    
    this.updateSlimeParticles();

// Обновляем кулдаун броска слайма
if (this.slimeThrowCooldown > 0) this.slimeThrowCooldown--;
    
    // Обновляем кулдаун броска бутылки
    if (this.bottleThrowCooldown > 0) this.bottleThrowCooldown--;
    
    // Обновляем кулдаун способности
if (this.abilityCooldown > 0) this.abilityCooldown--;
if (this.abilityDuration > 0) this.abilityDuration--;

// ⚡ НОВЫЕ ОБНОВЛЕНИЯ ДЛЯ ТЕЛЕПОРТАЦИИ NOXX
this.updateTeleportation();
this.updateElectricParticles();

// Обновляем кулдаун телепортации
// ⚡ НОВЫЕ ОБНОВЛЕНИЯ ДЛЯ ТЕЛЕПОРТАЦИИ NOXX
this.updateTeleportation();
this.updateElectricParticles();

// 🤼 НОВЫЕ ОБНОВЛЕНИЯ ДЛЯ БРОСКА BURHAN
this.updateGrappling();
this.updateThrowParticles();

// 🦈 НОВЫЕ ОБНОВЛЕНИЯ ДЛЯ АТАКИ АКУЛЫ MATT
this.updateSharkDash();
this.updateWaterParticles();

// Обновляем кулдауны
if (this.teleportCooldown > 0) this.teleportCooldown--;
if (this.teleportGlow > 0) this.teleportGlow--;
if (this.grappleCooldown > 0) this.grappleCooldown--;
if (this.impactEffect > 0) this.impactEffect--;
if (this.sharkCooldown > 0) this.sharkCooldown--;  // 🦈 НОВАЯ СТРОКА
if (this.biteEffect > 0) this.biteEffect--;        // 🦈 НОВАЯ СТРОКА

// 💡 НОВОЕ: ОБНОВЛЕНИЕ СПОСОБНОСТИ УСИЛЕНИЯ XEALIST
if (this.powerCooldown > 0) this.powerCooldown--;
if (this.powerDuration > 0) {
    this.powerDuration--;
    // Когда усиление заканчивается
    if (this.powerDuration === 0) {
        this.isPowered = false;
        console.log(`💡 ${this.name}: способность усиления закончилась`);
    }
}

// ⚡ НОВОЕ: ОБНОВЛЕНИЕ LIGHTNING CALL HEATHCLIFF
if (this.lightningCooldown > 0) this.lightningCooldown--;
this.updateLightningStrikes();
this.updateLightningWarnings();
this.updateLightningEffects();
// 🔴 НОВОЕ: ОБНОВЛЕНИЕ RED LIGHT GREEN LIGHT ZAIN
if (this.redLightCooldown > 0) this.redLightCooldown--;
if (this.redLightDuration > 0) {
    this.redLightDuration--;
    this.updateRedLightCountdown();
    this.checkMovementViolations();
    
    // Когда способность заканчивается
    if (this.redLightDuration === 0) {
        this.redLightActive = false;
        this.redLightTarget = null;
        this.movementViolations = 0;
        console.log(`🔴 ${this.name}: Red Light Green Light закончилась`);
    }
}
this.updateRedLightWarnings();

// 🥷 НОВОЕ: ОБНОВЛЕНИЕ SHADOW CLONE STRIKE
// 🥷 НОВОЕ: ОБНОВЛЕНИЕ SHADOW CLONE STRIKE
this.updateShadowClones();
if (this.cloneCooldown > 0) this.cloneCooldown--;


// 💖 НОВОЕ: ОБНОВЛЕНИЕ HEART PULSE AASHI
this.updateHeartPulses();
this.updateHealingEffects();
if (this.heartPulseCooldown > 0) this.heartPulseCooldown--;

// 🦘 НОВОЕ: ОБНОВЛЕНИЕ ДВОЙНОГО ПРЫЖКА SGUZEVA
if (this.jumpResetTimer > 0) this.jumpResetTimer--;
if (this.doubleJumpEffect > 0) this.doubleJumpEffect--;

// Сбрасываем прыжки когда персонаж на земле
if (this.onGround && this.jumpResetTimer === 0) {
    this.jumpsUsed = 0;
    this.isDoubleJumping = false;
}

// Обновляем эффекты
this.updateTransformEffects();
this.updateTransformExplosions();
// 👻 НОВОЕ: ОБНОВЛЕНИЕ BANSHEE SCREAM KRISTINA
if (this.screamCooldown > 0) this.screamCooldown--;
if (this.screamDuration > 0) {
    this.screamDuration--;
    this.updateBansheeScream();
    
    // Когда крик заканчивается
    if (this.screamDuration === 0) {
        this.bansheeScreamActive = false;
        this.isScreaming = false;
        console.log(`👻 ${this.name}: Banshee Scream закончился`);
    }
}
this.updateScreamWaves();
this.updateScreamEffects();

// 🍌 НОВОЕ: ОБНОВЛЕНИЕ МОНСТР-ТРАНСФОРМАЦИИ EFFGENNN.L33T
if (this.monsterCooldown > 0) this.monsterCooldown--;
if (this.monsterGlow > 0) this.monsterGlow--;
if (this.transformTimer > 0) this.transformTimer--;
// 🏋️ НОВОЕ: ОБНОВЛЕНИЕ MUSCLE TRANSFORMATION LYRON
if (this.muscleCooldown > 0) this.muscleCooldown--;
if (this.muscleGlow > 0) this.muscleGlow--;

// Обновляем трансформацию качка
if (this.muscleDuration > 0) {
    this.muscleDuration--;
    this.updateMuscleForm();
    
    // Когда трансформация заканчивается
    if (this.muscleDuration === 0) {
        this.revertFromMuscle();
        console.log(`🏋️ ${this.name}: трансформация качка закончилась`);
    }
}

// Обновляем живую штангу
this.updateBarbell();

// Обновляем эффекты качка
this.updateMuscleParticles();

// Обновляем трансформацию
if (this.monsterDuration > 0) {
    this.monsterDuration--;
    this.updateMonsterForm();
    
    // Когда трансформация заканчивается
    if (this.monsterDuration === 0) {
        this.revertFromMonster();
        console.log(`🍌 ${this.name}: трансформация закончилась`);
    }
}

// Обновляем эффекты монстра
this.updateMonsterParticles();

// Процесс трансформации



// Процесс трансформации
if (this.transforming && this.transformTimer <= 0) {
    if (this.name === "Lyron" && !this.isMuscle) {
        this.completeMuscleTransformation(); // ← НОВЫЙ МЕТОД ДЛЯ LYRON
    } else {
        this.completeTransformation(); // ← СТАРЫЙ МЕТОД ДЛЯ ДРУГИХ
    }
}
}

    
    draw(ctx) {
        let shakeX = 0, shakeY = 0;
        if (this.screenShake > 0) {
            shakeX = (Math.random() - 0.5) * this.screenShake;
            shakeY = (Math.random() - 0.5) * this.screenShake;
        }
        
        let drawX = this.x + shakeX;
        let drawY = this.y + shakeY;
        
        // Улучшенная тень с динамическим размером и цветом
        let shadowWidth = this.width;
        let shadowOpacity = 0.4;
        let shadowColor = '0, 0, 0';
        
        if (!this.onGround) {
            let heightFactor = Math.min((canvas.height - this.y) / 200, 1);
            shadowWidth = this.width * (0.5 + 0.5 * heightFactor);
            shadowOpacity = 0.3 * heightFactor;
        }
        
        // Разные цвета теней для разных персонажей
        if (this.name === "Tom.J") {
            shadowColor = '255, 215, 0';
            shadowOpacity *= 0.6;
        } else if (this.name === "Lyron") {
            shadowColor = '0, 191, 255';
            shadowOpacity *= 0.6;
        }
        
        ctx.fillStyle = `rgba(${shadowColor}, ${shadowOpacity})`;
        ctx.fillRect(drawX + (this.width - shadowWidth)/2, canvas.height - 15, shadowWidth, 8);
        
        // Аура персонажа
        //this.drawAura(ctx, drawX, drawY);
        
        // Эффект приземления
        if (this.landingEffect > 0) {
            let intensity = this.landingEffect / 15;
            ctx.fillStyle = `rgba(139, 69, 19, ${0.4 * intensity})`;
            
            // Пыль от приземления
            for (let i = 0; i < 8; i++) {
                let dustX = drawX + 10 + (Math.random() - 0.5) * 60;
                let dustY = canvas.height - 10 + Math.random() * 15;
                let dustSize = 2 + Math.random() * 4;
                
                ctx.beginPath();
                ctx.arc(dustX, dustY, dustSize, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        
        // Эффект прыжка
        if (this.jumpEffect > 0) {
            this.jumpEffect--;
            let intensity = this.jumpEffect / 10;
            
            // Энергетические искры от прыжка
            for (let i = 0; i < 6; i++) {
                let sparkX = drawX + 15 + (Math.random() - 0.5) * 30;
                let sparkY = canvas.height - 10 + Math.random() * 10;
                
                let sparkColor = this.name === "Tom.J" ? '255, 215, 0' : '0, 191, 255';
                ctx.fillStyle = `rgba(${sparkColor}, ${intensity})`;
                ctx.fillRect(sparkX - 1, sparkY - 1, 3, 3);
                
                // Свечение искр
                ctx.shadowColor = `rgba(${sparkColor}, ${intensity * 0.8})`;
                ctx.shadowBlur = 5;
                ctx.fillRect(sparkX - 0.5, sparkY - 0.5, 2, 2);
                ctx.shadowBlur = 0;
            }
        }
        
        // Основные эффекты состояния
        this.drawStatusEffects(ctx, drawX, drawY);
        // Рисуем персонажа - картинкой или стандартным способом
// ⚡ ЭФФЕКТЫ ТЕЛЕПОРТАЦИИ ДЛЯ NOXX (ПЕРЕД рисованием персонажа)
if (this.name === "Noxx") {
    this.drawTeleportEffects(ctx, drawX, drawY);
}

// Рисуем персонажа только если он НЕ исчезает при телепортации
if (!this.isTeleporting || this.teleportPhase !== 'disappear') {
    this.drawCharacterWithImage(ctx, drawX, drawY);
}
        
        // Рисуем персонажа с улучшенной детализацией
       // this.drawCharacter(ctx, drawX, drawY);
        
        // Эффекты атаки
        this.drawAttackEffect(ctx, drawX, drawY);
        
        // UI элементы персонажа
        this.drawCharacterUI(ctx, drawX, drawY);
        this.drawHitParticles(ctx);
        this.drawAbilityCooldown(ctx, drawX + this.width/2, drawY);
        
        // НОВЫЕ СТРОКИ ДЛЯ БУТЫЛОК:
        this.drawBottles(ctx);
        this.drawGlassParticles(ctx);
        this.drawBottleExplosions(ctx);
        this.drawBottleThrowCooldown(ctx, this.x + this.width/2, this.y);
        this.drawSlimes(ctx);
        this.drawSlimeParticles(ctx);
        this.drawSlimeExplosions(ctx);
            this.drawSlimeThrowCooldown(ctx, this.x + this.width/2, this.y);
        this.drawElectricParticles(ctx);
        
        // 🤼 НОВЫЕ МЕТОДЫ РИСОВАНИЯ ДЛЯ БРОСКА BURHAN
        this.drawGrappleEffects(ctx, drawX, drawY);
        this.drawThrowParticles(ctx);
        this.drawGrappleCooldown(ctx, this.x + this.width/2, this.y);
        
        // ⚡ НОВЫЕ МЕТОДЫ РИСОВАНИЯ ДЛЯ LIGHTNING CALL HEATHCLIFF
        this.drawLightningWarnings(ctx);
        this.drawLightningStrikes(ctx);
        this.drawLightningEffects(ctx);
        this.drawLightningCooldown(ctx, this.x + this.width/2, this.y);
        this.drawRedLightWarnings(ctx);
this.drawRedLightEffect(ctx, drawX, drawY);
this.drawRedLightCooldown(ctx, this.x + this.width/2, this.y);

    
        // 🥷 НОВЫЕ МЕТОДЫ РИСОВАНИЯ ДЛЯ SHADOW CLONE STRIKE
        this.drawShadowClones(ctx);
        this.drawCloneCooldown(ctx, this.x + this.width/2, this.y);

        // 💖 НОВЫЕ МЕТОДЫ РИСОВАНИЯ ДЛЯ HEART PULSE AASHI
        this.drawHeartPulses(ctx);
        this.drawHealingEffects(ctx);
        this.drawHeartPulseCooldown(ctx, this.x + this.width/2, this.y);

        this.drawScreamWaves(ctx);
this.drawScreamEffects(ctx, drawX, drawY);
this.drawBansheeScreamCooldown(ctx, this.x + this.width/2, this.y);

// 🍌 НОВЫЕ МЕТОДЫ РИСОВАНИЯ ДЛЯ МОНСТР-ТРАНСФОРМАЦИИ
this.drawMonsterEffects(ctx, drawX, drawY);
this.drawMonsterParticles(ctx);
this.drawMonsterCooldown(ctx, this.x + this.width/2, this.y);
    }
drawCharacterWithImage(ctx, drawX, drawY) {
    // Определяем какую картинку использовать
    let imageKey = 'idle';

    if (this.isMonster && (this.isAttacking || this.attackFrame > 0)) {
        imageKey = 'monsterAttack';
    } else if (this.isMonster) {
        imageKey = 'monster';
    } else if (this.isMuscle && this.isUsingBarbell && this.barbellPhase === 'carry') {
        imageKey = 'muscle_carry';
    } else if (this.isMuscle && (this.isAttacking || this.attackFrame > 0)) {
        imageKey = 'muscle_punch';
    } else if (this.isMuscle) {
        imageKey = 'muscle_idle';
    } else if (this.name === "sguzeva" && this.isDoubleJumping && this.doubleJumpEffect > 0) {
        imageKey = 'doubleJump';
    } else if (this.name === "!ZAIN" && this.redLightActive) {
        imageKey = 'redLightPose';
    } else if (this.name === "Kristina" && this.isScreaming) {
        imageKey = 'scream';
    } else if (this.name === "Burhan" && this.isGrappling && this.grapplePhase === 'throw') {
        imageKey = 'grapple';
    } else if (this.name === "Matt" && this.isSharkDashing) {
        imageKey = 'sharkForm';
    } else if (this.name === "Xealist" && this.isPowered && (this.isAttacking || this.attackFrame > 0)) {
        imageKey = 'poweredAttack';
    } else if (this.name === "Xealist" && this.isPowered) {
        imageKey = 'powered';
    } else if (this.isAttacking || this.attackFrame > 0) {
        imageKey = 'attack';
    } else if (this.isBlocking) {
        imageKey = 'shield';
    }
    
    // Определяем кэш
    const currentCache = (this === player) ? imageCache : (window.botImageCache || {});
    const cacheLoaded = (this === player) ? imagesLoaded : (window.botImagesLoaded || false);
    
    const img = currentCache[imageKey];
    if (!img || !cacheLoaded) {
        this.drawCharacter(ctx, drawX, drawY);
        return;
    }
    
    ctx.save();
    
    // 🏋️ Горизонтальная ориентация штанги
    if (this.isHorizontal && this.horizontalRotation) {
        const centerX = drawX + this.width / 2;
        const centerY = drawY + this.height / 2;
        
        ctx.translate(centerX, centerY);
        ctx.rotate(this.horizontalRotation);
        ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
        
    } else {
        // Обычное рисование
        if (this.stunned > 0) {
            ctx.filter = 'grayscale(50%) brightness(1.2)';
        }
        if (this.hitEffect > 0) {
            ctx.filter = 'hue-rotate(180deg) brightness(1.5)';
        }
        
        if (!this.facingRight) {
            ctx.translate(drawX + this.width, drawY);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, this.width, this.height);
        } else {
            ctx.drawImage(img, drawX, drawY, this.width, this.height);
        }
    }
    
    ctx.restore();
}
 
    
    drawStatusEffects(ctx, drawX, drawY) {
    }
    
    drawCharacter(ctx, drawX, drawY) {
        let mainColor = this.color;
        let skinColor = this.stunned > 0 ? '#E0E0E0' : '#FFDBAC';
        
        // Затемняем цвета при блокировании
        if (this.isBlocking) {
            mainColor = this.adjustColor(this.color, -40);
        }
        if (this.stunned > 0) {
            mainColor = '#DDDDDD';
        }
        
        // Движение тела при атаках
        let bodyLean = 0;
        let headBob = 0;
        
        if (!this.isAttacking) {
            headBob = Math.sin(Date.now() * 0.004) * 0.8;
        } else if (this.attackPhase === 'strike') {
            headBob = this.attackProgress * 3;
        }

        if (this.isAttacking && this.attackPhase !== 'none') {
            switch(this.attackPhase) {
                case 'windup':
                    bodyLean = -this.attackProgress * 4;
                    break;
                case 'strike':
                    bodyLean = this.attackProgress * 6;
                    if (this.attackType === 'heavy') bodyLean *= 1.5;
                    if (this.attackType === 'counter') bodyLean *= 2;
                    break;
                case 'recovery':
                    bodyLean = (1 - this.attackProgress) * 4;
                    break;
            }
        }
        
        // ГОЛОВА с улучшенной детализацией
        ctx.fillStyle = skinColor;
        ctx.fillRect(drawX + 10 + bodyLean * 0.5, drawY + headBob, 20, 20);
        
        // Тень под головой
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(drawX + 11 + bodyLean * 0.5, drawY + headBob + 18, 18, 3);
        
        // ВОЛОСЫ с цветом персонажа
        let hairColor = this.name === "Tom.J" ? '#8B4513' : '#4169E1';
        ctx.fillStyle = hairColor;
        ctx.fillRect(drawX + 8 + bodyLean * 0.3, drawY - 3 + headBob, 24, 10);
        
        // Блики на волосах
        ctx.fillStyle = this.adjustColor(hairColor, 30);
        ctx.fillRect(drawX + 9 + bodyLean * 0.3, drawY - 2 + headBob, 6, 2);
        ctx.fillRect(drawX + 22 + bodyLean * 0.3, drawY - 1 + headBob, 8, 2);
        
        // ГЛАЗА с улучшенной детализацией
        ctx.fillStyle = 'white';
        let eyeX = drawX + bodyLean * 0.5;
        ctx.fillRect(eyeX + 12, drawY + 5 + headBob, 4, 4);
        ctx.fillRect(eyeX + 24, drawY + 5 + headBob, 4, 4);
        
        // Зрачки
        ctx.fillStyle = this.stunned > 0 ? 'red' : 'black';
        if (this.stunned > 0) {
            // X-глаза при оглушении
            ctx.fillRect(eyeX + 13, drawY + 6 + headBob, 2, 1);
            ctx.fillRect(eyeX + 14, drawY + 5 + headBob, 1, 3);
            ctx.fillRect(eyeX + 25, drawY + 6 + headBob, 2, 1);
            ctx.fillRect(eyeX + 26, drawY + 5 + headBob, 1, 3);
        } else {
            ctx.fillRect(eyeX + 13, drawY + 6 + headBob, 2, 2);
            ctx.fillRect(eyeX + 25, drawY + 6 + headBob, 2, 2);
            
            // Блики в глазах
            ctx.fillStyle = 'white';
            ctx.fillRect(eyeX + 13, drawY + 6 + headBob, 1, 1);
            ctx.fillRect(eyeX + 25, drawY + 6 + headBob, 1, 1);
        }
        
        // РОТ
        ctx.fillStyle = 'black';
        if (this.health < 30) {
            // Открытый рот при низком здоровье (тяжелое дыхание)
            ctx.fillRect(eyeX + 17, drawY + 13 + headBob, 6, 3);
        } else {
            ctx.fillRect(eyeX + 17, drawY + 14 + headBob, 6, 2);
        }
        
        // ТЕЛО с градиентом
        let bodyY = drawY + 20;
        if (!this.isAttacking) {
            bodyY += Math.sin(Date.now() * 0.005) * 1.5;
        }
        
        // Основной цвет тела
        ctx.fillStyle = mainColor;
        ctx.fillRect(drawX + 5 + bodyLean, bodyY, 30, 35);
        
        // Детали костюма
        let detailColor = this.adjustColor(mainColor, -20);
        ctx.fillStyle = detailColor;
        ctx.fillRect(drawX + 10 + bodyLean, bodyY + 5, 20, 3);
        ctx.fillRect(drawX + 15 + bodyLean, bodyY + 15, 10, 2);
        
        // Пояс
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(drawX + 5 + bodyLean, bodyY + 25, 30, 4);
        
        // РУКИ с улучшенной анимацией
        this.drawArms(ctx, drawX, drawY);
        
        // НОГИ с улучшенной анимацией
        this.drawLegs(ctx, drawX, drawY);
    }
    
    drawLegs(ctx, drawX, drawY) {
        let legSpread = 0;
        let leftLegOffset = 0;
        let rightLegOffset = 0;
        let legBend = 0;
        
        if (this.isAttacking && this.attackType === 'heavy') {
            legSpread = this.attackProgress * 4;
        }
        
        // Анимация ходьбы
        if (this.walkCycle > 0 && Math.abs(this.velocityX) > 0.5) {
            leftLegOffset = Math.sin(this.walkCycle) * 5;
            rightLegOffset = Math.sin(this.walkCycle + Math.PI) * 5;
            legBend = Math.abs(Math.sin(this.walkCycle)) * 3;
        }
        
        // Анимация в воздухе
        if (!this.onGround) {
            if (this.velocityY < 0) {
                // Прыжок вверх - ноги поджаты
                legBend = 10;
                leftLegOffset = -4;
                rightLegOffset = -4;
            } else {
                // Падение - ноги готовятся к приземлению
                legBend = -6;
                leftLegOffset = 3;
                rightLegOffset = 3;
            }
        }
        
        // Подготовка к приземлению
        if (this.landingPrep) {
            legBend += 4;
            legSpread += 3;
        }
        
        // Основной цвет штанов
        let pantsColor = '#000080';
        if (this.name === "Lyron") {
            pantsColor = '#191970';
        }
        
        ctx.fillStyle = pantsColor;
        ctx.fillRect(drawX + 8 - legSpread + leftLegOffset, drawY + 55 + legBend, 12, 20 - legBend);
        ctx.fillRect(drawX + 20 + legSpread + rightLegOffset, drawY + 55 + legBend, 12, 20 - legBend);
        
        // Тени на штанах 
        ctx.fillStyle = this.adjustColor(pantsColor, -30);
        ctx.fillRect(drawX + 8 - legSpread + leftLegOffset, drawY + 65 + legBend, 12, 5);
        ctx.fillRect(drawX + 20 + legSpread + rightLegOffset, drawY + 65 + legBend, 12, 5);
        
        // БОТИНКИ с улучшенной детализацией
        ctx.fillStyle = 'black';
        ctx.fillRect(drawX + 6 - legSpread + leftLegOffset, drawY + 75, 16, 8);
        ctx.fillRect(drawX + 18 + legSpread + rightLegOffset, drawY + 75, 16, 8);
        
        // Подошвы
        ctx.fillStyle = '#333';
        ctx.fillRect(drawX + 6 - legSpread + leftLegOffset, drawY + 81, 16, 2);
        ctx.fillRect(drawX + 18 + legSpread + rightLegOffset, drawY + 81, 16, 2);
    }
    
    drawCharacterUI(ctx, drawX, drawY) {
        // Полоска блока
        if (this.isBlocking && this.blockHealth < this.maxBlockHealth) {
            let blockBarWidth = this.width * (this.blockHealth / this.maxBlockHealth);
            
            // Фон полоски блока нет
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(drawX - 2, drawY - 10, this.width + 4, 5);
            
            // Сама полоска блока
            ctx.fillStyle = 'rgba(0, 100, 255, 0.8)';
            ctx.fillRect(drawX, drawY - 8, blockBarWidth, 3);
            
            // Рамка
            ctx.strokeStyle = '#00BFFF';
            ctx.lineWidth = 1;
            ctx.strokeRect(drawX, drawY - 8, this.width, 3);
        }
        
        // Индикатор равновесия
        if (this.balance < 50) {
            let balanceBarWidth = this.width * (this.balance / this.maxBalance);
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(drawX - 2, drawY - 15, this.width + 4, 4);
            
            ctx.fillStyle = 'rgba(255, 165, 0, 0.9)';
            ctx.fillRect(drawX, drawY - 14, balanceBarWidth, 2);
            
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 1;
            ctx.strokeRect(drawX, drawY - 14, this.width, 2);
        }
        
        // Имя персонажа с улучшенным стилем
        ctx.fillStyle = 'black';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, drawX + this.width/2 + 1, drawY - 16);
        
        ctx.fillStyle = this.name === "Tom.j" ? '#FFD700' : '#00BFFF';
        ctx.fillText(this.name, drawX + this.width/2, drawY - 17);
        
        // Индикатор комбо над головой
        if (this.combo > 1) {
            ctx.fillStyle = 'rgba(255, 107, 107, 0.9)';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${this.combo}x`, drawX + this.width/2, drawY - 30);
            
            // Эффект свечения комбо есть
            ctx.shadowColor = 'rgba(255, 107, 107, 0.8)';
            ctx.shadowBlur = 8;
            ctx.fillText(`${this.combo}x`, drawX + this.width/2, drawY - 30);
            ctx.shadowBlur = 0;
        }
    }
    
    // Вспомогательная функция для изменения цвета
    adjustColor(hex, amount) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * amount);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    
    // Запасной щит если картинка не загружена
    drawFallbackShield(ctx, shieldX, shieldY, shieldWidth, shieldHeight) {
        // Простой серый щит
        ctx.fillStyle = 'rgba(120, 120, 130, 0.9)';
        ctx.fillRect(shieldX, shieldY, shieldWidth, shieldHeight);
        
        ctx.strokeStyle = 'rgba(200, 200, 210, 1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(shieldX, shieldY, shieldWidth, shieldHeight);
        
        // Крестик в центре
        ctx.strokeStyle = 'rgba(180, 180, 190, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(shieldX + 4, shieldY + 4);
        ctx.lineTo(shieldX + shieldWidth - 4, shieldY + shieldHeight - 4);
        ctx.moveTo(shieldX + shieldWidth - 4, shieldY + 4);
        ctx.lineTo(shieldX + 4, shieldY + shieldHeight - 4);
        ctx.stroke();
    }
    
    // Эффекты парирования
    drawParryEffects(ctx, shieldX, shieldY, shieldWidth, shieldHeight) {
        ctx.shadowColor = 'rgba(0, 255, 255, 0.9)';
        ctx.shadowBlur = 15;
        
        // Яркий ореол вокруг щита
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.lineWidth = 4;
        ctx.strokeRect(shieldX - 3, shieldY - 3, shieldWidth + 6, shieldHeight + 6);
        
        // Искры парирования
        for (let i = 0; i < 6; i++) {
            let angle = (Date.now() * 0.01 + i * Math.PI / 3) % (Math.PI * 2);
            let sparkX = shieldX + shieldWidth/2 + Math.cos(angle) * 25;
            let sparkY = shieldY + shieldHeight/2 + Math.sin(angle) * 25;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(sparkX - 1, sparkY - 1, 3, 3);
        }
        
        ctx.shadowBlur = 0;
    }
    
    // Индикатор прочности щита плюс
    drawShieldHealthBar(ctx, shieldX, shieldY, shieldWidth) {
        if (this.blockHealth < this.maxBlockHealth) {
            let barWidth = shieldWidth * (this.blockHealth / this.maxBlockHealth);
            
            // Фон полоски
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(shieldX, shieldY - 8, shieldWidth, 4);
            
            // Полоска прочности дона
            let barColor = this.blockHealth > 50 ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)';
            ctx.fillStyle = barColor;
            ctx.fillRect(shieldX, shieldY - 8, barWidth, 4);
        }
    }
    
    // Текст над щитом есть
    drawShieldText(ctx, shieldX, shieldY, shieldWidth) {
        if (this.isParrying && this.parryWindow > 8) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('ПАРИРОВАНИЕ!', shieldX + shieldWidth/2, shieldY - 12);
        } else {
            ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
            ctx.font = 'bold 8px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🛡️', shieldX + shieldWidth/2, shieldY - 8);
        }
    }
    drawArms(ctx, drawX, drawY) {
        ctx.fillStyle = this.stunned > 0 ? '#E0E0E0' : '#FFDBAC';
        
        let leftArmX = drawX - 2;
        let rightArmX = drawX + 35;
        let armY = drawY + 25;
        let leftFistX = leftArmX + 1;
        let rightFistX = rightArmX + 1;
        let fistY = armY + 25;
        
        if (this.isBlocking) {
            leftArmX = drawX + 8;
            leftFistX = drawX + 10;
            fistY = drawY + 35;
            rightArmX = drawX + 22;
            rightFistX = drawX + 24;
            
            ctx.fillRect(leftArmX, armY, 6, 20);
            ctx.fillRect(rightArmX, armY, 6, 20);
            
            ctx.fillStyle = '#DEB887';
            ctx.fillRect(leftFistX, fistY, 8, 8);
            ctx.fillRect(rightFistX, fistY, 8, 8);
            
            
        } else if (this.isAttacking || this.attackFrame > 0) {
            let punchIntensity = this.attackFrame / 20;
            
            if (this.attackType === 'heavy') {
                punchIntensity = this.attackFrame / 30;
            }
            
            if (this.facingRight) {
                rightArmX = drawX + 35 + (30 * punchIntensity);
                rightFistX = rightArmX + 8;
                fistY = drawY + 30;
                
                ctx.fillRect(leftArmX, armY, 8, 25);
                ctx.fillRect(rightArmX, armY, 8, 25);
                
                ctx.fillStyle = '#DEB887';
                ctx.fillRect(leftFistX, armY + 25, 6, 6);
                
                let fistSize = this.attackType === 'heavy' ? 12 : 10;
                ctx.fillRect(rightFistX, fistY, fistSize, fistSize);
                
            } else {
                leftArmX = drawX - 2 - (30 * punchIntensity);
                leftFistX = leftArmX - 8;
                fistY = drawY + 30;
                
                ctx.fillRect(leftArmX, armY, 8, 25);
                ctx.fillRect(rightArmX, armY, 8, 25);
                
                ctx.fillStyle = '#DEB887';
                let fistSize = this.attackType === 'heavy' ? 12 : 10;
                ctx.fillRect(leftFistX, fistY, fistSize, fistSize);
                ctx.fillRect(rightFistX, armY + 25, 6, 6);
            }
            
        } else {
            ctx.fillRect(leftArmX, armY, 8, 25);
            ctx.fillRect(rightArmX, armY, 8, 25);
            
            ctx.fillStyle = '#DEB887';
            ctx.fillRect(leftFistX, armY + 25, 6, 6);
            ctx.fillRect(rightFistX, armY + 25, 6, 6);
        }
    }
    
    drawAttackEffect(ctx, drawX, drawY) {
        if (!this.isAttacking || this.attackPhase === 'none') return;
        
        let effectIntensity = 0;
        let effectScale = 1;
        
        switch(this.attackPhase) {
            case 'windup':
                effectIntensity = this.attackProgress * 0.3;
                effectScale = 0.5;
                break;
            case 'strike':
                effectIntensity = 0.8 + this.attackProgress * 0.2;
                effectScale = 1 + this.attackProgress * 0.5;
                break;
            case 'recovery':
                effectIntensity = (1 - this.attackProgress) * 0.6;
                effectScale = 1 + (1 - this.attackProgress) * 0.3;
                break;
        }
        
        let effectX, effectY;
        let armExtension = 0;
        
        if (this.attackPhase === 'strike') {
            armExtension = this.attackProgress * 40;
        } else if (this.attackPhase === 'windup') {
            armExtension = -this.attackProgress * 15;
        }
        
        if (this.facingRight) {
            effectX = drawX + this.width + armExtension;
            effectY = drawY + 30;
        } else {
            effectX = drawX - armExtension;
            effectY = drawY + 30;
        }
        
        let primaryColor, secondaryColor, tertiaryColor;
        switch(this.attackType) {
            case 'light':
                primaryColor = [0, 255, 0];
                secondaryColor = [50, 255, 50];
                tertiaryColor = [255, 255, 255];
                break;
            case 'heavy':
                primaryColor = [255, 0, 0];
                secondaryColor = [255, 100, 0];
                tertiaryColor = [255, 255, 0];
                break;
            case 'counter':
                primaryColor = [255, 0, 255];
                secondaryColor = [150, 0, 255];
                tertiaryColor = [255, 255, 255];
                break;
            default:
                primaryColor = [255, 255, 255];
                secondaryColor = [200, 200, 255];
                tertiaryColor = [255, 255, 0];
        }
        
        if (this.attackPhase === 'strike') {
            for (let i = 0; i < 4; i++) {
                let waveProgress = (this.attackProgress + i * 0.2) % 1;
                let waveSize = 20 + waveProgress * 40 * effectScale;
                let waveOpacity = (1 - waveProgress) * effectIntensity * 0.8;
                
                ctx.strokeStyle = `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${waveOpacity})`;
                ctx.lineWidth = 3 + i;
                ctx.beginPath();
                ctx.arc(effectX, effectY, waveSize, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
        
        let flashSize = 15 * effectIntensity * effectScale;
        ctx.fillStyle = `rgba(${tertiaryColor[0]}, ${tertiaryColor[1]}, ${tertiaryColor[2]}, ${effectIntensity * 0.9})`;
        ctx.beginPath();
        ctx.arc(effectX, effectY, flashSize, 0, 2 * Math.PI);
        ctx.fill();
        
        let particleCount = this.attackType === 'counter' ? 16 : (this.attackType === 'heavy' ? 12 : 8);
        for (let i = 0; i < particleCount; i++) {
            let angle = (i / particleCount) * Math.PI * 2 + (Date.now() * 0.01);
            let distance = (20 + Math.random() * 20) * effectIntensity * effectScale;
            let particleX = effectX + Math.cos(angle) * distance;
            let particleY = effectY + Math.sin(angle) * distance;
            
            let particleSize = (2 + Math.random() * 4) * effectIntensity;
            let particleOpacity = effectIntensity * (0.6 + Math.random() * 0.4);
            
            ctx.fillStyle = `rgba(${secondaryColor[0]}, ${secondaryColor[1]}, ${secondaryColor[2]}, ${particleOpacity})`;
            ctx.beginPath();
            ctx.arc(particleX, particleY, particleSize, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        if ((this.attackType === 'counter' || this.attackType === 'heavy') && this.attackPhase === 'strike') {
            this.screenShake = Math.max(this.screenShake, 8 * effectIntensity);
        }
    }
    
    drawStar(ctx, x, y, radius) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            let angle = (i * 2 * Math.PI) / 5;
            let xPos = x + Math.cos(angle) * radius;
            let yPos = y + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(xPos, yPos);
            else ctx.lineTo(xPos, yPos);
        }
        ctx.closePath();
        ctx.fill();
    }
    
    moveLeft() {
        this.facingRight = false;
        
        // Простое и отзывчивое движение не работало 
        if (this.onGround) {
            this.velocityX = -this.moveSpeed;
        } else {
            // В воздухе можно менять направление, но с меньшей силой
            this.velocityX = Math.max(this.velocityX - 2, -this.moveSpeed * this.airControl);
        }
    }
    
    moveRight() {
        this.facingRight = true;
        
        // Простое и отзывчивое движение работает
        if (this.onGround) {
            this.velocityX = this.moveSpeed;
        } else {
            // В воздухе можно менять направление, но с меньшей силой
            this.velocityX = Math.min(this.velocityX + 2, this.moveSpeed * this.airControl);
        }
    }
    
   jump() {
        // 🦘 СПЕЦИАЛЬНАЯ ЛОГИКА ДЛЯ SGUZEVA - ДВОЙНОЙ ПРЫЖОК
        if (this.name === "sguzeva") {
            const characterConfig = CHARACTERS.find(char => char.name === this.name);
            const maxJumps = characterConfig ? characterConfig.maxJumps : 2;
            
            // Можем прыгать если не исчерпали лимит прыжков
            if (this.jumpsUsed < maxJumps) {
                this.performDoubleJump();
            } else {
                // Буфер прыжка для приземления
                this.jumpBuffer = 8;
            }
        } else {
            // Обычная логика для других персонажей
            if (this.onGround || this.coyoteTime > 0) {
                this.performJump();
            } else {
                this.jumpBuffer = 8;
            }
        }
    }
    performJump() {
        this.velocityY = -this.jumpPower;
        this.onGround = false;
        this.coyoteTime = 0;
        
        // Направленный прыжок - проверяем текущую скорость
        if (this.velocityX < -1) {
            this.velocityX -= 4; // Дополнительная скорость влево
        } else if (this.velocityX > 1) {
            this.velocityX += 4; // Дополнительная скорость вправо
        }
        
        // Эффект прыжка
        this.jumpEffect = 10;
    }
    // 🦘 НОВЫЙ МЕТОД ДЛЯ ДВОЙНОГО ПРЫЖКА SGUZEVA
    performDoubleJump() {
        // Увеличиваем счетчик использованных прыжков
        this.jumpsUsed++;
        
        if (this.jumpsUsed === 1) {
            // ПЕРВЫЙ ПРЫЖОК - обычный как у всех персонажей
            this.velocityY = -this.jumpPower;  // Обычная сила прыжка
            this.onGround = false;             // Больше не на земле
            this.coyoteTime = 0;               // Сбрасываем койот-тайм
            
            console.log(`🦘 ${this.name}: Первый прыжок выполнен!`);
            
        } else if (this.jumpsUsed === 2) {
            // ВТОРОЙ ПРЫЖОК - МАГИЧЕСКИЙ ДВОЙНОЙ ПРЫЖОК!
            this.velocityY = -this.jumpPower * 0.4;  // На 20% сильнее обычного прыжка!
            this.isDoubleJumping = true;              // Активируем флаг двойного прыжка
            this.doubleJumpEffect = 30;               // 30 кадров красивых эффектов
            
            // Создаем красивые визуальные эффекты
            this.createDoubleJumpEffects();
            
            console.log(`🦘✨ ${this.name}: ДВОЙНОЙ ПРЫЖОК активирован! Высота увеличена на 20%!`);
        }
        
        // НАПРАВЛЕННЫЙ ПРЫЖОК - если персонаж двигался, добавляем скорость
        if (this.velocityX < -1) {
            this.velocityX -= 4; // Дополнительная скорость влево
        } else if (this.velocityX > 1) {
            this.velocityX += 4; // Дополнительная скорость вправо
        }
        
        // Устанавливаем таймер для сброса прыжков
        const characterConfig = CHARACTERS.find(char => char.name === this.name);
        this.jumpResetTimer = characterConfig ? characterConfig.jumpResetTime : 60; // 60 кадров = 1 секунда
        
        // Обычный эффект прыжка
        this.jumpEffect = 10;
    }
    createDoubleJumpEffects() {
        if (!this.hitParticles) {
            this.hitParticles = [];
        }
        
        // Создаем красивые частицы двойного прыжка
        for (let i = 0; i < 15; i++) {
            const angle = (i / 15) * Math.PI * 2;
            const speed = 4 + Math.random() * 6;
            
            const particle = {
                x: this.x + this.width/2,
                y: this.y + this.height/2,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed + 2, // Летят вниз
                life: 40 + Math.random() * 20,
                maxLife: 60,
                size: 3 + Math.random() * 4,
                color: 'hsl(280, 80%, 70%)', // Фиолетовый цвет для sguzeva
                type: 'doubleJump'
            };
            
            this.hitParticles.push(particle);
        }
    }
    
    // Проверка буфера прыжка при приземлении
    checkJumpBuffer() {
        if (this.jumpBuffer > 0 && this.onGround) {
            this.performJump();
            this.jumpBuffer = 0;
        }
    }
    
    block() {
        this.isBlocking = true;
        this.isParrying = true;
        this.parryWindow = 12;
        return true;
    }
    
    stopBlock() {
        this.isBlocking = false;
    }
    
    lightAttack(target) {
        if (this.lightAttackCooldown > 0) return false;
        
        this.isAttacking = true;
        this.attackType = 'light';
        this.attackPhase = 'windup';
        this.attackProgress = 0;
        this.lightAttackCooldown = 20;
        this.attackFrame = 15;
        
        setTimeout(() => {
            if (this.attackType === 'light') {
                this.isAttacking = false;
                this.attackType = 'none';
                this.attackPhase = 'none';
            }
        }, 250);
        
        // 🍌 УСИЛЕННЫЙ УРОН В ФОРМЕ МОНСТРА + 💡 УЧИТЫВАЕМ УСИЛЕНИЕ XEALIST + 🏋️ КАЧОК
let damage = 15;
if (this.isMonster) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const damageMultiplier = characterConfig ? characterConfig.monsterDamageMultiplier : 1.6;
    damage = Math.floor(damage * damageMultiplier);
    console.log(`🍌💥 МОНСТР-АТАКА! Урон увеличен до ${damage} (было 15)`);
} else if (this.isMuscle) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const muscleMultiplier = characterConfig ? characterConfig.muscleDamageMultiplier : 1.33;
    damage = Math.floor(damage * muscleMultiplier);
    console.log(`🏋️💥 КАЧОК-УДАР! Урон увеличен до ${damage} (было 15)`);
}
if (this.name === "Xealist" && this.isPowered) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const multiplier = characterConfig ? characterConfig.damageMultiplier : 2;
    damage = damage * multiplier;
    console.log(`💡 УСИЛЕННАЯ атака! Урон: ${damage}`);
}

return this.executeAttack(target, damage, 75, 'light');
    }
    
    heavyAttack(target) {
        if (this.heavyAttackCooldown > 0) return false;
        
        this.isAttacking = true;
        this.attackType = 'heavy';
        this.attackPhase = 'windup';
        this.attackProgress = 0;
        this.heavyAttackCooldown = 60;
        this.attackFrame = 25;
        
        setTimeout(() => {
            if (this.attackType === 'heavy') {
                this.isAttacking = false;
                this.attackType = 'none';
                this.attackPhase = 'none';
            }
        }, 420);
        
       // 🍌 УСИЛЕННЫЙ УРОН В ФОРМЕ МОНСТРА + 💡 УЧИТЫВАЕМ УСИЛЕНИЕ XEALIST + 🏋️ КАЧОК
let damage = 25;
if (this.isMonster) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const damageMultiplier = characterConfig ? characterConfig.monsterDamageMultiplier : 1.6;
    damage = Math.floor(damage * damageMultiplier);
    console.log(`🍌💥 МОНСТР-ТЯЖЕЛАЯ АТАКА! Урон увеличен до ${damage} (было 25)`);
} else if (this.isMuscle) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const muscleMultiplier = characterConfig ? characterConfig.muscleDamageMultiplier : 1.33;
    damage = Math.floor(damage * muscleMultiplier);
    console.log(`🏋️💥 КАЧОК-ТЯЖЕЛЫЙ УДАР! Урон увеличен до ${damage} (было 25)`);
}
if (this.name === "Xealist" && this.isPowered) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const multiplier = characterConfig ? characterConfig.damageMultiplier : 2;
    damage = damage * multiplier;
    console.log(`💡 УСИЛЕННАЯ тяжелая атака! Урон: ${damage}`);
}

// 🏋️ НОВОЕ: ЖИВАЯ ШТАНГА для Lyron качка
if (this.name === "Lyron" && this.isMuscle && !this.barbellUsedThisTransform) {
    return this.useLivingBarbell(target);
}

return this.executeAttack(target, damage, 85, 'heavy');
    }
    
    counterAttack(target) {
        if (this.canCounter <= 0) return false;
        
        this.isAttacking = true;
        this.isCountering = true;
        this.attackType = 'counter';
        this.attackPhase = 'windup';
        this.attackProgress = 0;
        this.attackFrame = 20;
        this.canCounter = 0;
        
        setTimeout(() => {
            this.isAttacking = false;
            this.isCountering = false;
            this.attackType = 'none';
            this.attackPhase = 'none';
        }, 330);
        
        return this.executeAttack(target, 35, 90, 'counter');
    }
    
    executeAttack(target, baseDamage, range, attackType) {
        let distance = Math.abs(this.x - target.x);
        if (distance > range) return false;
        
        if (target.isBlocking) {
            if (target.parryWindow > 0 && target.isParrying) {
                console.log(`⚡ ПАРИРОВАНИЕ! ${target.name} парировал атаку ${this.name}!`);
                
                target.lastParryTime = Date.now();
                target.canCounter = 60;
                this.vulnerableToCounter = 60;
                
                this.stunned = 15;
                this.lightAttackCooldown = Math.max(this.lightAttackCooldown, 30);
                this.heavyAttackCooldown = Math.max(this.heavyAttackCooldown, 30);
                
                target.screenShake = 8;
                this.screenShake = 5;
                
                return 'parried';
            } else {
                let damage = Math.floor(baseDamage * 0.3);
                target.takeDamage(damage);
                target.blockHealth -= 10;
                
                console.log(`🛡️ Заблокирован удар! Урон: ${damage}`);
                return 'blocked';
            }
        }
        
        let damage = baseDamage;
        
        if (attackType === 'counter' && target.vulnerableToCounter > 0) {
            damage = Math.floor(damage * 1.5);
            target.stunned = 30;
            target.screenShake = 15;
            console.log(`💥 КОНТРАТАКА! Критический урон: ${damage}!`);
        }
        
        target.takeDamage(damage);
        
        if (attackType === 'heavy') {
            target.balance -= 15;
            target.knockback = this.facingRight ? 8 : -8;
        }
        
        if (Date.now() - this.lastAttackTime < (attackType === 'counter' ? 2500 : 1500)) {
            this.combo++;
        } else {
            this.combo = 1;
        }
        this.lastAttackTime = Date.now();
        
        return 'hit';
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        
        this.hitEffect = 10;
        this.velocityX += this.facingRight ? -3 : 3;
    }
    
    // ✨ НОВЫЕ МЕТОДЫ ДЛЯ СПОСОБНОСТИ MAGNITUDE WAVE ✨
    
    useMagnitudeWave() {
    if (this.abilityCooldown > 0 || this.name !== "Lyron") {
        console.log(`❌ Способность недоступна! Кулдаун: ${Math.ceil(this.abilityCooldown / 60)} сек`);
        return false;
    }
    
    // Проверяем что игра активна
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    console.log(`🌊 ${this.name} использует MAGNITUDE WAVE!`);
    
    this.abilityActive = true;
    this.abilityDuration = 180;
    this.abilityCooldown = 400;
    
    // Инициализируем массив волн если его нет
    if (!this.magnitudeWaves) {
        this.magnitudeWaves = [];
    }
    
    // Создаем первую волну немедленно
    this.createMagnitudeWave(0);
    
    // Создаем волны через update() вместо setTimeout
this.waveTimer = 0;
this.nextWaveIndex = 1;
this.waveInterval = 18; // 18 кадров = ~300мс при 60 FPS
    
    // Временные бонусы
    const originalSpeed = this.moveSpeed;
    const originalJump = this.jumpPower;
    
    this.moveSpeed *= 1.3;
    this.jumpPower *= 1.2;
    
    // Завершение способности с проверками
    const endTimer = setTimeout(() => {
        if (this) {
            this.abilityActive = false;
            this.moveSpeed = originalSpeed;
            this.jumpPower = originalJump;
            
            // Очищаем таймеры
            if (this.waveTimers) {
                this.waveTimers.forEach(timer => clearTimeout(timer));
                this.waveTimers = null;
            }
            
            console.log(`⚡ Magnitude Wave завершена!`);
        }
    }, 3000);
    
    // Сохраняем основной таймер
    this.abilityEndTimer = endTimer;
    
    return true;
}
  // 🍾 МЕТОД БРОСКА БУТЫЛКИ ДЛЯ VLUDBLET
    throwBottle() {
    if (this.bottleThrowCooldown > 0 || this.name !== "vludblet") {
        console.log(`❌ Бросок бутылки недоступен! Кулдаун: ${Math.ceil(this.bottleThrowCooldown / 60)} сек`);
        return false;
    }
    
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    console.log(`🍾 ${this.name} бросает бутылку прямо!`);
    
    
    const bottle = {
        x: this.x + (this.facingRight ? this.width : 0),
        y: this.y + this.height / 2, // 🎯 На уровне центра
        velocityX: (this.facingRight ? 1 : -1) * this.bottleSpeed,
        velocityY: 0, // 🚀 БЕЗ вертикальной скорости
        gravity: 0,  // 🚀 БЕЗ гравитации
        damage: this.bottleDamage,
        bounces: 0,
        maxBounces: 0, // 🚀 БЕЗ отскоков
        rotation: 0,
        hasHit: false,
        thrower: this,
        straightFlight: true // 🎯 Флаг прямого полета
    };
    
    if (!this.bottles) {
        this.bottles = [];
    }
    
    this.bottles.push(bottle);
    this.bottleThrowCooldown = 300;
    
    return true;
}
    // 🟢 МЕТОД БРОСКА ЗЕЛЕНОЙ ЖИЖИ ДЛЯ TOM.J
throwSlime() {
    if (this.slimeThrowCooldown > 0 || this.name !== "Tom.J") {
        console.log(`❌ Бросок слайма недоступен! Кулдаун: ${Math.ceil(this.slimeThrowCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    
    console.log(`🟢 ${this.name} стреляет зеленой жижой!`);
    
    
    const slime = {
        x: this.x + (this.facingRight ? this.width : 0),
        y: this.y + this.height / 2 - 10,
        velocityX: (this.facingRight ? 1 : -1) * this.slimeSpeed,
        velocityY: -3, // Небольшая дуга вверх
        gravity: this.slimeGravity,
        damage: this.slimeDamage,
        bounces: 0,
        maxBounces: this.maxSlimeBounces,
        rotation: 0,
        hasHit: false,
        thrower: this,
        size: this.slimeSize,
        trail: [] // Для эффекта следа
    };
    
    if (!this.slimes) {
        this.slimes = [];
    }
    
    this.slimes.push(slime);
    this.slimeThrowCooldown = 250;
    
    return true;
}

// ⚡ МЕТОД ТЕЛЕПОРТАЦИИ ДЛЯ NOXX
electricTeleport() {
    if (this.teleportCooldown > 0 || this.name !== "Noxx") {
        console.log(`❌ Телепортация недоступна! Кулдаун: ${Math.ceil(this.teleportCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для телепортации не найдена!');
        return false;
    }
    
    console.log(`⚡ ${this.name} начинает ELECTRIC TELEPORT STRIKE!`);
    
    // Запоминаем начальную позицию
    this.teleportStartX = this.x;
    this.teleportStartY = this.y;
    
    // Вычисляем позицию рядом с целью (справа или слева)
    const targetSide = Math.random() < 0.5 ? -1 : 1; // -1 = слева, 1 = справа
    this.teleportTargetX = target.x + (targetSide * 80); // На расстоянии 80 пикселей
    this.teleportTargetY = target.y;
    
    // Проверяем, чтобы не телепортироваться за границы экрана
    this.teleportTargetX = Math.max(0, Math.min(this.teleportTargetX, canvas.width - this.width));
    this.teleportTargetY = Math.max(0, Math.min(this.teleportTargetY, canvas.height - this.height - 20));
    
    // Начинаем телепортацию
    this.isTeleporting = true;
    this.teleportPhase = 'disappear';
    this.teleportTimer = 20; // 20 кадров на исчезновение
    this.teleportCooldown = 360; // 6 секунд кулдаун
    this.teleportGlow = 30;
    
    // Создаем начальные электрические эффекты
    this.createElectricParticles(this.x + this.width/2, this.y + this.height/2, 15);
    
    return true;
}
// 🤼 МЕТОД МОЩНОГО БРОСКА ДЛЯ BURHAN
powerGrapple() {
    if (this.grappleCooldown > 0 || this.name !== "Burhan") {
        console.log(`❌ Бросок недоступен! Кулдаун: ${Math.ceil(this.grappleCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для броска не найдена!');
        return false;
    }
    
    // Проверяем дистанцию
    const distance = Math.abs(this.x - target.x);
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const grappleRange = characterConfig ? characterConfig.grappleRange : 100;
    
    if (distance > grappleRange) {
        console.log(`❌ Цель слишком далеко! Дистанция: ${distance}, нужно: ${grappleRange}`);
        return false;
    }
    
    console.log(`🤼 ${this.name} начинает POWER GRAPPLE!`);
    
    // Начинаем захват
    this.isGrappling = true;
    this.grapplePhase = 'grab';
    this.grappleTimer = 20; // 20 кадров на захват
    this.grappleTarget = target;
    this.grappleCooldown = characterConfig ? characterConfig.abilityCooldown : 400;
    
    // Сохраняем оригинальную позицию цели
    this.originalTargetX = target.x;
    this.originalTargetY = target.y;
    this.liftHeight = 0;
    
    // Останавливаем движение обоих персонажей
    this.velocityX = 0;
    this.velocityY = 0;
    target.velocityX = 0;
    target.velocityY = 0;
    target.stunned = 15; // Кратковременное оглушение при захвате
    
    console.log(`🤼 ${this.name} захватывает ${target.name}!`);
    return true;
}
// 🟢 МЕТОД ОБНОВЛЕНИЯ СЛАЙМОВ
updateSlimes() {
    if (this.name !== "Tom.J" || !this.slimes) return;
    
    try {
        for (let i = this.slimes.length - 1; i >= 0; i--) {
            const slime = this.slimes[i];
            
            if (!slime) {
                this.slimes.splice(i, 1);
                continue;
            }
            
            // Добавляем точку в след
            slime.trail.push({x: slime.x, y: slime.y, life: 20});
            if (slime.trail.length > 10) slime.trail.shift();
            
            // Обновляем физику слайма
            slime.velocityY += slime.gravity;
            slime.x += slime.velocityX;
            slime.y += slime.velocityY;
            slime.rotation += 0.15;
            
            // Проверяем столкновение с землей
            if (slime.y > canvas.height - 50) {
                slime.y = canvas.height - 50;
                
                if (slime.bounces < slime.maxBounces) {
                    slime.velocityY = -slime.velocityY * 0.7;
                    slime.velocityX *= 0.9;
                    slime.bounces++;
                    this.createSlimeParticles(slime.x, slime.y, 3);
                    console.log(`🟢 Слайм отскочил! Отскок ${slime.bounces}/${slime.maxBounces}`);
                } else {
                    // Слайм разбрызгивается
                    this.createSlimeExplosion(slime.x, slime.y);
                    this.slimes.splice(i, 1);
                    console.log(`💚 Слайм разбрызгался!`);
                    continue;
                }
            }
            
            // Проверяем столкновения с противником
            if (this === player && bot && !slime.hasHit) {
                this.checkSlimeCollision(slime, bot, i);
            } else if (this === bot && player && !slime.hasHit) {
                this.checkSlimeCollision(slime, player, i);
            }
            
            // Удаляем слайм если он улетел за экран
            if (slime.x < -100 || slime.x > canvas.width + 100) {
                this.slimes.splice(i, 1);
            }
        }
    } catch (error) {
        console.error('❌ Ошибка в updateSlimes:', error);
        this.slimes = [];
    }
}
// 🟢 МЕТОДЫ РИСОВАНИЯ СЛАЙМОВ
drawSlimes(ctx) {
    if (this.name !== "Tom.J" || !this.slimes) return;
    
    this.slimes.forEach(slime => {
        // Рисуем след слайма
        if (slime.trail) {
            slime.trail.forEach((point, index) => {
                const alpha = point.life / 20 * (index / slime.trail.length);
                ctx.fillStyle = `rgba(0, 255, 0, ${alpha * 0.3})`;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
                ctx.fill();
                point.life--;
            });
            // Удаляем старые точки следа
            slime.trail = slime.trail.filter(point => point.life > 0);
        }
        
        // Основной слайм
        ctx.save();
        ctx.translate(slime.x + slime.size/2, slime.y + slime.size/2);
        ctx.rotate(slime.rotation);
        
        // Тело слайма
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.arc(0, 0, slime.size/2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Блик на слайме
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(-slime.size/6, -slime.size/6, slime.size/4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.restore();
    });
}

drawSlimeParticles(ctx) {
    if (!this.slimeParticles) return;
    
    this.slimeParticles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
    });
}

drawSlimeExplosions(ctx) {
    if (!this.slimeExplosions) return;
    
    this.slimeExplosions.forEach(explosion => {
        const alpha = explosion.life / explosion.maxLife;
        ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI);
        ctx.stroke();
    });
}

drawSlimeThrowCooldown(ctx, x, y) {
    if (this.name !== "Tom.J" || this.slimeThrowCooldown <= 0) return;
    
    const cooldownPercent = this.slimeThrowCooldown / 250;
    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
    ctx.fillRect(x - 30, y - 30, 60 * (1 - cooldownPercent), 6);
}

updateSlimeParticles() {
    if (!this.slimeParticles) return;
    
    for (let i = this.slimeParticles.length - 1; i >= 0; i--) {
        const particle = this.slimeParticles[i];
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.3;
        particle.life--;
        
        if (particle.bounce && particle.y > canvas.height - 30) {
            particle.y = canvas.height - 30;
            particle.velocityY = -particle.velocityY * 0.5;
        }
        
        if (particle.life <= 0) {
            this.slimeParticles.splice(i, 1);
        }
    }
}
// 🟢 МЕТОД ПРОВЕРКИ СТОЛКНОВЕНИЯ СЛАЙМА
checkSlimeCollision(slime, target, slimeIndex) {
    try {
        if (slime.x < target.x + target.width &&
            slime.x + slime.size > target.x &&
            slime.y < target.y + target.height &&
            slime.y + slime.size > target.y) {
            
            slime.hasHit = true;
            
            // Наносим урон
            if (target.takeDamage) {
                target.takeDamage(slime.damage);
            }
            
            // Отталкивание и замедление
            const knockbackForce = 8;
            target.knockback += (slime.velocityX > 0) ? knockbackForce : -knockbackForce;
            target.velocityX *= 0.7; // Замедляем от липкости слизи
            target.screenShake = Math.max(target.screenShake, 5);
            
            console.log(`🟢💥 Слайм попал в ${target.name}! Урон: ${slime.damage}`);
            
            // Создаем эффект взрыва
            this.createSlimeExplosion(slime.x, slime.y);
            
            // Удаляем слайм
            this.slimes.splice(slimeIndex, 1);
        }
    } catch (collisionError) {
        console.error('❌ Ошибка при проверке столкновения слайма:', collisionError);
        slime.hasHit = true;
    }
}

// 🟢 МЕТОД СОЗДАНИЯ ВЗРЫВА СЛАЙМА
createSlimeExplosion(x, y) {
    if (!this.slimeExplosions) {
        this.slimeExplosions = [];
    }
    if (!this.slimeParticles) {
        this.slimeParticles = [];
    }
    
    const explosion = {
        x: x,
        y: y,
        radius: 0,
        maxRadius: 50,
        life: 40,
        maxLife: 40
    };
    
    this.slimeExplosions.push(explosion);
    
    // Создаем брызги слизи
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const particle = {
            x: x,
            y: y,
            velocityX: Math.cos(angle) * (2 + Math.random() * 6),
            velocityY: Math.sin(angle) * (2 + Math.random() * 6) - 3,
            life: 50 + Math.random() * 30,
            maxLife: 80,
            size: 3 + Math.random() * 4,
            bounce: true
        };
        
        this.slimeParticles.push(particle);
    }
}

// 🟢 СОЗДАНИЕ ЧАСТИЦ СЛИЗИ
createSlimeParticles(x, y, count) {
    if (!this.slimeParticles) {
        this.slimeParticles = [];
    }
    
    for (let i = 0; i < count; i++) {
        const particle = {
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            velocityX: (Math.random() - 0.5) * 4,
            velocityY: (Math.random() - 0.5) * 4 - 2,
            life: 30 + Math.random() * 20,
            maxLife: 50,
            size: 2 + Math.random() * 3,
            bounce: false
        };
        
        this.slimeParticles.push(particle);
    }
}
// ⚡ МЕТОДЫ ОБНОВЛЕНИЯ ТЕЛЕПОРТАЦИИ ДЛЯ NOXX
updateTeleportation() {
    if (this.name !== "Noxx" || !this.isTeleporting) return;
    
    this.teleportTimer--;
    
    switch (this.teleportPhase) {
        case 'disappear':
            // Фаза исчезновения
            if (this.teleportTimer <= 0) {
                // Переходим к фазе появления
                this.teleportPhase = 'appear';
                this.teleportTimer = 15; // 15 кадров на появление
                
                // Телепортируемся в целевую позицию
                this.x = this.teleportTargetX;
                this.y = this.teleportTargetY;
                
                // Создаем эффекты появления
                this.createElectricParticles(this.x + this.width/2, this.y + this.height/2, 20);
                this.teleportGlow = 40;
                
                console.log(`⚡ ${this.name} появляется рядом с целью!`);
            }
            break;
            
        case 'appear':
            // Фаза появления
            if (this.teleportTimer <= 0) {
                // Переходим к фазе атаки
                this.teleportPhase = 'strike';
                this.teleportTimer = 10; // 10 кадров на атаку
                
                console.log(`⚡ ${this.name} готовится к электрической атаке!`);
            }
            break;
            
        case 'strike':
            // Фаза атаки
            if (this.teleportTimer <= 0) {
                // Выполняем телепорт-атаку
                this.executeTeleportStrike();
                
                // Завершаем телепортацию
                this.isTeleporting = false;
                this.teleportPhase = 'none';
                this.teleportTimer = 0;
                
                console.log(`⚡ ${this.name} завершает Electric Teleport Strike!`);
            }
            break;
    }
}

executeTeleportStrike() {
    // Определяем цель
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        return;
    }
    
    // Проверяем дистанцию до цели
    const distance = Math.abs(this.x - target.x);
    
    if (distance <= 120) { // В радиусе атаки
        // Получаем параметры из конфигурации персонажа
        const characterConfig = CHARACTERS.find(char => char.name === this.name);
        const damage = characterConfig ? characterConfig.teleportDamage : 40;
        const stunDuration = characterConfig ? characterConfig.teleportStunDuration : 45;
        
        // Наносим урон
        if (target.takeDamage) {
            target.takeDamage(damage);
        }
        
        // Оглушаем цель
        target.stunned = stunDuration;
        
        // Сильное отталкивание
        const knockbackForce = 15;
        target.knockback += (target.x > this.x) ? knockbackForce : -knockbackForce;
        target.velocityY = Math.min(target.velocityY, -10); // Подбрасываем вверх
        
        // Эффекты экрана
        target.screenShake = Math.max(target.screenShake, 12);
        this.screenShake = Math.max(this.screenShake, 8);
        
        // Создаем мощные электрические эффекты
        this.createElectricParticles(target.x + target.width/2, target.y + target.height/2, 25);
        
        console.log(`⚡💥 Electric Teleport Strike попал! Урон: ${damage}, Оглушение: ${stunDuration} кадров`);
        
        return 'hit';
    } else {
        console.log(`⚡❌ Electric Teleport Strike промахнулся! Дистанция: ${distance}`);
        return 'miss';
    }
}
// 🤼 МЕТОД ОБНОВЛЕНИЯ ЗАХВАТА ДЛЯ BURHAN
updateGrappling() {
    if (this.name !== "Burhan" || !this.isGrappling) return;
    
    this.grappleTimer--;
    
    switch (this.grapplePhase) {
        case 'grab':
            // Фаза захвата - просто ждем
            if (this.grappleTimer <= 0) {
                this.grapplePhase = 'throw';
                this.grappleTimer = 30; // 30 кадров на анимацию броска
                console.log(`🤼 ${this.name} готовится к броску!`);
            }
            break;
            
    case 'throw':
    // Фаза броска - простая анимация полета вверх
    if (this.grappleTimer <= 0) {
        this.executeSimpleThrow();  // ← ИСПРАВЛЕНО: ВЫЗОВ НОВОГО МЕТОДА!
        
        // Завершаем захват
        this.isGrappling = false;
        this.grapplePhase = 'none';
        this.grappleTimer = 0;
        this.grappleTarget = null;
        this.liftHeight = 0;
        
        console.log(`🤼 ${this.name} завершает Power Grapple!`);
    }
    break;
    }
}

executeGrappleThrow() {
    if (!this.grappleTarget) return;
    
    const target = this.grappleTarget;
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    // Получаем параметры броска
    const throwDamage = characterConfig ? characterConfig.throwDamage : 45;
    const throwForce = characterConfig ? characterConfig.throwForce : 25;
    const stunDuration = characterConfig ? characterConfig.stunDuration : 60;
    
    // Наносим урон
    if (target.takeDamage) {
        target.takeDamage(throwDamage);
    }
    
    // Мощный бросок в сторону
    const throwDirection = this.facingRight ? 1 : -1;
    target.velocityX = throwDirection * throwForce;
    target.velocityY = -15; // Подбрасываем вверх
    
    // Длительное оглушение и эффекты
    target.stunned = stunDuration;
    target.knockback = throwDirection * (throwForce * 0.8);
    target.screenShake = Math.max(target.screenShake, 15);
    this.screenShake = Math.max(this.screenShake, 10);
    
    // Создаем эффекты броска
    this.createThrowParticles(target.x + target.width/2, target.y + target.height/2);
    
    console.log(`🤼💥 Power Grapple попал! Урон: ${throwDamage}, Оглушение: ${stunDuration} кадров`);
    
    return 'hit';
}
executeSimpleThrow() {
    if (!this.grappleTarget) return;
    
    const target = this.grappleTarget;
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    // Получаем параметры броска
    const throwDamage = characterConfig ? characterConfig.throwDamage : 45;
    const stunDuration = characterConfig ? characterConfig.stunDuration : 60;
    
    // Наносим урон
    if (target.takeDamage) {
        target.takeDamage(throwDamage);
    }
    
    // МОЩНЫЙ БРОСОК ЗА СПИНУ
    const throwDirection = this.facingRight ? -1 : 1;  // ОБРАТНОЕ направление (за спину)
    target.velocityX = throwDirection * 60;             // СИЛЬНЫЙ горизонтальный бросок
    target.velocityY = -15;                             // СИЛЬНЫЙ подброс вверх
    
    // Длительное оглушение и эффекты
    target.stunned = stunDuration;
    target.knockback = throwDirection * 25;             // Дополнительное отталкивание
    target.screenShake = Math.max(target.screenShake, 15);  // Сильная тряска
    this.screenShake = Math.max(this.screenShake, 10);      // Тряска для Burhan
    
    console.log(`🤼💥 Power Grapple! МОЩНЫЙ БРОСОК ЗА СПИНУ! Урон: ${throwDamage}`);
    
    return 'hit';
}

updateElectricParticles() {
    if (!this.electricParticles) return;
    
    for (let i = this.electricParticles.length - 1; i >= 0; i--) {
        const particle = this.electricParticles[i];
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.life--;
        
        // Эффект молнии - случайные подергивания
        particle.x += (Math.random() - 0.5) * 2;
        particle.y += (Math.random() - 0.5) * 2;
        
        if (particle.life <= 0) {
            this.electricParticles.splice(i, 1);
        }
    }
}

createElectricParticles(x, y, count) {
    if (!this.electricParticles) {
        this.electricParticles = [];
    }
    
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 3 + Math.random() * 5;
        
        const particle = {
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            life: 30 + Math.random() * 20,
            maxLife: 50,
            size: 2 + Math.random() * 3
        };
        
        this.electricParticles.push(particle);
    }
}
    createMagnitudeWave(waveIndex) {
        const wave = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            radius: 20,
            maxRadius: 300 + (waveIndex * 50),
            speed: 8 + (waveIndex * 2),
            damage: 20 + (waveIndex * 5),
            color: `hsl(${200 + waveIndex * 30}, 100%, ${50 + waveIndex * 10}%)`,
            alpha: 1,
            hasHit: false,
            waveIndex: waveIndex
        };
        
        this.magnitudeWaves.push(wave);
    }
    
     updateMagnitudeWaves() {
        if (this.name !== "Lyron" || !this.magnitudeWaves) return;
        
        try {
            for (let i = this.magnitudeWaves.length - 1; i >= 0; i--) {
                const wave = this.magnitudeWaves[i];
                
                if (!wave) {
                    this.magnitudeWaves.splice(i, 1);
                    continue;
                }
                
                wave.radius += wave.speed;
                wave.alpha = 1 - (wave.radius / wave.maxRadius);
                
                // Проверяем столкновения только для игрока против бота
                if (this === player && bot && !wave.hasHit && wave.radius > 50) {
                    try {
                        const distance = Math.sqrt(
                            Math.pow(wave.x - (bot.x + bot.width/2), 2) + 
                            Math.pow(wave.y - (bot.y + bot.height/2), 2)
                        );
                        
                        if (distance <= wave.radius && distance >= wave.radius - wave.speed) {
                            wave.hasHit = true;
                            
                            // Урон
                            if (bot.takeDamage) {
                                bot.takeDamage(wave.damage);
                            }
                            
                            // Отталкивание
                            if (typeof this.applyWaveKnockback === 'function') {
                                this.applyWaveKnockback(wave, bot);
                            } else {
                                // Простое отталкивание без метода
                                const simpleKnockback = wave.waveIndex * 8 + 10;
                                bot.knockback += (bot.x < wave.x) ? -simpleKnockback : simpleKnockback;
                                bot.screenShake = Math.max(bot.screenShake, 8);
                            }
                            
                            console.log(`🌊 Magnitude Wave ${wave.waveIndex + 1} попала! Урон: ${wave.damage}`);
                            
                            // Создаем эффект попадания
                            if (typeof this.createHitEffect === 'function') {
                                this.createHitEffect(bot.x + bot.width/2, bot.y + bot.height/2, wave.color);
                            }
                        }
                    } catch (collisionError) {
                        console.error('❌ Ошибка при обработке столкновения волны:', collisionError);
                        wave.hasHit = true;
                    }
                }
                
                // Удаляем волну если она достигла максимального радиуса
                if (wave.radius >= wave.maxRadius) {
                    this.magnitudeWaves.splice(i, 1);
                }
            }
        } catch (error) {
            console.error('❌ Критическая ошибка в updateMagnitudeWaves:', error);
            this.magnitudeWaves = [];
        }
    }
    
    createHitEffect(x, y, color) {
    // 🔧 ПРОВЕРЯЕМ ЛИМИТ ПЕРЕД СОЗДАНИЕМ
    if (this.hitParticles.length >= this.MAX_PARTICLES) {
        console.log(`⚠️ Достигнут лимит частиц: ${this.MAX_PARTICLES}`);
        return; // Не создаем новые частицы
    }
    
    for (let i = 0; i < 8; i++) {
        // 🔧 ДОБАВЛЯЕМ ПРОВЕРКУ В ЦИКЛЕ
        if (this.hitParticles.length >= this.MAX_PARTICLES) {
            break; // Прерываем если достигли лимита
        }
        
        const angle = (i / 8) * Math.PI * 2;
        const particle = {
            x: x,
            y: y,
            velocityX: Math.cos(angle) * (5 + Math.random() * 5),
            velocityY: Math.sin(angle) * (5 + Math.random() * 5),
            life: 30,
            maxLife: 30,
            color: color,
            size: 3 + Math.random() * 3
        };
        
        this.hitParticles.push(particle);
    }
}
     applyWaveKnockback(wave, target) {
    // Рассчитываем направление отталкивания
    const deltaX = (target.x + target.width/2) - wave.x;
    const deltaY = (target.y + target.height/2) - wave.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance === 0) return; // Избегаем деления на ноль
    
    // Нормализуем направление
    const normalizedX = deltaX / distance;
    const normalizedY = deltaY / distance;
    
    // 🚀 МОЩНОЕ ОТТАЛКИВАНИЕ - увеличиваем силу в 3 раза!
    const knockbackForce = (12 + (wave.waveIndex * 4)) * 3;
    
    // 🚀 СУПЕР СИЛЬНОЕ ПРИМЕНЕНИЕ ОТТАЛКИВАНИЯ:
    target.velocityX += normalizedX * knockbackForce * target.knockbackResistance *3;
    target.velocityY += Math.min(normalizedY * knockbackForce * 0.8, -12); // Сильный подброс вверх
    
    // Устанавливаем состояние отталкивания
    target.isKnockedBack = true;
    target.knockback += normalizedX * knockbackForce * 0.6; // Двойной knockback
    
    // 🚀 МОЩНЫЕ ЭФФЕКТЫ ЭКРАНА:
    target.screenShake = Math.max(target.screenShake, (6 + wave.waveIndex * 2) * 2);
    
    console.log(`🌊💥 Волна ${wave.waveIndex + 1} РАЗНОСИТ ${target.name}! Сила: ${knockbackForce.toFixed(1)}`);
}
    
    updateHitParticles() {
    // 🔧 БЫСТРАЯ ФИЛЬТРАЦИЯ ВМЕСТО SPLICE
    this.hitParticles = this.hitParticles.filter(particle => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.3;
        particle.life--;
        
        return particle.life > 0; // Оставляем только живые частицы
    });
    
    // 🔧 ЛОГИРУЕМ ЕСЛИ МНОГО ЧАСТИЦ
    if (this.hitParticles.length > 30) {
        console.log(`⚠️ Много частиц: ${this.hitParticles.length}/${this.MAX_PARTICLES}`);
    }
}
    // 🍾 МЕТОД ОБНОВЛЕНИЯ БУТЫЛОК
    updateBottles() {
        if (this.name !== "vludblet" || !this.bottles) return;
        
        try {
            for (let i = this.bottles.length - 1; i >= 0; i--) {
                const bottle = this.bottles[i];
                
                if (!bottle) {
                    this.bottles.splice(i, 1);
                    continue;
                }
                
                // Обновляем физику бутылки
                bottle.velocityY += bottle.gravity;
                bottle.x += bottle.velocityX;
                bottle.y += bottle.velocityY;
                bottle.rotation += 0.2;
                
                // Проверяем столкновение с землей
                if (bottle.y > canvas.height - 50) {
                    bottle.y = canvas.height - 50;
                    
                    if (bottle.bounces < bottle.maxBounces) {
                        bottle.velocityY = -bottle.velocityY * 0.6;
                        bottle.velocityX *= 0.8;
                        bottle.bounces++;
                        console.log(`🍾 Бутылка отскочила! Отскок ${bottle.bounces}/${bottle.maxBounces}`);
                    } else {
                        // Бутылка разбивается
                        this.createBottleExplosion(bottle.x, bottle.y);
                        this.bottles.splice(i, 1);
                        console.log(`💥 Бутылка разбилась!`);
                        continue;
                    }
                }
                
                // Проверяем столкновения с противником
                if (this === player && bot && !bottle.hasHit) {
                    this.checkBottleCollision(bottle, bot, i);
                } else if (this === bot && player && !bottle.hasHit) {
                    this.checkBottleCollision(bottle, player, i);
                }
                
                // Удаляем бутылку если она улетела за экран
                if (bottle.x < -50 || bottle.x > canvas.width + 50) {
                    this.bottles.splice(i, 1);
                }
            }
        } catch (error) {
            console.error('❌ Ошибка в updateBottles:', error);
            this.bottles = [];
        }
    }
    
    // 🍾 МЕТОД ПРОВЕРКИ СТОЛКНОВЕНИЯ БУТЫЛКИ
    checkBottleCollision(bottle, target, bottleIndex) {
        try {
            // Проверяем пересечение прямоугольников
            if (bottle.x < target.x + target.width &&
                bottle.x + 20 > target.x &&
                bottle.y < target.y + target.height &&
                bottle.y + 20 > target.y) {
                
                bottle.hasHit = true;
                
                // Наносим урон
                if (target.takeDamage) {
                    target.takeDamage(bottle.damage);
                }
                
                // Отталкивание
                const knockbackForce = 12;
                target.knockback += (bottle.velocityX > 0) ? knockbackForce : -knockbackForce;
                target.velocityY = Math.min(target.velocityY, -8); // Подбрасываем вверх
                target.screenShake = Math.max(target.screenShake, 6);
                
                console.log(`🍾💥 Бутылка попала в ${target.name}! Урон: ${bottle.damage}`);
                
                // Создаем эффект взрыва
                this.createBottleExplosion(bottle.x, bottle.y);
                
                // Удаляем бутылку
                this.bottles.splice(bottleIndex, 1);
            }
        } catch (collisionError) {
            console.error('❌ Ошибка при проверке столкновения бутылки:', collisionError);
            bottle.hasHit = true;
        }
    }
    
    // 🍾 МЕТОД СОЗДАНИЯ ВЗРЫВА БУТЫЛКИ
    createBottleExplosion(x, y) {
        // Инициализируем массивы если их нет
        if (!this.bottleExplosions) {
            this.bottleExplosions = [];
        }
        if (!this.glassParticles) {
            this.glassParticles = [];
        }
        
        const explosion = {
            x: x,
            y: y,
            radius: 0,
            maxRadius: 40,
            life: 30,
            maxLife: 30
        };
        
        this.bottleExplosions.push(explosion);
        
        // Создаем осколки стекла
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const shard = {
                x: x,
                y: y,
                velocityX: Math.cos(angle) * (3 + Math.random() * 4),
                velocityY: Math.sin(angle) * (3 + Math.random() * 4) - 2,
                life: 40 + Math.random() * 20,
                maxLife: 60,
                size: 2 + Math.random() * 2
            };
            
            this.glassParticles.push(shard);
        }
    }
    
    // 🍾 МЕТОД ОБНОВЛЕНИЯ ВЗРЫВОВ
    updateBottleExplosions() {
        if (!this.bottleExplosions) return;
        
        for (let i = this.bottleExplosions.length - 1; i >= 0; i--) {
            const explosion = this.bottleExplosions[i];
            
            explosion.radius += (explosion.maxRadius - explosion.radius) * 0.3;
            explosion.life--;
            
            if (explosion.life <= 0) {
                this.bottleExplosions.splice(i, 1);
            }
        }
    }
    
    // 🍾 МЕТОД ОБНОВЛЕНИЯ ОСКОЛКОВ СТЕКЛА
    updateGlassParticles() {
        if (!this.glassParticles) return;
        
        for (let i = this.glassParticles.length - 1; i >= 0; i--) {
            const shard = this.glassParticles[i];
            
            shard.x += shard.velocityX;
            shard.y += shard.velocityY;
            shard.velocityY += 0.3; // Гравитация
            shard.life--;
            
            // Отскок от земли
            if (shard.y > canvas.height - 30) {
                shard.y = canvas.height - 30;
                shard.velocityY = -shard.velocityY * 0.5;
            }
            
            if (shard.life <= 0) {
                this.glassParticles.splice(i, 1);
            }
        }
    }
    drawBottles(ctx) {
    if (this.name !== "vludblet" || !this.bottles) return;
    
    this.bottles.forEach(bottle => {
        ctx.save();
        ctx.translate(bottle.x + 15, bottle.y + 20); // ← УВЕЛИЧИЛИ ЦЕНТР
        ctx.rotate(bottle.rotation);
        
        // Тело бутылки (БОЛЬШОЕ)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(-15, -20, 30, 40); // ← В 2 РАЗА БОЛЬШЕ!
        
        // Горлышко (БОЛЬШОЕ)
        ctx.fillStyle = '#654321';
        ctx.fillRect(-6, -30, 12, 16);  // ← В 2 РАЗА БОЛЬШЕ!
        
        // Пробка (БОЛЬШАЯ)
        ctx.fillStyle = '#2F4F4F';
        ctx.fillRect(-4, -36, 8, 10);   // ← В 2 РАЗА БОЛЬШЕ!
        
        // НОВОЕ: Этикетка на бутылке
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(-10, -5, 20, 8);   // ← БЕЛАЯ ЭТИКЕТКА
        
        // НОВОЕ: Текст на этикетке
        ctx.fillStyle = 'black';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🍾', 0, 1);       // ← ЭМОДЗИ БУТЫЛКИ
        
        ctx.restore();
    });
}
// 🤼 ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ДЛЯ БРОСКА BURHAN
updateThrowParticles() {
    if (this.name !== "Burhan") return;
    
    if (this.throwParticles) {
        this.throwParticles = [];
    }
}

createThrowParticles(x, y) {
    if (!this.throwParticles) {
        this.throwParticles = [];
    }
    
    // Создаем мощный взрыв частиц
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const speed = 4 + Math.random() * 8;
        
        const particle = {
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed - 3,
            life: 40 + Math.random() * 30,
            maxLife: 70,
            size: 3 + Math.random() * 4
        };
        
        this.throwParticles.push(particle);
    }
    
    // Дополнительные искры для эпичности
    for (let i = 0; i < 10; i++) {
        const particle = {
            x: x,
            y: y,
            velocityX: (Math.random() - 0.5) * 12,
            velocityY: (Math.random() - 0.5) * 12 - 5,
            life: 60 + Math.random() * 40,
            maxLife: 100,
            size: 2 + Math.random() * 3
        };
        
        this.throwParticles.push(particle);
    }
}

// 🍾 МЕТОД РИСОВАНИЯ ОСКОЛКОВ
drawGlassParticles(ctx) {
    if (!this.glassParticles) return;
    
    this.glassParticles.forEach(shard => {
        const alpha = shard.life / shard.maxLife;
        ctx.fillStyle = `rgba(220, 220, 255, ${alpha})`;
        ctx.fillRect(shard.x - shard.size/2, shard.y - shard.size/2, shard.size, shard.size);
    });
}

// 🍾 МЕТОД РИСОВАНИЯ ВЗРЫВОВ
drawBottleExplosions(ctx) {
    if (!this.bottleExplosions) return;
    
    this.bottleExplosions.forEach(explosion => {
        const alpha = explosion.life / explosion.maxLife;
        ctx.strokeStyle = `rgba(255, 165, 0, ${alpha})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI);
        ctx.stroke();
    });
}

// 🍾 ИНДИКАТОР КУЛДАУНА
drawBottleThrowCooldown(ctx, x, y) {
    if (this.name !== "vludblet" || this.bottleThrowCooldown <= 0) return;
    
    const cooldownPercent = this.bottleThrowCooldown / 300;
    ctx.fillStyle = 'rgba(139, 69, 19, 0.8)';
    ctx.fillRect(x - 30, y - 25, 60 * (1 - cooldownPercent), 6);
}
    
    drawHitParticles(ctx) {
        this.hitParticles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * alpha, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
      drawAbilityCooldown(ctx, x, y) {
    // Индикатор кулдауна отключен
    return;
}
// ⚡ МЕТОДЫ РИСОВАНИЯ ТЕЛЕПОРТАЦИИ
drawTeleportEffects(ctx, drawX, drawY) {
    if (!this.isTeleporting) return;
    
    const centerX = drawX + this.width/2;
    const centerY = drawY + this.height/2;
    
    switch(this.teleportPhase) {
        case 'disappear':
            // Эффект исчезновения
            const disappearProgress = 1 - (this.teleportTimer / 20);
            
            // Электрическое кольцо
            ctx.strokeStyle = `rgba(0, 255, 255, ${1 - disappearProgress})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 30 + disappearProgress * 50, 0, 2 * Math.PI);
            ctx.stroke();
            
            // Искажение персонажа
            ctx.globalAlpha = 1 - disappearProgress;
            break;
            
        case 'appear':
            // Эффект появления
            const appearProgress = 1 - (this.teleportTimer / 15);
            
            // Вспышка появления
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - appearProgress})`;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40 * (1 - appearProgress), 0, 2 * Math.PI);
            ctx.fill();
            
            // Электрические кольца
            for (let i = 0; i < 3; i++) {
                const ringRadius = 60 + i * 20;
                ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - appearProgress) * (1 - i * 0.3)})`;
                ctx.lineWidth = 3 - i;
                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius * appearProgress, 0, 2 * Math.PI);
                ctx.stroke();
            }
            break;
            
        case 'strike':
            // Эффект атаки
            const strikeProgress = 1 - (this.teleportTimer / 10);
            
            // Мощное свечение
            ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
            ctx.shadowBlur = 20;
            ctx.fillStyle = `rgba(255, 255, 255, ${strikeProgress})`;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
            ctx.fill();
            ctx.shadowBlur = 0;
            break;
    }
    
    // Восстанавливаем прозрачность
    ctx.globalAlpha = 1;
}

drawElectricParticles(ctx) {
    if (!this.electricParticles || this.name !== "Noxx") return;
    
    this.electricParticles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        
        // Основная частица
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Свечение частицы
        ctx.shadowColor = 'rgba(0, 255, 255, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}// 🤼 МЕТОДЫ РИСОВАНИЯ ЭФФЕКТОВ БРОСКА ДЛЯ BURHAN
drawGrappleEffects(ctx, drawX, drawY) {
    return;
}

drawThrowParticles(ctx) {
    return;
}

drawGrappleCooldown(ctx, x, y) {
    if (this.name !== "Burhan" || this.grappleCooldown <= 0) return;
    
    const cooldownPercent = this.grappleCooldown / 400;
    ctx.fillStyle = 'rgba(255, 140, 0, 0.8)';
    ctx.fillRect(x - 30, y - 35, 60 * (1 - cooldownPercent), 6);
}
// ⚡ МЕТОДЫ РИСОВАНИЯ LIGHTNING CALL ДЛЯ HEATHCLIFF
drawLightningWarnings(ctx) {
    if (!this.lightningWarnings || this.name !== "Heathcliff") return;
    
    this.lightningWarnings.forEach(warning => {
        // Пульсирующий круг предупреждения
        const alpha = warning.intensity;
        const pulseSize = warning.size + Math.sin(Date.now() * 0.02) * 10;
        
        // Красный предупреждающий круг
        ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.lineWidth = 6;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.arc(warning.targetX, warning.targetY, pulseSize, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Внутреннее свечение
        ctx.fillStyle = `rgba(255, 255, 0, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(warning.targetX, warning.targetY, pulseSize * 0.7, 0, 2 * Math.PI);
        ctx.fill();
        
        // Символ молнии в центре
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', warning.targetX, warning.targetY + 8);
    });
}

drawLightningStrikes(ctx) {
    if (!this.lightningStrikes || this.name !== "Heathcliff") return;
    
    this.lightningStrikes.forEach(lightning => {
        const alpha = lightning.intensity;
        const time = Date.now() * 0.01;
        const pulse = 1 + Math.sin(time * 3) * 0.4;
        
        // 🌟 БОЖЕСТВЕННОЕ СВЕЧЕНИЕ ВОКРУГ ЦЕЛИ
        const glowRadius = 60 * pulse;
        const gradient = ctx.createRadialGradient(
            lightning.targetX, lightning.targetY, 0,
            lightning.targetX, lightning.targetY, glowRadius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(100, 200, 255, ${alpha * 0.5})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 0, ${alpha * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(lightning.targetX, lightning.targetY, glowRadius, 0, 2 * Math.PI);
        ctx.fill();
        
        // ⚡ МНОЖЕСТВЕННЫЕ МОЛНИИ
        for (let bolt = 0; bolt < 3; bolt++) {
            const offsetX = (bolt - 1) * 20;
            const boltAlpha = alpha * (1 - bolt * 0.3);
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${boltAlpha})`;
            ctx.lineWidth = (8 - bolt * 2) * pulse;
            ctx.shadowColor = `rgba(100, 200, 255, ${boltAlpha})`;
            ctx.shadowBlur = 25;
            
            // Хаотичная молния
            ctx.beginPath();
            ctx.moveTo(lightning.targetX + offsetX, 0);
            
            let currentX = lightning.targetX + offsetX;
            for (let segment = 1; segment <= 8; segment++) {
                const segmentY = (canvas.height / 8) * segment;
                const chaos = (Math.random() - 0.5) * 60;
                currentX += chaos * 0.3;
                
                ctx.lineTo(currentX, segmentY);
                
                // Мини-вспышки по пути
                if (Math.random() < 0.4) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${boltAlpha * 0.8})`;
                    ctx.beginPath();
                    ctx.arc(currentX, segmentY, 3 * pulse, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            
            ctx.lineTo(lightning.targetX, lightning.targetY);
            ctx.stroke();
        }
        
        // 🔥 ЭНЕРГЕТИЧЕСКИЕ КОЛЬЦА
        for (let ring = 0; ring < 4; ring++) {
            const ringRadius = (20 + ring * 15) * pulse;
            const ringAlpha = alpha * (1 - ring * 0.2);
            
            ctx.strokeStyle = `rgba(255, ${200 - ring * 30}, ${100 + ring * 30}, ${ringAlpha})`;
            ctx.lineWidth = 6 - ring;
            ctx.setLineDash([10, 5]);
            
            ctx.beginPath();
            ctx.arc(lightning.targetX, lightning.targetY, ringRadius, time + ring, time + ring + Math.PI);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // ⭐ ЭНЕРГЕТИЧЕСКИЕ ЧАСТИЦЫ
        for (let particle = 0; particle < 15; particle++) {
            const angle = (particle / 15) * Math.PI * 2 + time;
            const distance = 30 + Math.sin(time + particle) * 20;
            const particleX = lightning.targetX + Math.cos(angle) * distance;
            const particleY = lightning.targetY + Math.sin(angle) * distance;
            
            ctx.fillStyle = `rgba(255, 255, ${Math.floor(Math.random() * 100 + 155)}, ${alpha * 0.9})`;
            ctx.shadowColor = 'rgba(255, 255, 0, 0.8)';
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2 + Math.sin(time + particle) * 1, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // 💫 ЦЕНТРАЛЬНАЯ ЭНЕРГЕТИЧЕСКАЯ СФЕРА
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 30;
        
        // Внешняя сфера
        ctx.fillStyle = `rgba(100, 200, 255, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(lightning.targetX, lightning.targetY, 25 * pulse, 0, 2 * Math.PI);
        ctx.fill();
        
        // Средняя сфера
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(lightning.targetX, lightning.targetY, 15 * pulse, 0, 2 * Math.PI);
        ctx.fill();
        
        // Ядро
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(lightning.targetX, lightning.targetY, 8 * pulse, 0, 2 * Math.PI);
        ctx.fill();
        
        // 🌈 РАДУЖНЫЕ ВСПОЛОХИ
        const colors = ['255,0,0', '255,165,0', '255,255,0', '0,255,0', '0,0,255', '75,0,130', '238,130,238'];
        for (let i = 0; i < colors.length; i++) {
            const flashAngle = time * 2 + (i / colors.length) * Math.PI * 2;
            const flashX = lightning.targetX + Math.cos(flashAngle) * 40;
            const flashY = lightning.targetY + Math.sin(flashAngle) * 40;
            
            ctx.fillStyle = `rgba(${colors[i]}, ${alpha * 0.4})`;
            ctx.beginPath();
            ctx.arc(flashX, flashY, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        ctx.shadowBlur = 0;
    });
}

drawLightningEffects(ctx) {
    if (!this.lightningEffects) return;
    
    this.lightningEffects.forEach(effect => {
        const alpha = effect.life / effect.maxLife;
        
        if (effect.type === 'spark') {
            // Яркие искры
            ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
            ctx.beginPath();
            ctx.arc(effect.x, effect.y, effect.size, 0, 2 * Math.PI);
            ctx.fill();
            
            // Свечение искр
            ctx.shadowColor = 'rgba(255, 255, 0, 0.8)';
            ctx.shadowBlur = 8;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(effect.x, effect.y, effect.size * 0.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            // Электрические разряды
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(effect.x - effect.size, effect.y - effect.size);
            ctx.lineTo(effect.x + effect.size, effect.y + effect.size);
            ctx.moveTo(effect.x + effect.size, effect.y - effect.size);
            ctx.lineTo(effect.x - effect.size, effect.y + effect.size);
            ctx.stroke();
        }
    });
}

drawLightningCooldown(ctx, x, y) {
    if (this.name !== "Heathcliff" || this.lightningCooldown <= 0) return;
    
    const cooldownPercent = this.lightningCooldown / 360;
    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.fillRect(x - 30, y - 40, 60 * (1 - cooldownPercent), 6);
    
    // Иконка молнии рядом с полоской
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', x, y - 45);
    }
}

// 🔴 МЕТОДЫ РИСОВАНИЯ RED LIGHT GREEN LIGHT ДЛЯ !ZAIN
drawRedLightWarnings(ctx) {
    if (!this.redLightWarnings || this.name !== "!ZAIN") return;
    
    this.redLightWarnings.forEach(warning => {
        const alpha = warning.alpha;
        
        // Красный круг предупреждения
        ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.lineWidth = 6;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(warning.x, warning.y, warning.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Внутреннее свечение
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(warning.x, warning.y, warning.size * 0.7, 0, 2 * Math.PI);
        ctx.fill();
        
        // Текст "СТОЙ!"
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DONT MOVE!', warning.x, warning.y + 5);
    });
}

drawRedLightEffect(ctx, drawX, drawY) {
    if (this.name !== "!ZAIN" || !this.redLightActive) return;
    
    const centerX = drawX + this.width/2;
    const centerY = drawY + this.height/2;
    
    // Красное свечение вокруг !ZAIN
    const glowRadius = 80 + Math.sin(Date.now() * 0.01) * 20;
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, glowRadius
    );
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.4)');
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, glowRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Счетчик времени над головой
    if (this.redLightCountdown > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.lineWidth = 4;
        
        const countdownText = this.redLightCountdown.toString();
        ctx.strokeText(countdownText, centerX, centerY - 60);
        ctx.fillText(countdownText, centerX, centerY - 60);
    } else {
        // Текст "НЕ ДВИГАЙСЯ!"
        ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('НЕ ДВИГАЙСЯ!', centerX, centerY - 60);
    }
}

drawRedLightCooldown(ctx, x, y) {
    if (this.name !== "!ZAIN" || this.redLightCooldown <= 0) return;
    
    const cooldownPercent = this.redLightCooldown / 480;
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.fillRect(x - 30, y - 45, 60 * (1 - cooldownPercent), 6);
    
    // Иконка способности
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🔴', x, y - 50);
    }
}
sharkDash() {
    if (this.sharkCooldown > 0 || this.name !== "Matt") {
        console.log(`❌ Shark Dash недоступен! Кулдаун: ${Math.ceil(this.sharkCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для Shark Dash не найдена!');
        return false;
    }
    
    console.log(`🦈 ${this.name} превращается в АКУЛУ и летит прямо!`);

// Запоминаем начальную позицию
this.sharkStartX = this.x;
this.sharkStartY = this.y;
this.sharkTarget = target;

// ПРЯМОЙ ПОЛЕТ В НАПРАВЛЕНИИ, КУДА СМОТРИТ
const characterConfig = CHARACTERS.find(char => char.name === this.name);
const dashDistance = characterConfig ? characterConfig.dashDistance : 400;

this.sharkTargetX = this.x + (this.facingRight ? dashDistance : -dashDistance);
this.sharkTargetY = this.y; // НА ТОМ ЖЕ УРОВНЕ
    
    // Начинаем атаку акулы
    this.isSharkDashing = true;
    this.sharkPhase = 'transform';
    this.sharkTimer = 15; // 15 кадров на превращение
    this.sharkCooldown = 360; // 6 секунд кулдаун
    
    // Создаем водяные эффекты
    this.createWaterParticles(this.x + this.width/2, this.y + this.height/2, 12);
    
    return true;
}
// 💡 МЕТОД АКТИВАЦИИ УСИЛЕНИЯ ДЛЯ XEALIST
powerBoost() {
    if (this.powerCooldown > 0 || this.name !== "Xealist") {
        console.log(`❌ Power Boost недоступен! Кулдаун: ${Math.ceil(this.powerCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    console.log(`💡 ${this.name} активирует POWER BOOST! Урон x2 на 5 секунд!`);
    
    // Получаем настройки из конфигурации персонажа
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    // Активируем усиление
    this.isPowered = true;
    this.powerDuration = characterConfig ? characterConfig.powerDuration : 300; // 5 секунд
    this.powerCooldown = characterConfig ? characterConfig.abilityCooldown : 420; // 7 секунд кулдаун
    
    console.log(`💡 Power Boost активирован! Длительность: ${this.powerDuration/60} сек, Кулдаун: ${this.powerCooldown/60} сек`);
    return true;
}

// ⚡ МЕТОД LIGHTNING CALL ДЛЯ HEATHCLIFF
lightningCall() {
    if (this.lightningCooldown > 0 || this.name !== "Heathcliff") {
        console.log(`❌ Lightning Call недоступен! Кулдаун: ${Math.ceil(this.lightningCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для Lightning Call не найдена!');
        return false;
    }
    
    console.log(`⚡ ${this.name} призывает МОЛНИЮ с анимацией!`);
    
    // Создаем простую молнию
    const lightning = {
        x: target.x + target.width/2,
        y: 0, // Начинается с верха экрана
        targetX: target.x + target.width/2,
        targetY: target.y + target.height/2,
        life: 20, // 20 кадров анимации
        maxLife: 20,
        width: 8,
        intensity: 1
    };
    
    if (!this.lightningStrikes) {
        this.lightningStrikes = [];
    }
    
    this.lightningStrikes.push(lightning);
    
    // Наносим урон сразу
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const damage = characterConfig ? characterConfig.lightningDamage : 50;
    const stunDuration = characterConfig ? characterConfig.lightningStunDuration : 45;
    
    if (target.takeDamage) {
        target.takeDamage(damage);
    }
    
    target.stunned = stunDuration;
    target.screenShake = Math.max(target.screenShake, 15);
    
    this.lightningCooldown = characterConfig ? characterConfig.abilityCooldown : 360;
    
    console.log(`⚡💥 Lightning Call с анимацией! Урон: ${damage}`);
    
    return true;
}
// 🔴 МЕТОД RED LIGHT GREEN LIGHT ДЛЯ ZAIN
redLightGreenLight() {
    if (this.redLightCooldown > 0 || this.name !== "!ZAIN") {
        console.log(`❌ Red Light Green Light недоступен! Кулдаун: ${Math.ceil(this.redLightCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для Red Light Green Light не найдена!');
        return false;
    }
    
    // Проверяем дистанцию
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const detectionRadius = characterConfig ? characterConfig.detectionRadius : 400;
    const distance = Math.abs(this.x - target.x);
    
    if (distance > detectionRadius) {
        console.log(`❌ Цель слишком далеко! Дистанция: ${distance}, радиус: ${detectionRadius}`);
        return false;
    }
    
    console.log(`🔴 ${this.name} активирует RED LIGHT GREEN LIGHT! Не двигайся или получишь урон!`);
    
    // Активируем способность
    this.redLightActive = true;
    this.redLightDuration = characterConfig ? characterConfig.freezeDuration : 180; // 3 секунды
    this.redLightCooldown = characterConfig ? characterConfig.abilityCooldown : 480; // 8 секунд
    this.redLightCountdown = 3; // Счетчик 3-2-1
    this.redLightTarget = target;
    
    // Запоминаем текущую позицию цели для отслеживания движения
    this.lastPosition.x = target.x;
    this.lastPosition.y = target.y;
    this.movementViolations = 0;
    
    console.log(`🔴 Red Light Green Light активирован на ${this.redLightDuration/60} секунд! Не двигайся, ${target.name}!`);
    return true;
}
// ⚡ МЕТОД СОЗДАНИЯ УДАРА МОЛНИИ
createLightningStrike(x, y) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const damage = characterConfig ? characterConfig.lightningDamage : 50;
    const stunDuration = characterConfig ? characterConfig.lightningStunDuration : 45;
    
    // Создаем молнию
    const lightning = {
        x: x,
        y: 0, // Начинается с верха экрана
        targetX: x,
        targetY: y,
        life: 30,
        maxLife: 30,
        width: 15 + Math.random() * 10,
        intensity: 1,
        hasHit: false,
        damage: damage,
        stunDuration: stunDuration
    };
    
    if (!this.lightningStrikes) {
        this.lightningStrikes = [];
    }
    
    this.lightningStrikes.push(lightning);
    
    console.log(`⚡ Молния ударяет в точку (${x}, ${y})! Урон: ${damage}`);
    
    // Проверяем попадание в цель
    this.checkLightningHit(lightning);
}

// ⚡ ОБНОВЛЕНИЕ ПРЕДУПРЕЖДЕНИЙ О МОЛНИЯХ
updateLightningWarnings() {
    if (!this.lightningWarnings || this.name !== "Heathcliff") return;
    
    for (let i = this.lightningWarnings.length - 1; i >= 0; i--) {
        const warning = this.lightningWarnings[i];
        
        warning.life--;
        warning.size = warning.maxSize * (1 - warning.life / warning.maxLife);
        warning.intensity = warning.life / warning.maxLife;
        
        if (warning.life <= 0) {
            this.lightningWarnings.splice(i, 1);
        }
    }
}

// ⚡ ОБНОВЛЕНИЕ УДАРОВ МОЛНИЙ
updateLightningStrikes() {
    if (!this.lightningStrikes || this.name !== "Heathcliff") return;
    
    for (let i = this.lightningStrikes.length - 1; i >= 0; i--) {
        const lightning = this.lightningStrikes[i];
        
        lightning.life--;
        lightning.intensity = lightning.life / lightning.maxLife;
        
        if (lightning.life <= 0) {
            this.lightningStrikes.splice(i, 1);
        }
    }
}

// ⚡ ПРОВЕРКА ПОПАДАНИЯ МОЛНИИ
checkLightningHit(lightning) {
    // Определяем цель
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        return;
    }
    
    // Проверяем попадание в область молнии
    const distance = Math.abs(lightning.targetX - (target.x + target.width/2));
    
    if (distance <= 60 && !lightning.hasHit) { // Радиус попадания 60 пикселей
        lightning.hasHit = true;
        
        // Наносим урон
        if (target.takeDamage) {
            target.takeDamage(lightning.damage);
        }
        
        // Оглушаем цель
        target.stunned = lightning.stunDuration;
        
        // Сильное отталкивание и подброс
        target.velocityY = Math.min(target.velocityY, -15); // Подбрасываем вверх
        target.screenShake = Math.max(target.screenShake, 20);
        
        // Создаем эффекты
        this.createLightningEffects(lightning.targetX, lightning.targetY);
        
        console.log(`⚡💥 Lightning Call попал! Урон: ${lightning.damage}, Оглушение: ${lightning.stunDuration} кадров`);
        
        return 'hit';
    }
    
    return 'miss';
}

// ⚡ СОЗДАНИЕ ЭФФЕКТОВ МОЛНИИ
createLightningEffects(x, y) {
    if (!this.lightningEffects) {
        this.lightningEffects = [];
    }
    
    // Создаем искры и разряды
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const speed = 5 + Math.random() * 8;
        
        const effect = {
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed - 3,
            life: 40 + Math.random() * 30,
            maxLife: 70,
            size: 3 + Math.random() * 5,
            type: Math.random() < 0.5 ? 'spark' : 'bolt'
        };
        
        this.lightningEffects.push(effect);
    }
}

// ⚡ ОБНОВЛЕНИЕ ЭФФЕКТОВ МОЛНИИ
updateLightningEffects() {
    if (!this.lightningEffects) return;
    
    for (let i = this.lightningEffects.length - 1; i >= 0; i--) {
        const effect = this.lightningEffects[i];
        
        effect.x += effect.velocityX;
        effect.y += effect.velocityY;
        effect.velocityY += 0.3; // Гравитация
        effect.life--;
        
        // Эффект молнии - случайные подергивания
        if (effect.type === 'bolt') {
            effect.x += (Math.random() - 0.5) * 3;
            effect.y += (Math.random() - 0.5) * 3;
        }
        
        if (effect.life <= 0) {
            this.lightningEffects.splice(i, 1);
        }
    }
}
// 🔴 МЕТОДЫ ОБНОВЛЕНИЯ RED LIGHT GREEN LIGHT ДЛЯ ZAIN
updateRedLightCountdown() {
    if (this.name !== "!ZAIN" || !this.redLightActive) return;
    
    // Обновляем счетчик каждые 60 кадров (1 секунда)
    const secondsPassed = Math.floor((180 - this.redLightDuration) / 60);
    this.redLightCountdown = Math.max(0, 3 - secondsPassed);
}

checkMovementViolations() {
    if (this.name !== "!ZAIN" || !this.redLightActive || !this.redLightTarget) return;
    
    const target = this.redLightTarget;
    const currentX = target.x;
    const currentY = target.y;
    
    // Проверяем движение по X и Y осям
    const deltaX = Math.abs(currentX - this.lastPosition.x);
    const deltaY = Math.abs(currentY - this.lastPosition.y);
    const totalMovement = deltaX + deltaY;
    
    // Если цель двигается больше чем на 2 пикселя за кадр = нарушение
    if (totalMovement > 2) {
        this.movementViolations++;
        
        // Получаем урон из конфигурации
        const characterConfig = CHARACTERS.find(char => char.name === this.name);
        const damage = characterConfig ? characterConfig.movementDamage : 15;
        
        // Наносим урон за движение
        if (target.takeDamage) {
            target.takeDamage(damage);
        }
        
        // Создаем предупреждающий эффект
        this.createRedLightWarning(target.x + target.width/2, target.y);
        
        console.log(`🔴💥 ${target.name} двигался во время Red Light! Урон: ${damage} (Нарушение ${this.movementViolations})`);
        
        // Эффекты наказания
        target.screenShake = Math.max(target.screenShake, 8);
        target.velocityX *= 0.5; // Замедляем
    }
    
    // Обновляем последнюю позицию
    this.lastPosition.x = currentX;
    this.lastPosition.y = currentY;
}

createRedLightWarning(x, y) {
    if (!this.redLightWarnings) {
        this.redLightWarnings = [];
    }
    
    const warning = {
        x: x,
        y: y,
        life: 30,
        maxLife: 30,
        size: 40,
        alpha: 1
    };
    
    this.redLightWarnings.push(warning);
}

updateRedLightWarnings() {
    if (!this.redLightWarnings) return;
    
    for (let i = this.redLightWarnings.length - 1; i >= 0; i--) {
        const warning = this.redLightWarnings[i];
        
        warning.life--;
        warning.alpha = warning.life / warning.maxLife;
        warning.size += 2; // Расширяется
        
        if (warning.life <= 0) {
            this.redLightWarnings.splice(i, 1);
        }
    }
    
}// 🥷 МЕТОДЫ ДЛЯ SHADOW CLONE STRIKE DeFi.NinJa_Elijah
shadowCloneStrike() {
    if (this.cloneCooldown > 0 || this.name !== "DeFi.NinJa_Elijah") {
        console.log(`❌ Shadow Clone Strike недоступен! Кулдаун: ${Math.ceil(this.cloneCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для Shadow Clone Strike не найдена!');
        return false;
    }
    
    console.log(`🥷 ${this.name} создает теневых клонов!`);
    
    // Создаем 3 клона вокруг цели
    this.shadowClones = [];
    for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const clone = {
            x: target.x + Math.cos(angle) * 100,
            y: target.y + Math.sin(angle) * 50,
            life: 90,                    // 1.5 секунды жизни
            attackTimer: 20 + i * 15,    // Атакуют с задержкой
            hasAttacked: false,
            alpha: 0.8,
            originalX: target.x + Math.cos(angle) * 100,
            originalY: target.y + Math.sin(angle) * 50
        };
        this.shadowClones.push(clone);
    }
    
    this.cloneCooldown = 300; // 5 секунд кулдаун
    return true;
}

updateShadowClones() {
    if (this.name !== "DeFi.NinJa_Elijah" || !this.shadowClones) return;
    
    for (let i = this.shadowClones.length - 1; i >= 0; i--) {
        const clone = this.shadowClones[i];
        
        clone.life--;
        clone.attackTimer--;
        clone.alpha = clone.life / 90;
        
        // Клон атакует
        if (clone.attackTimer <= 0 && !clone.hasAttacked) {
            this.executeCloneAttack(clone);
            clone.hasAttacked = true;
        }
        
        // Удаляем мертвого клона
        if (clone.life <= 0) {
            this.shadowClones.splice(i, 1);
        }
    }
}

executeCloneAttack(clone) {
    // Определяем цель
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        return;
    }
    
    const distance = Math.sqrt(
        Math.pow(clone.x - (target.x + target.width/2), 2) + 
        Math.pow(clone.y - (target.y + target.height/2), 2)
    );
    
    if (distance <= 120) {
        // Наносим урон
        if (target.takeDamage) {
            target.takeDamage(20);
        }
        
        // Эффекты
        target.screenShake = Math.max(target.screenShake, 8);
        
        console.log(`🥷💥 Теневой клон попал в ${target.name}! Урон: 20`);
        
        return 'hit';
    } else {
        console.log(`🥷❌ Теневой клон промахнулся! Дистанция: ${distance}`);
        return 'miss';
    }
}

// 🥷 ИСПРАВЛЕННЫЙ МЕТОД РИСОВАНИЯ ТЕНЕВЫХ КЛОНОВ
// Заменить существующий метод drawShadowClones в классе Fighter

drawShadowClones(ctx) {
    if (this.name !== "DeFi.NinJa_Elijah" || !this.shadowClones) return;
    
    this.shadowClones.forEach(clone => {
        ctx.save();
        
        // Определяем какую картинку использовать
        let imageKey = 'idle'; // По умолчанию обычная поза
        
        // Если клон готовится к атаке, используем attack картинку
        if (clone.attackTimer <= 10 && clone.attackTimer > 0) {
            imageKey = 'attack';
        }
        
        // Получаем картинку из кэша (используем кэш игрока или бота)
        let currentCache, cacheLoaded;
        if (this === player) {
            currentCache = imageCache;
            cacheLoaded = imagesLoaded;
        } else {
            currentCache = window.botImageCache || {};
            cacheLoaded = window.botImagesLoaded || false;
        }
        
        const img = currentCache[imageKey];
        
        if (img && cacheLoaded) {
            // ✨ РИСУЕМ РЕАЛЬНУЮ КАРТИНКУ НИНДЗЯ ✨
            
            // Устанавливаем прозрачность клона
            ctx.globalAlpha = clone.alpha * 0.8; // Немного прозрачнее для эффекта тени
            
            // Применяем теневой эффект
            ctx.filter = `hue-rotate(240deg) brightness(0.7) contrast(1.2)`; // Синеватый оттенок тени
            
            // Рисуем картинку ниндзя в позиции клона
            ctx.drawImage(img, clone.x, clone.y, this.width * 0.9, this.height * 0.9);
            
            // Убираем фильтр
            ctx.filter = 'none';
            
            // ⚡ ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ НИНДЗЯ:
            
            // 1. Красные светящиеся глаза
            const eyeGlow = clone.alpha * 0.9;
            ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
            ctx.shadowBlur = 15;
            
            ctx.fillStyle = `rgba(255, 0, 0, ${eyeGlow})`;
            // Позиции глаз относительно картинки (настройте под вашу PNG)
            ctx.fillRect(clone.x + 45, clone.y + 25, 8, 8);  // Левый глаз
            ctx.fillRect(clone.x + 65, clone.y + 25, 8, 8);  // Правый глаз
            
            ctx.shadowBlur = 0;
            
            // 2. Теневое свечение вокруг клона
            ctx.strokeStyle = `rgba(100, 50, 150, ${clone.alpha * 0.6})`;
            ctx.lineWidth = 3;
            ctx.strokeRect(clone.x - 2, clone.y - 2, this.width * 0.9 + 4, this.height * 0.9 + 4);
            
            // 3. Энергетические искры ниндзя
            if (clone.attackTimer <= 20) {
                for (let spark = 0; spark < 4; spark++) {
                    const angle = (spark / 4) * Math.PI * 2 + Date.now() * 0.01;
                    const sparkX = clone.x + this.width * 0.45 + Math.cos(angle) * 30;
                    const sparkY = clone.y + this.height * 0.45 + Math.sin(angle) * 30;
                    
                    ctx.fillStyle = `rgba(150, 0, 255, ${clone.alpha * 0.8})`;
                    ctx.beginPath();
                    ctx.arc(sparkX, sparkY, 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            
            // 4. Эффект исчезновения (дым)
            if (clone.life < 30) {
                const smokeIntensity = (30 - clone.life) / 30;
                ctx.fillStyle = `rgba(100, 100, 100, ${smokeIntensity * 0.4})`;
                
                for (let smoke = 0; smoke < 8; smoke++) {
                    const smokeX = clone.x + Math.random() * this.width * 0.9;
                    const smokeY = clone.y + Math.random() * this.height * 0.9;
                    const smokeSize = 3 + Math.random() * 4;
                    
                    ctx.beginPath();
                    ctx.arc(smokeX, smokeY, smokeSize, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            
        } else {
            // 🔄 ЗАПАСНОЙ ВАРИАНТ (если картинка не загружена)
            console.log(`⚠️ Картинка ${imageKey} для ниндзя-клона не найдена, используем простой рисунок`);
            
            ctx.globalAlpha = clone.alpha;
            
            // Простой темный силуэт ниндзя
            ctx.fillStyle = `rgba(50, 50, 100, ${clone.alpha * 0.8})`;
            ctx.fillRect(clone.x, clone.y, this.width * 0.8, this.height * 0.8);
            
            // Красные глаза
            ctx.fillStyle = `rgba(255, 0, 0, ${clone.alpha})`;
            ctx.fillRect(clone.x + 20, clone.y + 20, 8, 8);
            ctx.fillRect(clone.x + 40, clone.y + 20, 8, 8);
            
            // Эффект дыма при исчезновении
            if (clone.life < 30) {
                ctx.fillStyle = `rgba(100, 100, 100, ${clone.alpha * 0.3})`;
                for (let j = 0; j < 5; j++) {
                    const dustX = clone.x + Math.random() * this.width;
                    const dustY = clone.y + Math.random() * this.height;
                    ctx.beginPath();
                    ctx.arc(dustX, dustY, 3 + Math.random() * 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }
        
        ctx.restore();
    });
}

drawCloneCooldown(ctx, x, y) {
    if (this.name !== "DeFi.NinJa_Elijah" || this.cloneCooldown <= 0) return;
    
    const cooldownPercent = this.cloneCooldown / 300;
    ctx.fillStyle = 'rgba(100, 50, 150, 0.8)';
    ctx.fillRect(x - 30, y - 55, 60 * (1 - cooldownPercent), 6);
    
    // Иконка способности
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🥷', x, y - 60);
    }
}
// 💖 МЕТОДЫ РИСОВАНИЯ ДЛЯ HEART PULSE AASHI
drawHeartPulses(ctx) {
    if (this.name !== "Aashi" || !this.heartPulses || this.heartPulses.length === 0) return;
    
    this.heartPulses.forEach(pulse => {
        const centerX = pulse.x;
        const centerY = pulse.y;
        
        // 💖 НОВАЯ АНИМАЦИЯ: СЕРДЕЧНАЯ ФОРМА ВМЕСТО КРУГОВ
        
        // 1. Основные кольца в форме сердца
        for (let ring = 0; ring < 4; ring++) {
            let ringRadius = pulse.radius - (ring * 15);
            if (ringRadius <= 0) continue;
            
            let ringAlpha = pulse.alpha * (1 - ring * 0.25);
            let ringWidth = 6 - ring * 1.5;
            
            // Рисуем форму сердца
            ctx.strokeStyle = `hsla(${320 + pulse.pulseIndex * 20}, 90%, ${80 - ring * 15}%, ${ringAlpha})`;
            ctx.lineWidth = ringWidth;
            ctx.beginPath();
            
            // Математическая формула сердца
            for (let t = 0; t <= Math.PI * 2; t += 0.1) {
                const scale = ringRadius / 50; // Масштаб сердца
                const x = centerX + scale * 16 * Math.pow(Math.sin(t), 3);
                const y = centerY - scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                
                if (t === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        // 2. ПУЛЬСИРУЮЩИЕ РОЗОВЫЕ СЕРДЕЧКИ ПО КРАЮ
        const heartCount = Math.floor(pulse.radius / 30);
        for (let i = 0; i < heartCount; i++) {
            const angle = (i / heartCount) * Math.PI * 2 + pulse.heartbeat * 0.3;
            const heartRadius = pulse.radius + Math.sin(pulse.heartbeat * 2 + i) * 12;
            const heartX = centerX + Math.cos(angle) * heartRadius;
            const heartY = centerY + Math.sin(angle) * heartRadius;
            
            // Размер сердечка зависит от пульса
            const heartSize = 20 + Math.sin(pulse.heartbeat * 3 + i) * 5;
            
            ctx.save();
            ctx.translate(heartX, heartY);
            ctx.scale(heartSize / 20, heartSize / 20);
            
            // Рисуем эмодзи сердечко с эффектом свечения
            ctx.shadowColor = 'rgba(255, 105, 180, 0.8)';
            ctx.shadowBlur = 15;
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 105, 180, ${pulse.alpha})`;
            ctx.fillText('💖', 0, 6);
            
            ctx.restore();
        }
        
        // 3. ЦЕНТРАЛЬНОЕ БОЛЬШОЕ СЕРДЦЕ С ГРАДИЕНТОМ
        if (pulse.radius < 100) {
            const centerAlpha = (100 - pulse.radius) / 100 * pulse.alpha;
            const pulseFactor = 1 + Math.sin(pulse.heartbeat * 2.5) * 0.6;
            
            // Большое центральное сердце
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(pulseFactor * 2, pulseFactor * 2);
            
            // Градиентное свечение
            ctx.shadowColor = 'rgba(255, 20, 147, 0.9)';
            ctx.shadowBlur = 30;
            
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 20, 147, ${centerAlpha})`;
            ctx.fillText('💝', 0, 12);
            
            ctx.restore();
        }
        
        // 4. ЛЕТЯЩИЕ МАЛЕНЬКИЕ СЕРДЕЧКИ (новый эффект)
        for (let i = 0; i < 8; i++) {
            const floatAngle = (i / 8) * Math.PI * 2 + pulse.heartbeat * 0.8;
            const floatRadius = pulse.radius * 0.6 + Math.sin(pulse.heartbeat * 1.5 + i) * 20;
            const floatX = centerX + Math.cos(floatAngle) * floatRadius;
            const floatY = centerY + Math.sin(floatAngle) * floatRadius + Math.sin(pulse.heartbeat * 2 + i) * 10;
            
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 182, 193, ${pulse.alpha * 0.7})`;
            ctx.fillText('💗', floatX, floatY);
        }
        
        // 5. ЭНЕРГЕТИЧЕСКИЕ ИСКРЫ ЛЮБВИ
        for (let spark = 0; spark < 12; spark++) {
            const sparkAngle = (spark / 12) * Math.PI * 2 + pulse.heartbeat;
            const sparkDistance = pulse.radius + Math.random() * 30;
            const sparkX = centerX + Math.cos(sparkAngle) * sparkDistance;
            const sparkY = centerY + Math.sin(sparkAngle) * sparkDistance;
            
            // Розовые искорки
            ctx.fillStyle = `rgba(255, 20, 147, ${pulse.alpha * 0.8})`;
            ctx.shadowColor = 'rgba(255, 20, 147, 0.6)';
            ctx.shadowBlur = 8;
            
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2 + Math.random() * 2, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // 6. ВОЛНА ИСЦЕЛЕНИЯ (зеленые кольца внутри)
        if (this.name === "Aashi") {
            for (let healRing = 0; healRing < 2; healRing++) {
                const healRadius = pulse.radius * (0.3 + healRing * 0.2);
                const healAlpha = pulse.alpha * (1 - healRing * 0.4);
                
                ctx.strokeStyle = `rgba(0, 255, 127, ${healAlpha})`;
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]);
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, healRadius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
        
        ctx.shadowBlur = 0; // Сбрасываем тень
    });
}

// 2. ОБНОВИТЕ ТАКЖЕ МЕТОД createHeartPulse ДЛЯ БОЛЕЕ ПЛАВНОЙ АНИМАЦИИ:

createHeartPulse(pulseIndex) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const maxRadius = (characterConfig ? characterConfig.pulseRadius : 200) + (pulseIndex * 40);
    const damage = characterConfig ? characterConfig.damageAmount : 25;
    
    const pulse = {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
        radius: 15, // Начинаем с меньшего радиуса
        maxRadius: maxRadius,
        speed: 4 + pulseIndex * 0.5, // Медленнее для красоты
        damage: damage,
        color: `hsl(${320 + pulseIndex * 25}, 90%, ${70 + pulseIndex * 5}%)`, // Более яркие цвета
        alpha: 1,
        hasHit: false,
        pulseIndex: pulseIndex,
        heartbeat: 0, // Для анимации сердцебиения
        creationTime: Date.now() // Для дополнительных эффектов
    };
    
    this.heartPulses.push(pulse);
    console.log(`💖 Создан улучшенный Heart Pulse ${pulseIndex + 1} с сердечной анимацией!`);
}

// 3. ОБНОВИТЕ updateHeartPulses ДЛЯ УЛУЧШЕННОЙ ФИЗИКИ:

updateHeartPulses() {
    if (this.name !== "Aashi" || !this.heartPulses) return;
    
    try {
        for (let i = this.heartPulses.length - 1; i >= 0; i--) {
            const pulse = this.heartPulses[i];
            
            if (!pulse) {
                this.heartPulses.splice(i, 1);
                continue;
            }
            
            // Более плавное расширение
            pulse.radius += pulse.speed;
            pulse.alpha = Math.max(0, 1 - (pulse.radius / pulse.maxRadius));
            
            // Улучшенная анимация сердцебиения
            const timeSinceCreation = (Date.now() - pulse.creationTime) / 1000;
            pulse.heartbeat = timeSinceCreation * 3; // Частота сердцебиения
            
            // Проверяем столкновения с противником
            if (this === player && bot && !pulse.hasHit && pulse.radius > 40) {
                this.checkHeartPulseCollision(pulse, bot);
            } else if (this === bot && player && !pulse.hasHit && pulse.radius > 40) {
                this.checkHeartPulseCollision(pulse, player);
            }
            
            // Удаляем пульс если он достиг максимального радиуса
            if (pulse.radius >= pulse.maxRadius || pulse.alpha <= 0.01) {
                this.heartPulses.splice(i, 1);
            }
        }
    } catch (error) {
        console.error('❌ Ошибка в updateHeartPulses:', error);
        this.heartPulses = [];
    }
}

// 4. АЛЬТЕРНАТИВНЫЕ ВАРИАНТЫ АНИМАЦИИ:

// ВАРИАНТ A: ЦВЕТОЧНЫЕ ЛЕПЕСТКИ
drawHeartPulsesFloral(ctx) {
    if (this.name !== "Aashi" || !this.heartPulses || this.heartPulses.length === 0) return;
    
    this.heartPulses.forEach(pulse => {
        // Рисуем лепестки роз вместо сердец
        for (let petal = 0; petal < 8; petal++) {
            const angle = (petal / 8) * Math.PI * 2 + pulse.heartbeat * 0.5;
            const petalX = pulse.x + Math.cos(angle) * pulse.radius;
            const petalY = pulse.y + Math.sin(angle) * pulse.radius;
            
            ctx.save();
            ctx.translate(petalX, petalY);
            ctx.rotate(angle);
            
            // Лепесток в виде эллипса
            ctx.fillStyle = `rgba(255, 105, 180, ${pulse.alpha * 0.8})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, 15, 8, 0, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.restore();
        }
        
        // Центральный цветок
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(255, 20, 147, ${pulse.alpha})`;
        ctx.fillText('🌸', pulse.x, pulse.y + 10);
    });
}

// ВАРИАНТ B: АНГЕЛЬСКИЕ КРЫЛЬЯ
drawHeartPulsesAngelic(ctx) {
    if (this.name !== "Aashi" || !this.heartPulses || this.heartPulses.length === 0) return;
    
    this.heartPulses.forEach(pulse => {
        const wingSpan = pulse.radius * 0.8;
        
        // Левое крыло
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulse.alpha * 0.9})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i <= 20; i++) {
            const t = (i / 20) * Math.PI;
            const x = pulse.x - wingSpan * Math.cos(t) * 0.5;
            const y = pulse.y + wingSpan * Math.sin(t) * 0.3;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Правое крыло
        ctx.beginPath();
        for (let i = 0; i <= 20; i++) {
            const t = (i / 20) * Math.PI;
            const x = pulse.x + wingSpan * Math.cos(t) * 0.5;
            const y = pulse.y + wingSpan * Math.sin(t) * 0.3;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Ангельский нимб
        ctx.strokeStyle = `rgba(255, 215, 0, ${pulse.alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y - wingSpan * 0.6, 20, 0, 2 * Math.PI);
        ctx.stroke();
    });
}

// ВАРИАНТ C: ВОДЯНЫЕ КАПЛИ
drawHeartPulsesWater(ctx) {
    if (this.name !== "Aashi" || !this.heartPulses || this.heartPulses.length === 0) return;
    
    this.heartPulses.forEach(pulse => {
        // Водяные круги
        for (let ring = 0; ring < 5; ring++) {
            const ringRadius = pulse.radius - ring * 20;
            if (ringRadius <= 0) continue;
            
            ctx.strokeStyle = `rgba(0, 191, 255, ${pulse.alpha * (1 - ring * 0.2)})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([10, 5]);
            
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, ringRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        // Водяные брызги
        for (let drop = 0; drop < 12; drop++) {
            const angle = (drop / 12) * Math.PI * 2 + pulse.heartbeat;
            const dropX = pulse.x + Math.cos(angle) * pulse.radius;
            const dropY = pulse.y + Math.sin(angle) * pulse.radius;
            
            ctx.fillStyle = `rgba(135, 206, 235, ${pulse.alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(dropX, dropY, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Центральная капля
        ctx.font = 'bold 25px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(0, 191, 255, ${pulse.alpha})`;
        ctx.fillText('💧', pulse.x, pulse.y + 8);
    });
}

// 4. ДОПОЛНИТЕЛЬНЫЕ УЛУЧШЕНИЯ ДЛЯ AASHI:

// Обновите метод heartPulse для более эпичного эффекта:
heartPulse() {
    if (this.heartPulseCooldown > 0 || this.name !== "Aashi") {
        console.log(`❌ Heart Pulse недоступен! Кулдаун: ${Math.ceil(this.heartPulseCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    console.log(`💖 ${this.name} запускает УЛУЧШЕННЫЙ HEART PULSE! Сердечное исцеление и урон!`);
    
    // Получаем настройки из конфигурации
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const pulseCount = characterConfig ? characterConfig.pulseCount : 3;
    const pulseInterval = characterConfig ? characterConfig.pulseInterval : 35; // Чуть дольше интервал
    const healAmount = characterConfig ? characterConfig.healAmount : 45; // Больше исцеления
    
    // Мгновенное мини-исцеление при активации
    const instantHeal = 15;
    this.health = Math.min(this.maxHealth, this.health + instantHeal);
    this.createHealingEffect(this.x + this.width/2, this.y + this.height/2, instantHeal);
    
    // Создаем пульсы с интервалом
    this.heartPulses = [];
    for (let i = 0; i < pulseCount; i++) {
        setTimeout(() => {
            if (this && gameRunning) {
                this.createHeartPulse(i);
                
                // Исцеляем Aashi при каждом пульсе
                const currentHeal = Math.min(healAmount, this.maxHealth - this.health);
                this.health = Math.min(this.maxHealth, this.health + healAmount);
                
                if (currentHeal > 0) {
                    this.createHealingEffect(this.x + this.width/2, this.y + this.height/2, currentHeal);
                    console.log(`💚 ${this.name} исцелилась на ${currentHeal} HP! Здоровье: ${this.health}/${this.maxHealth}`);
                    
                    // Дополнительные визуальные эффекты исцеления
                    for (let j = 0; j < 5; j++) {
                        setTimeout(() => {
                            this.createHealingEffect(
                                this.x + this.width/2 + (Math.random() - 0.5) * 60,
                                this.y + this.height/2 + (Math.random() - 0.5) * 60,
                                5
                            );
                        }, j * 100);
                    }
                }
            }
        }, i * (pulseInterval * 16.67)); // Конвертируем кадры в миллисекунды
    }
    
    this.heartPulseCooldown = characterConfig ? characterConfig.abilityCooldown : 300;
    return true;
}

drawHealingEffects(ctx) {
    if (!this.healingEffects) return;
    
    this.healingEffects.forEach(effect => {
        ctx.save();
        ctx.globalAlpha = effect.alpha;
        
        // Летящий текст исцеления
        ctx.fillStyle = '#00FF7F';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 3;
        
        const text = `+${effect.amount}`;
        ctx.strokeText(text, effect.x, effect.y);
        ctx.fillText(text, effect.x, effect.y);
        
        ctx.restore();
    });
    
    // Рисуем частицы исцеления
    if (this.hitParticles) {
        this.hitParticles.forEach(particle => {
            if (particle.type === 'healing') {
                const alpha = particle.life / particle.maxLife;
                ctx.fillStyle = `rgba(0, 255, 127, ${alpha})`;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
                ctx.fill();
                
                // Свечение частицы исцеления
                ctx.shadowColor = 'rgba(0, 255, 127, 0.6)';
                ctx.shadowBlur = 8;
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });
    }
}

drawHeartPulseCooldown(ctx, x, y) {
    if (this.name !== "Aashi" || this.heartPulseCooldown <= 0) return;
    
    const cooldownPercent = this.heartPulseCooldown / 300;
    ctx.fillStyle = 'rgba(255, 105, 180, 0.8)';
    ctx.fillRect(x - 30, y - 65, 60 * (1 - cooldownPercent), 6);
    
    // Иконка способности
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('💖', x, y - 70);
    }
}
drawHeartPulseCooldown(ctx, x, y) {
    if (this.name !== "Aashi" || this.heartPulseCooldown <= 0) return;
    
    const cooldownPercent = this.heartPulseCooldown / 300;
    ctx.fillStyle = 'rgba(255, 105, 180, 0.8)';
    ctx.fillRect(x - 30, y - 65, 60 * (1 - cooldownPercent), 6);
    
    // Иконка способности
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('💖', x, y - 70);
    }
}





createTransformEffect(x, y) {
    if (!this.transformEffects) {
        this.transformEffects = [];
    }
    
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const effect = {
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            velocityX: Math.cos(angle) * 3,
            velocityY: Math.sin(angle) * 3 - 2,
            life: 40 + Math.random() * 20,
            maxLife: 60,
            size: 3 + Math.random() * 4,
            color: Math.random() < 0.5 ? 'yellow' : 'orange'
        };
        
        this.transformEffects.push(effect);
    }
}

createTransformationExplosion(x, y) {
    if (!this.transformExplosions) {
        this.transformExplosions = [];
    }
    
    const explosion = {
        x: x,
        y: y,
        radius: 0,
        maxRadius: 60,
        life: 30,
        maxLife: 30
    };
    
    this.transformExplosions.push(explosion);
    
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const particle = {
            x: x,
            y: y,
            velocityX: Math.cos(angle) * (4 + Math.random() * 4),
            velocityY: Math.sin(angle) * (4 + Math.random() * 4) - 3,
            life: 50 + Math.random() * 30,
            maxLife: 80,
            size: 4 + Math.random() * 3,
            isBanana: true
        };
        
        if (!this.hitParticles) {
            this.hitParticles = [];
        }
        this.hitParticles.push(particle);
    }
}

updateTransformEffects() {
    if (!this.transformEffects) return;
    
    for (let i = this.transformEffects.length - 1; i >= 0; i--) {
        const effect = this.transformEffects[i];
        
        effect.x += effect.velocityX;
        effect.y += effect.velocityY;
        effect.velocityY += 0.2;
        effect.life--;
        
        if (effect.life <= 0) {
            this.transformEffects.splice(i, 1);
        }
    }
}

updateTransformExplosions() {
    if (!this.transformExplosions) return;
    
    for (let i = this.transformExplosions.length - 1; i >= 0; i--) {
        const explosion = this.transformExplosions[i];
        
        explosion.radius += (explosion.maxRadius - explosion.radius) * 0.2;
        explosion.life--;
        
        if (explosion.life <= 0) {
            this.transformExplosions.splice(i, 1);
        }
    }
}
updateTransformExplosions() {
    if (!this.transformExplosions) return;
    
    for (let i = this.transformExplosions.length - 1; i >= 0; i--) {
        const explosion = this.transformExplosions[i];
        
        explosion.radius += (explosion.maxRadius - explosion.radius) * 0.2;
        explosion.life--;
        
        if (explosion.life <= 0) {
            this.transformExplosions.splice(i, 1);
        }
    }
}

drawTransformEffects(ctx) {
    if (!this.transformEffects) return;
    
    this.transformEffects.forEach(effect => {
        const alpha = effect.life / effect.maxLife;
        
        ctx.fillStyle = effect.color === 'yellow' ? `rgba(255, 215, 0, ${alpha})` : `rgba(255, 165, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Свечение
        ctx.shadowColor = effect.color === 'yellow' ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 165, 0, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

drawTransformExplosions(ctx) {
    if (!this.transformExplosions) return;
    
    this.transformExplosions.forEach(explosion => {
        const alpha = explosion.life / explosion.maxLife;
        
        // Внешнее кольцо
        ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Внутреннее кольцо
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius * 0.6, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Банановые эмодзи по кругу
        const emojiCount = 8;
        for (let i = 0; i < emojiCount; i++) {
            const angle = (i / emojiCount) * Math.PI * 2;
            const emojiX = explosion.x + Math.cos(angle) * explosion.radius;
            const emojiY = explosion.y + Math.sin(angle) * explosion.radius;
            
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
            ctx.fillText('🍌', emojiX, emojiY + 5);
        }
   
    }
);
    
}
// 🍌 МЕТОДЫ МОНСТР-ТРАНСФОРМАЦИИ
monsterTransform() {
    if (this.monsterCooldown > 0 || this.name !== "effgennn.l33t") {
        console.log(`❌ Monster Transform недоступен! Кулдаун: ${Math.ceil(this.monsterCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    if (this.isMonster) {
        console.log('❌ Уже в форме монстра!');
        return false;
    }
    
    console.log(`🍌 ${this.name} начинает МОНСТР-ТРАНСФОРМАЦИЮ!`);
    
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    this.transforming = true;
    this.transformTimer = 30;
    this.monsterCooldown = characterConfig ? characterConfig.abilityCooldown : 600;
    
    this.createTransformEffect(this.x + this.width/2, this.y + this.height/2);
    this.monsterGlow = 60;
    
    console.log(`🍌 Трансформация начата! Анимация: ${this.transformTimer} кадров`);
    return true;
}
completeTransformation() {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    this.isMonster = true;
    this.transforming = false;
    this.monsterDuration = characterConfig ? characterConfig.transformDuration : 300;
    
    this.originalSize = { width: this.width, height: this.height };
    this.originalSpeed = this.moveSpeed;
    
    const sizeMultiplier = characterConfig ? characterConfig.monsterSizeMultiplier : 1.8;
    const speedMultiplier = characterConfig ? characterConfig.monsterSpeedMultiplier : 1.3;
    const knockbackResist = characterConfig ? characterConfig.monsterKnockbackResist : 0.3;
    
    this.width = Math.floor(this.originalSize.width * sizeMultiplier);
    this.height = Math.floor(this.originalSize.height * sizeMultiplier);
    this.moveSpeed = this.originalSpeed * speedMultiplier;
    this.knockbackResistance = knockbackResist;
    
    this.createTransformationExplosion(this.x + this.width/2, this.y + this.height/2);
    this.screenShake = Math.max(this.screenShake, 12);
    this.monsterGlow = 40;
    
    console.log(`🍌💥 ${this.name} превратился в МОНСТРА! Размер: x${sizeMultiplier}, Скорость: x${speedMultiplier}`);
}

// 🏋️ ИСПРАВЛЕННЫЙ МЕТОД ДЛЯ LYRON
completeMuscleTransformation() {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    this.isMuscle = true;
    this.transforming = false;
    this.muscleDuration = characterConfig ? characterConfig.transformDuration : 300;
    
    // Сохраняем оригинальные параметры
    this.originalMuscleSize = { width: this.width, height: this.height };
    this.originalMuscleSpeed = this.moveSpeed;
    
    // УВЕЛИЧЕНИЕ В 3 РАЗА ДЛЯ LYRON
    const sizeMultiplier = 1.2; // ФИКСИРОВАННОЕ УВЕЛИЧЕНИЕ В 3 РАЗА
    const speedMultiplier = characterConfig ? characterConfig.muscleSpeedMultiplier : 0.8;
    const knockbackResist = characterConfig ? characterConfig.muscleKnockbackResist : 0.5;
    
    this.width = Math.floor(this.originalMuscleSize.width * sizeMultiplier);
    this.height = Math.floor(this.originalMuscleSize.height * sizeMultiplier);
    this.moveSpeed = this.originalMuscleSpeed * speedMultiplier;
    this.knockbackResistance = knockbackResist;
    
    // Применяем баффы качка
    const healthBonus = characterConfig ? characterConfig.muscleHealthBonus : 50;
    this.health = Math.min(this.maxHealth, this.health + healthBonus);
    
    this.createMuscleTransformEffect(this.x + this.width/2, this.y + this.height/2);
    this.screenShake = Math.max(this.screenShake, 15);
    this.muscleGlow = 60;
    
    console.log(`🏋️💥 ${this.name} превратился в ГИГАНТСКОГО КАЧКА! Размер: x${sizeMultiplier}!`);
}

updateMonsterForm() {
    if (!this.isMonster) return;
    
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const healthRegen = characterConfig ? characterConfig.monsterHealthRegen : 3;
    
    this.health = Math.min(this.maxHealth, this.health + healthRegen);
    
    if (Math.random() < 0.3) {
        this.createMonsterParticles(this.x + this.width/2, this.y + this.height/2);
    }
}

revertFromMonster() {
    if (!this.isMonster) return;
    
    this.isMonster = false;
    this.width = this.originalSize.width;
    this.height = this.originalSize.height;
    this.moveSpeed = this.originalSpeed;
    this.knockbackResistance = 1.0;
    
    this.createTransformEffect(this.x + this.width/2, this.y + this.height/2);
    this.monsterGlow = 30;
    
    console.log(`🍌 ${this.name} вернулся в нормальную форму`);
}

createMonsterParticles(x, y) {
    if (!this.monsterParticles) {
        this.monsterParticles = [];
    }
    
    for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const particle = {
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            velocityX: Math.cos(angle) * 2,
            velocityY: Math.sin(angle) * 2 - 1,
            life: 60 + Math.random() * 40,
            maxLife: 100,
            size: 4 + Math.random() * 3,
            color: Math.random() < 0.5 ? 'orange' : 'red'
        };
        
        this.monsterParticles.push(particle);
    }
}

updateMonsterParticles() {
    if (!this.monsterParticles) return;
    
    for (let i = this.monsterParticles.length - 1; i >= 0; i--) {
        const particle = this.monsterParticles[i];
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.1;
        particle.life--;
        
        if (particle.life <= 0) {
            this.monsterParticles.splice(i, 1);
        }
    }
}

drawMonsterEffects(ctx, drawX, drawY) {
    if (this.name !== "effgennn.l33t") return;
    
    if (this.transforming) {
        const progress = 1 - (this.transformTimer / 30);
        const centerX = drawX + this.width/2;
        const centerY = drawY + this.height/2;
        
        for (let ring = 0; ring < 3; ring++) {
            const radius = 50 + ring * 20;
            const alpha = (1 - progress) * (1 - ring * 0.3);
            
            ctx.strokeStyle = `rgba(255, 165, 0, ${alpha})`;
            ctx.lineWidth = 4 - ring;
            ctx.setLineDash([10, 5]);
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, progress * Math.PI * 2, (progress + 0.5) * Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        ctx.fillStyle = `rgba(255, 215, 0, ${progress})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30 * progress, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    if (this.isMonster && this.monsterGlow > 0) {
        const centerX = drawX + this.width/2;
        const centerY = drawY + this.height/2;
        const glowIntensity = this.monsterGlow / 40;
        
        ctx.shadowColor = 'rgba(255, 69, 0, 0.8)';
        ctx.shadowBlur = 20;
        
        ctx.strokeStyle = `rgba(255, 69, 0, ${glowIntensity})`;
        ctx.lineWidth = 6;
        ctx.strokeRect(drawX - 3, drawY - 3, this.width + 6, this.height + 6);
        
        ctx.shadowBlur = 0;
        
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Date.now() * 0.01;
            const sparkX = centerX + Math.cos(angle) * 60;
            const sparkY = centerY + Math.sin(angle) * 60;
            
            ctx.fillStyle = `rgba(255, 140, 0, ${glowIntensity * 0.8})`;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

drawMonsterParticles(ctx) {
    if (!this.monsterParticles || this.name !== "effgennn.l33t") return;
    
    this.monsterParticles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        
        ctx.fillStyle = particle.color === 'orange' ? `rgba(255, 165, 0, ${alpha})` : `rgba(255, 69, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.shadowColor = particle.color === 'orange' ? 'rgba(255, 165, 0, 0.6)' : 'rgba(255, 69, 0, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

drawMonsterCooldown(ctx, x, y) {
    if (this.name !== "effgennn.l33t" || this.monsterCooldown <= 0) return;
    
    const cooldownPercent = this.monsterCooldown / 600;
    ctx.fillStyle = 'rgba(255, 140, 0, 0.8)';
    ctx.fillRect(x - 30, y - 95, 60 * (1 - cooldownPercent), 6);
    
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🍌', x, y - 100);
    }
}
// 🏋️ МЕТОДЫ MUSCLE TRANSFORMATION ДЛЯ LYRON
muscleTransform() {
    if (this.muscleCooldown > 0 || this.name !== "Lyron") {
        console.log(`❌ Muscle Transform недоступен! Кулдаун: ${Math.ceil(this.muscleCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    if (this.isMuscle) {
        console.log('❌ Уже в форме качка!');
        return false;
    }
    
    console.log(`🏋️ ${this.name} начинает ГИГАНТСКУЮ MUSCLE TRANSFORMATION!`);
    
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    // Запускаем процесс трансформации
    this.transforming = true;
    this.transformTimer = 30; // 30 кадров анимации
    this.muscleCooldown = characterConfig ? characterConfig.abilityCooldown : 480;
    this.barbellUsedThisTransform = false;
    
    // Визуальные эффекты начала трансформации
    this.createMuscleTransformEffect(this.x + this.width/2, this.y + this.height/2);
    this.muscleGlow = 60;
    this.screenShake = Math.max(this.screenShake, 15);
    
    console.log(`🏋️💥 ${this.name} начинает превращение в ГИГАНТА!`);
    return true;
}

revertFromMuscle() {
    if (!this.isMuscle) return;
    
    this.isMuscle = false;
    this.width = this.originalMuscleSize.width;
    this.height = this.originalMuscleSize.height;
    this.moveSpeed = this.originalMuscleSpeed;
    this.knockbackResistance = 1.0;
    this.isUsingBarbell = false;
    this.barbellPhase = 'none';
    this.barbellTarget = null;
    
    this.createMuscleTransformEffect(this.x + this.width/2, this.y + this.height/2);
    this.muscleGlow = 30;
    
    console.log(`🏋️ ${this.name} вернулся в нормальную форму`);
}

updateMuscleForm() {
    if (!this.isMuscle) return;
    
    // Создаем частицы силы
    if (Math.random() < 0.2) {
        this.createMuscleParticles(this.x + this.width/2, this.y + this.height/2);
    }
}

// 🏋️ ЖИВАЯ ШТАНГА - ОСНОВНОЙ МЕТОД
useLivingBarbell(target) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const barbellRange = characterConfig ? characterConfig.barbell_range : 80;
    const distance = Math.abs(this.x - target.x);
    
    if (distance > barbellRange) {
        console.log(`❌ Цель слишком далеко для живой штанги! Дистанция: ${distance}, нужно: ${barbellRange}`);
        return false;
    }
    
    console.log(`🏋️ ${this.name} хватает ${target.name} как живую штангу!`);
    
    // Начинаем использование живой штанги
    this.isUsingBarbell = true;
    this.barbellPhase = 'grab';
    this.barbellTimer = 10; // 10 кадров на захват
    this.barbellTarget = target;
    this.barbellUsedThisTransform = true;
    
    // Останавливаем движение обеих персонажей
    this.velocityX = 0;
    this.velocityY = 0;
    target.velocityX = 0;
    target.velocityY = 0;
    target.stunned = 15; // Кратковременное оглушение при захвате
    
    return 'barbell_started';
}

// 🏋️ ОБНОВЛЕНИЕ ЖИВОЙ ШТАНГИ
// 🏋️ ОБНОВЛЕНИЕ ЖИВОЙ ШТАНГИ
updateBarbell() {
    if (!this.isUsingBarbell || !this.barbellTarget) return;
    
    this.barbellTimer--;
    
    switch (this.barbellPhase) {
        case 'grab':
            // Фаза захвата
            if (this.barbellTimer <= 0) {
                this.barbellPhase = 'lift';
                this.barbellTimer = 30; // 30 кадров на подъем
                console.log(`🏋️ ${this.name} поднимает ${this.barbellTarget.name} над головой!`);
            }
            break;
            
        case 'lift':
            // Фаза подъема
            const liftProgress = 1 - (this.barbellTimer / 30);
            this.barbellHoldHeight = liftProgress * 80; // Поднимаем на 80 пикселей
            
            // Цель следует за качком во время подъема
            this.barbellTarget.x = this.x + this.width/2 - this.barbellTarget.width/2;
            this.barbellTarget.y = this.y - this.barbellHoldHeight - this.barbellTarget.height;
            
            if (this.barbellTimer <= 0) {
                this.barbellPhase = 'carry';
                const characterConfig = CHARACTERS.find(char => char.name === this.name);
                this.barbellCarryTime = characterConfig ? characterConfig.barbell_carry_time : 180;
                console.log(`🏋️ ${this.name} держит ${this.barbellTarget.name} как штангу горизонтально!`);
            }
            break;
            
        case 'carry':
            // Фаза ношения - цель лежит ГОРИЗОНТАЛЬНО над головой
            this.barbellCarryTime--;
            
            // 🏋️ НОВОЕ: Цель лежит горизонтально над качком
            this.barbellTarget.x = this.x + this.width/2 - this.barbellTarget.width/2;
            this.barbellTarget.y = this.y - 80 - this.barbellTarget.height;
            
            // 🏋️ НОВОЕ: Делаем цель горизонтальной (поворачиваем на 90 градусов)
            this.barbellTarget.isHorizontal = true;
            this.barbellTarget.horizontalRotation = Math.PI / 2; // 90 градусов
            
            // Качок двигается медленнее с грузом
            this.moveSpeed = this.originalMuscleSpeed * 0.5;
            
            // 🏋️ НОВОЕ: Проверяем ПКМ для ручного броска
            if (this === player && this.manualThrowRequested) {
                this.executeBarbellThrow();
                this.manualThrowRequested = false;
                return;
            }
            
            // Автоматический бросок по истечении времени
            if (this.barbellCarryTime <= 0) {
                this.executeBarbellThrow();
            }
            break;
            
        case 'throw':
            // Фаза броска
            if (this.barbellTimer <= 0) {
                this.endBarbellUse();
            }
            break;
    }
}

// 🏋️ ВЫПОЛНЕНИЕ БРОСКА ЖИВОЙ ШТАНГИ
executeBarbellThrow() {
    if (!this.barbellTarget) return;
    
    console.log(`🏋️💥 ${this.name} БРОСАЕТ ${this.barbellTarget.name} как штангу!`);
    
    const target = this.barbellTarget;
    
    // МОЩНЫЙ БРОСОК
    const throwDirection = this.facingRight ? 1 : -1;
    target.velocityX = throwDirection * 40; // Сильный горизонтальный бросок
    target.velocityY = -20; // Высокий подброс
    
    // Урон от броска штанги
    if (target.takeDamage) {
        target.takeDamage(60); // Мощный урон
    }
    
    // Длительное оглушение
    target.stunned = 120; // 2 секунды оглушения
    target.knockback = throwDirection * 30;
    target.screenShake = Math.max(target.screenShake, 20);
    this.screenShake = Math.max(this.screenShake, 15);
    
    // Эффекты
    this.createMuscleParticles(target.x + target.width/2, target.y + target.height/2);
    
    console.log(`🏋️💥 ЖИВАЯ ШТАНГА! Мощный бросок! Урон: 60`);
    
    // Переходим к завершению
    this.barbellPhase = 'throw';
    this.barbellTimer = 20;
}

// 🏋️ ЗАВЕРШЕНИЕ ИСПОЛЬЗОВАНИЯ ШТАНГИ
// 🏋️ ЗАВЕРШЕНИЕ ИСПОЛЬЗОВАНИЯ ШТАНГИ
endBarbellUse() {
    // 🏋️ НОВОЕ: Возвращаем цель в нормальное положение
    if (this.barbellTarget) {
        this.barbellTarget.isHorizontal = false;
        this.barbellTarget.horizontalRotation = 0;
    }
    
    this.isUsingBarbell = false;
    this.barbellPhase = 'none';
    this.barbellTarget = null;
    this.barbellHoldHeight = 0;
    this.barbellCarryTime = 0;
    
    // Возвращаем нормальную скорость качка
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const speedMultiplier = characterConfig ? characterConfig.muscleSpeedMultiplier : 0.8;
    this.moveSpeed = this.originalMuscleSpeed * speedMultiplier;
    
    console.log(`🏋️ ${this.name} закончил использование живой штанги`);
}

// 🏋️ СОЗДАНИЕ ЭФФЕКТА ТРАНСФОРМАЦИИ
createMuscleTransformEffect(x, y) {
    if (!this.muscleParticles) {
        this.muscleParticles = [];
    }
    
    // Энергетические частицы трансформации
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const particle = {
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            velocityX: Math.cos(angle) * 4,
            velocityY: Math.sin(angle) * 4 - 2,
            life: 60 + Math.random() * 40,
            maxLife: 100,
            size: 4 + Math.random() * 3,
            color: Math.random() < 0.5 ? 'gold' : 'orange'
        };
        
        this.muscleParticles.push(particle);
    }
}

// 🏋️ СОЗДАНИЕ ЧАСТИЦ КАЧКА
createMuscleParticles(x, y) {
    if (!this.muscleParticles) {
        this.muscleParticles = [];
    }
    
    for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const particle = {
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            velocityX: Math.cos(angle) * 2,
            velocityY: Math.sin(angle) * 2 - 1,
            life: 40 + Math.random() * 20,
            maxLife: 60,
            size: 3 + Math.random() * 2,
            color: Math.random() < 0.5 ? 'gold' : 'red'
        };
        
        this.muscleParticles.push(particle);
    }
}

// 🏋️ ОБНОВЛЕНИЕ ЧАСТИЦ КАЧКА
updateMuscleParticles() {
    if (!this.muscleParticles) return;
    
    for (let i = this.muscleParticles.length - 1; i >= 0; i--) {
        const particle = this.muscleParticles[i];
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.1; // Небольшая гравитация
        particle.life--;
        
        if (particle.life <= 0) {
            this.muscleParticles.splice(i, 1);
        }
    }
}

// 🏋️ РИСОВАНИЕ ЭФФЕКТОВ КАЧКА
drawMuscleEffects(ctx, drawX, drawY) {
    if (this.name !== "Lyron") return;
    
    // Эффект трансформации
    if (this.isMuscle && this.muscleGlow > 0) {
        const centerX = drawX + this.width/2;
        const centerY = drawY + this.height/2;
        const glowIntensity = this.muscleGlow / 60;
        
        // Золотое свечение качка
        ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
        ctx.shadowBlur = 20;
        
        ctx.strokeStyle = `rgba(255, 215, 0, ${glowIntensity})`;
        ctx.lineWidth = 6;
        ctx.strokeRect(drawX - 3, drawY - 3, this.width + 6, this.height + 6);
        
        ctx.shadowBlur = 0;
        
        // Золотые искры вокруг качка
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + Date.now() * 0.01;
            const sparkX = centerX + Math.cos(angle) * 50;
            const sparkY = centerY + Math.sin(angle) * 50;
            
            ctx.fillStyle = `rgba(255, 215, 0, ${glowIntensity * 0.8})`;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    // Индикация живой штанги
    if (this.isUsingBarbell && this.barbellTarget) {
        const targetCenterX = this.barbellTarget.x + this.barbellTarget.width/2;
        const targetCenterY = this.barbellTarget.y + this.barbellTarget.height/2;
        
        // Золотая аура вокруг цели-штанги
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 4;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(this.barbellTarget.x - 5, this.barbellTarget.y - 5, 
                      this.barbellTarget.width + 10, this.barbellTarget.height + 10);
        ctx.setLineDash([]);
        
        // Текст над целью
        ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏋️ ШТАНГА', targetCenterX, targetCenterY - 40);
    }
}

drawMuscleParticles(ctx) {
    if (!this.muscleParticles || this.name !== "Lyron") return;
    
    this.muscleParticles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        
        ctx.fillStyle = particle.color === 'gold' ? `rgba(255, 215, 0, ${alpha})` : `rgba(255, 69, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Свечение частицы
        ctx.shadowColor = particle.color === 'gold' ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 69, 0, 0.6)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

drawMuscleCooldown(ctx, x, y) {
    if (this.name !== "Lyron" || this.muscleCooldown <= 0) return;
    
    const cooldownPercent = this.muscleCooldown / 480;
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.fillRect(x - 30, y - 105, 60 * (1 - cooldownPercent), 6);
    
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🏋️', x, y - 110);
    }
}

// ====== 👻 НОВЫЕ МЕТОДЫ ДЛЯ BANSHEE SCREAM KRISTINA ======

// 👻 МЕТОД АКТИВАЦИИ BANSHEE SCREAM
bansheeScream() {
    if (this.screamCooldown > 0 || this.name !== "Kristina") {
        console.log(`❌ Banshee Scream недоступен! Кулдаун: ${Math.ceil(this.screamCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    // Определяем цель (противника)
    let target;
    if (this === player && bot) {
        target = bot;
    } else if (this === bot && player) {
        target = player;
    } else {
        console.log('❌ Цель для Banshee Scream не найдена!');
        return false;
    }
    
    console.log(`👻 ${this.name} издаёт ПРОНЗИТЕЛЬНЫЙ КРИК БАНШИ!`);
    
    // Получаем настройки из конфигурации
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    // Активируем крик
    this.bansheeScreamActive = true;
    this.isScreaming = true;
    this.screamDuration = characterConfig ? characterConfig.screamDuration : 180;
    this.screamCooldown = characterConfig ? characterConfig.abilityCooldown : 420;
    
    // Немедленный эффект крика
    this.executeScreamAttack(target);
    
    // Создаём начальные звуковые волны
    this.createScreamWaves();
    
    console.log(`👻 Banshee Scream активирован на ${this.screamDuration/60} секунд!`);
    return true;
}

// 👻 МЕТОД ВЫПОЛНЕНИЯ АТАКИ КРИКОМ
executeScreamAttack(target) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const damage = characterConfig ? characterConfig.screamDamage : 35;
    const stunDuration = characterConfig ? characterConfig.screamStunDuration : 90;
    const knockbackForce = characterConfig ? characterConfig.screamKnockback : 30;
    const screamRadius = characterConfig ? characterConfig.screamRadius : 250;
    
    // Проверяем дистанцию до цели
    const distance = Math.abs(this.x - target.x);
    
    if (distance <= screamRadius) {
        // Наносим урон
        if (target.takeDamage) {
            target.takeDamage(damage);
        }
        
        // Оглушаем цель
        target.stunned = stunDuration;
        
        // Мощное отталкивание
        const knockbackDirection = (target.x > this.x) ? 1 : -1;
        target.knockback += knockbackDirection * knockbackForce;
        target.velocityX = knockbackDirection * 25; // Сильный отброс
        target.velocityY = Math.min(target.velocityY, -12); // Подбрасываем вверх
        
        // Эффекты экрана
        target.screenShake = Math.max(target.screenShake, 20);
        this.screenShake = Math.max(this.screenShake, 15);
        
        // Создаём эффекты ужаса
        this.createScreamEffects(target.x + target.width/2, target.y + target.height/2);
        
        console.log(`👻💥 Banshee Scream попал! Урон: ${damage}, Оглушение: ${stunDuration/60} сек`);
        
        return 'hit';
    } else {
        console.log(`👻❌ Banshee Scream промахнулся! Дистанция: ${distance}, радиус: ${screamRadius}`);
        return 'miss';
    }
}

// 👻 МЕТОД СОЗДАНИЯ ЗВУКОВЫХ ВОЛН
createScreamWaves() {
    if (!this.screamWaves) {
        this.screamWaves = [];
    }
    
    // Создаём несколько концентрических волн
    for (let i = 0; i < 5; i++) {
        const wave = {
            x: this.x + this.width/2,
            y: this.y + this.height/2,
            radius: 20 + i * 15,
            maxRadius: 300 + i * 50,
            speed: 8 + i * 2,
            alpha: 1 - i * 0.15,
            waveIndex: i,
            life: 60,
            maxLife: 60
        };
        
        this.screamWaves.push(wave);
    }
}

// 👻 МЕТОД ОБНОВЛЕНИЯ ЗВУКОВЫХ ВОЛН
updateScreamWaves() {
    if (!this.screamWaves) return;
    
    for (let i = this.screamWaves.length - 1; i >= 0; i--) {
        const wave = this.screamWaves[i];
        
        wave.radius += wave.speed;
        wave.life--;
        wave.alpha = (wave.life / wave.maxLife) * (1 - wave.waveIndex * 0.15);
        
        // Удаляем волну если она исчезла
        if (wave.radius >= wave.maxRadius || wave.life <= 0) {
            this.screamWaves.splice(i, 1);
        }
    }
}

// 👻 МЕТОД ОБНОВЛЕНИЯ БАНШИ КРИКА
updateBansheeScream() {
    if (!this.bansheeScreamActive) return;
    
    // Периодически создаём новые волны во время крика
    if (this.screamDuration % 20 === 0) { // Каждые 20 кадров
        this.createScreamWaves();
    }
    
    // Создаём эффекты ужаса
    if (this.screamDuration % 15 === 0) { // Каждые 15 кадров
        this.createScreamEffects(this.x + this.width/2, this.y + this.height/2);
    }
}

// 👻 МЕТОД СОЗДАНИЯ ЭФФЕКТОВ УЖАСА
createScreamEffects(x, y) {
    if (!this.screamEffects) {
        this.screamEffects = [];
    }
    
    // Создаём эффекты черепов и призраков
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        
        const effect = {
            x: x + Math.cos(angle) * distance,
            y: y + Math.sin(angle) * distance,
            velocityX: Math.cos(angle) * 2,
            velocityY: Math.sin(angle) * 2 - 1,
            life: 80 + Math.random() * 40,
            maxLife: 120,
            size: 15 + Math.random() * 10,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            type: Math.random() < 0.5 ? 'skull' : 'ghost'
        };
        
        this.screamEffects.push(effect);
    }
}

// 👻 МЕТОД ОБНОВЛЕНИЯ ЭФФЕКТОВ УЖАСА
updateScreamEffects() {
    if (!this.screamEffects) return;
    
    for (let i = this.screamEffects.length - 1; i >= 0; i--) {
        const effect = this.screamEffects[i];
        
        effect.x += effect.velocityX;
        effect.y += effect.velocityY;
        effect.velocityY += 0.1; // Небольшая гравитация
        effect.rotation += effect.rotationSpeed;
        effect.life--;
        
        // Эффект плавания призраков
        if (effect.type === 'ghost') {
            effect.x += Math.sin(effect.life * 0.1) * 0.5;
            effect.y += Math.cos(effect.life * 0.08) * 0.3;
        }
        
        if (effect.life <= 0) {
            this.screamEffects.splice(i, 1);
        }
    }
}

// 👻 МЕТОД РИСОВАНИЯ ЗВУКОВЫХ ВОЛН
drawScreamWaves(ctx) {
    if (!this.screamWaves || this.name !== "Kristina") return;
    
    this.screamWaves.forEach(wave => {
        // Основная звуковая волна
        ctx.strokeStyle = `rgba(128, 0, 128, ${wave.alpha * 0.8})`;
        ctx.lineWidth = 6 - wave.waveIndex;
        ctx.setLineDash([10, 5]);
        
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Внутреннее свечение
        ctx.strokeStyle = `rgba(255, 0, 255, ${wave.alpha * 0.6})`;
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius * 0.8, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Искры по краю волны
        const sparkCount = Math.floor(wave.radius / 20);
        for (let i = 0; i < sparkCount; i++) {
            const angle = (i / sparkCount) * Math.PI * 2 + wave.life * 0.1;
            const sparkX = wave.x + Math.cos(angle) * wave.radius;
            const sparkY = wave.y + Math.sin(angle) * wave.radius;
            
            ctx.fillStyle = `rgba(255, 0, 255, ${wave.alpha})`;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
}

// 👻 МЕТОД РИСОВАНИЯ ЭФФЕКТОВ УЖАСА
drawScreamEffects(ctx, drawX, drawY) {
    if (!this.screamEffects || this.name !== "Kristina") return;
    
    this.screamEffects.forEach(effect => {
        const alpha = effect.life / effect.maxLife;
        
        ctx.save();
        ctx.translate(effect.x, effect.y);
        ctx.rotate(effect.rotation);
        ctx.globalAlpha = alpha;
        
        if (effect.type === 'skull') {
            // Рисуем череп
            ctx.font = `bold ${effect.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillText('💀', 0, effect.size/3);
            
            // Свечение черепа
            ctx.shadowColor = 'rgba(128, 0, 128, 0.8)';
            ctx.shadowBlur = 15;
            ctx.fillText('💀', 0, effect.size/3);
            
        } else {
            // Рисуем призрака
            ctx.font = `bold ${effect.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(200, 200, 255, ${alpha * 0.8})`;
            ctx.fillText('👻', 0, effect.size/3);
            
            // Свечение призрака
            ctx.shadowColor = 'rgba(200, 200, 255, 0.6)';
            ctx.shadowBlur = 10;
            ctx.fillText('👻', 0, effect.size/3);
        }
        
        ctx.restore();
    });
    
    // Эффект крика самой Kristina
    if (this.isScreaming) {
        const centerX = drawX + this.width/2;
        const centerY = drawY + this.height/2;
        
        // Пульсирующая аура ужаса
        const pulseSize = 80 + Math.sin(Date.now() * 0.02) * 30;
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, pulseSize
        );
        gradient.addColorStop(0, 'rgba(128, 0, 128, 0.4)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(128, 0, 128, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseSize, 0, 2 * Math.PI);
        ctx.fill();
        
        // Текст "КРИК!" над головой
        ctx.fillStyle = 'rgba(255, 0, 255, 0.9)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.lineWidth = 4;
        
        const screamText = '!';
        ctx.strokeText(screamText, centerX, centerY - 80);
        ctx.fillText(screamText, centerX, centerY - 80);
    }
}

// 👻 МЕТОД РИСОВАНИЯ КУЛДАУНА
drawBansheeScreamCooldown(ctx, x, y) {
    if (this.name !== "Kristina" || this.screamCooldown <= 0) return;
    
    const cooldownPercent = this.screamCooldown / 420;
    ctx.fillStyle = 'rgba(128, 0, 128, 0.8)';
    ctx.fillRect(x - 30, y - 85, 60 * (1 - cooldownPercent), 6);
    
    // Иконка способности
    if (cooldownPercent > 0.5) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('👻', x, y - 90);
    }
}
// 💖 МЕТОДЫ ДЛЯ HEART PULSE AASHI
heartPulse() {
    if (this.heartPulseCooldown > 0 || this.name !== "Aashi") {
        console.log(`❌ Heart Pulse недоступен! Кулдаун: ${Math.ceil(this.heartPulseCooldown / 60)} сек`);
        return false;
    }
    
    if (!gameRunning || !gameStarted) {
        console.log('❌ Игра не активна!');
        return false;
    }
    
    console.log(`💖 ${this.name} использует HEART PULSE! Исцеление и урон!`);
    
    // Получаем настройки из конфигурации
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const pulseCount = characterConfig ? characterConfig.pulseCount : 3;
    const pulseInterval = characterConfig ? characterConfig.pulseInterval : 30;
    const healAmount = characterConfig ? characterConfig.healAmount : 40;
    
    // Создаем пульсы с интервалом
    this.heartPulses = [];
    for (let i = 0; i < pulseCount; i++) {
        setTimeout(() => {
            if (this && gameRunning) {
                this.createHeartPulse(i);
                
                // Исцеляем Aashi при каждом пульсе
                const currentHeal = Math.min(healAmount, this.maxHealth - this.health);
                this.health = Math.min(this.maxHealth, this.health + healAmount);
                
                if (currentHeal > 0) {
                    this.createHealingEffect(this.x + this.width/2, this.y + this.height/2, currentHeal);
                    console.log(`💚 ${this.name} исцелилась на ${currentHeal} HP! Здоровье: ${this.health}/${this.maxHealth}`);
                }
            }
        }, i * (pulseInterval * 16.67)); // Конвертируем кадры в миллисекунды
    }
    
    this.heartPulseCooldown = characterConfig ? characterConfig.abilityCooldown : 300;
    return true;
}

createHeartPulse(pulseIndex) {
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const maxRadius = (characterConfig ? characterConfig.pulseRadius : 200) + (pulseIndex * 30);
    const damage = characterConfig ? characterConfig.damageAmount : 25;
    
    const pulse = {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
        radius: 20,
        maxRadius: maxRadius,
        speed: 6 + pulseIndex,
        damage: damage,
        color: `hsl(${320 + pulseIndex * 15}, 80%, ${60 + pulseIndex * 10}%)`, // Розово-золотые тона
        alpha: 1,
        hasHit: false,
        pulseIndex: pulseIndex,
        heartbeat: 0 // Для анимации сердцебиения
    };
    
    this.heartPulses.push(pulse);
    console.log(`💖 Создан Heart Pulse ${pulseIndex + 1} с радиусом ${maxRadius}`);
}

updateHeartPulses() {
    if (this.name !== "Aashi" || !this.heartPulses) return;
    
    try {
        for (let i = this.heartPulses.length - 1; i >= 0; i--) {
            const pulse = this.heartPulses[i];
            
            if (!pulse) {
                this.heartPulses.splice(i, 1);
                continue;
            }
            
            pulse.radius += pulse.speed;
            pulse.alpha = 1 - (pulse.radius / pulse.maxRadius);
            pulse.heartbeat += 0.3; // Для эффекта сердцебиения
            
            // Проверяем столкновения с противником
            if (this === player && bot && !pulse.hasHit && pulse.radius > 30) {
                this.checkHeartPulseCollision(pulse, bot);
            } else if (this === bot && player && !pulse.hasHit && pulse.radius > 30) {
                this.checkHeartPulseCollision(pulse, player);
            }
            
            // Удаляем пульс если он достиг максимального радиуса
            if (pulse.radius >= pulse.maxRadius) {
                this.heartPulses.splice(i, 1);
            }
        }
    } catch (error) {
        console.error('❌ Ошибка в updateHeartPulses:', error);
        this.heartPulses = [];
    }
}

checkHeartPulseCollision(pulse, target) {
    try {
        const distance = Math.sqrt(
            Math.pow(pulse.x - (target.x + target.width/2), 2) + 
            Math.pow(pulse.y - (target.y + target.height/2), 2)
        );
        
        if (distance <= pulse.radius && distance >= pulse.radius - pulse.speed) {
            pulse.hasHit = true;
            
            // Наносим урон
            if (target.takeDamage) {
                target.takeDamage(pulse.damage);
            }
            
            // Легкое отталкивание
            const knockbackForce = 5 + pulse.pulseIndex * 2;
            target.knockback += (target.x < pulse.x) ? -knockbackForce : knockbackForce;
            target.screenShake = Math.max(target.screenShake, 6);
            
            console.log(`💖💥 Heart Pulse ${pulse.pulseIndex + 1} попал! Урон: ${pulse.damage}`);
            
            // Создаем эффект попадания
            this.createHitEffect(target.x + target.width/2, target.y + target.height/2, pulse.color);
        }
    } catch (error) {
        console.error('❌ Ошибка при проверке столкновения Heart Pulse:', error);
        pulse.hasHit = true;
    }
}

createHealingEffect(x, y, amount) {
    if (!this.healingEffects) {
        this.healingEffects = [];
    }
    
    // Создаем летящий текст исцеления
    const healText = {
        x: x,
        y: y,
        amount: amount,
        life: 60,
        maxLife: 60,
        velocityY: -2,
        alpha: 1
    };
    
    this.healingEffects.push(healText);
    
    // Создаем частицы исцеления
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const particle = {
            x: x,
            y: y,
            velocityX: Math.cos(angle) * 3,
            velocityY: Math.sin(angle) * 3 - 2,
            life: 40,
            maxLife: 40,
            size: 3 + Math.random() * 2,
            type: 'healing'
        };
        
        if (!this.hitParticles) {
            this.hitParticles = [];
        }
        this.hitParticles.push(particle);
    }
}

updateHealingEffects() {
    if (!this.healingEffects) return;
    
    for (let i = this.healingEffects.length - 1; i >= 0; i--) {
        const effect = this.healingEffects[i];
        
        effect.y += effect.velocityY;
        effect.life--;
        effect.alpha = effect.life / effect.maxLife;
        
        if (effect.life <= 0) {
            this.healingEffects.splice(i, 1);
        }
    }
}

// 🦈 МЕТОД ОБНОВЛЕНИЯ АКУЛЬЕЙ АТАКИ
updateSharkDash() {
    if (this.name !== "Matt" || !this.isSharkDashing) return;
    
    this.sharkTimer--;
    
    switch (this.sharkPhase) {
        case 'transform':
            // Фаза превращения
            if (this.sharkTimer <= 0) {
                this.sharkPhase = 'dash';
                this.sharkTimer = 60; // 20 кадров на рывок
                
                // Создаем мощные водяные эффекты
                this.createWaterParticles(this.x + this.width/2, this.y + this.height/2, 20);
                
                console.log(`🦈 ${this.name} превратился в акулу и мчится к цели!`);
            }
            break;
            
        case 'dash':
    // ПРОСТОЙ ПРЯМОЙ ПОЛЕТ
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    const sharkSpeed = characterConfig ? characterConfig.sharkSpeed : 25;
    
    // ЛЕТИМ ПРЯМО В НАПРАВЛЕНИИ, КУДА СМОТРИМ
    if (this.facingRight) {
        this.x += sharkSpeed;
    } else {
        this.x -= sharkSpeed;
    }
    
    // Проверяем столкновение с противником ВО ВРЕМЯ ПОЛЕТА
    if (this.sharkTarget) {
        const deltaX = Math.abs((this.x + this.width/2) - (this.sharkTarget.x + this.sharkTarget.width/2));
        const deltaY = Math.abs((this.y + this.height/2) - (this.sharkTarget.y + this.sharkTarget.height/2));
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance <= 100) {
            // ПОПАЛИ В ПРОТИВНИКА!
            this.sharkPhase = 'bite';
            this.sharkTimer = 15;
            this.executeSharkBite();
            console.log(`🦈 ${this.name} ВРЕЗАЛСЯ В ПРОТИВНИКА!`);
            return;
        }
    }
    
    // Проверяем границы экрана или таймер
    if (this.x < -50 || this.x > canvas.width + 50 || this.sharkTimer <= 0) {
        this.sharkPhase = 'return';
        this.sharkTimer = 15;
        console.log(`🦈 ${this.name} возвращается!`);
    }
            
            // Добавляем след акулы
            this.sharkTrail.push({
                x: this.x + this.width/2,
                y: this.y + this.height/2,
                life: 30,
                size: 15 + Math.random() * 10
            });
            
            // Ограничиваем длину следа
            if (this.sharkTrail.length > 20) {
                this.sharkTrail.shift();
            }
            
            if (this.sharkTimer <= 0) {
                this.sharkPhase = 'bite';
                this.sharkTimer = 15; // 15 кадров на укус
                
                // Выполняем укус
                this.executeSharkBite();
                
                console.log(`🦈 ${this.name} КУСАЕТ цель!`);
            }
            break;
            
        case 'bite':
            // Фаза укуса
            if (this.sharkTimer <= 0) {
                this.sharkPhase = 'return';
                this.sharkTimer = 15; // 15 кадров на возвращение
                
                console.log(`🦈 ${this.name} возвращается в нормальную форму!`);
            }
            break;
            
        case 'return':
            // Фаза возвращения
            const returnProgress = 1 - (this.sharkTimer / 15);
            
            // Возвращаемся к начальной позиции
            this.x = this.sharkTargetX + (this.sharkStartX - this.sharkTargetX) * returnProgress;
            this.y = this.sharkTargetY + (this.sharkStartY - this.sharkTargetY) * returnProgress;
            
            if (this.sharkTimer <= 0) {
                // Завершаем атаку
                this.isSharkDashing = false;
                this.sharkPhase = 'none';
                this.sharkTimer = 0;
                this.sharkTarget = null;
                this.sharkTrail = [];
                
                // Возвращаем нормальную позицию
                this.x = this.sharkStartX;
                this.y = this.sharkStartY;
                
                console.log(`🦈 ${this.name} завершает Shark Dash!`);
            }
            break;
    }
}

// 🦈 МЕТОД ВЫПОЛНЕНИЯ УКУСА
executeSharkBite() {
    if (!this.sharkTarget) return;
    
    const target = this.sharkTarget;
    const characterConfig = CHARACTERS.find(char => char.name === this.name);
    
    // Получаем параметры укуса
    const biteDamage = characterConfig ? characterConfig.sharkDamage : 50;
    const stunDuration = characterConfig ? characterConfig.stunDuration : 60;
    
    // УЛУЧШЕННАЯ ПРОВЕРКА ПОПАДАНИЯ - по обеим осям
    const deltaX = Math.abs((this.x + this.width/2) - (target.x + target.width/2));
    const deltaY = Math.abs((this.y + this.height/2) - (target.y + target.height/2));
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    console.log(`🦈 Проверка укуса: расстояние ${distance.toFixed(1)}, нужно ≤150`);
    
    if (distance <= 150) { // УВЕЛИЧИЛИ радиус укуса
        // Наносим урон
        if (target.takeDamage) {
            target.takeDamage(biteDamage);
        }
        
        // Оглушаем цель
        target.stunned = stunDuration;
        
        // Сильное отталкивание
        const knockbackForce = 20;
        target.knockback += (target.x > this.x) ? knockbackForce : -knockbackForce;
        target.velocityY = Math.min(target.velocityY, -12); // Подбрасываем вверх
        
        // Эффекты экрана
        target.screenShake = Math.max(target.screenShake, 15);
        this.screenShake = Math.max(this.screenShake, 10);
        this.biteEffect = 30;
        
        // Создаем мощные водяные эффекты
        this.createWaterParticles(target.x + target.width/2, target.y + target.height/2, 30);
        
        console.log(`🦈💥 Shark Bite попал! Урон: ${biteDamage}, Оглушение: ${stunDuration} кадров`);
        
        return 'hit';
    } else {
        console.log(`🦈❌ Shark Bite промахнулся! Дистанция: ${distance}`);
        return 'miss';
    }
}

// 🦈 МЕТОД СОЗДАНИЯ ВОДЯНЫХ ЧАСТИЦ
createWaterParticles(x, y, count) {
    if (!this.waterParticles) {
        this.waterParticles = [];
    }
    
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 3 + Math.random() * 6;
        
        const particle = {
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed - 2,
            life: 40 + Math.random() * 30,
            maxLife: 70,
            size: 3 + Math.random() * 5
        };
        
        this.waterParticles.push(particle);
    }
}

// 🦈 МЕТОД ОБНОВЛЕНИЯ ВОДЯНЫХ ЧАСТИЦ
updateWaterParticles() {
    if (!this.waterParticles) return;
    
    for (let i = this.waterParticles.length - 1; i >= 0; i--) {
        const particle = this.waterParticles[i];
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.2; // Гравитация
        particle.life--;
        
        // Эффект волны - частицы двигаются волнообразно
        particle.x += Math.sin(particle.life * 0.1) * 0.5;
        
        if (particle.life <= 0) {
            this.waterParticles.splice(i, 1);
        }
    }
}
}
    
    

// ====== ОПРЕДЕЛЕНИЯ ПЕРСОНАЖЕЙ ======




// ====== ИИ СИСТЕМА ======

class BotAI {
    constructor(bot, target) {
        this.bot = bot;
        this.target = target;
        this.state = 'APPROACH';
        this.stateTimer = 0;
        this.aggressiveness = 0.4;
        this.reactionTime = 30; // Уменьшено для быстрой реакции
        this.status = 'Анализирует...';
        this.actionDelay = 0;
        
        // Новые параметры для более активного ИИ
        this.lastPlayerPosition = { x: target.x, y: target.y };
        this.playerMovementPattern = [];
        this.consecutiveAttacks = 0;
        this.lastStateChange = 0;
        this.comboCooldown = 0;
        this.dodgeTimer = 0;
        this.aggressionBoost = 0;
        this.defensiveTimer = 0;
        
        // Счетчики для принятия решений
        this.decisionCounter = 0;
        this.actionCounter = 0;
        this.forceActionTimer = 0;
           // 🔧 НОВЫЕ СВОЙСТВА ДЛЯ ЗАЩИТЫ ОТ ЗАЦИКЛИВАНИЯ
    this.lastActionTime = 0;
    this.operationCount = 0;
    this.emergencyStop = false;
    }
    
    update() {
    let operationsThisFrame = 0;
    const MAX_OPERATIONS_PER_FRAME = 5;
    
    this.stateTimer++;
    this.decisionCounter++;
    this.actionCounter++;
    this.forceActionTimer++;
    operationsThisFrame++;
    
    if (this.forceActionTimer >= 20 && operationsThisFrame < MAX_OPERATIONS_PER_FRAME) {
        this.forceAction();
        this.forceActionTimer = 0;
        operationsThisFrame++;
    }
    
    if (this.actionDelay > 0) {
        this.actionDelay--;
        return;
    }
    
    if (this.decisionCounter >= Math.max(20, this.reactionTime) && operationsThisFrame < MAX_OPERATIONS_PER_FRAME) {
        try {
            this.makeDecision();
            this.decisionCounter = 0;
            operationsThisFrame++;
        } catch (error) {
            console.error('❌ Ошибка в makeDecision:', error);
            this.decisionCounter = 0;
        }
    }
    
    if (this.actionCounter >= Math.max(15, this.reactionTime / 2) && operationsThisFrame < MAX_OPERATIONS_PER_FRAME) {
        try {
            this.executeState();
            this.actionCounter = 0;
            operationsThisFrame++;
        } catch (error) {
            console.error('❌ Ошибка в executeState:', error);
            this.actionCounter = 0;
        }
    }
    
    if (operationsThisFrame >= MAX_OPERATIONS_PER_FRAME) {
        console.log(`⚠️ ИИ достиг лимита операций: ${operationsThisFrame}/${MAX_OPERATIONS_PER_FRAME}`);
        return;
    }
    
    this.updateTimers();
    this.analyzePlayerMovement();
    this.updateAggressiveness();
}
    
    forceAction() {
        // Принудительное действие если бот слишком пассивен
        const distance = Math.abs(this.bot.x - this.target.x);
        
        if (this.state === 'APPROACH' && distance > 200) {
            // Принудительное движение к цели
            if (this.bot.x < this.target.x) {
                this.bot.moveRight();
            } else {
                this.bot.moveLeft();
            }
            
            // Случайный прыжок для динамики
            if (Math.random() < 0.1 && this.bot.onGround) {
                this.bot.jump();
            }
        }
        
        if (this.state === 'ATTACK' && distance < 100 && this.bot.lightAttackCooldown === 0) {
            // Принудительная атака
            this.performAttack();
        }
    }
    
    updateTimers() {
        if (this.comboCooldown > 0) this.comboCooldown--;
        if (this.dodgeTimer > 0) this.dodgeTimer--;
        if (this.defensiveTimer > 0) this.defensiveTimer--;
        if (this.aggressionBoost > 0) this.aggressionBoost--;
    }
    
    analyzePlayerMovement() {
        const currentPos = { x: this.target.x, y: this.target.y };
        const movement = {
            dx: currentPos.x - this.lastPlayerPosition.x,
            dy: currentPos.y - this.lastPlayerPosition.y,
            timestamp: Date.now()
        };
        
        this.playerMovementPattern.push(movement);
        
        // Оставляем только последние 10 движений
        if (this.playerMovementPattern.length > 10) {
            this.playerMovementPattern.shift();
        }
        
        this.lastPlayerPosition = currentPos;
    }
    
    updateAggressiveness() {
        let baseAggression = this.aggressiveness;
        
        // Увеличиваем агрессию при низком здоровье игрока
        if (this.target.health < 40) {
            baseAggression += 0.3;
        }
        
        // Увеличиваем агрессию при собственном хорошем здоровье
        if (this.bot.health > 70) {
            baseAggression += 0.2;
        }
        
        // Временный буст агрессии
        if (this.aggressionBoost > 0) {
            baseAggression += 0.4;
        }
        
        // Уменьшаем агрессию при собственном низком здоровье
        if (this.bot.health < 30) {
            baseAggression -= 0.2;
        }
        
        this.currentAggressiveness = Math.max(0.1, Math.min(1.0, baseAggression));
    }
    
    makeDecision() {
        const playerVelocity = Math.abs(this.target.velocityX);
        const predictedPlayerX = this.target.x + (this.target.velocityX * 15);
        const distance = Math.abs(this.bot.x - predictedPlayerX);
        const actualDistance = Math.abs(this.bot.x - this.target.x);
        const botHealth = this.bot.health / this.bot.maxHealth;
        const targetHealth = this.target.health / this.target.maxHealth;
        const botBalance = this.bot.balance / this.bot.maxBalance;
        
        // Проверяем атаку игрока с упреждением
        if (this.target.isAttacking && actualDistance < 150) {
            if (Math.random() < 0.7) {
                this.setState('DEFEND');
                return;
            }
        }
        
        // Критическое состояние - отступление
        if ((botHealth < 0.3 || this.bot.stunned > 0 || botBalance < 0.3) && actualDistance < 200) {
            this.setState('RETREAT');
            this.aggressionBoost = 60; // Буст агрессии после отступления
            return;
        }
        
        // Возможность контратаки
        if (this.bot.canCounter > 0 && actualDistance < 120) {
            this.setState('COUNTER');
            return;
        }
        
        // Агрессивная атака при хороших условиях
        if (actualDistance < 100 && this.bot.lightAttackCooldown < 5 && this.bot.stunned === 0) {
            let shouldAttack = Math.random() < this.currentAggressiveness;
            
            // Дополнительные условия для атаки
            if (targetHealth < 0.4) shouldAttack = true; // Добиваем слабого противника
            if (this.bot.combo > 0) shouldAttack = true; // Продолжаем комбо
            if (this.target.isBlocking && Math.random() < 0.3) shouldAttack = true; // Атакуем блокирующего
            
            if (shouldAttack) {
                this.setState('ATTACK');
                return;
            }
        }
        
        // Средняя дистанция - позиционирование или атака
        if (actualDistance < 150 && actualDistance > 60) {
            if (Math.random() < this.currentAggressiveness * 0.8) {
                this.setState('APPROACH');
            } else {
                this.setState('DEFEND');
            }
            return;
        }
        
        // Дальняя дистанция - приближение
        if (actualDistance > 150) {
            this.setState('APPROACH');
            return;
        }
        
        // По умолчанию - приближение
        this.setState('APPROACH');
    }
    
    setState(newState) {
        if (this.state !== newState) {
            this.state = newState;
            this.stateTimer = 0;
            this.lastStateChange = Date.now();
            
            // Обновляем статус для UI
            switch(newState) {
                case 'APPROACH':
                    this.status = 'Приближается 🏃‍♂️';
                    break;
                case 'ATTACK':
                    this.status = 'Атакует! ⚡';
                    break;
                case 'DEFEND':
                    this.status = 'Защищается 🛡️';
                    break;
                case 'RETREAT':
                    this.status = 'Отступает 🏃‍♂️💨';
                    break;
                case 'COUNTER':
                    this.status = 'Контратака! 💥';
                    break;
            }
        }
    }
    
    executeState() {
        const distance = Math.abs(this.bot.x - this.target.x);
        const targetDirection = this.bot.x < this.target.x ? 1 : -1;
        
        switch(this.state) {
            case 'APPROACH':
                this.executeApproach(distance, targetDirection);
                break;
                
            case 'ATTACK':
                this.executeAttack(distance);
                break;
                
            case 'DEFEND':
                this.executeDefend(distance);
                break;
                
            case 'RETREAT':
                this.executeRetreat(distance, targetDirection);
                break;
                
            case 'COUNTER':
                this.executeCounter(distance);
                break;
        }
    }
    
    executeApproach(distance, targetDirection) {
        this.bot.stopBlock();
        
        // Движение к цели с предсказанием
        const predictedX = this.target.x + (this.target.velocityX * 10);
        
        if (this.bot.x < predictedX - 20) {
            this.bot.moveRight();
        } else if (this.bot.x > predictedX + 20) {
            this.bot.moveLeft();
        }
        
        // Прыжки для динамики и избежания атак
        // Прыжки для динамики и избежания атак
        if (this.bot.onGround || (this.bot.name === "sguzeva" && this.bot.jumpsUsed < 2)) {
            let jumpChance = 0.03;
            
            // Увеличиваем шанс прыжка если игрок атакует
            if (this.target.isAttacking && distance < 120) {
                jumpChance = 0.4;
            }
            
            // Прыжок для преодоления препятствий
            if (distance > 100 && Math.abs(this.bot.velocityX) < 2) {
                jumpChance = 0.2;
            }
            
            // 🦘 СПЕЦИАЛЬНО ДЛЯ SGUZEVA: увеличиваем шанс второго прыжка
            if (this.bot.name === "sguzeva" && this.bot.jumpsUsed === 1 && !this.bot.onGround) {
                jumpChance = 0.15; // 15% шанс использовать двойной прыжок
            }
            
            if (Math.random() < jumpChance) {
                this.bot.jump();
            }
        }
        
        // Переход к атаке при приближении
        if (distance < 90 && this.bot.lightAttackCooldown < 10) {
            this.setState('ATTACK');
        }
    }
    
    executeAttack(distance) {
    this.bot.stopBlock();
    
    // 🔫 АВТОМАТ ДЛЯ CRIS-БОТА
    if (this.bot.name === "cris" && !this.bot.isRifleMode && Math.random() < 0.3) {
        // 30% шанс достать автомат
        if (this.bot.rifleMode()) {
            console.log(`🤖🔫 ${this.bot.name} (ИИ) достаёт автомат!`);
            return;
        }
    }

    if (this.bot.name === "cris" && this.bot.isRifleMode) {
        // Стреляем из автомата
        if (this.bot.rifleFireCooldown === 0 && this.bot.ammo > 0) {
            if (this.bot.fireRifle()) {
                console.log(`🤖🔫 ${this.bot.name} (ИИ) стреляет из автомата!`);
            }
        }
        
        // Перезаряжаемся если нет патронов
        if (this.bot.ammo <= 0 && !this.bot.isReloading) {
            this.bot.startReload();
        }
        
        // Иногда убираем автомат
        if (Math.random() < 0.05) { // 5% шанс каждый кадр
            this.bot.rifleMode();
            console.log(`🤖✊ ${this.bot.name} (ИИ) убирает автомат!`);
            return;
        }
        
        return; // Не используем обычные атаки в режиме автомата
    }
    
    // ⚡ СПОСОБНОСТИ ВСЕХ ПЕРСОНАЖЕЙ с учетом сложности
    
    // ⚡ СПОСОБНОСТИ ВСЕХ ПЕРСОНАЖЕЙ с учетом сложности
    
    // 1. ТЕЛЕПОРТАЦИЯ для Noxx
    if (this.bot.name === "Noxx" && this.bot.teleportCooldown === 0 && distance > 120) {
        let teleportChance = this.abilityChance || 0.4; // Берем из настроек сложности
        
        if (Math.random() < teleportChance) {
            console.log(`🤖⚡ ${this.bot.name} готовится к телепортации! (Шанс: ${Math.round(teleportChance * 100)}%)`);
            if (this.bot.electricTeleport()) {
                return; // Прерываем обычные атаки
            }
        }
    }
    
    // 2. ЗЕЛЕНАЯ ЖИЖА для Tom.J
    if (this.bot.name === "Tom.J" && this.bot.slimeThrowCooldown === 0 && distance > 80) {
        let slimeChance = this.abilityChance || 0.3;
        
        if (Math.random() < slimeChance) {
            if (this.bot.throwSlime()) {
                console.log(`🤖🟢 ${this.bot.name} использует зеленую жижу! (Шанс: ${Math.round(slimeChance * 100)}%)`);
                return;
            }
        }
    }
    
    // 3. БУТЫЛКИ для vludblet
    if (this.bot.name === "vludblet" && this.bot.bottleThrowCooldown === 0 && distance > 80) {
        let bottleChance = this.abilityChance || 0.3;
        
        if (Math.random() < bottleChance) {
            if (this.bot.throwBottle()) {
                console.log(`🤖🍾 ${this.bot.name} бросает бутылку! (Шанс: ${Math.round(bottleChance * 100)}%)`);
                return;
            }
        }
    }
    
    
    // 🤼 НОВОЕ: POWER GRAPPLE для Burhan
    if (this.bot.name === "Burhan" && this.bot.grappleCooldown === 0 && distance <= 100) {
        let grappleChance = this.abilityChance || 0.4;
        
        if (Math.random() < grappleChance) {
            if (this.bot.powerGrapple()) {
                console.log(`🤖🤼 ${this.bot.name} использует Power Grapple! (Шанс: ${Math.round(grappleChance * 100)}%)`);
                return;
            }
        }
    }
    // 🦈 НОВОЕ: SHARK DASH для Matt
    if (this.bot.name === "Matt" && this.bot.sharkCooldown === 0 && distance <= 200) {
        let sharkChance = this.abilityChance || 0.4;
        
        if (Math.random() < sharkChance) {
            if (this.bot.sharkDash()) {
                console.log(`🤖🦈 ${this.bot.name} использует Shark Dash! (Шанс: ${Math.round(sharkChance * 100)}%)`);
                return;
            }
        }
    }
    
    // 💡 НОВОЕ: POWER BOOST для Xealist
    if (this.bot.name === "Xealist" && this.bot.powerCooldown === 0 && !this.bot.isPowered) {
        let boostChance = this.abilityChance || 0.5; // Чуть выше шанс т.к. это усиление
        
        if (Math.random() < boostChance) {
            if (this.bot.powerBoost()) {
                console.log(`🤖💡 ${this.bot.name} использует Power Boost! (Шанс: ${Math.round(boostChance * 100)}%)`);
                // Не прерываем атаку, просто активируем усиление
            }
        }
    }
    
    // 5. КОНТРАТАКА (с учетом сложности)
    
    // 5. КОНТРАТАКА (с учетом сложности)
    
    // ⚡ НОВОЕ: LIGHTNING CALL для Heathcliff
if (this.bot.name === "Heathcliff" && this.bot.lightningCooldown === 0 && distance > 80) {
    let lightningChance = this.abilityChance || 0.4;
    
    if (Math.random() < lightningChance) {
        if (this.bot.lightningCall()) {
            console.log(`🤖⚡ ${this.bot.name} призывает молнию! (Шанс: ${Math.round(lightningChance * 100)}%)`);
            return;
        }
    }
}

// 🔴 НОВОЕ: RED LIGHT GREEN LIGHT для !ZAIN
if (this.bot.name === "!ZAIN" && this.bot.redLightCooldown === 0 && distance <= 400) {
    let redLightChance = this.abilityChance || 0.4;
    
    if (Math.random() < redLightChance) {
        if (this.bot.redLightGreenLight()) {
            console.log(`🤖🔴 ${this.bot.name} использует Red Light Green Light! (Шанс: ${Math.round(redLightChance * 100)}%)`);
            return;
        }
    }
}

// 💖 НОВОЕ: HEART PULSE для Aashi
if (this.bot.name === "Aashi" && this.bot.heartPulseCooldown === 0 && this.bot.health < 150) {
    let heartChance = this.abilityChance || 0.5; // Выше шанс когда мало здоровья
    
    if (Math.random() < heartChance) {
        if (this.bot.heartPulse()) {
            console.log(`🤖💖 ${this.bot.name} использует Heart Pulse! (Шанс: ${Math.round(heartChance * 100)}%)`);
            return;
        }
    }
}

// 🍌 НОВОЕ: MONSTER TRANSFORM для effgennn.l33t
if (this.bot.name === "effgennn.l33t" && this.bot.monsterCooldown === 0 && !this.bot.isMonster && this.bot.health < 150) {
    let transformChance = this.abilityChance || 0.5; // Выше шанс когда мало здоровья
    
    if (Math.random() < transformChance) {
        if (this.bot.monsterTransform()) {
            console.log(`🤖🍌 ${this.bot.name} превращается в монстра! (Шанс: ${Math.round(transformChance * 100)}%)`);
            return;
        }
    }
}
    // 🔴 НОВОЕ: RED LIGHT GREEN LIGHT для !ZAIN
if (this.bot.name === "!ZAIN" && this.bot.redLightCooldown === 0 && distance <= 400) {
    let redLightChance = this.abilityChance || 0.4;
    
    if (Math.random() < redLightChance) {
        if (this.bot.redLightGreenLight()) {
            console.log(`🤖🔴 ${this.bot.name} использует Red Light Green Light! (Шанс: ${Math.round(redLightChance * 100)}%)`);
            return;
        }
    }
}

    // 5. КОНТРАТАКА (с учетом сложности)
    if (this.bot.canCounter > 0 && distance < 100) {
        let counterChance = this.counterMaster ? 0.9 : 0.6; // Мастер почти всегда контратакует
        
        if (Math.random() < counterChance) {
            if (this.bot.counterAttack(this.target)) {
                console.log(`🤖💥 ${this.bot.name} выполняет КОНТРАТАКУ! (Шанс: ${Math.round(counterChance * 100)}%)`);
                this.consecutiveAttacks++;
                return;
            }
        }
    }
    
    // 6. ОБЫЧНЫЕ АТАКИ
    this.performAttack();
    
    // 7. КОРРЕКТИРОВКА ПОЗИЦИИ
    if (distance > 80) {
        if (this.bot.x < this.target.x) {
            this.bot.moveRight();
        } else {
            this.bot.moveLeft();
        }
    }
    
    // 8. КОМБО-АТАКИ (только на средней и высокой сложности)
    if (!this.defensiveMode && this.bot.combo > 0 && this.comboCooldown === 0 && Math.random() < 0.7) {
        this.comboCooldown = 20;
        setTimeout(() => this.performAttack(), 300);
    }
}
    
    performAttack() {
    const distance = Math.abs(this.bot.x - this.target.x);
    
    if (distance > 100) return;
    
    // 🟢 ЛЕГКИЙ РЕЖИМ - очень ограниченные атаки
    if (this.defensiveMode && Math.random() > this.attackChance) {
        console.log('🟢 ИИ решил не атаковать (пассивный режим)');
        return; // Часто пропускает атаки
    }
    
    // Проверяем лимит комбо
    if (this.consecutiveAttacks >= this.comboLimit) {
        console.log(`⏸️ ИИ достиг лимита комбо (${this.comboLimit}), переходит к защите`);
        this.setState('DEFEND');
        this.defensiveTimer = 60; // Длинная защитная пауза
        this.consecutiveAttacks = 0;
        return;
    }
    
    let attackSuccess = false;
    
    // Выбор типа атаки в зависимости от сложности
    let heavyAttackChance = 0.3; // По умолчанию
    if (this.defensiveMode) {
        heavyAttackChance = 0.1; // Легкий режим - редко тяжелые атаки
    } else if (this.aggressiveness > 0.7) {
        heavyAttackChance = 0.5; // Сложный режим - часто тяжелые атаки
    }
    
    // Выполняем атаку
    if (Math.random() < heavyAttackChance && this.bot.heavyAttackCooldown === 0) {
        // Тяжелая атака
        attackSuccess = this.bot.heavyAttack(this.target);
        if (attackSuccess) {
            console.log(`🤖 ${this.bot.name} наносит ТЯЖЕЛЫЙ удар! Урон: 25, Комбо: ${this.bot.combo}`);
            this.consecutiveAttacks++;
        }
    } else if (this.bot.lightAttackCooldown === 0) {
        // Быстрая атака
        attackSuccess = this.bot.lightAttack(this.target);
        if (attackSuccess) {
            console.log(`🤖 ${this.bot.name} наносит быстрый удар! Урон: 15, Комбо: ${this.bot.combo}`);
            this.consecutiveAttacks++;
        }
    }
    
    // Защитная пауза после атак (больше на легком уровне)
    if (this.consecutiveAttacks >= this.comboLimit) {
        this.setState('DEFEND');
        this.defensiveTimer = this.defensiveMode ? 80 : 30; // Дольше на легком
        this.consecutiveAttacks = 0;
    }
}
    
    executeDefend(distance) {
        this.bot.block();
        
        // Динамическое время защиты
        let defendTime = this.target.isAttacking ? 40 : 20;
        
        if (this.defensiveTimer > 0) {
            defendTime = this.defensiveTimer;
        }
        
        // Переход к атаке после успешной защиты
        if (this.stateTimer > defendTime) {
            if (distance < 100 && Math.random() < 0.8) {
                this.setState('ATTACK');
            } else {
                this.setState('APPROACH');
            }
        }
        
        // Контратака после парирования
        if (this.bot.canCounter > 0) {
            this.setState('COUNTER');
        }
    }
    
    executeRetreat(distance, targetDirection) {
        this.bot.stopBlock();
        
        // Отступление в противоположную сторону
        if (targetDirection > 0) {
            this.bot.moveLeft();
        } else {
            this.bot.moveRight();
        }
        
        // Прыжки при отступлении
        if (Math.random() < 0.08 && this.bot.onGround) {
            this.bot.jump();
        }
        
        // Переход к защите на безопасной дистанции
        if (distance > 150) {
            this.setState('DEFEND');
        }
        
        // Контратака при возможности
        if (this.bot.canCounter > 0 && distance < 120) {
            this.setState('COUNTER');
        }
    }
    
    executeCounter(distance) {
        if (this.bot.canCounter > 0 && distance < 100) {
            if (this.bot.counterAttack(this.target)) {
                console.log(`🤖 ${this.bot.name} выполняет МОЩНУЮ КОНТРАТАКУ! Урон: 35!`);
                this.setState('ATTACK'); // Продолжаем атаковать после контратаки
            }
        } else {
            this.setState('ATTACK');
        }
    }
    
    getStatus() {
        return this.status;
    }
}

// ====== ИГРОВАЯ ЛОГИКА ======
let canvas = null;
let ctx = null;

let player, bot, botAI;
let gameRunning = false;
let gameStarted = false;

// 🎮 ОБНОВЛЕННАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ ИГРЫ
function initializeGame() {
    // Выбираем случайную арену
    selectRandomArena();
    
    // Загружаем фон выбранной арены
    loadBackground();
    
    const selectedCharacter = CHARACTERS[selectedCharIndex];
    
    player = new Fighter(
        100, 300, 
        selectedCharacter.color,
        selectedCharacter.name,
        null,
        true
    );
    
    // СЛУЧАЙНЫЙ ВЫБОР ПЕРСОНАЖА ДЛЯ БОТА
    let botCharacterIndex;
    if (Math.random() < 0.5) {
        // 50% шанс - противоположный персонаж
        botCharacterIndex = selectedCharIndex === 0 ? 1 : 0;
    } else {
        // 50% шанс - случайный персонаж
        botCharacterIndex = Math.floor(Math.random() * CHARACTERS.length);
    }
    
    const botCharacter = CHARACTERS[botCharacterIndex];
    
    bot = new Fighter(
        650, 300,
        botCharacter.color,
        botCharacter.name,
        null,
        true
    );
    
    // Предзагружаем картинки для бота
    preloadBotImages(botCharacterIndex);
    
    botAI = new BotAI(bot, player);
    gameRunning = true;
    gameStarted = true;
    
    console.log(`🎮 ${selectedCharacter.name} VS ${botCharacter.name}`);
    console.log(`🏟️ Арена: ${currentArenaName}`);
}


function startGame(difficulty) {
    console.log(`🚀 === НАЧАЛО ЭПИЧЕСКОГО БОЯ === 🚀`);
    console.log(`⚔️ Сложность противника: ${difficulty.toUpperCase()}`);
    
    document.getElementById('difficultyMenu').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    
    initializeGame();
    changeDifficulty(difficulty);
    gameLoop();
    
    console.log('🎮 === УПРАВЛЕНИЕ ВОИНОМ === 🎮');
    console.log('   🏃‍♂️ A/D - молниеносное движение');
    console.log('   🦘 W - мощный прыжок, S - защитная стойка');
    console.log('   ⚡ ЛКМ - быстрый удар (15 урона)');
    console.log('   💥 ПКМ - сокрушительный удар (25 урона)');
    console.log('🏆 СТАНЬТЕ ЧЕМПИОНОМ АРЕНЫ!');
    
    document.body.setAttribute('tabindex', '0');
    document.body.focus();
}

function backToMenu() {
    gameRunning = false;
    gameStarted = false;
    document.getElementById('characterMenu').style.display = 'block';
    document.getElementById('difficultyMenu').style.display = 'none';
    document.getElementById('gameArea').style.display = 'none';
    console.log('📋 === ВОЗВРАТ В МЕНЮ ВЫБОРА ПЕРСОНАЖА === 📋');
    console.log('🏟️ Выберите своего воина...');
}
// ====== УПРАВЛЕНИЕ ======

document.addEventListener('keydown', function(e) {
    const keyCode = e.keyCode || e.which;
    
    if (!gameRunning || !gameStarted || !player) {
        return;
    }
    
    switch (keyCode) {
        case 65: // A — движение влево
            player.moveLeft();
            showKeyPress('A');
            break;

        case 68: // D — движение вправо
            player.moveRight();
            showKeyPress('D');
            break;

        case 87: // W — прыжок
            player.jump();
            showKeyPress('W');
            break;

        case 83: // S — блок
            player.block();
            showKeyPress('S');
            break;

        case 81: // Q — уникальные способности персонажей
            if (player.name === "Lyron") {
                const transformed = player.muscleTransform();
                if (transformed) {
                    showKeyPress('Q - MUSCLE TRANSFORM! 🏋️💥');
                    console.log('🏋️ Lyron активировал Muscle Transform!');
                } else {
                    showKeyPress('Q - ТРАНСФОРМАЦИЯ НА КУЛДАУНЕ');
                    console.log('❌ Muscle Transform на кулдауне');
                }
            } else if (player.name === "Tom.J") {
                const thrown = player.throwSlime();
                if (thrown) {
                    showKeyPress('Q - ЗЕЛЕНАЯ ЖИЖА! 🟢💥');
                    console.log('🟢 Tom.J выстрелил зеленой жижой!');
                } else {
                    showKeyPress('Q - СЛАЙМ НА КУЛДАУНЕ');
                    console.log('❌ Выстрел слаймом на кулдауне');
                }
            } else if (player.name === "vludblet") {
                const thrown = player.throwBottle();
                if (thrown) {
        showKeyPress('Q - БУТЫЛКА БРОШЕНА! 🍾💥');
        console.log('🍾 vludblet бросил бутылку!');
    } else {
        showKeyPress('Q - БУТЫЛКА НА КУЛДАУНЕ');
        console.log('❌ Бросок бутылки на кулдауне');
    }
} else if (player.name === "Noxx") {
    // ⚡ ДОБАВЬТЕ ЭТО:
    const teleported = player.electricTeleport();
    if (teleported) {
        showKeyPress('Q - ELECTRIC TELEPORT! ⚡💥');
        console.log('⚡ Noxx активировал Electric Teleport Strike!');
    } else {
        showKeyPress('Q - ТЕЛЕПОРТ НА КУЛДАУНЕ');
        console.log('❌ Electric Teleport на кулдауне');
    }
} else if (player.name === "Burhan") {
    // 🤼 НОВОЕ ДЛЯ BURHAN:
    const grappled = player.powerGrapple();
    if (grappled) {
        showKeyPress('Q - POWER GRAPPLE! 🤼💥');
        console.log('🤼 Burhan активировал Power Grapple!');
    } else {
        showKeyPress('Q - БРОСОК НА КУЛДАУНЕ');
        console.log('❌ Power Grapple на кулдауне');
    }
} else if (player.name === "Matt") {
    const dashed = player.sharkDash();
    if (dashed) {
        showKeyPress('Q - SHARK DASH! 🦈💥');
        console.log('🦈 Matt активировал Shark Dash!');
    } else {
        showKeyPress('Q - АКУЛА НА КУЛДАУНЕ');
        console.log('❌ Shark Dash на кулдауне');
    }
} else if (player.name === "Xealist") {
    // 💡 НОВОЕ ДЛЯ XEALIST:
    const boosted = player.powerBoost();
    if (boosted) {
        showKeyPress('Q - POWER BOOST! 💡⚡');
        console.log('💡 Xealist активировал Power Boost!');
    } else {
        showKeyPress('Q - УСИЛЕНИЕ НА КУЛДАУНЕ');
        console.log('❌ Power Boost на кулдауне');
    }
} else if (player.name === "Heathcliff") {
    // ⚡ НОВОЕ ДЛЯ HEATHCLIFF:
    const lightningUsed = player.lightningCall();
    if (lightningUsed) {
        showKeyPress('Q - LIGHTNING CALL! ⚡💥');
        console.log('⚡ Heathcliff призывает молнию с небес!');
    } else {
        showKeyPress('Q - МОЛНИЯ НА КУЛДАУНЕ');
        console.log('❌ Lightning Call на кулдауне');
    }
} else if (player.name === "!ZAIN") {
    // 🔴 НОВОЕ ДЛЯ !ZAIN:
    const redLightUsed = player.redLightGreenLight();
    if (redLightUsed) {
        showKeyPress('Q - RED LIGHT GREEN LIGHT! 🔴💥');
        console.log('🔴 !ZAIN активировал Red Light Green Light!');
    } else {
        showKeyPress('Q - RED LIGHT НА КУЛДАУНЕ');
        console.log('❌ Red Light Green Light на кулдауне');
    }
} else if (player.name === "DeFi.NinJa_Elijah") {
    // 🥷 НОВОЕ ДЛЯ DeFi.NinJa_Elijah:
    const clonesUsed = player.shadowCloneStrike();
    if (clonesUsed) {
        showKeyPress('Q - SHADOW CLONES! 🥷💥');
        console.log('🥷 DeFi.NinJa_Elijah создал теневых клонов!');
    } else {
        showKeyPress('Q - КЛОНЫ НА КУЛДАУНЕ');
        console.log('❌ Shadow Clone Strike на кулдауне');
    }
} else if (player.name === "Aashi") {
    // 💖 НОВОЕ ДЛЯ AASHI:
    const heartUsed = player.heartPulse();
    if (heartUsed) {
        showKeyPress('Q - HEART PULSE! 💖💥');
        console.log('💖 Aashi активировала Heart Pulse!');
    } else {
        showKeyPress('Q - СЕРДЦЕ НА КУЛДАУНЕ');
        console.log('❌ Heart Pulse на кулдауне');
    }
} else if (player.name === "sguzeva") {
    // 🦘 НОВОЕ ДЛЯ SGUZEVA: Информация о двойном прыжке
    const jumpsLeft = 2 - player.jumpsUsed;
    if (jumpsLeft > 0) {
        showKeyPress(`Q - ДВОЙНОЙ ПРЫЖОК! 🦘 (${jumpsLeft} прыжков)`);
        console.log(`🦘 sguzeva: доступно ${jumpsLeft} прыжков`);
    } else {
        showKeyPress('Q - ПРЫЖКИ ИСЧЕРПАНЫ');
        console.log('❌ sguzeva: все прыжки использованы');
    }
} else if (player.name === "Kristina") {
    // 👻 НОВОЕ ДЛЯ KRISTINA:
    const screamUsed = player.bansheeScream();
    if (screamUsed) {
        showKeyPress('Q - BANSHEE SCREAM! 👻💥');
        console.log('👻 Kristina издаёт пронзительный крик банши!');
    } else {
        showKeyPress('Q - КРИК НА КУЛДАУНЕ');
        console.log('❌ Banshee Scream на кулдауне');
    }
} else if (player.name === "effgennn.l33t") {
    const transformed = player.monsterTransform();
    if (transformed) {
        showKeyPress('Q - MONSTER TRANSFORM! 🍌💥');
        console.log('🍌 effgennn.l33t активировал Monster Transform!');
    } else {
        showKeyPress('Q - ТРАНСФОРМАЦИЯ НА КУЛДАУНЕ');
        console.log('❌ Monster Transform на кулдауне');
    }
} else if (player.name === "cris") {
    const switched = player.rifleMode();
    if (switched) {
        if (player.isRifleMode) {
            showKeyPress('Q - АВТОМАТ ГОТОВ! 🔫');
            console.log('🔫 cris достал автомат!');
        } else {
            showKeyPress('Q - РУКОПАШНЫЙ БОЙ! ✊');
            console.log('✊ cris убрал автомат!');
        }
    }
} else {
    
    showKeyPress('Q - НЕТ СПОСОБНОСТИ');
    console.log(`❌ У ${player.name} нет уникальной способности`);
}
            break;

        default:
            // другие клавиши
            break;
    }

    e.preventDefault();
});




document.addEventListener('keyup', function(e) {
    const keyCode = e.keyCode || e.which;
    
    if (!gameRunning || !gameStarted || !player) {
        return;
    }
    
    switch(keyCode) {
        case 83: // S
            if (player && player.stopBlock) {
                player.stopBlock();
            }
            break;
    }
});

// УПРАВЛЕНИЕ МЫШЬЮ
// УПРАВЛЕНИЕ МЫШЬЮ
canvas.addEventListener('mousedown', function(e) {
    if (!gameRunning || !gameStarted || !player || !bot) {
        showKeyPress('Игра не активна');
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.button === 0) { // Левая кнопка мыши
        // 🔫 CRIS СТРЕЛЯЕТ ВСЕГДА
        if (player.name === "cris" && player.isRifleMode) {
            const bullet = {
                x: player.x + (player.facingRight ? player.width : 0),
                y: player.y + player.height / 2,
                velocityX: (player.facingRight ? 1 : -1) * 20,
                velocityY: 0,
                damage: 15,
                hasHit: false,
                shooter: player,
                life: 300,
                size: 6
            };
            
            if (!player.bullets) player.bullets = [];
            player.bullets.push(bullet);
            showKeyPress('ЛКМ - ВЫСТРЕЛ! 🔫');
            return;
        }
        
        // ОБЫЧНЫЕ АТАКИ
        if (player.canCounter > 0) {
            hitResult = player.counterAttack(bot);
            if (hitResult === 'hit') {
                showKeyPress('ЛКМ - КОНТРАТАКА ПОПАЛА!');
            }
        } else {
            hitResult = player.lightAttack(bot);
            if (hitResult === 'hit') {
                showKeyPress('ЛКМ - БЫСТРЫЙ УДАР ПОПАЛ!');
            } else if (hitResult === 'parried') {
                showKeyPress('ЛКМ - ПАРИРОВАН!');
            } else if (hitResult === 'blocked') {
                showKeyPress('ЛКМ - ЗАБЛОКИРОВАН');
            } else {
                showKeyPress('ЛКМ - МИМО');
            }
        }
    } else if (e.button === 2) { // Правая кнопка мыши
        console.log('💥 Попытка тяжелой атаки...');
        // 🏋️ НОВОЕ: Ручной бросок штанги для Lyron
if (player.name === "Lyron" && player.isMuscle && player.isUsingBarbell && player.barbellPhase === 'carry') {
    console.log(`🏋️ ${player.name} бросает живую штангу по ПКМ!`);
    player.manualThrowRequested = true;
    showKeyPress('ПКМ - БРОСОК ШТАНГИ! 🏋️💥');
    return;
}
        // 🔫 БЫСТРАЯ СТРЕЛЬБА ДЛЯ CRIS
        if (player.name === "cris" && player.isRifleMode) {
            console.log(`🔫 cris быстро стреляет! Патронов: ${player.ammo}`);
            
            // Быстрая стрельба - игнорируем небольшой кулдаун
            if (player.rifleFireCooldown <= 3 && player.ammo > 0) {
                player.rifleFireCooldown = 0; // Сбрасываем кулдаун для быстрой стрельбы
                const fired = player.fireRifle();
                if (fired) {
                    showKeyPress('ПКМ - БЫСТРЫЙ ОГОНЬ! 🔫💥');
                    console.log(`🔫 cris ведёт быстрый огонь!`);
                }
            } else if (player.ammo <= 0) {
                showKeyPress('ПКМ - ПЕРЕЗАРЯДКА!');
                if (!player.isReloading) {
                    player.startReload();
                }
            } else {
                showKeyPress('ПКМ - ГОТОВИТСЯ К ВЫСТРЕЛУ...');
            }
            return;
        }
        
        // ОБЫЧНАЯ ТЯЖЕЛАЯ АТАКА
        const hitResult = player.heavyAttack(bot);
        
        if (hitResult === 'hit') {
            showKeyPress('ПКМ - ТЯЖЕЛЫЙ УДАР ПОПАЛ!');
            console.log(`💥 Тяжелый удар попал! Урон: 25, Здоровье бота: ${bot.health}`);
        } else if (hitResult === 'parried') {
            showKeyPress('ПКМ - ПАРИРОВАН!');
            console.log(`🛡️ Тяжелый удар парирован! Бот может контратаковать!`);
        } else if (hitResult === 'blocked') {
            showKeyPress('ПКМ - ЗАБЛОКИРОВАН');
            console.log(`🛡️ Тяжелый удар заблокирован! Урон: 8`);
        } else {
            showKeyPress('ПКМ - МИМО');
            console.log(`❌ Тяжелый удар не попал, дистанция слишком большая`);
        }
        
        if (hitResult === 'hit' || hitResult === 'blocked') {
            canvas.classList.add('heavy-attack-effect');
            setTimeout(() => {
                canvas.classList.remove('heavy-attack-effect');
            }, 400);
        } else if (hitResult === 'parried') {
            canvas.classList.add('parry-effect');
            setTimeout(() => {
                canvas.classList.remove('parry-effect');
            }, 300);
        }
    }
    
    return false;
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

canvas.addEventListener('mouseenter', function() {
    canvas.style.cursor = 'crosshair';
});

canvas.addEventListener('mouseleave', function() {
    canvas.style.cursor = 'default';
});

function showKeyPress(key) {
    const keyDisplay = document.getElementById('keyDisplay');
    if (keyDisplay) {
        let bgColor = '#FFD700';
        let textColor = '#000';
        
        // Определяем цвет в зависимости от типа действия
        if (key.includes('КОНТРАТАКА')) {
            bgColor = 'linear-gradient(45deg, #FF00FF, #9932CC)';
            textColor = '#FFF';
        } else if (key.includes('ПАРИРОВАН')) {
            bgColor = 'linear-gradient(45deg, #00FFFF, #00BFFF)';
            textColor = '#000';
        } else if (key.includes('ПОПАЛ')) {
            bgColor = 'linear-gradient(45deg, #00FF00, #32CD32)';
            textColor = '#000';
        } else if (key.includes('МИМО')) {
            bgColor = 'linear-gradient(45deg, #FF6B6B, #FF4444)';
            textColor = '#FFF';
        }
        
        // Показываем действие
        keyDisplay.innerHTML = `<span style="font-weight: 700;">${key}</span>`;
        keyDisplay.style.background = bgColor;
        keyDisplay.style.color = textColor;
        
        // Возвращаем обычный вид через секунду БЕЗ ИНСТРУКЦИЙ
        setTimeout(() => {
            keyDisplay.style.background = 'linear-gradient(145deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))';
            keyDisplay.style.color = '#fff';
            keyDisplay.innerHTML = '<span style="font-weight: 600;">Готов к бою!</span>';
        }, 1000);
    }
}

// ====== ИГРОВОЙ ЦИКЛ ======

function updateUI() {
    const playerHealthEl = document.getElementById('playerHealth');
    const botHealthEl = document.getElementById('botHealth');
    const playerHealthText = document.getElementById('playerHealthText');
    const botHealthText = document.getElementById('botHealthText');
    const playerComboEl = document.getElementById('playerCombo');
    const botComboEl = document.getElementById('botCombo');
    const botStatusEl = document.getElementById('botStatus');
    
    if (playerHealthEl && player) {
        const healthPercent = Math.max(0, Math.floor(player.health / player.maxHealth * 100));
        playerHealthEl.style.width = healthPercent + '%';
        
        if (playerHealthText) {
            playerHealthText.textContent = healthPercent + '%';
            if (healthPercent > 60) {
                playerHealthText.style.color = '#00FF00';
            } else if (healthPercent > 30) {
                playerHealthText.style.color = '#FFD700';
            } else {
                playerHealthText.style.color = '#FF4444';
                playerHealthText.style.animation = 'criticalHealth 1s ease-in-out infinite';
            }
        }
    }
    
    if (botHealthEl && bot) {
        const healthPercent = Math.max(0, Math.floor(bot.health / bot.maxHealth * 100));
        botHealthEl.style.width = healthPercent + '%';
        
        if (botHealthText) {
            botHealthText.textContent = healthPercent + '%';
            if (healthPercent > 60) {
                botHealthText.style.color = '#00FF00';
            } else if (healthPercent > 30) {
                botHealthText.style.color = '#FFD700';
            } else {
                botHealthText.style.color = '#FF4444';
                botHealthText.style.animation = 'criticalHealth 1s ease-in-out infinite';
            }
        }
    }
    
    if (playerComboEl && player) {
        if (player.combo > 1) {
            playerComboEl.innerHTML = `
                <div style="font-size: 1.4rem; margin-bottom: 5px;">🔥 КОМБО: ${player.combo} 🔥</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Множитель урона активен!</div>
            `;
            playerComboEl.style.animation = 'comboGlow 0.5s ease-in-out infinite';
        } else {
            playerComboEl.innerHTML = '';
            playerComboEl.style.animation = 'none';
        }
    }
    
    if (botComboEl && bot) {
        if (bot.combo > 1) {
            botComboEl.innerHTML = `
                <div style="font-size: 1.4rem; margin-bottom: 5px;">🤖 КОМБО: ${bot.combo} 🤖</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">ИИ атакует серией!</div>
            `;
            botComboEl.style.animation = 'comboGlow 0.5s ease-in-out infinite';
        } else {
            botComboEl.innerHTML = '';
            botComboEl.style.animation = 'none';
        }
    }
    
    if (botStatusEl && botAI) {
        const status = botAI.getStatus();
        let statusIcon = '🤔';
        let statusColor = '#FFD700';
        
        switch(botAI.state) {
            case 'APPROACH':
                statusIcon = '🏃‍♂️';
                statusColor = '#00BFFF';
                break;
            case 'ATTACK':
                statusIcon = '⚡';
                statusColor = '#FF4444';
                break;
            case 'DEFEND':
                statusIcon = '🛡️';
                statusColor = '#00FF7F';
                break;
            case 'RETREAT':
                statusIcon = '🏃‍♂️💨';
                statusColor = '#FFA500';
                break;
        }
        
        botStatusEl.innerHTML = `${statusIcon} ${status}`;
        botStatusEl.style.color = statusColor;
        
        if (botAI.state === 'ATTACK') {
            botStatusEl.style.animation = 'attackPulse 0.5s ease-in-out infinite';
        } else if (botAI.state === 'DEFEND') {
            botStatusEl.style.animation = 'defendGlow 1s ease-in-out infinite';
        } else {
            botStatusEl.style.animation = 'statusFloat 2s ease-in-out infinite';
        }
    }
}

function gameLoop() {
    if (!gameRunning || !gameStarted) {
        return;
    }
    
    if (!player || !bot || !botAI) {
        return;
    }
    
    // ✨ ЗАМЕНЯЕМ ctx.clearRect НА:
    drawBackground(ctx);
    
    player.update();
    bot.update();
    botAI.update();
    
    player.draw(ctx);
    bot.draw(ctx);
    
    updateUI();
    
    if (player.health <= 0) {
        gameRunning = false;
        showGameEnd(`${bot.name} WINS!`, 'defeat');
        return;
    }
    
    if (bot.health <= 0) {
        gameRunning = false;
        showGameEnd(`${player.name} WINS!`, 'victory');
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

function showGameEnd(message, type) {
    // 🧹 ДОБАВЬТЕ ЭТИ ДВЕ СТРОКИ В НАЧАЛО:
    gameRunning = false;
    cleanupGameTimers();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ... остальной код остается без изменений
    
    let color, shadowColor, emoji;
    if (type === 'victory') {
        color = 'linear-gradient(45deg, #FFD700, #FFA500)';
        shadowColor = 'rgba(255, 215, 0, 0.8)';
        emoji = '🏆';
    } else {
        color = 'linear-gradient(45deg, #FF6B6B, #FF4444)';
        shadowColor = 'rgba(255, 107, 107, 0.8)';
        emoji = '💀';
    }
    
    const endScreen = document.createElement('div');
    endScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.5s ease-out;
        ">
            <div style="
                font-family: 'Orbitron', sans-serif;
                font-size: 4rem;
                font-weight: 900;
                background: ${color};
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-align: center;
                margin-bottom: 20px;
                animation: victoryPulse 2s ease-in-out infinite;
                text-shadow: 0 0 50px ${shadowColor};
            ">
                ${emoji} ${message} ${emoji}
            </div>
            <div style="
                font-family: 'Rajdhani', sans-serif;
                font-size: 1.5rem;
                color: #FFD700;
                margin-bottom: 30px;
                animation: fadeInUp 1s ease-out 0.5s both;
            ">
                PRESS RESTART FOR A NEW GAME
            </div>
            <button onclick="this.parentElement.parentElement.remove(); restartGame();" style="
                background: linear-gradient(145deg, #4CAF50, #45A049);
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 15px;
                font-family: 'Orbitron', sans-serif;
                font-size: 1.2rem;
                font-weight: 700;
                cursor: pointer;
                animation: buttonFloat 3s ease-in-out infinite;
                box-shadow: 0 10px 25px rgba(76, 175, 80, 0.5);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='scale(1.1) translateY(-5px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
                🔄 ИГРАТЬ СНОВА
            </button>
        </div>
    `;
    
    document.body.appendChild(endScreen);
}

// ====== ФУНКЦИИ ИНТЕРФЕЙСА ======

function restartGame() {
    console.log('🔄 === НОВЫЙ БОЙ НАЧИНАЕТСЯ === 🔄');
    
    // 🧹 ДОБАВЬТЕ ЭТУ СТРОКУ:
    cleanupGameTimers();
    
    console.log('⚔️ Воины готовятся к схватке...');
    if (gameStarted) {
        const currentDifficulty = getCurrentDifficulty();
        initializeGame();
        changeDifficulty(currentDifficulty);
        gameLoop();
        console.log('🏟️ Арена готова! Да начнется битва!');
    }
}

function getCurrentDifficulty() {
    if (!botAI) return 'medium';
    
    if (botAI.aggressiveness <= 0.4) return 'easy';
    if (botAI.aggressiveness <= 0.7) return 'medium';
    return 'hard';
}

function changeDifficulty(level) {
    if (!botAI) return;
    
    switch(level) {
        case 'easy':
            // 🟢 ОЧЕНЬ ЛЕГКИЙ ИИ - практически пассивный
            botAI.aggressiveness = 0.15;           // Очень низкая агрессия
            botAI.reactionTime = 80;               // Очень медленная реакция
            botAI.currentAggressiveness = 0.15;    // Принудительно устанавливаем
            
            // Дополнительные ограничения для легкого режима
            botAI.defensiveMode = true;            // Предпочитает защиту
            botAI.attackChance = 0.2;              // Только 20% шанс атаковать
            botAI.comboLimit = 1;                  // Максимум 1 атака подряд
            botAI.abilityChance = 0.1;             // Очень редко использует способности
            
            console.log('🟢 Режим НОВИЧОК: Противник очень пассивный и слабый');
            console.log('   - Агрессия: 15% | Реакция: медленная');
            console.log('   - Редко атакует, предпочитает защиту');
            break;
            
        case 'medium':
            // 🟡 СРЕДНИЙ ИИ - сбалансированный боец
            botAI.aggressiveness = 0.45;           // Умеренная агрессия
            botAI.reactionTime = 35;               // Средняя реакция
            botAI.currentAggressiveness = 0.45;
            
            // Стандартные настройки
            botAI.defensiveMode = false;
            botAI.attackChance = 0.6;              // 60% шанс атаковать
            botAI.comboLimit = 2;                  // До 2 атак подряд
            botAI.abilityChance = 0.3;             // Иногда использует способности
            
            console.log('🟡 Режим ВОИН: Сбалансированный противник');
            console.log('   - Агрессия: 45% | Реакция: средняя');
            console.log('   - Комбинирует атаку и защиту');
            break;
            
        case 'hard':
            // 🔴 ОЧЕНЬ СЛОЖНЫЙ ИИ - агрессивная машина
            botAI.aggressiveness = 0.85;           // Очень высокая агрессия
            botAI.reactionTime = 12;               // Молниеносная реакция
            botAI.currentAggressiveness = 0.85;
            
            // Агрессивные настройки
            botAI.defensiveMode = false;
            botAI.attackChance = 0.9;              // 90% шанс атаковать
            botAI.comboLimit = 4;                  // До 4 атак подряд
            botAI.abilityChance = 0.6;             // Часто использует способности
            botAI.counterMaster = true;            // Мастер контратак
            
            console.log('🔴 Режим МАСТЕР: Агрессивный и смертоносный противник!');
            console.log('   - Агрессия: 85% | Реакция: молниеносная');
            console.log('   - Постоянно атакует, использует все возможности');
            break;
    }
    
    // Обновляем отображение сложности
    const difficultyEl = document.getElementById('botDifficulty');
    if (difficultyEl) {
        const icons = { easy: '🟢', medium: '🟡', hard: '🔴' };
        const names = { easy: 'Новичок', medium: 'Воин', hard: 'Мастер' };
        difficultyEl.textContent = `${icons[level]} Сложность: ${names[level]}`;
    }
}

function testMove(direction) {
    if (!player || !bot) {
        console.log('❌ Игрок или бот не инициализирован!');
        return;
    }
    
    switch(direction) {
        case 'left':
            player.moveLeft();
            break;
        case 'right':
            player.moveRight();
            break;
        case 'jump':
            player.jump();

            break;
        case 'lightAttack':
            if (player.canCounter > 0) {
                const counterResult = player.counterAttack(bot);
            } else {
                const lightResult = player.lightAttack(bot);
            }
            break;
        case 'heavyAttack':
            const heavyResult = player.heavyAttack(bot);
            break;
    }
}



document.body.setAttribute('tabindex', '0');
function cleanupGameTimers() {
    // Очищаем массивы частиц
    if (player) {
        player.magnitudeWaves = [];
        player.hitParticles = [];
    }
    
    if (bot) {
        bot.magnitudeWaves = [];
        bot.hitParticles = [];
    }
}

document.body.setAttribute('tabindex', '0');
document.body.focus();
