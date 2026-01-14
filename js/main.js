/* ========================================
   MANOHAR & CO - MAIN JAVASCRIPT
   Vanilla JS Animations
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initPreloader();
    initNavbar();
    initCardNav();
    initCounterAnimation();
    initButtonEffects();
    initClickSpark();
    initSquaresAnimation();
    initProductTabs();
    initProductImageHoverSlideshow();
    initContactSection();
    initAboutAnimations();
    initHeroShowcase();
    initProductCarousels();
    initViewAllModals();
});

/* ========================================
   THEME TOGGLE - LIGHT/DARK MODE
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const root = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('manohar-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    } else {
        root.setAttribute('data-theme', 'dark'); // Default to dark theme
    }
    
    // Toggle theme function with mesmerizing effects
    function toggleTheme() {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Create ripple effect from toggle button
        createThemeRipple(newTheme);
        
        // Apply theme with slight delay for effect
        setTimeout(() => {
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('manohar-theme', newTheme);
            
            // Add sparkle effect
            createThemeSparkles();
        }, 50);
    }
    
    // Create ripple effect on theme change
    function createThemeRipple(newTheme) {
        const ripple = document.createElement('div');
        ripple.className = 'theme-ripple';
        
        const isLight = newTheme === 'light';
        ripple.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 200vmax;
            height: 200vmax;
            border-radius: 50%;
            background: ${isLight 
                ? 'radial-gradient(circle, rgba(253, 252, 250, 0.3) 0%, transparent 70%)' 
                : 'radial-gradient(circle, rgba(10, 10, 15, 0.3) 0%, transparent 70%)'};
            pointer-events: none;
            z-index: 99999;
            animation: themeRipple 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }
    
    // Create sparkle particles on theme change
    function createThemeSparkles() {
        const colors = ['#e8a838', '#f5c361', '#d49730', '#ffffff'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'theme-sparkle';
                
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const size = Math.random() * 8 + 4;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const duration = Math.random() * 0.5 + 0.5;
                
                sparkle.style.cssText = `
                    position: fixed;
                    top: ${y}px;
                    left: ${x}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99998;
                    animation: sparkleFloat ${duration}s ease-out forwards;
                    box-shadow: 0 0 ${size * 2}px ${color};
                `;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), duration * 1000);
            }, i * 30);
        }
    }
    
    // Add event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('manohar-theme')) {
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    // Add keyframes for animations dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes themeRipple {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        
        @keyframes sparkleFloat {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
}

/* ========================================
   LIGHTNING PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        // Add final flash effect
        const lightningBolt = preloader.querySelector('.lightning-bolt');
        if (lightningBolt) {
            lightningBolt.style.filter = 'drop-shadow(0 0 80px rgba(232, 90, 107, 1)) drop-shadow(0 0 120px rgba(255, 255, 255, 0.8))';
            lightningBolt.style.transform = 'scale(1.3)';
        }
        
        // Fade out preloader
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

/* ========================================
   CARD NAV - MOBILE NAVIGATION
   ======================================== */
function initCardNav() {
    const cardNavContainer = document.getElementById('cardNav');
    if (!cardNavContainer) return;

    const cardNav = cardNavContainer.querySelector('.card-nav');
    const hamburger = document.getElementById('cardNavHamburger');
    const backdrop = document.getElementById('cardNavBackdrop');
    const navCards = cardNavContainer.querySelectorAll('.nav-card');
    const navLinks = cardNavContainer.querySelectorAll('.nav-card-link');
    const themeToggleWrapper = cardNavContainer.querySelector('.nav-theme-toggle-wrapper');

    let isExpanded = false;
    let gsapTimeline = null;

    // Calculate expanded height (capped at viewport)
    const calculateHeight = () => {
        const topBarHeight = 60;
        const cardHeight = 78; // min-height + padding
        const cardCount = navCards.length;
        const themeToggleHeight = themeToggleWrapper ? 90 : 0; // Extra height for theme toggle
        const gap = 8;
        const padding = 16;
        const calculatedHeight = topBarHeight + (cardHeight * cardCount) + (gap * (cardCount - 1)) + padding + themeToggleHeight;
        const maxHeight = window.innerHeight - 32; // 1rem top + 1rem bottom margin
        return Math.min(calculatedHeight, maxHeight);
    };

    // Initialize GSAP if available
    const initGSAP = () => {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, using CSS fallback');
            return false;
        }

        // Set initial states
        gsap.set(cardNav, { height: 60, overflow: 'hidden' });
        gsap.set(navCards, { y: 30, opacity: 0 });
        if (themeToggleWrapper) gsap.set(themeToggleWrapper, { y: 30, opacity: 0 });

        // Create timeline
        gsapTimeline = gsap.timeline({ paused: true });

        gsapTimeline.to(cardNav, {
            height: calculateHeight(),
            duration: 0.4,
            ease: 'power3.out'
        });

        gsapTimeline.to(navCards, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power3.out',
            stagger: 0.06
        }, '-=0.15');
        
        // Animate theme toggle wrapper
        if (themeToggleWrapper) {
            gsapTimeline.to(themeToggleWrapper, {
                y: 0,
                opacity: 1,
                duration: 0.35,
                ease: 'power3.out'
            }, '-=0.2');
        }

        return true;
    };

    // Toggle menu
    const toggleMenu = () => {
        if (!isExpanded) {
            // Open
            hamburger.classList.add('open');
            cardNav.classList.add('open');
            if (backdrop) backdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
            isExpanded = true;

            if (gsapTimeline) {
                gsapTimeline.play(0);
            } else {
                // CSS fallback
                cardNav.style.height = calculateHeight() + 'px';
                navCards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 60);
                });
                // Animate theme toggle wrapper
                if (themeToggleWrapper) {
                    setTimeout(() => {
                        themeToggleWrapper.style.opacity = '1';
                        themeToggleWrapper.style.transform = 'translateY(0)';
                    }, navCards.length * 60);
                }
            }
        } else {
            // Close
            hamburger.classList.remove('open');
            if (backdrop) backdrop.classList.remove('active');
            document.body.style.overflow = ''; // Restore body scroll
            isExpanded = false;

            if (gsapTimeline) {
                gsapTimeline.reverse();
                gsapTimeline.eventCallback('onReverseComplete', () => {
                    cardNav.classList.remove('open');
                });
            } else {
                // CSS fallback
                cardNav.style.height = '60px';
                navCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                });
                if (themeToggleWrapper) {
                    themeToggleWrapper.style.opacity = '0';
                    themeToggleWrapper.style.transform = 'translateY(30px)';
                }
                setTimeout(() => cardNav.classList.remove('open'), 300);
            }
        }
    };

    // Initialize
    const hasGSAP = initGSAP();
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') toggleMenu();
    });

    // Close on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            if (isExpanded) toggleMenu();
        });
    }
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isExpanded) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking on nav card
    navCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.nav-card-link')) return; // Don't double-trigger
            const href = card.dataset.href;
            if (href) {
                if (isExpanded) toggleMenu();
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        });
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (gsapTimeline && isExpanded) {
            gsap.set(cardNav, { height: calculateHeight() });
        }
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number, .legacy-number');
    
    // Use Intersection Observer to trigger when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        counter.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/* ========================================
   BUTTON EFFECTS
   ======================================== */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        // Subtle hover transform
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'all 0.3s ease';
        });
    });
    
    // Stat cards hover effect
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const statIcon = card.querySelector('.stat-icon');
        
        card.addEventListener('mouseenter', () => {
            if (statIcon) {
                statIcon.style.transform = 'scale(1.1)';
                statIcon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (statIcon) {
                statIcon.style.transform = 'scale(1)';
            }
        });
    });
}

