// ====== СИСТЕМА ПЕРСОНАЖЕЙ ======
// ====== НАСТРОЙКИ КАРТИНОК ПЕРСОНАЖА ======
// --- НАЧАЛО БЛОКА: выбор персонажа ---
// ==== КОНФИГ КАРТИНОК ДЛЯ ПЕРСОНАЖЕЙ ====
// Функция изменения размера canvas
function resizeCanvas() {
    // Простая инициализация canvas
    if (!canvas) {
        canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('❌ Canvas не найден!');
            return false;
        }
    }
    
    if (!ctx) {
        ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('❌ Не удалось получить контекст!');
            return false;
        }
    }
    
    // Устанавливаем размер
    canvas.width = 1200;
    canvas.height = 650;
    
    console.log('✅ Canvas инициализирован');
    return true;
}

// Вызывать при загрузке и изменении размера
// Оставляем только ОДИН обработчик
// Один правильный обработчик загрузки
// ====== ИСПРАВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ ======
// Один правильный обработчик загрузки
// ====== ПОЛНАЯ ЗАМЕНА БЛОКА ИНИЦИАЛИЗАЦИИ ======
// Удалите ВЕСЬ старый блок window.addEventListener('load', ...) и замените на этот:

window.addEventListener('load', () => {
    console.log('🚀 Инициализация игры...');
    
    // ... другой код ...
    
    // Настраиваем кнопки
    const prevBtn = document.getElementById('prevCharBtn');
    const nextBtn = document.getElementById('nextCharBtn');
    const confirmBtn = document.getElementById('confirmCharBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            selectedCharIndex = (selectedCharIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            updateCharacterDisplay();
            // ❌ ЗДЕСЬ НЕТ preloadImages() - ВОТ ПРОБЛЕМА!
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            selectedCharIndex = (selectedCharIndex + 1) % CHARACTERS.length;
            updateCharacterDisplay();
            // ❌ ЗДЕСЬ ТОЖЕ НЕТ preloadImages() - ВОТ ПРОБЛЕМА!
        });
    }
    
    // ... остальной код ...
});

// ========================================
// ✅ ЗАМЕНИТЕ НА ЭТОТ ИСПРАВЛЕННЫЙ КОД:
// ========================================

