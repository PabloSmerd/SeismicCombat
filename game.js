// ====== СИСТЕМА ПЕРСОНАЖЕЙ ======
// ====== НАСТРОЙКИ КАРТИНОК ПЕРСОНАЖА ======
// --- НАЧАЛО БЛОКА: выбор персонажа ---
// ==== КОНФИГ КАРТИНОК ДЛЯ ПЕРСОНАЖЕЙ ====
// Функция изменения размера canvas
function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Обновляем позиции персонажей пропорционально
        if (player) {
            player.y = canvas.height - player.height - 20;
        }
        if (bot) {
            bot.y = canvas.height - bot.height - 20;
            bot.x = canvas.width - 150; // Бот справа
        }
    }
}

// Вызывать при загрузке и изменении размера
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
const CHARACTERS = [
  {
    key: "Tom.J",
    name: "Tom.j", 
    color: "#FFD700",
     description: "The Great Warrior with AI Demons",
    images: {
      idle: "assets/TOM.png",
      attack: "assets/TOMFIGHT.png",
      portrait: "assets/TOM.png"  ,
      shield: "assets/Tom.jBkock.png"  // ← ДОБАВИТЬ ЭТО
    }
  },
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
    key: "noxx",
    name: "Noxx",
    color: "#ffa502",
    description: "He is everywhere, omnipresent, upholding order in the realm of magnitudes.",
    element: "electric",
    images: {
      idle: "/assets/NOXX.png",
      attack: "/assets/NOXX_FIGHTER.png",
      portrait: "/assets/NOXX.png",
      shield: "assets/Noxx_block.png"
    }
  },
   {
    key: "Burhan.IP",
    name: "Burhan",
    color: "#ffa502",
    description: "Quintessence of Power GIF",
    element: "electric",
    images: {
      idle: "/assets/Burhanf.png",
      attack: "/assets/Burhanatack.png",
      portrait: "/assets/Burhanf.png",
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
      idle: "/assets/XEALIST.png",
      attack: "/assets/XEALISTAAA.png",
      portrait: "/assets/XEALIST.png",
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
      idle: "/assets/DeFi.NinJa_Elijah.png",
      attack: "/assets/DeFi.NinjaAttack.png",
      portrait: "/assets/DeFi.NinJa_Elijah.png",
      shield: "assets/Defi.Ninja.block.png"
    }
  },
  {
    key: "vludblet",
    name: "vludblet",
    color: "#ffa502",
    description: "Just a nice guy",
    element: "electric",
    images: {
      idle: "/assets/vludblet.png",
      attack: "/assets/vludbletattack.png",
      portrait: "/assets/vludblet.png",
      shield: "assets/vludbock.png"
    }
  },
   {
    key: "Aashi",
    name: "Aashi",
    color: "#ffa502",
    description: "Heart of Magnitude.",
    element: "electric",
    images: {
      idle: "/assets/Aashi.png",
      attack: "/assets/AashiAttack.png",
      portrait: "/assets/Aashi.png",
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
      idle: "/assets/Heathcliff.png",
      attack: "/assets/heatcif.png",
      portrait: "/assets/Heathcliff.png",
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
      idle: "/assets/Matt.png",
      attack: "/assets/mattatack.png",
      portrait: "/assets/Matt.png",
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
      idle: "/assets/ZAIN.png",
      attack: "/assets/ZAINATA.png",
      portrait: "/assets/ZAIN.png",
      shield: "/assets/!ZAINblock.png"
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
        file: "/assets/background2.png",
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


window.addEventListener('load', () => {
    const prevBtn = document.getElementById('prevCharBtn');
    const nextBtn = document.getElementById('nextCharBtn'); 
    const confirmBtn = document.getElementById('confirmCharBtn');
    const charMenu = document.getElementById('characterMenu');
    const diffMenu = document.getElementById('difficultyMenu');

    // Инициализируем отображение первого персонажа
    updateCharacterDisplay();
    
    // 🎨 ВОТ ЭТА СТРОЧКА - ДОБАВЬТЕ ЕЁ СЮДА:
    loadBackground();

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            selectedCharIndex = (selectedCharIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            updateCharacterDisplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            selectedCharIndex = (selectedCharIndex + 1) % CHARACTERS.length;
            updateCharacterDisplay();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            console.log(`Выбран персонаж: ${CHARACTERS[selectedCharIndex].name}`);
            preloadImages(); // Загружаем картинки выбранного персонажа
            charMenu.style.display = 'none';
            diffMenu.style.display = 'block';
        });
    }
});


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
        this.health = 100;
        this.maxHealth = 100;
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
        this.moveSpeed = 13; // Базовая скорость движения
        this.jumpPower = 24; // Сила прыжка
        this.airControl = 0.8; // Контроль в воздухе (0-1)
        this.landingEffect = 0; // Эффект приземления
        this.landingPrep = false; // Подготовка к приземлению
        this.isMovingLeft = false; // Движется ли влево
        this.isMovingRight = false; // Движется ли вправо
        this.coyoteTime = 0; // "Койот-тайм" для прыжков с края
        this.jumpBuffer = 0; // Буфер для прыжков
        this.jumpEffect = 0; // Эффект прыжка
        this.useImages = useImages;
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
        if (this.x < 0) {
            this.x = 0;
            this.velocityX = Math.max(0, this.velocityX); // Предотвращаем застревание
        }
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
            this.velocityX = Math.min(0, this.velocityX);
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
if (this.useImages && imagesLoaded) {
    this.drawCharacterWithImage(ctx, drawX, drawY);
} else {
    this.drawCharacter(ctx, drawX, drawY);
}
        
        // Рисуем персонажа с улучшенной детализацией
       // this.drawCharacter(ctx, drawX, drawY);
        
        // Эффекты атаки
        this.drawAttackEffect(ctx, drawX, drawY);
        
        // UI элементы персонажа
        this.drawCharacterUI(ctx, drawX, drawY);
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
        
        // Контратака имеет приоритет
        if (this.bot.canCounter > 0 && distance < 100) {
            if (this.bot.counterAttack(this.target)) {
                console.log(`🤖 ${this.bot.name} выполняет КОНТРАТАКУ! Урон: 35!`);
                this.consecutiveAttacks++;
                return;
            }
        }
        
        // Основные атаки
        this.performAttack();
        
        // Корректировка позиции во время атаки
        if (distance > 80) {
            if (this.bot.x < this.target.x) {
                this.bot.moveRight();
            } else {
                this.bot.moveLeft();
            }
        }
        
        // Комбо-атаки
        if (this.bot.combo > 0 && this.comboCooldown === 0 && Math.random() < 0.7) {
            this.comboCooldown = 20;
            setTimeout(() => this.performAttack(), 300);
        }
    }
    
    performAttack() {
        const distance = Math.abs(this.bot.x - this.target.x);
        
        if (distance > 100) return;
        
        let attackSuccess = false;
        
        // Выбор типа атаки
        if (Math.random() < 0.3 && this.bot.heavyAttackCooldown === 0) {
            // Тяжелая атака (30% шанс)
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
        
        // После 3 атак подряд - короткая защитная пауза
        if (this.consecutiveAttacks >= 3) {
            this.setState('DEFEND');
            this.defensiveTimer = 30;
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

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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
    
    switch(keyCode) {
        case 65: // A
            player.moveLeft();
            showKeyPress('A');
            break;
        case 68: // D
            player.moveRight();
            showKeyPress('D');
            break;
        case 87: // W
            player.jump();
            showKeyPress('W');
            break;
        case 83: // S
            player.block();
            showKeyPress('S');
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
        showGameEnd('ИГРОК WINS!', 'victory');
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

function showGameEnd(message, type) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
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
            botAI.aggressiveness = 0.25;
            botAI.reactionTime = 45;
            console.log('🟢 Режим НОВИЧОК: Противник будет осторожнее');
            break;
        case 'medium':
            botAI.aggressiveness = 0.45;
            botAI.reactionTime = 25;
            console.log('🟡 Режим ВОИН: Сбалансированный противник');
            break;
        case 'hard':
            botAI.aggressiveness = 0.7;
            botAI.reactionTime = 15;
            console.log('🔴 Режим МАСТЕР: Агрессивный и быстрый противник!');
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
document.body.focus();