/* ========================================
   CLICK SPARK EFFECT
   ======================================== */
function initClickSpark() {
    const config = {
        sparkColor: '#e8a838',      // Gold color to match theme
        sparkSize: 10,
        sparkRadius: 15,
        sparkCount: 8,
        duration: 400,
        easing: 'ease-out',
        extraScale: 1.0
    };

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'click-spark-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let sparks = [];

    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Easing function
    function easeFunc(t) {
        switch (config.easing) {
            case 'linear':
                return t;
            case 'ease-in':
                return t * t;
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default: // ease-out
                return t * (2 - t);
        }
    }

    // Animation loop
    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= config.duration) {
                return false;
            }

            const progress = elapsed / config.duration;
            const eased = easeFunc(progress);

            const distance = eased * config.sparkRadius * config.extraScale;
            const lineLength = config.sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            // Add glow effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = config.sparkColor;
            ctx.strokeStyle = config.sparkColor;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.shadowBlur = 0;

            return true;
        });

        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    // Handle clicks
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();

        const newSparks = Array.from({ length: config.sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / config.sparkCount,
            startTime: now
        }));

        sparks.push(...newSparks);
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

console.log('⚡ Manohar & Co - Powering Excellence Since 1985');

/* ========================================
   GRIDSCAN BACKGROUND (WebGL)
   ======================================== */
