<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>skyfireace but ur admin [BETA]</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0a0a1a;
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            user-select: none;
            touch-action: none;
        }

        #game-container {
            position: relative;
            flex: 1;
            width: 100%;
            overflow: hidden;
            background: linear-gradient(to bottom, #050510, #1a1a2e);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        canvas {
            display: block;
        }

        #control-bar {
            width: 100%;
            height: 80px;
            background: #111;
            border-top: 2px solid #333;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 100;
        }

        .ui-btn {
            background: rgba(0, 255, 255, 0.1);
            border: 2px solid #00ffff;
            color: #00ffff;
            padding: 10px 15px;
            cursor: pointer;
            font-family: inherit;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.1s;
            flex: 1;
            margin: 0 5px;
            max-width: 120px;
            text-align: center;
        }

        .ui-btn:active {
            background: #00ffff;
            color: #000;
            transform: scale(0.95);
        }

        .admin-btn {
            border-color: #ff00ff;
            color: #ff00ff;
            background: rgba(0, 200, 255, 0.1);
        }

        .overlay-menu {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 10, 30, 0.95);
            border: 3px solid #00ffff;
            padding: 20px;
            display: none;
            flex-direction: column;
            gap: 10px;
            z-index: 200;
            border-radius: 15px;
            width: 90%;
            max-width: 450px;
            max-height: 85vh;
            overflow-y: auto;
            text-align: center;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
        }

        .stat-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(0, 255, 255, 0.1);
        }

        .section-title {
            color: #ffaa00;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 15px;
            border-bottom: 1px solid #ffaa00;
            padding-bottom: 4px;
            text-align: left;
        }

        .progress-container {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            pointer-events: none;
        }

        #progress-bar {
            height: 100%;
            width: 0%;
            background: #00ffff;
            border-radius: 5px;
            box-shadow: 0 0 10px #00ffff;
        }

        .active-mod {
            background: #ff00ff !important;
            color: white !important;
            box-shadow: 0 0 15px #ff00ff;
        }

        .clear-btn {
            background: #ff4400 !important;
            border-color: #ffcc00 !important;
            color: white !important;
        }

        .max-btn {
            background: linear-gradient(45deg, #ff00ff, #00ffff) !important;
            border: none !important;
            color: white !important;
            text-shadow: 0 0 5px black;
        }
    </style>
</head>
<body>

<div id="game-container">
    <canvas id="gameCanvas"></canvas>

    <div class="progress-container">
        <div id="progress-bar"></div>
        <div style="font-size: 10px; text-align: center; margin-top: 5px; color: #aaa; text-transform: uppercase; letter-spacing: 1px;">Sector Progress</div>
    </div>

    <!-- Hangar Menu -->
    <div id="stat-menu" class="overlay-menu">
        <h2 style="color: #00ffff; margin: 0;">PILOT'S HANGAR</h2>
        <div style="font-size: 14px; color: #aaa; margin-bottom: 5px;">Combat Points: <span id="points-display" style="color: #00ffff; font-weight: bold;">99999999999999999999999999</span></div>

        <div class="section-title">Fighter Upgrades</div>
        <div class="stat-row"><span>Ailerons (Speed)</span><button class="ui-btn" onclick="upgrade('speed')">500 CP</button></div>
        <div class="stat-row"><span>Fire Rate</span><button class="ui-btn" onclick="upgrade('fire')">500 CP</button></div>
        <div class="stat-row"><span>Cannon Size</span><button class="ui-btn" onclick="upgrade('size')">500 CP</button></div>
        <div class="stat-row"><span>Hull Integrity (HP)</span><button class="ui-btn" onclick="upgrade('hp')">500 CP</button></div>

        <div class="section-title">Manual Adjustments</div>
        <div class="stat-row">
            <span>Points</span>
            <div style="display:flex;">
                <button class="ui-btn" onclick="adjustStat('points', -1000)">-1k</button>
                <button class="ui-btn" onclick="adjustStat('points', 9999999999999999999999999)">+1k</button>
            </div>
        </div>
        <button class="ui-btn" style="margin-top: 20px; background: #ff4444; color: white; width: 100%; max-width: none;" onclick="toggleMenu('stat-menu')">CLOSE</button>
    </div>

    <!-- Admin Command Console -->
    <div id="admin-menu" class="overlay-menu" style="border-color: #ff00ff; box-shadow: 0 0 50px rgba(255, 0, 255, 0.3);">
        <h2 style="color: #ff00ff; margin: 0;">ADMIN OVERRIDE</h2>
        <p style="font-size: 12px; color: #aaa;">Authorized Access Only</p>

        <div class="stat-row">
            <span>MAX ALL STATS</span>
            <button class="ui-btn max-btn" onclick="maxAllStats()">ENGAGE</button>
        </div>

        <div class="stat-row">
            <span>GOD MODE</span>
            <button id="god-btn" class="ui-btn admin-btn" onclick="toggleAdmin('god')">OFF</button>
        </div>
        <div class="stat-row">
            <span>INSTA-KILL</span>
            <button id="insta-btn" class="ui-btn admin-btn" onclick="toggleAdmin('insta')">OFF</button>
        </div>
        <div class="stat-row">
            <span>HYPER DRIVE</span>
            <button id="hyper-btn" class="ui-btn admin-btn" onclick="toggleAdmin('hyper')">OFF</button>
        </div>
        <div class="stat-row">
            <span>RAPID FIRE</span>
            <button id="rapid-btn" class="ui-btn admin-btn" onclick="toggleAdmin('rapid')">OFF</button>
        </div>
        <div class="stat-row">
            <span>BIG BULLETS</span>
            <button id="big-btn" class="ui-btn admin-btn" onclick="toggleAdmin('big')">OFF</button>
        </div>
        <div class="stat-row">
            <span>TIME WARP</span>
            <button id="warp-btn" class="ui-btn admin-btn" onclick="toggleAdmin('warp')">OFF</button>
        </div>
        <div class="stat-row" style="margin-top: 10px;">
            <span>NUKE SCREEN</span>
            <button class="ui-btn nuke-btn" onclick="executeNuke()">LAUNCH</button>
        </div>

        <button class="ui-btn" style="margin-top: 20px; background: #ff00ff; color: white; width: 100%; max-width: none;" onclick="toggleMenu('admin-menu')">EXIT CONSOLE</button>
    </div>
</div>

<div id="control-bar">
    <button class="ui-btn" onclick="togglePause()">PAUSE [P]</button>
    <button class="ui-btn" onclick="toggleMenu('stat-menu')">HANGAR [E]</button>
    <button class="ui-btn admin-btn" onclick="toggleMenu('admin-menu')">ADMIN [C]</button>
</div>

<script type="module">
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let WIDTH, HEIGHT;
    let gameState = "MENU";
    let isPaused = false;
    let score = 0;
    let level = 1;
    let distanceTraveled = 0;
    const distanceGoal = 5000;
    let nukeEffect = 0;
    const STAT_LIMIT = 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    const LEVEL_REWARD = 10000999;

    let player = {
        x: 0, y: 0, w: 40, h: 50,
        speed: 8,
        fireDelay: 200, lastFire: 0,
        hp: 10, maxHp: 10, bulletSize: 6,
        bank: 0
    };

    let admin = {
        godMode: false,
        instaKill: false,
        hyperDrive: false,
        rapidFire: false,
        bigBullets: false,
        timeWarp: false
    };

    let enemies = [];
    let bullets = [];
    let enemyBullets = [];
    let airParticles = [];
    let vapors = [];
    let persistentPoints = 5000;

    function resize() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight - 80;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        player.x = WIDTH / 2;
        player.y = HEIGHT - 120;
        initEnvironment();
    }
    window.addEventListener('resize', resize);
    resize();

    function initEnvironment() {
        airParticles = [];
        for (let i = 0; i < 40; i++) {
            airParticles.push({
                x: Math.random() * WIDTH,
                y: Math.random() * HEIGHT,
                speed: Math.random() * 5 + 10,
                len: Math.random() * 20 + 10
            });
        }
    }

    const keys = {};
    window.addEventListener('keydown', e => {
        keys[e.code] = true;
        if (e.code === 'Space' && gameState !== "PLAYING") startGame();
        if (e.code === 'KeyE') toggleMenu('stat-menu');
        if (e.code === 'KeyC') toggleMenu('admin-menu');
        if (e.code === 'KeyP') togglePause();
    });
    window.addEventListener('keyup', e => keys[e.code] = false);

    window.togglePause = () => {
        if (gameState === "PLAYING") isPaused = !isPaused;
    }
    
    window.toggleMenu = (id) => {
        const m = document.getElementById(id);
        const isOpen = m.style.display === 'flex';
        
        // Close all first
        document.querySelectorAll('.overlay-menu').forEach(menu => menu.style.display = 'none');
        
        if (!isOpen) {
            m.style.display = 'flex';
            isPaused = true;
        } else {
            isPaused = false;
        }
        updateUI();
    };

    window.toggleAdmin = (type) => {
        const mods = {
            god: 'godMode',
            insta: 'instaKill',
            hyper: 'hyperDrive',
            rapid: 'rapidFire',
            big: 'bigBullets',
            warp: 'timeWarp'
        };
        const key = mods[type];
        admin[key] = !admin[key];
        const btn = document.getElementById(`${type}-btn`);
        btn.innerText = admin[key] ? "ON" : "OFF";
        btn.classList.toggle('active-mod', admin[key]);
    };

    window.maxAllStats = () => {
        persistentPoints = STAT_LIMIT;
        player.speed = 50;
        player.fireDelay = 50;
        player.bulletSize = 30;
        player.maxHp = 50;
        player.hp = player.maxHp;
        updateUI();
    };

    window.executeNuke = () => {
        nukeEffect = 1.0;
        score += enemies.length * 999999999999999999;
        addPoints(enemies.length * 999999999999999999);
        enemies = [];
        enemyBullets = [];
    };

    function addPoints(amt) {
        persistentPoints = Math.min(STAT_LIMIT, persistentPoints + amt);
    }

    window.upgrade = (type) => {
        const cost = 500;
        if (persistentPoints < cost) return;
        
        if (type === 'speed') player.speed = Math.min(30, player.speed + 2);
        if (type === 'fire') player.fireDelay = Math.max(40, player.fireDelay - 15);
        if (type === 'size') player.bulletSize += 3;
        if (type === 'hp') { 
            player.maxHp +=50; 
            player.hp = player.maxHp; 
        }
        
        persistentPoints -= cost;
        updateUI();
    };

    window.adjustStat = (type, amount) => {
        if (type === 'points') {
            persistentPoints = Math.max(0, Math.min(STAT_LIMIT, persistentPoints + amount));
        }
        updateUI();
    };

    function updateUI() {
        document.getElementById('points-display').innerText = persistentPoints.toLocaleString();
        const progress = (distanceTraveled / distanceGoal) * 100;
        document.getElementById('progress-bar').style.width = Math.min(100, progress) + '%';
    }

    function startGame() {
        gameState = "PLAYING";
        isPaused = false;
        score = 0;
        level = 1;
        distanceTraveled = 0;
        enemies = [];
        bullets = [];
        enemyBullets = [];
        player.hp = player.maxHp;
        player.x = WIDTH / 2;
    }

    function drawAirplane(ctx, x, y, color, bank = 0, isEnemy = false, isEngaging = false) {
        ctx.save();
        ctx.translate(x, y);
        if (isEnemy) ctx.rotate(Math.PI);
        
        const tilt = bank * 30;
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(tilt * 0.5, 30, 15, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = isEngaging ? "#ff8800" : color;
        ctx.beginPath();
        ctx.moveTo(-35 + tilt, 5);
        ctx.lineTo(35 + tilt, 5);
        ctx.lineTo(0, -10);
        ctx.closePath();
        ctx.fill();

        // Body
        ctx.fillStyle = isEngaging ? "#444" : "#ccc";
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cockpit
        ctx.fillStyle = "#00ffff";
        ctx.beginPath();
        ctx.ellipse(0, -8, 4, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.fillStyle = isEngaging ? "#ff8800" : color;
        ctx.beginPath();
        ctx.moveTo(-12 + (tilt * 0.5), 20);
        ctx.lineTo(12 + (tilt * 0.5), 20);
        ctx.lineTo(0, 12);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    function update() {
        if (isPaused || gameState !== "PLAYING") return;

        const timeFactor = admin.timeWarp ? 0.3 : 1.0;

        distanceTraveled += 2 * timeFactor;
        if (distanceTraveled >= distanceGoal) {
            level++;
            distanceTraveled = 0;
            addPoints(LEVEL_REWARD);
        }

        airParticles.forEach(p => {
            p.y += p.speed * timeFactor;
            if (p.y > HEIGHT) {
                p.y = -20;
                p.x = Math.random() * WIDTH;
            }
        });

        if (nukeEffect > 0) nukeEffect -= 0.025;

        let targetBank = 0;
        const currentSpeed = admin.hyperDrive ? 40 : player.speed;
        
        if (keys['ArrowLeft'] || keys['KeyA']) { 
            player.x -= currentSpeed; 
            targetBank = -0.6; 
        }
        if (keys['ArrowRight'] || keys['KeyD']) { 
            player.x += currentSpeed; 
            targetBank = 0.6; 
        }
        
        player.bank += (targetBank - player.bank) * 0.1;
        player.x = Math.max(40, Math.min(WIDTH - 40, player.x));

        // Vapors
        if (Math.abs(player.bank) > 0.2) {
            vapors.push({ 
                x: player.x + (player.bank > 0 ? 30 : -30), 
                y: player.y + 10, 
                opacity: 0.6 
            });
        }
        vapors.forEach((v, i) => {
            v.y += 8 * timeFactor;
            v.opacity -= 0.03;
            if (v.opacity <= 0) vapors.splice(i, 1);
        });

        // Shooting
        if (keys ['KeyW'] || keys['ArrowUp']) {
            const now = Date.now();
            const delay = admin.rapidFire ? 40 : player.fireDelay;
            if (now - player.lastFire > delay) {
                let bSize = player.bulletSize;
                if (admin.bigBullets) bSize *= 5;
                if (admin.instaKill) bSize = 150;
                
                bullets.push({ x: player.x, y: player.y - 30, size: bSize });
                player.lastFire = now;
            }
        }

        bullets.forEach((b, i) => {
            b.y -= 18;
            if (b.y < -100) bullets.splice(i, 1);
        });

        enemyBullets.forEach((eb, i) => {
            eb.y += 7 * timeFactor;
            if (Math.abs(eb.x - player.x) < 25 && Math.abs(eb.y - player.y) < 25) {
                if (!admin.godMode) player.hp -= 100;
                enemyBullets.splice(i, 1);
                if (player.hp <= 0) gameState = "LOL U DIED U HAVE NOO SKILL LOLOLOL";
            }
            if (eb.y > HEIGHT + 20) enemyBullets.splice(i, 1);
        });

        // Spawn logic
        if (Math.random() < (0.03 + (level * 0.005)) * timeFactor) {
            enemies.push({
                x: Math.random() * (WIDTH - 100) + 50,
                y: -50,
                baseX: 0,
                speed: 4 + Math.random() * 4 + (level * 0.5),
                state: 'FLIGHT',
                engageTimer: 0,
                patternType: Math.random() > 0.5 ? 'SWEEP' : 'DIVE',
                theta: Math.random() * Math.PI * 2
            });
            const latest = enemies[enemies.length - 1];
            latest.baseX = latest.x;
        }

        enemies.forEach((e, ei) => {
            const dY = player.y - e.y;

            if (e.state === 'FLIGHT') {
                e.theta += 0.05 * timeFactor;
                if (e.patternType === 'SWEEP') {
                    e.x = e.baseX + Math.sin(e.theta) * 120;
                } else {
                    e.x = e.baseX + Math.cos(e.theta * 0.5) * 60;
                }
                e.y += e.speed * timeFactor;

                if (dY < 400 && dY > 200) {
                    e.state = 'ENGAGING';
                    e.engageTimer = 150;
                }
            } else if (e.state === 'STARTING') {
                e.engageTimer -= timeFactor;
                e.theta += 0.08 * timeFactor;
                e.x += (player.x - e.x) * 0.02; // Slight homing
                
                if (Math.floor(e.engageTimer) % 30 === 0) {
                    enemyBullets.push({ x: e.x, y: e.y + 20 });
                }
                
                if (e.engageTimer <= 0) e.state = 'RESUMING';
            } else {
                e.y += (e.speed + 4) * timeFactor;
                e.x += Math.sin(e.theta) * 3;
            }

            // Bullet Collision
            bullets.forEach((b, bi) => {
                const hitBox = admin.bigBullets || admin.instaKill ? b.size + 20 : 35;
                if (Math.abs(e.x - b.x) < hitBox && Math.abs(e.y - b.y) < hitBox) {
                    enemies.splice(ei, 1);
                    if (!admin.instaKill && !admin.bigBullets) bullets.splice(bi, 1);
                    score += 1642;
                    addPoints(1642);
                }
            });

            // Player Collision
            if (Math.abs(e.x - player.x) < 45 && Math.abs(e.y - player.y) < 45) {
                if (!admin.godMode) player.hp -=1;
                enemies.splice(ei, 1);
                if (player.hp <= 0) gameState = "GAMEOVER";
            }

            if (e.y > HEIGHT + 100) enemies.splice(ei, 1);
        });

        updateUI();
    }

    function draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Backdrop particles
        ctx.strokeStyle = "rgba(255, 0, 0, 0.15)";
        ctx.lineWidth = 1;
        airParticles.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + p.len);
            ctx.stroke();
        });

        // Vapor trails
        vapors.forEach(v => {
            ctx.fillStyle = `rgba(0, 0, 255, ${v.opacity})`;
            ctx.beginPath();
            ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        if (gameState === "PLAYING") {
            // Player Bullets
            bullets.forEach(b => {
                const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
                grad.addColorStop(0, admin.instaKill || admin.bigBullets ? "#ff00ff" : "#00ffff");
                grad.addColorStop(1, "rgba(0, 0, 255, 0)");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Enemy Bullets
            ctx.fillStyle = "#ff4444";
            enemyBullets.forEach(eb => {
                ctx.beginPath();
                ctx.arc(eb.x, eb.y, 6, 0, Math.PI * 2);
                ctx.fill();
                // Glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = "red";
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            // Player Plane
            if (admin.godMode && Math.floor(Date.now() / 150) % 2 === 0) ctx.globalAlpha = 0.4;
            drawAirplane(ctx, player.x, player.y, admin.godMode ? "#ff00ff" : "#3366ff", player.bank, false);
            ctx.globalAlpha = 1.0;

            // Enemies
            enemies.forEach(e => drawAirplane(ctx, e.x, e.y, "#ff3333", 0, true, e.state === 'ENGAGING'));

            // HUD
            ctx.fillStyle = "white";
            ctx.font = "bold 16px monospace";
            ctx.textAlign = "left";
            ctx.fillText(`SCORE: ${score.toLocaleString()}`, 20, HEIGHT - 20);
            ctx.textAlign = "right";
            ctx.fillText(`SECTOR: ${level}`, WIDTH - 20, HEIGHT - 20);

            // Health Bar
            ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            ctx.fillRect(20, HEIGHT - 45, 150, 12);
            const healthW = Math.max(0, (player.hp / player.maxHp) * 150);
            const healthCol = admin.godMode ? "#ff00ff" : (player.hp < 4 ? "#ff0000" : "#00ff00");
            ctx.fillStyle = healthCol;
            ctx.fillRect(20, HEIGHT - 45, admin.godMode ? 150 : healthW, 12);
        } else {
            // Menu / Game Over
            ctx.fillStyle = "rgba(0,0,0,0.85)";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = "#00ffff";
            ctx.font = "bold 48px monospace";
            ctx.textAlign = "center";
            ctx.fillText(gameState === "MENU" ? "skyfireace" : "Press Space to try again", WIDTH / 2, HEIGHT / 2 - 20);
            
            ctx.fillStyle = "white";
            ctx.font = "20px monospace";
            ctx.fillText("PRESS SPACE TO PLAY TRY NOT TO DIE", WIDTH / 2, HEIGHT / 2 + 40);
            
            if (gameState === "YOU DIED") {
                ctx.fillStyle = "#aaa";
                ctx.fillText(`FINAL SCORE: ${score.toLocaleString()}`, WIDTH / 2, HEIGHT / 2 + 80);
            }
        }

        if (nukeEffect > 0) {
            ctx.fillStyle = `rgba(255, 200, 0, ${nukeEffect})`;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
        }

        requestAnimationFrame(draw);
    }

    setInterval(update, 1000 / 60);
    draw();
</script>
</body>
</html>