window.addEventListener('load', () => {
    console.log('🚀 Инициализация игры...');
    
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
      portrait: "assets/Lyron.png"  ,
      shield: "assets/lyronBlock.png"  // ← ДОБАВИТЬ ЭТО
    }
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
    description: "Quintessence of Power GIF",
    element: "electric",
    images: {
      idle: "assets/Burhanf.png",
      attack: "assets/Burhanatack.png",
      portrait: "assets/Burhanf.png",
      shield: "assets/burhanblock.png"
    }
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
      shield: "assets/Xeakistblock.png"
    }
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
    }
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
    }
  },
   {
    key: "Heathcliff",
    name: "Heathcliff",
    color: "#ffa502",
    description: "The Gray Cardinal of This World",
    element: "electric",
    images: {
      idle: "assets/Heathcliff.png",
      attack: "assets/heatcif.png",
      portrait: "assets/Heathcliff.png",
      shield: "assets/healblock.png"
    }
  },
  {
    key: "Matt",
    name: "Matt",
    color: "#ffa502",
    description: "This isn’t just a shark; it’s MATT.",
    element: "electric",
    images: {
      idle: "assets/Matt.png",
      attack: "assets/mattatack.png",
      portrait: "assets/Matt.png",
      shield: "assets/Mattblock.png"
    }
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
      shield: "assets/!ZAINblock.png"
    }
  },
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
      shield: "assets/sguzevablock.png"
    }
  },
  {
    key: "Kristina",
    name: "Kristina",
    color: "#ffa502",
    description: "Beware the dark power veiled behind radiant faces",
    element: "electric",
    images: {
      idle: "assets/Kristina.png",
      attack: "assets/KRISTINAATA.png",
      portrait: "assets/Kristina.png",
      shield: "assets/KristinaBlock.png"
    }
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
    key: "effgennn.l33t",
    name: "effgennn.l33t",
    color: "#ffa502",
    description: "ZELLA",
    element: "electric",
    images: {
      idle: "assets/effgennn.l33t.png",
      attack: "assets/effgennn.l33attack.png",
      portrait: "assets/effgennn.l33t.png",
      shield: "assets/effgennn.l33tblock.png"
    }
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
        this.magnitudeWaves = [];      // Массив волн для Lyron
        this.abilityCooldown = 0;      // Кулдаун способности (в кадрах)
        this.abilityDuration = 0;      // Длительность эффекта
        this.abilityActive = false;    // Активна ли способность
        this.hitParticles = [];        // Частицы эффектов попадания
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
    }
    
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
if (this.teleportCooldown > 0) this.teleportCooldown--;
if (this.teleportGlow > 0) this.teleportGlow--;
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
         this.drawMagnitudeWaves(ctx, drawX, drawY);
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
    }
   drawCharacterWithImage(ctx, drawX, drawY) {
    // Определяем какую картинку использовать
    let imageKey = 'idle';
if (this.isAttacking || this.attackFrame > 0) {
    imageKey = 'attack';
} else if (this.isBlocking) {
    imageKey = 'shield';  // ← ДОБАВЬТЕ ЭТУ СТРОКУ
}
    
    // Определяем какой кэш использовать - игрока или бота
    let currentCache, cacheLoaded;
    if (this === player) {
        currentCache = imageCache;
        cacheLoaded = imagesLoaded;
    } else {
        currentCache = window.botImageCache || {};
        cacheLoaded = window.botImagesLoaded || false;
    }
    
    const img = currentCache[imageKey];
    if (!img || !cacheLoaded) {
        // Если картинка не загружена, рисуем стандартным способом
        this.drawCharacter(ctx, drawX, drawY);
        return;
    }
    
    // Сохраняем контекст для трансформаций
    ctx.save();
    
    // Применяем эффекты
    if (this.stunned > 0) {
        ctx.filter = 'grayscale(50%) brightness(1.2)';
    }
    if (this.hitEffect > 0) {
        ctx.filter = 'hue-rotate(180deg) brightness(1.5)';
    }
    
    // Отражаем картинку если персонаж смотрит влево
    if (!this.facingRight) {
        ctx.translate(drawX + this.width, drawY);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, this.width, this.height);
    } else {
        ctx.drawImage(img, drawX, drawY, this.width, this.height);
    }
 
    
    // Восстанавливаем контекст
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
        // Простой прыжок только с земли или койот-тайм
        if (this.onGround || this.coyoteTime > 0) {
            this.performJump();
        } else {
            // Буфер прыжка - если нажали прыжок чуть раньше приземления
            this.jumpBuffer = 8;
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
        
        return this.executeAttack(target, 15, 75, 'light');
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
        
        return this.executeAttack(target, 25, 85, 'heavy');
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
    
    // Создаем остальные волны с проверкой состояния игры
    const wave2Timer = setTimeout(() => {
        if (gameRunning && gameStarted && this.abilityActive) {
            this.createMagnitudeWave(1);
        }
    }, 300);
    
    const wave3Timer = setTimeout(() => {
        if (gameRunning && gameStarted && this.abilityActive) {
            this.createMagnitudeWave(2);
        }
    }, 600);
    
    // Сохраняем таймеры для возможной очистки
    this.waveTimers = [wave2Timer, wave3Timer];
    
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
        for (let i = 0; i < 8; i++) {
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
        for (let i = this.hitParticles.length - 1; i >= 0; i--) {
            const particle = this.hitParticles[i];
            
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.velocityY += 0.3;
            particle.life--;
            
            if (particle.life <= 0) {
                this.hitParticles.splice(i, 1);
            }
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
    
    drawMagnitudeWaves(ctx, drawX, drawY) {
        if (this.name !== "Lyron" || this.magnitudeWaves.length === 0) return;
        
        this.magnitudeWaves.forEach(wave => {
            // 🌊 КРАСИВЫЕ МНОЖЕСТВЕННЫЕ КОЛЬЦА ВОЛНЫ
            for (let ring = 0; ring < 3; ring++) {
                let ringRadius = wave.radius - (ring * 15);
                if (ringRadius <= 0) continue;
                
                let ringAlpha = wave.alpha * (1 - ring * 0.3);
                let ringWidth = 6 - ring * 2;
                
                // Основное кольцо волны
                ctx.strokeStyle = `hsla(${200 + wave.waveIndex * 30}, 100%, ${70 - ring * 10}%, ${ringAlpha})`;
                ctx.lineWidth = ringWidth;
                ctx.setLineDash([]);
                
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, ringRadius, 0, 2 * Math.PI);
                ctx.stroke();
            }
            
            // ✨ ВНУТРЕННЕЕ СВЕЧЕНИЕ ВОЛНЫ
            ctx.strokeStyle = `rgba(255, 255, 255, ${wave.alpha * 0.9})`;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, wave.radius * 0.8, 0, 2 * Math.PI);
            ctx.stroke();
            
            // 🌟 ЭНЕРГЕТИЧЕСКИЕ ИСКРЫ ПО КРАЮ ВОЛНЫ
            const sparkCount = Math.floor(wave.radius / 15);
            for (let i = 0; i < sparkCount; i++) {
                const angle = (i / sparkCount) * Math.PI * 2 + Date.now() * 0.005;
                const sparkRadius = wave.radius + Math.sin(Date.now() * 0.01 + i) * 5;
                const sparkX = wave.x + Math.cos(angle) * sparkRadius;
                const sparkY = wave.y + Math.sin(angle) * sparkRadius;
                
                // Большие яркие искры
                const sparkSize = 2 + Math.sin(Date.now() * 0.02 + i) * 1;
                ctx.fillStyle = `rgba(255, 255, 255, ${wave.alpha})`;
                ctx.beginPath();
                ctx.arc(sparkX, sparkY, sparkSize, 0, 2 * Math.PI);
                ctx.fill();
                
                // Дополнительное свечение искр
                ctx.shadowColor = `hsla(${200 + wave.waveIndex * 30}, 100%, 80%, ${wave.alpha})`;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(sparkX, sparkY, sparkSize * 0.5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            
            // 🔥 ЦЕНТРАЛЬНОЕ ЭНЕРГЕТИЧЕСКОЕ ЯДРО
            if (wave.radius < 120) {
                const centerAlpha = (120 - wave.radius) / 120 * wave.alpha;
                const pulseFactor = 1 + Math.sin(Date.now() * 0.01) * 0.3;
                
                // Создаем красивый радиальный градиент
                const gradient = ctx.createRadialGradient(
                    wave.x, wave.y, 0, 
                    wave.x, wave.y, 40 * pulseFactor
                );
                
                gradient.addColorStop(0, `rgba(255, 255, 255, ${centerAlpha})`);
                gradient.addColorStop(0.3, `hsla(${200 + wave.waveIndex * 30}, 100%, 80%, ${centerAlpha * 0.8})`);
                gradient.addColorStop(0.7, `hsla(${200 + wave.waveIndex * 30}, 100%, 60%, ${centerAlpha * 0.4})`);
                gradient.addColorStop(1, `hsla(${200 + wave.waveIndex * 30}, 100%, 40%, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, 40 * pulseFactor, 0, 2 * Math.PI);
                ctx.fill();
                
                // Дополнительное внутреннее свечение
                ctx.fillStyle = `rgba(255, 255, 255, ${centerAlpha * 0.5})`;
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, 15 * pulseFactor, 0, 2 * Math.PI);
                ctx.fill();
            }
            
            // ⚡ ЭЛЕКТРИЧЕСКИЕ РАЗРЯДЫ ВОКРУГ ВОЛНЫ
            if (wave.radius > 80 && wave.radius < 250) {
                for (let i = 0; i < 6; i++) {
                    const lightningAngle = (i / 6) * Math.PI * 2 + Date.now() * 0.01;
                    const lightningLength = 20 + Math.random() * 15;
                    
                    const startX = wave.x + Math.cos(lightningAngle) * wave.radius;
                    const startY = wave.y + Math.sin(lightningAngle) * wave.radius;
                    const endX = startX + Math.cos(lightningAngle + Math.random() - 0.5) * lightningLength;
                    const endY = startY + Math.sin(lightningAngle + Math.random() - 0.5) * lightningLength;
                    
                    ctx.strokeStyle = `rgba(255, 255, 255, ${wave.alpha * 0.8})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                }
            }
        });
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
    }
    
    update() {
        this.stateTimer++;
        this.decisionCounter++;
        this.actionCounter++;
        this.forceActionTimer++;
        
        // Принудительное действие каждые 20 кадров
        if (this.forceActionTimer >= 20) {
            this.forceAction();
            this.forceActionTimer = 0;
        }
        
        // Уменьшаем задержки
        if (this.actionDelay > 0) {
            this.actionDelay--;
            return;
        }
        
        // Более частые решения
        if (this.decisionCounter >= Math.max(15, this.reactionTime / 2)) {
            this.makeDecision();
            this.decisionCounter = 0;
        }
        
        // Более частые действия
        if (this.actionCounter >= Math.max(8, this.reactionTime / 4)) {
            this.executeState();
            this.actionCounter = 0;
        }
        
        // Обновляем таймеры
        this.updateTimers();
        
        // Анализируем паттерны игрока
        this.analyzePlayerMovement();
        
        // Адаптивная агрессивность
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
        if (this.bot.onGround) {
            let jumpChance = 0.03;
            
            // Увеличиваем шанс прыжка если игрок атакует
            if (this.target.isAttacking && distance < 120) {
                jumpChance = 0.4;
            }
            
            // Прыжок для преодоления препятствий
            if (distance > 100 && Math.abs(this.bot.velocityX) < 2) {
                jumpChance = 0.2;
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
    
    // 4. MAGNITUDE WAVE для Lyron
    if (this.bot.name === "Lyron" && this.bot.abilityCooldown === 0 && distance > 100) {
        let waveChance = this.abilityChance || 0.3;
        
        if (Math.random() < waveChance) {
            if (this.bot.useMagnitudeWave()) {
                console.log(`🤖🌊 ${this.bot.name} использует Magnitude Wave! (Шанс: ${Math.round(waveChance * 100)}%)`);
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
                const used = player.useMagnitudeWave();
                if (used) {
                    showKeyPress('Q - MAGNITUDE WAVE! 🌊');
                    console.log('🌊 Lyron активировал Magnitude Wave!');
                } else {
                    showKeyPress('Q - НА КУЛДАУНЕ');
                    console.log('❌ Magnitude Wave на кулдауне');
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
canvas.addEventListener('mousedown', function(e) {
    if (!gameRunning || !gameStarted || !player || !bot) {
        showKeyPress('Игра не активна');
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.button === 0) { 
        let hitResult;
        
        if (player.canCounter > 0) {
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
                console.log(`❌ Быстрый удар не попал`);
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
        
    } else if (e.button === 2) { 
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
            console.log(`❌ Тяжелый удар не попал`);
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
    // Очищаем таймеры игрока
    if (player) {
        if (player.waveTimers) {
            player.waveTimers.forEach(timer => clearTimeout(timer));
            player.waveTimers = null;
        }
        if (player.abilityEndTimer) {
            clearTimeout(player.abilityEndTimer);
            player.abilityEndTimer = null;
        }
        player.magnitudeWaves = [];
        player.hitParticles = [];
    }
    
    // Очищаем таймеры бота
    if (bot) {
        if (bot.waveTimers) {
            bot.waveTimers.forEach(timer => clearTimeout(timer));
            bot.waveTimers = null;
        }
        if (bot.abilityEndTimer) {
            clearTimeout(bot.abilityEndTimer);
            bot.abilityEndTimer = null;
        }
        bot.magnitudeWaves = [];
        bot.hitParticles = [];
    }
}

document.body.setAttribute('tabindex', '0');
document.body.focus();