function initGridScan() {
    const container = document.getElementById('gridScan');
    if (!container || typeof THREE === 'undefined') {
        console.warn('GridScan: Container or THREE not found');
        return;
    }

    // Configuration - Gold theme colors
    const config = {
        sensitivity: 0.55,
        lineThickness: 1,
        linesColor: '#1a1510',      // Dark gold-brown for grid lines
        scanColor: '#e8a838',        // Gold scan color
        scanOpacity: 0.5,
        gridScale: 0.1,
        noiseIntensity: 0.01,
        scanGlow: 0.6,
        scanSoftness: 2,
        scanDuration: 2.5,
        scanDelay: 1.5,
        snapBackDelay: 250
    };

    // Vertex Shader
    const vertexShader = `
        varying vec2 vUv;
        void main(){
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
        }
    `;

    // Fragment Shader
    const fragmentShader = `
        precision highp float;
        uniform vec3 iResolution;
        uniform float iTime;
        uniform vec2 uSkew;
        uniform float uTilt;
        uniform float uYaw;
        uniform float uLineThickness;
        uniform vec3 uLinesColor;
        uniform vec3 uScanColor;
        uniform float uGridScale;
        uniform float uScanOpacity;
        uniform float uNoise;
        uniform float uScanGlow;
        uniform float uScanSoftness;
        uniform float uScanDuration;
        uniform float uScanDelay;
        varying vec2 vUv;

        float smoother01(float a, float b, float x){
            float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
            return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
        }

        void main(){
            vec2 fragCoord = vUv * iResolution.xy;
            vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

            vec3 ro = vec3(0.0);
            vec3 rd = normalize(vec3(p, 2.0));

            float cR = cos(uTilt), sR = sin(uTilt);
            rd.xy = mat2(cR, -sR, sR, cR) * rd.xy;

            float cY = cos(uYaw), sY = sin(uYaw);
            rd.xz = mat2(cY, -sY, sY, cY) * rd.xz;

            vec2 skew = clamp(uSkew, vec2(-0.7), vec2(0.7));
            rd.xy += skew * rd.z;

            vec3 color = vec3(0.0);
            float minT = 1e20;
            float gridScale = max(1e-5, uGridScale);
            float fadeStrength = 2.0;
            vec2 gridUV = vec2(0.0);

            float hitIsY = 1.0;
            for (int i = 0; i < 4; i++){
                float isY = float(i < 2);
                float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
                float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
                float den = isY * rd.y + (1.0 - isY) * rd.x;
                float t = num / den;
                vec3 h = ro + rd * t;

                float depthBoost = smoothstep(0.0, 3.0, h.z);
                h.xy += skew * 0.15 * depthBoost;

                bool use = t > 0.0 && t < minT;
                gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
                minT = use ? t : minT;
                hitIsY = use ? isY : hitIsY;
            }

            vec3 hit = ro + rd * minT;
            float dist = length(hit - ro);

            float fx = fract(gridUV.x);
            float fy = fract(gridUV.y);
            float ax = min(fx, 1.0 - fx);
            float ay = min(fy, 1.0 - fy);
            float wx = fwidth(gridUV.x);
            float wy = fwidth(gridUV.y);
            float halfPx = max(0.0, uLineThickness) * 0.5;

            float tx = halfPx * wx;
            float ty = halfPx * wy;
            float aax = wx;
            float aay = wy;

            float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
            float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
            float primaryMask = max(lineX, lineY);

            vec2 gridUV2 = (hitIsY > 0.5 ? hit.xz : hit.zy) / gridScale;
            float fx2 = fract(gridUV2.x);
            float fy2 = fract(gridUV2.y);
            float ax2 = min(fx2, 1.0 - fx2);
            float ay2 = min(fy2, 1.0 - fy2);
            float wx2 = fwidth(gridUV2.x);
            float wy2 = fwidth(gridUV2.y);
            float tx2 = halfPx * wx2;
            float ty2 = halfPx * wy2;
            float lineX2 = 1.0 - smoothstep(tx2, tx2 + wx2, ax2);
            float lineY2 = 1.0 - smoothstep(ty2, ty2 + wy2, ay2);

            float edgeDistX = min(abs(hit.x - (-0.5)), abs(hit.x - 0.5));
            float edgeDistY = min(abs(hit.y - (-0.2)), abs(hit.y - 0.2));
            float edgeDist = mix(edgeDistY, edgeDistX, hitIsY);
            float edgeGate = 1.0 - smoothstep(gridScale * 0.5, gridScale * 2.0, edgeDist);
            float altMask = max(lineX2, lineY2) * edgeGate;

            float lineMask = max(primaryMask, altMask);
            float fade = exp(-dist * fadeStrength);

            // Scan effect
            float dur = max(0.05, uScanDuration);
            float del = max(0.0, uScanDelay);
            float scanZMax = 2.0;
            float widthScale = max(0.1, uScanGlow);
            float sigma = max(0.001, 0.18 * widthScale * uScanSoftness);
            float sigmaA = sigma * 2.0;

            float cycle = dur + del;
            float tCycle = mod(iTime, cycle);
            float scanPhase = clamp((tCycle - del) / dur, 0.0, 1.0);
            
            // Ping-pong
            float t2 = mod(max(0.0, iTime - del), 2.0 * dur);
            float phase = (t2 < dur) ? (t2 / dur) : (1.0 - (t2 - dur) / dur);
            
            float scanZ = phase * scanZMax;
            float dz = abs(hit.z - scanZ);
            float lineBand = exp(-0.5 * (dz * dz) / (sigma * sigma));
            
            float taper = 0.3;
            float headFade = smoother01(0.0, taper, phase);
            float tailFade = 1.0 - smoother01(1.0 - taper, 1.0, phase);
            float phaseWindow = headFade * tailFade;
            
            float combinedPulse = lineBand * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);
            float auraBand = exp(-0.5 * (dz * dz) / (sigmaA * sigmaA));
            float combinedAura = (auraBand * 0.25) * phaseWindow * clamp(uScanOpacity, 0.0, 1.0);

            float lineVis = lineMask;
            vec3 gridCol = uLinesColor * lineVis * fade;
            vec3 scanCol = uScanColor * combinedPulse;
            vec3 scanAura = uScanColor * combinedAura;

            color = gridCol + scanCol + scanAura;

            // Noise
            float n = fract(sin(dot(gl_FragCoord.xy + vec2(iTime * 123.4), vec2(12.9898,78.233))) * 43758.5453123);
            color += (n - 0.5) * uNoise;
            color = clamp(color, 0.0, 1.0);
            
            float alpha = clamp(max(lineVis, combinedPulse), 0.0, 1.0);
            float gx = 1.0 - smoothstep(tx * 2.0, tx * 2.0 + aax * 2.0, ax);
            float gy = 1.0 - smoothstep(ty * 2.0, ty * 2.0 + aay * 2.0, ay);
            float halo = max(gx, gy) * fade;
            alpha = max(alpha, halo * 0.6);
            
            gl_FragColor = vec4(color, alpha);
        }
    `;

    // Convert hex to linear RGB
    function srgbColor(hex) {
        const c = new THREE.Color(hex);
        return c.convertSRGBToLinear();
    }

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Uniforms
    const uniforms = {
        iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio()) },
        iTime: { value: 0 },
        uSkew: { value: new THREE.Vector2(0, 0) },
        uTilt: { value: 0 },
        uYaw: { value: 0 },
        uLineThickness: { value: config.lineThickness },
        uLinesColor: { value: srgbColor(config.linesColor) },
        uScanColor: { value: srgbColor(config.scanColor) },
        uGridScale: { value: config.gridScale },
        uScanOpacity: { value: config.scanOpacity },
        uNoise: { value: config.noiseIntensity },
        uScanGlow: { value: config.scanGlow },
        uScanSoftness: { value: config.scanSoftness },
        uScanDuration: { value: config.scanDuration },
        uScanDelay: { value: config.scanDelay }
    };

    // Create material and mesh
    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // Mouse tracking with smooth damping
    const s = THREE.MathUtils.clamp(config.sensitivity, 0, 1);
    const skewScale = THREE.MathUtils.lerp(0.06, 0.2, s);
    const yBoost = THREE.MathUtils.lerp(1.2, 1.6, s);
    const smoothTime = THREE.MathUtils.lerp(0.45, 0.12, s);

    const lookTarget = new THREE.Vector2(0, 0);
    const lookCurrent = new THREE.Vector2(0, 0);
    const lookVel = new THREE.Vector2(0, 0);

    let leaveTimer = null;

    container.addEventListener('mousemove', (e) => {
        if (leaveTimer) {
            clearTimeout(leaveTimer);
            leaveTimer = null;
        }
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        lookTarget.set(nx, ny);
    });

    container.addEventListener('mouseleave', () => {
        if (leaveTimer) clearTimeout(leaveTimer);
        leaveTimer = setTimeout(() => {
            lookTarget.set(0, 0);
        }, config.snapBackDelay);
    });

    // Smooth damp function
    function smoothDampVec2(current, target, velocity, smoothTime, maxSpeed, dt) {
        smoothTime = Math.max(0.0001, smoothTime);
        const omega = 2 / smoothTime;
        const x = omega * dt;
        const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

        const changeX = current.x - target.x;
        const changeY = current.y - target.y;

        const tempX = (velocity.x + omega * changeX) * dt;
        const tempY = (velocity.y + omega * changeY) * dt;

        velocity.x = (velocity.x - omega * tempX) * exp;
        velocity.y = (velocity.y - omega * tempY) * exp;

        current.x = target.x + (changeX + tempX) * exp;
        current.y = target.y + (changeY + tempY) * exp;

        return current;
    }

    // Resize handler
    const onResize = () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, renderer.getPixelRatio());
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let lastTime = performance.now();
    
    function animate() {
        const now = performance.now();
        const dt = Math.max(0, Math.min(0.1, (now - lastTime) / 1000));
        lastTime = now;

        // Smooth mouse movement
        smoothDampVec2(lookCurrent, lookTarget, lookVel, smoothTime, Infinity, dt);

        // Apply skew
        const skewX = lookCurrent.x * skewScale;
        const skewY = -lookCurrent.y * yBoost * skewScale;
        uniforms.uSkew.value.set(skewX, skewY);

        uniforms.iTime.value = now / 1000;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* ========================================
   CONTACT SECTION - PARTICLES & INTERACTIONS
   ======================================== */
function initContactSection() {
    const particlesContainer = document.getElementById('contactParticles');
    if (!particlesContainer) return;

    // Create floating particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(232, 168, 56, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * -10}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add keyframes dynamically
    if (!document.getElementById('contactParticleStyles')) {
        const style = document.createElement('style');
        style.id = 'contactParticleStyles';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(30px, -30px) scale(1.2);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(-20px, -60px) scale(0.8);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(40px, -30px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Store hours status - Check if currently open (9AM - 8PM daily)
    const updateStoreStatus = () => {
        const now = new Date();
        const hour = now.getHours();
        
        // Shop is open from 9AM to 8PM (9:00 - 20:00) every day
        const isOpen = hour >= 9 && hour < 20;

        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        if (statusDot && statusText) {
            if (isOpen) {
                statusDot.classList.add('open');
                statusDot.classList.remove('closed');
                statusText.textContent = 'Currently Open';
                statusText.style.color = '#4ade80';
            } else {
                statusDot.classList.add('closed');
                statusDot.classList.remove('open');
                statusText.textContent = 'Currently Closed';
                statusText.style.color = '#f87171';
            }
        }
    };

    updateStoreStatus();
    // Update every minute
    setInterval(updateStoreStatus, 60000);

    // Card tilt effect on mouse move
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ========================================
   SQUARES BACKGROUND ANIMATION (Canvas)
   ======================================== */
function initSquaresAnimation() {
    const canvas = document.getElementById('squaresCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Configuration
    const config = {
        direction: 'diagonal', // 'right', 'left', 'up', 'down', 'diagonal'
        speed: 0.3,
        squareSize: 40,
        borderColor: 'rgba(39, 30, 55, 0.6)', // Dark purple color
        hoverFillColor: 'rgba(39, 30, 55, 0.3)'
    };

    let gridOffset = { x: 0, y: 0 };
    let hoveredSquare = null;
    let animationFrame;

    // Resize handler
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Draw grid
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { squareSize, borderColor, hoverFillColor } = config;
        
        // Calculate the offset for seamless looping
        const offsetX = ((gridOffset.x % squareSize) + squareSize) % squareSize;
        const offsetY = ((gridOffset.y % squareSize) + squareSize) % squareSize;

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 0.5;

        // Draw squares with offset
        for (let x = -squareSize + offsetX; x < canvas.width + squareSize; x += squareSize) {
            for (let y = -squareSize + offsetY; y < canvas.height + squareSize; y += squareSize) {
                // Check if this square is being hovered
                if (hoveredSquare) {
                    const hoverX = Math.floor((hoveredSquare.mouseX - offsetX) / squareSize) * squareSize + offsetX;
                    const hoverY = Math.floor((hoveredSquare.mouseY - offsetY) / squareSize) * squareSize + offsetY;
                    
                    if (Math.abs(x - hoverX) < 1 && Math.abs(y - hoverY) < 1) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(x, y, squareSize, squareSize);
                    }
                }

                ctx.strokeRect(x, y, squareSize, squareSize);
            }
        }
    }

    // Update offset based on direction
    function updateOffset() {
        const { speed, direction } = config;

        switch (direction) {
            case 'right':
                gridOffset.x += speed;
                break;
            case 'left':
                gridOffset.x -= speed;
                break;
            case 'up':
                gridOffset.y -= speed;
                break;
            case 'down':
                gridOffset.y += speed;
                break;
            case 'diagonal':
                gridOffset.x += speed;
                gridOffset.y += speed;
                break;
        }
    }

    // Animation loop
    function animate() {
        updateOffset();
        drawGrid();
        animationFrame = requestAnimationFrame(animate);
    }

    // Mouse move handler
    function handleMouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        hoveredSquare = {
            mouseX: e.clientX - rect.left,
            mouseY: e.clientY - rect.top
        };
    }

    // Mouse leave handler
    function handleMouseLeave() {
        hoveredSquare = null;
    }

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation
    animate();

    // Cleanup on page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrame);
        } else {
            animate();
        }
    });
}

