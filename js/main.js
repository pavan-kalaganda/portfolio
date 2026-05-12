/**
 * Portfolio Main JavaScript
 * Author: Pavan Kalaganda
 * Description: Handles theme switching, animations, mobile nav,
 * GitHub integration, and interactive elements
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const CONFIG = {
        githubUsername: 'pavan-kalaganda',
        githubApiBase: 'https://api.github.com',
        typingStrings: [
            'Machine Learning Engineer',
            'NLP & LLM Specialist',
            'Data Science Student',
            'Powerlifting Athlete'
        ],
        animationThreshold: 0.1,
        scrollOffset: 100
    };

    // ==========================================
    // DOM Element References
    // ==========================================
    const DOM = {
        html: document.documentElement,
        body: document.body,
        navbar: document.getElementById('navbar'),
        mobileToggle: document.getElementById('mobileToggle'),
        navMenu: document.getElementById('navMenu'),
        themeToggle: document.getElementById('themeToggle'),
        backToTop: document.getElementById('backToTop'),
        heroCanvas: document.getElementById('heroCanvas'),
        typingText: document.getElementById('typingText'),
        contactForm: document.getElementById('contactForm'),
        repoGrid: document.getElementById('reposGrid'),
        repoCount: document.getElementById('repoCount'),
        starCount: document.getElementById('starCount')
    };

    // ==========================================
    // Theme Management
    // ==========================================
    const ThemeManager = {
        init() {
            DOM.themeToggle.addEventListener('click', this.toggle.bind(this));
            this.apply(this.getCurrent());
        },

        getCurrent() {
            return DOM.html.getAttribute('data-theme') || 'light';
        },

        toggle() {
            const current = this.getCurrent();
            const next = current === 'light' ? 'dark' : 'light';
            this.apply(next);
            localStorage.setItem('theme', next);
        },

        apply(theme) {
            DOM.html.setAttribute('data-theme', theme);
            // Update meta theme-color for mobile browsers
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) {
                metaTheme.setAttribute('content', theme === 'dark' ? '#0f0f1a' : '#fafafa');
            }
        }
    };

    // ==========================================
    // Mobile Navigation
    // ==========================================
    const MobileNav = {
        init() {
            DOM.mobileToggle.addEventListener('click', this.toggle.bind(this));

            // Close menu when clicking a link
            DOM.navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen()) this.close();
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen() && 
                    !DOM.navMenu.contains(e.target) && 
                    !DOM.mobileToggle.contains(e.target)) {
                    this.close();
                }
            });
        },

        toggle() {
            const isOpen = this.isOpen();
            DOM.navMenu.classList.toggle('active', !isOpen);
            DOM.mobileToggle.setAttribute('aria-expanded', !isOpen);
            DOM.mobileToggle.classList.toggle('active', !isOpen);
            DOM.body.style.overflow = isOpen ? '' : 'hidden';
        },

        close() {
            DOM.navMenu.classList.remove('active');
            DOM.mobileToggle.setAttribute('aria-expanded', 'false');
            DOM.mobileToggle.classList.remove('active');
            DOM.body.style.overflow = '';
        },

        isOpen() {
            return DOM.navMenu.classList.contains('active');
        }
    };

    // ==========================================
    // Scroll Behaviors
    // ==========================================
    const ScrollManager = {
        init() {
            this.handleScroll = this.handleScroll.bind(this);
            window.addEventListener('scroll', this.handleScroll, { passive: true });
            this.handleScroll();

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offset = DOM.navbar.offsetHeight + 20;
                        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                });
            });

            // Back to top
            DOM.backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },

        handleScroll() {
            const scrollY = window.pageYOffset;

            // Navbar background
            if (scrollY > 50) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }

            // Back to top button
            if (scrollY > 500) {
                DOM.backToTop.classList.add('visible');
            } else {
                DOM.backToTop.classList.remove('visible');
            }

            // Active nav link
            this.updateActiveNavLink();
        },

        updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.pageYOffset + DOM.navbar.offsetHeight + 100;

            let current = '';
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    current = section.getAttribute('id');
                }
            });

            DOM.navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    // ==========================================
    // Scroll Animations (Intersection Observer)
    // ==========================================
    const AnimationManager = {
        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: CONFIG.animationThreshold,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            document.querySelectorAll('[data-animate]').forEach(el => {
                observer.observe(el);
            });
        }
    };

    // ==========================================
    // Typing Effect
    // ==========================================
    const TypingEffect = {
        init() {
            if (!DOM.typingText) return;

            this.strings = CONFIG.typingStrings;
            this.currentString = 0;
            this.currentChar = 0;
            this.isDeleting = false;
            this.typeSpeed = 100;
            this.deleteSpeed = 50;
            this.pauseTime = 2000;

            this.type();
        },

        type() {
            const current = this.strings[this.currentString];

            if (this.isDeleting) {
                DOM.typingText.textContent = current.substring(0, this.currentChar - 1);
                this.currentChar--;
            } else {
                DOM.typingText.textContent = current.substring(0, this.currentChar + 1);
                this.currentChar++;
            }

            let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

            if (!this.isDeleting && this.currentChar === current.length) {
                typeSpeed = this.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentChar === 0) {
                this.isDeleting = false;
                this.currentString = (this.currentString + 1) % this.strings.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    };

    // ==========================================
    // Hero Canvas Animation (Particle Network)
    // ==========================================
    const HeroCanvas = {
        init() {
            if (!DOM.heroCanvas) return;

            this.canvas = DOM.heroCanvas;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 60;
            this.connectionDistance = 150;
            this.mouse = { x: null, y: null };

            this.resize();
            this.createParticles();
            this.bindEvents();
            this.animate();
        },

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }
        },

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });

            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        },

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update and draw particles
            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(165, 180, 252, 0.6)';
                this.ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectionDistance) {
                        const opacity = 1 - (distance / this.connectionDistance);
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(165, 180, 252, ${opacity * 0.3})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }

                // Connect to mouse
                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const dx = this.particles[i].x - this.mouse.x;
                    const dy = this.particles[i].y - this.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectionDistance * 1.5) {
                        const opacity = 1 - (distance / (this.connectionDistance * 1.5));
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.mouse.x, this.mouse.y);
                        this.ctx.strokeStyle = `rgba(45, 212, 191, ${opacity * 0.5})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(() => this.animate());
        }
    };

    // ==========================================
    // GitHub Integration
    // ==========================================
    const GitHubIntegration = {
        async init() {
            try {
                await this.fetchUserStats();
                await this.fetchRepositories();
            } catch (error) {
                console.warn('GitHub API fetch failed:', error);
                this.showFallback();
            }
        },

        async fetchUserStats() {
            const response = await fetch(
                `${CONFIG.githubApiBase}/users/${CONFIG.githubUsername}`
            );

            if (!response.ok) throw new Error('Failed to fetch user data');

            const data = await response.json();

            if (DOM.repoCount) {
                DOM.repoCount.textContent = data.public_repos || '—';
            }
        },

        async fetchRepositories() {
            const response = await fetch(
                `${CONFIG.githubApiBase}/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=6`
            );

            if (!response.ok) throw new Error('Failed to fetch repositories');

            const repos = await response.json();

            // Calculate total stars
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            if (DOM.starCount) {
                DOM.starCount.textContent = totalStars;
            }

            // Render repositories
            if (DOM.repoGrid && repos.length > 0) {
                DOM.repoGrid.innerHTML = repos.map(repo => `
                    <div class="repo-card">
                        <h5>${this.escapeHtml(repo.name)}</h5>
                        <p>${this.escapeHtml(repo.description || 'No description available')}</p>
                        <div class="repo-meta">
                            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                            <span><i class="fas fa-circle" style="color: ${this.getLanguageColor(repo.language)}"></i> ${repo.language || 'N/A'}</span>
                        </div>
                    </div>
                `).join('');
            }
        },

        showFallback() {
            if (DOM.repoGrid) {
                DOM.repoGrid.innerHTML = `
                    <div class="repo-placeholder">
                        <i class="fab fa-github" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                        <p>Unable to load repositories. Visit my profile directly:</p>
                        <a href="https://github.com/${CONFIG.githubUsername}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                `;
            }
        },

        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        getLanguageColor(language) {
            const colors = {
                'Python': '#3572A5',
                'JavaScript': '#f1e05a',
                'TypeScript': '#2b7489',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'Jupyter Notebook': '#DA5B0B',
                'Java': '#b07219',
                'C++': '#f34b7d'
            };
            return colors[language] || '#8b949e';
        }
    };

    // ==========================================
    // Contact Form
    // ==========================================
    const ContactForm = {
        init() {
            if (!DOM.contactForm) return;

            DOM.contactForm.addEventListener('submit', (e) => {
                // Check if using placeholder Formspree ID
                const action = DOM.contactForm.getAttribute('action');
                if (action.includes('YOUR_FORM_ID')) {
                    e.preventDefault();
                    alert('Please configure your Formspree form ID in the HTML before using the contact form.\n\nReplace YOUR_FORM_ID with your actual form endpoint.');
                    return;
                }

                // Show loading state
                const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Reset button after submission (Formspree will handle the actual submit)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        }
    };

    // ==========================================
    // Performance: Lazy Load Images
    // ==========================================
    const LazyLoader = {
        init() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            imageObserver.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
    };

    // ==========================================
    // Initialize Everything
    // ==========================================
    function init() {
        ThemeManager.init();
        MobileNav.init();
        ScrollManager.init();
        AnimationManager.init();
        TypingEffect.init();
        HeroCanvas.init();
        GitHubIntegration.init();
        ContactForm.init();
        LazyLoader.init();

        // Add loaded class to body for any CSS transitions
        DOM.body.classList.add('loaded');

        console.log('Portfolio initialized successfully');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
