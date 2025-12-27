// Hyperspeed Effect - Vanilla JS Version
// Based on @react-bits/Hyperspeed

class Hyperspeed {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 9,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 50,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.05, 400 * 0.15],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.2, 0.2],
            carFloorSeparation: [0.05, 1],
            colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0x131318,
                brokenLines: 0x131318,
                // Golden theme for Manohar & Co
                leftCars: [0xE8A838, 0xD4942B, 0xF4D03F],
                rightCars: [0xE8A838, 0xC4841F, 0xFFD700],
                sticks: 0xE8A838
            },
            ...options
        };
        
        this.disposed = false;
        this.init();
    }

    init() {
        this.setupDistortions();
        this.setupRenderer();
        this.setupScene();
        this.setupCamera();
        this.setupFog();
        this.setupRoad();
        this.setupCarLights();
        this.setupLightSticks();
        this.setupComposer();
        
        this.clock = new THREE.Clock();
        this.fovTarget = this.options.fov;
        this.speedUpTarget = 0;
        this.speedUp = 0;
        this.timeOffset = 0;
        
        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);
        
        this.animate();
    }

    setupDistortions() {
        const nsin = val => Math.sin(val) * 0.5 + 0.5;

        const turbulentUniforms = {
            uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
            uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
        };

        this.distortions = {
            turbulentDistortion: {
                uniforms: turbulentUniforms,
                getDistortion: `
                    uniform vec4 uFreq;
                    uniform vec4 uAmp;
                    float nsin(float val){
                        return sin(val) * 0.5 + 0.5;
                    }
                    #define PI 3.14159265358979
                    float getDistortionX(float progress){
                        return (
                            cos(PI * progress * uFreq.r + uTime) * uAmp.r +
                            pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2.0) * uAmp.g
                        );
                    }
                    float getDistortionY(float progress){
                        return (
                            -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
                            -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.0) * uAmp.a
                        );
                    }
                    vec3 getDistortion(float progress){
                        return vec3(
                            getDistortionX(progress) - getDistortionX(0.0125),
                            getDistortionY(progress) - getDistortionY(0.0125),
                            0.0
                        );
                    }
                `,
                getJS: (progress, time) => {
                    const uFreq = turbulentUniforms.uFreq.value;
                    const uAmp = turbulentUniforms.uAmp.value;

                    const getX = p =>
                        Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
                        Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;

                    const getY = p =>
                        -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
                        Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;

                    let distortion = new THREE.Vector3(
                        getX(progress) - getX(progress + 0.007),
                        getY(progress) - getY(progress + 0.007),
                        0
                    );
                    let lookAtAmp = new THREE.Vector3(-2, -5, 0);
                    let lookAtOffset = new THREE.Vector3(0, 0, -10);
                    return distortion.multiply(lookAtAmp).add(lookAtOffset);
                }
            }
        };

        this.options.distortion = this.distortions[this.options.distortion] || this.distortions.turbulentDistortion;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = null;
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            this.options.fov,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            10000
        );
        this.camera.position.set(0, 8, -5);
    }

    setupFog() {
        const fog = new THREE.Fog(
            this.options.colors.background,
            this.options.length * 0.2,
            this.options.length * 500
        );
        this.scene.fog = fog;
        this.fogUniforms = {
            fogColor: { value: fog.color },
            fogNear: { value: fog.near },
            fogFar: { value: fog.far }
        };
    }

    setupComposer() {
        const { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } = POSTPROCESSING;
        
        this.composer = new EffectComposer(this.renderer);
        
        const renderPass = new RenderPass(this.scene, this.camera);
        
        const bloomPass = new EffectPass(
            this.camera,
            new BloomEffect({
                luminanceThreshold: 0.2,
                luminanceSmoothing: 0,
                resolutionScale: 1
            })
        );
        
        const smaaPass = new EffectPass(
            this.camera,
            new SMAAEffect({
                preset: SMAAPreset.MEDIUM
            })
        );
        
        smaaPass.renderToScreen = true;
        
        this.composer.addPass(renderPass);
        this.composer.addPass(bloomPass);
        this.composer.addPass(smaaPass);
    }

    setupRoad() {
        this.uTime = { value: 0 };
        
        // Create roads
        this.leftRoad = this.createRoadPlane(-1, true);
        this.rightRoad = this.createRoadPlane(1, true);
        this.island = this.createRoadPlane(0, false);
    }

    createRoadPlane(side, isRoad) {
        const options = this.options;
        const geometry = new THREE.PlaneGeometry(
            isRoad ? options.roadWidth : options.islandWidth,
            options.length,
            20,
            100
        );

        let uniforms = {
            uTravelLength: { value: options.length },
            uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) },
            uTime: this.uTime
        };

        if (isRoad) {
            uniforms = Object.assign(uniforms, {
                uLanes: { value: options.lanesPerRoad },
                uBrokenLinesColor: { value: new THREE.Color(options.colors.brokenLines) },
                uShoulderLinesColor: { value: new THREE.Color(options.colors.shoulderLines) },
                uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },
                uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },
                uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage }
            });
        }

        const vertexShader = `
            #define USE_FOG
            uniform float uTime;
            uniform float uTravelLength;
            varying vec2 vUv;
            
            ${options.distortion.getDistortion}
            
            void main() {
                vec3 transformed = position.xyz;
                vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.0) / uTravelLength);
                transformed.x += distortion.x;
                transformed.z += distortion.y;
                transformed.y += -1.0 * distortion.z;
                
                vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vUv = uv;
            }
        `;

        const fragmentShader = isRoad ? `
            #define USE_FOG
            varying vec2 vUv;
            uniform vec3 uColor;
            uniform float uTime;
            uniform float uLanes;
            uniform vec3 uBrokenLinesColor;
            uniform vec3 uShoulderLinesColor;
            uniform float uShoulderLinesWidthPercentage;
            uniform float uBrokenLinesWidthPercentage;
            uniform float uBrokenLinesLengthPercentage;
            
            void main() {
                vec2 uv = vUv;
                vec3 color = uColor;
                
                uv.y = mod(uv.y + uTime * 0.05, 1.0);
                float laneWidth = 1.0 / uLanes;
                float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
                float laneEmptySpace = 1.0 - uBrokenLinesLengthPercentage;
                
                gl_FragColor = vec4(color, 1.0);
            }
        ` : `
            #define USE_FOG
            varying vec2 vUv;
            uniform vec3 uColor;
            
            void main() {
                gl_FragColor = vec4(uColor, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            side: THREE.DoubleSide,
            uniforms: Object.assign(uniforms, this.fogUniforms, options.distortion.uniforms)
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -options.length / 2;
        mesh.position.x = (options.islandWidth / 2 + options.roadWidth / 2) * side;
        this.scene.add(mesh);

        return mesh;
    }

    setupCarLights() {
        const options = this.options;
        
        this.leftCarLights = this.createCarLights(
            options.colors.leftCars,
            options.movingAwaySpeed,
            new THREE.Vector2(0, 1 - options.carLightsFade)
        );
        this.leftCarLights.position.x = -options.roadWidth / 2 - options.islandWidth / 2;
        
        this.rightCarLights = this.createCarLights(
            options.colors.rightCars,
            options.movingCloserSpeed,
            new THREE.Vector2(1, 0 + options.carLightsFade)
        );
        this.rightCarLights.position.x = options.roadWidth / 2 + options.islandWidth / 2;
    }

    createCarLights(colors, speed, fade) {
        const options = this.options;
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;

        const laneWidth = options.roadWidth / options.lanesPerRoad;
        const aOffset = [];
        const aMetrics = [];
        const aColor = [];

        let colorArr = Array.isArray(colors) ? colors.map(c => new THREE.Color(c)) : [new THREE.Color(colors)];

        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
            const radius = this.random(options.carLightsRadius);
            const length = this.random(options.carLightsLength);
            const carSpeed = this.random(speed);
            const carLane = i % options.lanesPerRoad;
            let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;
            const carWidth = this.random(options.carWidthPercentage) * laneWidth;
            const carShiftX = this.random(options.carShiftX) * laneWidth;
            laneX += carShiftX;
            const offsetY = this.random(options.carFloorSeparation) + radius * 1.3;
            const offsetZ = -this.random(options.length);

            // Left light
            aOffset.push(laneX - carWidth / 2, offsetY, offsetZ);
            // Right light
            aOffset.push(laneX + carWidth / 2, offsetY, offsetZ);

            aMetrics.push(radius, length, carSpeed);
            aMetrics.push(radius, length, carSpeed);

            const color = colorArr[Math.floor(Math.random() * colorArr.length)];
            aColor.push(color.r, color.g, color.b);
            aColor.push(color.r, color.g, color.b);
        }

        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));

        const vertexShader = `
            #define USE_FOG
            attribute vec3 aOffset;
            attribute vec3 aMetrics;
            attribute vec3 aColor;
            uniform float uTravelLength;
            uniform float uTime;
            varying vec2 vUv;
            varying vec3 vColor;
            
            ${options.distortion.getDistortion}
            
            void main() {
                vec3 transformed = position.xyz;
                float radius = aMetrics.r;
                float myLength = aMetrics.g;
                float speed = aMetrics.b;
                
                transformed.xy *= radius;
                transformed.z *= myLength;
                transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
                transformed.xy += aOffset.xy;
                
                float progress = abs(transformed.z / uTravelLength);
                transformed.xyz += getDistortion(progress);
                
                vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vUv = uv;
                vColor = aColor;
            }
        `;

        const fragmentShader = `
            #define USE_FOG
            varying vec3 vColor;
            varying vec2 vUv;
            uniform vec2 uFade;
            
            void main() {
                vec3 color = vColor;
                float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
                gl_FragColor = vec4(color, alpha);
                if (gl_FragColor.a < 0.0001) discard;
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            uniforms: Object.assign({
                uTime: { value: 0 },
                uTravelLength: { value: options.length },
                uFade: { value: fade }
            }, this.fogUniforms, options.distortion.uniforms)
        });

        const mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.scene.add(mesh);

        return mesh;
    }

    setupLightSticks() {
        const options = this.options;
        const geometry = new THREE.PlaneGeometry(1, 1);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = options.totalSideLightSticks;

        const stickOffset = options.length / (options.totalSideLightSticks - 1);
        const aOffset = [];
        const aColor = [];
        const aMetrics = [];

        const color = new THREE.Color(options.colors.sticks);

        for (let i = 0; i < options.totalSideLightSticks; i++) {
            const width = this.random(options.lightStickWidth);
            const height = this.random(options.lightStickHeight);
            aOffset.push((i - 1) * stickOffset * 2 + stickOffset * Math.random());
            aColor.push(color.r, color.g, color.b);
            aMetrics.push(width, height);
        }

        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2));

        const vertexShader = `
            #define USE_FOG
            attribute float aOffset;
            attribute vec3 aColor;
            attribute vec2 aMetrics;
            uniform float uTravelLength;
            uniform float uTime;
            varying vec3 vColor;
            
            mat4 rotationY(float angle) {
                return mat4(
                    cos(angle), 0, sin(angle), 0,
                    0, 1.0, 0, 0,
                    -sin(angle), 0, cos(angle), 0,
                    0, 0, 0, 1
                );
            }
            
            ${options.distortion.getDistortion}
            
            void main() {
                vec3 transformed = position.xyz;
                float width = aMetrics.x;
                float height = aMetrics.y;
                
                transformed.xy *= vec2(width, height);
                float time = mod(uTime * 60.0 * 2.0 + aOffset, uTravelLength);
                
                transformed = (rotationY(3.14159 / 2.0) * vec4(transformed, 1.0)).xyz;
                transformed.z += -uTravelLength + time;
                
                float progress = abs(transformed.z / uTravelLength);
                transformed.xyz += getDistortion(progress);
                
                transformed.y += height / 2.0;
                transformed.x += -width / 2.0;
                
                vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vColor = aColor;
            }
        `;

        const fragmentShader = `
            #define USE_FOG
            varying vec3 vColor;
            
            void main() {
                gl_FragColor = vec4(vColor, 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            side: THREE.DoubleSide,
            uniforms: Object.assign({
                uTravelLength: { value: options.length },
                uTime: { value: 0 }
            }, this.fogUniforms, options.distortion.uniforms)
        });

        const mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        mesh.position.x = -(options.roadWidth + options.islandWidth / 2);
        this.scene.add(mesh);

        this.lightSticks = mesh;
    }

    random(base) {
        if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
        return Math.random() * base;
    }

    lerp(current, target, speed = 0.1, limit = 0.001) {
        let change = (target - current) * speed;
        if (Math.abs(change) < limit) change = target - current;
        return change;
    }

    onResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.composer.setSize(width, height);
    }

    update(delta) {
        const time = this.clock.elapsedTime + this.timeOffset;
        
        // Update uniforms
        this.uTime.value = time;
        
        if (this.leftCarLights) {
            this.leftCarLights.material.uniforms.uTime.value = time;
        }
        if (this.rightCarLights) {
            this.rightCarLights.material.uniforms.uTime.value = time;
        }
        if (this.lightSticks) {
            this.lightSticks.material.uniforms.uTime.value = time;
        }

        // Update camera look
        if (this.options.distortion.getJS) {
            const distortion = this.options.distortion.getJS(0.025, time);
            this.camera.lookAt(
                new THREE.Vector3(
                    this.camera.position.x + distortion.x,
                    this.camera.position.y + distortion.y,
                    this.camera.position.z + distortion.z
                )
            );
            this.camera.updateProjectionMatrix();
        }
    }

    animate() {
        if (this.disposed) return;
        
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        this.update(delta);
        this.composer.render(delta);
    }

    dispose() {
        this.disposed = true;
        window.removeEventListener('resize', this.onResize);
        
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
        if (this.composer) {
            this.composer.dispose();
        }
        if (this.scene) {
            this.scene.clear();
        }
    }
}

// Initialize when DOM is ready
function initHyperspeed() {
    const container = document.getElementById('hyperspeedBg');
    console.log('[Hyperspeed] initHyperspeed called. Container:', container);
    if (container && typeof THREE !== 'undefined' && typeof POSTPROCESSING !== 'undefined') {
        // Check if section is in viewport to avoid unnecessary rendering
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !container.hyperspeedInstance) {
                    console.log('[Hyperspeed] Instantiating Hyperspeed effect.');
                    container.hyperspeedInstance = new Hyperspeed(container);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(container);
    } else {
        console.warn('[Hyperspeed] Container missing or THREE/POSTPROCESSING not loaded.');
    }
}

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHyperspeed);
} else {
    initHyperspeed();
}