/* ========================================
   PRODUCT TABS WITH GOOEY PARTICLES
   ======================================== */
function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const panels = document.querySelectorAll('.product-panel');

    if (!tabs.length) return;

    // Detect mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Particle configuration - adjust for mobile
    const config = {
        particleCount: isMobile ? 12 : 15,
        particleDistances: isMobile ? [60, 8] : [90, 10],
        particleR: isMobile ? 70 : 100,
        animationTime: 600,
        timeVariance: 300,
        colors: [1, 2, 3, 1, 2, 3, 1, 4]
    };

    // Noise function for randomness
    const noise = (n = 1) => n / 2 - Math.random() * n;

    // Get X,Y coordinates based on angle
    const getXY = (distance, pointIndex, totalPoints) => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    // Create particle data
    const createParticle = (i, t, d, r) => {
        let rotate = noise(r / 10);
        return {
            start: getXY(d[0], config.particleCount - i, config.particleCount),
            end: getXY(d[1] + noise(7), config.particleCount - i, config.particleCount),
            time: t,
            scale: 1 + noise(0.2),
            color: config.colors[Math.floor(Math.random() * config.colors.length)],
            rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
        };
    };

    // Create and animate particles
    const makeParticles = (element) => {
        const d = config.particleDistances;
        const r = config.particleR;
        const bubbleTime = config.animationTime * 2 + config.timeVariance;

        for (let i = 0; i < config.particleCount; i++) {
            const t = config.animationTime * 2 + noise(config.timeVariance * 2);
            const p = createParticle(i, t, d, r);

            setTimeout(() => {
                const particle = document.createElement('span');
                const point = document.createElement('span');
                
                particle.classList.add('particle');
                particle.style.setProperty('--start-x', `${p.start[0]}px`);
                particle.style.setProperty('--start-y', `${p.start[1]}px`);
                particle.style.setProperty('--end-x', `${p.end[0]}px`);
                particle.style.setProperty('--end-y', `${p.end[1]}px`);
                particle.style.setProperty('--time', `${p.time}ms`);
                particle.style.setProperty('--scale', `${p.scale}`);
                particle.style.setProperty('--color', `var(--color-${p.color}, #e8a838)`);
                particle.style.setProperty('--rotate', `${p.rotate}deg`);

                point.classList.add('point');
                particle.appendChild(point);
                element.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => {
                    try {
                        element.removeChild(particle);
                    } catch (e) {
                        // Particle already removed
                    }
                }, t);
            }, 30);
        }
    };

    // Tab click handler
    const tabOrder = ['wires', 'lights', 'switches', 'fans', 'plumbing', 'conduit', 'pumps'];
    let currentTabIndex = 0;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            const wasActive = tab.classList.contains('active');

            // Skip if already active
            if (wasActive) return;

            // Get current and target indices for direction
            const targetIndex = tabOrder.indexOf(targetTab);
            const direction = targetIndex > currentTabIndex ? 'right' : 'left';

            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            tab.classList.add('active');

            // Create particle burst effect
            makeParticles(tab);

            // Get current active panel
            const currentPanel = document.querySelector('.product-panel.active');
            const targetPanel = document.getElementById(`panel-${targetTab}`);

            if (currentPanel && targetPanel && currentPanel !== targetPanel) {
                // Add exit class to current panel
                currentPanel.classList.add(direction === 'right' ? 'exit-left' : 'exit-right');
                
                // Prepare target panel for entry
                targetPanel.classList.add(direction === 'right' ? 'enter-right' : 'enter-left');
                
                // Small delay to set initial position
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Remove exit classes and deactivate current
                        currentPanel.classList.remove('active', 'exit-left', 'exit-right');
                        
                        // Activate and animate in target
                        targetPanel.classList.remove('enter-left', 'enter-right');
                        targetPanel.classList.add('active');

                        // Smooth-scroll down to the product panel so the user sees the content
                        try {
                            const scrollTarget = targetPanel.closest('.product-content') || targetPanel;
                            const top = (scrollTarget.getBoundingClientRect().top + window.pageYOffset) - 80; // offset for header
                            window.scrollTo({ top, behavior: 'smooth' });
                        } catch (e) {
                            // fallback: nothing
                        }
                    });
                });
            } else if (targetPanel) {
                // First load or no current panel
                targetPanel.classList.add('active');

                // Smooth-scroll for first load as well
                try {
                    const scrollTarget = targetPanel.closest('.product-content') || targetPanel;
                    const top = (scrollTarget.getBoundingClientRect().top + window.pageYOffset) - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                } catch (e) {}
            }

            // Update current index
            currentTabIndex = targetIndex;
        });
    });
}

/* ========================================
   PRODUCT IMAGES HOVER SLIDESHOW
   ----------------------------------------
   Cycles related product images when the user hovers
   over the product image area. Works for any .product-images
   container (used for Premium Wires).
   ======================================== */
function initProductImageHoverSlideshow() {
    const slideshows = document.querySelectorAll('.product-images[data-slideshow]');
    if (!slideshows.length) return;

    const AUTOPLAY_DELAY = 2500; // 2.5s autoplay
    const TRANSITION = 'transform 0.6s cubic-bezier(.22,.9,.26,1)';

    slideshows.forEach(slideshow => {
        const track = slideshow.querySelector('.slides-track');
        if (!track) return;
        const slides = Array.from(track.children);
        const originalCount = slides.length;
        if (originalCount <= 1) return;

        // Clone first slide to allow seamless transition from last -> first via a left-swipe
        const firstClone = slides[0].cloneNode(true);
        track.appendChild(firstClone);

        let index = 0; // 0..originalCount (where originalCount is the clone)
        let animating = false;

        const goTo = (i, animate = true) => {
            index = i;
            if (!animate) {
                track.style.transition = 'none';
            } else {
                track.style.transition = TRANSITION;
            }
            track.style.transform = `translateX(-${index * 100}%)`;
            if (!animate) {
                // force reflow then restore transition
                track.getBoundingClientRect();
                track.style.transition = TRANSITION;
            }
        };

        const next = () => {
            if (animating) return;
            animating = true;
            goTo(index + 1, true);
        };

        // Autoplay always running
        const intervalId = setInterval(next, AUTOPLAY_DELAY);
        slideshow.__slideshowInterval = intervalId;

        // When transition ends, if we're on the clone (index === originalCount), snap back to 0 without animation
        track.addEventListener('transitionend', () => {
            if (index === originalCount) {
                // snapped to clone, jump to real first slide without animation
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                index = 0;
                // force reflow then restore transition
                track.getBoundingClientRect();
                track.style.transition = TRANSITION;
            }
            animating = false;
        });

        // Keyboard navigation
        slideshow.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (animating) return;
                next();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (animating) return;
                // If at start (index === 0), jump to last slide (originalCount -1) then animate left to clone logic
                if (index === 0) {
                    // jump instantly to last (without animation)
                    goTo(originalCount - 1, false);
                    // then animate to clone (which is originalCount)
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            next();
                        });
                    });
                } else {
                    goTo(index - 1, true);
                }
            }
        });

        // Start at first slide (no animation)
        goTo(0, false);
    });
}

/* ========================================
   BEAMS BACKGROUND (About Section)
   ======================================== */
function initBeams() {
    const container = document.getElementById('beams');
    if (!container || typeof THREE === 'undefined') {
        console.warn('Beams: Container or THREE not found');
        return;
    }

    // Ensure container has dimensions
    const aboutSection = container.closest('.about');
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || aboutSection?.offsetHeight || window.innerHeight;

    // Configuration - Gold themed (subtle for background)
    const config = {
        beamWidth: 4,
        beamHeight: 18,
        beamNumber: 3,
        beamSpacing: 1.5, // Space between beams
        lightColor: '#b8862e', // Dimmer gold for subtlety
        speed: 5, // Faster movement
        noiseIntensity: 1.2,
        scale: 0.2,
        rotation: 0
    };

    // Noise shader code
    const noiseShader = `
        float random(in vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        float noise(in vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
        float cnoise(vec3 P) {
            vec3 Pi0 = floor(P);
            vec3 Pi1 = Pi0 + vec3(1.0);
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P);
            vec3 Pf1 = Pf0 - vec3(1.0);
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;
            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);
            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);
            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);
            vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
            vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
            vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
            vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
            vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
            vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
            vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
            vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);
            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
            return 2.2 * n_xyz;
        }
    `;

    // Vertex shader
    const vertexShader = `
        uniform float time;
        uniform float uSpeed;
        uniform float uScale;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        ${noiseShader}
        
        float getPos(vec3 pos, vec2 uv) {
            vec3 noisePos = vec3(pos.x * 0.0, pos.y - uv.y, pos.z + time * uSpeed * 3.0) * uScale;
            return cnoise(noisePos);
        }
        
        vec3 getCurrentPos(vec3 pos, vec2 uv) {
            vec3 newpos = pos;
            newpos.z += getPos(pos, uv);
            return newpos;
        }
        
        vec3 getNormal(vec3 pos, vec2 uv) {
            vec3 curpos = getCurrentPos(pos, uv);
            vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0), uv);
            vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0), uv);
            vec3 tangentX = normalize(nextposX - curpos);
            vec3 tangentZ = normalize(nextposZ - curpos);
            return normalize(cross(tangentZ, tangentX));
        }
        
        void main() {
            vUv = uv;
            vec3 transformed = position;
            transformed.z += getPos(transformed, uv);
            vNormal = getNormal(position, uv);
            vPosition = transformed;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
    `;

    // Fragment shader
    const fragmentShader = `
        uniform vec3 uLightColor;
        uniform vec3 uLightPosition;
        uniform float uNoiseIntensity;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        ${noiseShader}
        
        void main() {
            // Base dark color
            vec3 baseColor = vec3(0.0, 0.0, 0.0);
            
            // Calculate lighting
            vec3 lightDir = normalize(uLightPosition - vPosition);
            float diff = max(dot(vNormal, lightDir), 0.0);
            
            // Add specular
            vec3 viewDir = normalize(cameraPosition - vPosition);
            vec3 reflectDir = reflect(-lightDir, vNormal);
            float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
            
            // Combine lighting
            vec3 ambient = 0.1 * uLightColor;
            vec3 diffuse = diff * uLightColor * 0.6;
            vec3 specular = spec * uLightColor * 0.3;
            
            vec3 finalColor = baseColor + ambient + diffuse + specular;
            
            // Add noise grain
            float randomNoise = noise(gl_FragCoord.xy);
            finalColor -= randomNoise / 15.0 * uNoiseIntensity;
            
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `;

    // Create stacked planes geometry
    function createStackedPlanesGeometry(n, planeWidth, planeHeight, spacing, heightSegments) {
        const geometry = new THREE.BufferGeometry();
        const numVertices = n * (heightSegments + 1) * 2;
        const numFaces = n * heightSegments * 2;
        const positions = new Float32Array(numVertices * 3);
        const indices = new Uint32Array(numFaces * 3);
        const uvs = new Float32Array(numVertices * 2);

        let vertexOffset = 0;
        let indexOffset = 0;
        let uvOffset = 0;
        const totalWidth = n * planeWidth + (n - 1) * spacing;
        const xOffsetBase = -totalWidth / 2;

        for (let i = 0; i < n; i++) {
            const xOffset = xOffsetBase + i * (planeWidth + spacing);
            const uvXOffset = Math.random() * 300;
            const uvYOffset = Math.random() * 300;

            for (let j = 0; j <= heightSegments; j++) {
                const y = planeHeight * (j / heightSegments - 0.5);
                const v0 = [xOffset, y, 0];
                const v1 = [xOffset + planeWidth, y, 0];
                positions.set([...v0, ...v1], vertexOffset * 3);

                const uvY = j / heightSegments;
                uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);

                if (j < heightSegments) {
                    const a = vertexOffset;
                    const b = vertexOffset + 1;
                    const c = vertexOffset + 2;
                    const d = vertexOffset + 3;
                    indices.set([a, b, c, c, b, d], indexOffset);
                    indexOffset += 6;
                }
                vertexOffset += 2;
                uvOffset += 4;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.computeVertexNormals();
        return geometry;
    }

    // Helper to convert hex to RGB
    function hexToRGB(hex) {
        const clean = hex.replace('#', '');
        const r = parseInt(clean.substring(0, 2), 16) / 255;
        const g = parseInt(clean.substring(2, 4), 16) / 255;
        const b = parseInt(clean.substring(4, 6), 16) / 255;
        return new THREE.Vector3(r, g, b);
    }

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera - positioned back enough to see all 3 beams
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 25);

    // Create material
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            time: { value: 0 },
            uSpeed: { value: config.speed },
            uScale: { value: config.scale },
            uNoiseIntensity: { value: config.noiseIntensity },
            uLightColor: { value: hexToRGB(config.lightColor) },
            uLightPosition: { value: new THREE.Vector3(0, 3, 10) }
        },
        side: THREE.DoubleSide
    });

    // Create geometry and mesh
    const geometry = createStackedPlanesGeometry(
        config.beamNumber,
        config.beamWidth,
        config.beamHeight,
        config.beamSpacing,
        100
    );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.z = config.rotation * Math.PI / 180;
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(config.lightColor, 1);
    directionalLight.position.set(0, 3, 10);
    scene.add(directionalLight);

    // Clock
    const clock = new THREE.Clock();

    // Resize handler
    function onResize() {
        const w = container.offsetWidth || window.innerWidth;
        const h = container.offsetHeight || aboutSection?.offsetHeight || window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // Animation loop
    function animate() {
        const delta = clock.getDelta();
        material.uniforms.time.value += 0.1 * delta;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}

/* ========================================
   ABOUT SECTION ANIMATIONS
   ======================================== */
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    // Timeline items reveal animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 150);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.classList.add('timeline-animate');
        timelineObserver.observe(item);
    });
}

/* ========================================
   HERO CIRCUIT SHOWCASE
   ======================================== */
function initHeroShowcase() {
    const showcase = document.getElementById('heroShowcase');
    if (!showcase) return;

    const svg = showcase.querySelector('.house-circuit');
    const labels = showcase.querySelectorAll('.showcase-label');
    
    // Subtle mouse parallax effect on the entire showcase
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    showcase.addEventListener('mousemove', (e) => {
        const rect = showcase.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });

    showcase.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
    });

    // Smooth animation loop for parallax
    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        // Subtle parallax on the SVG
        if (svg) {
            const rotateX = currentY * 5;
            const rotateY = currentX * -5;
            svg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        // Parallax on labels
        labels.forEach((label, index) => {
            const speed = 1 + (index * 0.2);
            const x = currentX * 15 * speed;
            const y = currentY * 15 * speed;
            
            // Preserve existing transforms
            if (label.classList.contains('label-top') || label.classList.contains('label-bottom')) {
                label.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
            } else {
                label.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Label click navigation
    labels.forEach(label => {
        label.style.cursor = 'pointer';
        label.addEventListener('click', () => {
            const labelText = label.querySelector('span').textContent.toLowerCase();
            const tabMap = {
                'power supply': 'wires',
                'lighting': 'lights',
                'ventilation': 'fans',
                'switches': 'switches'
            };
            
            const targetTab = tabMap[labelText];
            if (targetTab) {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        const tabBtn = document.querySelector(`[data-tab="${targetTab}"]`);
                        if (tabBtn) tabBtn.click();
                    }, 800);
                }
            }
        });
    });
}
/* ========================================
   PRODUCT VARIATIONS CAROUSEL
   ======================================== */
function initProductCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    
    carousels.forEach(carousel => {
        const carouselId = carousel.dataset.carousel;
        const cards = carousel.querySelectorAll('.variation-card');
        const navButtons = document.querySelectorAll(`[data-carousel-nav="${carouselId}"]`);
        const indicators = document.querySelector(`[data-indicators="${carouselId}"]`);
        
        let currentIndex = 0;
        const totalCards = cards.length;
        
        // Detect cards per view based on screen size
        function getCardsPerView() {
            return window.innerWidth <= 768 ? 1 : 2;
        }
        
        let cardsPerView = getCardsPerView();
        let maxSlides = Math.ceil(totalCards / cardsPerView);
        
        // Create indicators
        function createIndicators() {
            if (indicators) {
                indicators.innerHTML = ''; // Clear any existing indicators
                maxSlides = Math.ceil(totalCards / cardsPerView);
                for (let i = 0; i < maxSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('carousel-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(i));
                    indicators.appendChild(dot);
                }
            }
        }
        
        createIndicators();
        
        // Update on resize
        window.addEventListener('resize', () => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                createIndicators();
                updateCarousel();
            }
        });
        
        // Update carousel position
        function updateCarousel() {
            const containerWidth = carousel.offsetWidth;
            const offset = -currentIndex * containerWidth;
            carousel.style.transform = `translateX(${offset}px)`;
            
            // Update indicators
            if (indicators) {
                const dots = indicators.querySelectorAll('.carousel-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Update nav buttons state
            maxSlides = Math.ceil(totalCards / cardsPerView);
            navButtons.forEach(btn => {
                const direction = btn.dataset.direction;
                if (direction === 'prev') {
                    btn.classList.toggle('disabled', currentIndex === 0);
                } else {
                    btn.classList.toggle('disabled', currentIndex === maxSlides - 1);
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxSlides - 1));
            updateCarousel();
        }
        
        // Navigation buttons
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.dataset.direction;
                if (direction === 'next' && currentIndex < maxSlides - 1) {
                    currentIndex++;
                } else if (direction === 'prev' && currentIndex > 0) {
                    currentIndex--;
                }
                updateCarousel();
            });
        });
        
        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else if (e.key === 'ArrowRight' && currentIndex < maxSlides - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold && currentIndex < maxSlides - 1) {
                currentIndex++;
                updateCarousel();
            } else if (touchEndX - touchStartX > swipeThreshold && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        // Initial update
        updateCarousel();
    });
}

/* ========================================
   VIEW ALL MODAL
   ======================================== */
function initViewAllModals() {
    // Create modal container if it doesn't exist
    if (!document.querySelector('.variations-modal')) {
        const modalHTML = '<div class="variations-modal"><div class="modal-content"><div class="modal-header"><h3 class="modal-title"></h3><button class="modal-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="modal-grid"></div></div></div>';
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    const modal = document.querySelector('.variations-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = modal.querySelector('.modal-title');
    const modalGrid = modal.querySelector('.modal-grid');
    const modalClose = modal.querySelector('.modal-close');
    
    // View All buttons
    const viewAllButtons = document.querySelectorAll('.view-all-btn');
    
    viewAllButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const carouselId = btn.dataset.modal;
            const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
            
            if (carousel) {
                // Get all variation cards
                const cards = carousel.querySelectorAll('.variation-card');
                
                // Set modal title
                const productTitle = carousel.closest('.product-panel').querySelector('.product-title').textContent;
                modalTitle.textContent = productTitle;
                
                // Clear and populate modal grid
                modalGrid.innerHTML = '';
                cards.forEach(card => {
                    const clonedCard = card.cloneNode(true);
                    modalGrid.appendChild(clonedCard);
                });
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Carousels and modals are initialized in the main DOMContentLoaded handler at top of file