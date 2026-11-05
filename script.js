// Smooth scroll dan active nav indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Intersection Observer untuk fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect untuk multiple elements
            const siblings = entry.target.parentElement.querySelectorAll(':scope > *');
            siblings.forEach((sibling, index) => {
                sibling.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

// Observer untuk cards dan content
document.querySelectorAll('.project-card, .skill-card, .about-grid, .floating-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect untuk hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add hover effect untuk project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Floating animation speed adjustment
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    const duration = 3 + (index * 0.5);
    card.style.setProperty('--duration', `${duration}s`);
});

// Mouse move parallax effect pada hero visual
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        floatingCards.forEach((card, index) => {
            const depth = (index + 1) * 0.5;
            card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
    });
}

// Cursor trail effect
const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
cursorTrail.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(74, 159, 159, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorTrail.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorTrail.style.opacity = '0';
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    
    cursorTrail.style.left = `${trailX - 10}px`;
    cursorTrail.style.top = `${trailY - 10}px`;
    
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Text scramble effect untuk gradient text
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.originalText = el.textContent;
    }
    
    scramble() {
        const length = this.originalText.length;
        let iteration = 0;
        
        const interval = setInterval(() => {
            this.el.textContent = this.originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iteration >= length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
}

// Activate scramble on hover
const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
    gradientText.addEventListener('mouseenter', () => {
        const scramble = new TextScramble(gradientText);
        scramble.scramble();
    });
}

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #4a9f9f, #8b6f4f);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Section reveal animations
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(section);
});

// Add revealed class handling in CSS via JS
const style = document.createElement('style');
style.textContent = `
    section.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Skill tags animation
document.querySelectorAll('.skill-tags span').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0)';
    tag.style.transition = 'all 0.3s ease';
    tag.style.transitionDelay = `${index * 0.05}s`;
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tags span');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1)';
                }, index * 50);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statValue = entry.target.querySelector('h4');
            if (statValue && statValue.dataset.target) {
                animateValue(statValue, 0, parseInt(statValue.dataset.target), 2000);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    const h4 = stat.querySelector('h4');
    if (h4) {
        h4.dataset.target = h4.textContent.replace(/\D/g, '');
    }
    statsObserver.observe(stat);
});

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const mobileToggle = document.createElement('button');
mobileToggle.className = 'mobile-toggle';
mobileToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;
mobileToggle.style.cssText = `
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
`;

if (window.innerWidth <= 768) {
    mobileToggle.style.display = 'flex';
    navLinks.style.display = 'none';
    navLinks.classList.add('mobile-menu');
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        mobileToggle.style.display = 'flex';
    } else {
        mobileToggle.style.display = 'none';
        navLinks.style.display = 'flex';
        navLinks.classList.remove('mobile-menu');
    }
});

mobileToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'rgba(15, 20, 25, 0.95)';
    navLinks.style.padding = '1rem';
    navLinks.style.borderBottom = '1px solid var(--border)';
});

document.querySelector('.nav-container').appendChild(mobileToggle);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const navLinksAll = document.querySelectorAll('.nav-link');
    const currentActive = document.querySelector('.nav-link.active');
    let currentIndex = Array.from(navLinksAll).indexOf(currentActive);
    
    if (e.key === 'ArrowRight' && currentIndex < navLinksAll.length - 1) {
        navLinksAll[currentIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navLinksAll[currentIndex - 1].click();
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Initial animations
    setTimeout(() => {
        document.querySelector('.hero-text h1').style.animation = 'slideInLeft 0.8s ease-out';
        document.querySelector('.hero-text p').style.animation = 'slideInLeft 0.8s ease-out 0.2s backwards';
        document.querySelector('.cta-buttons').style.animation = 'slideInUp 0.8s ease-out 0.4s backwards';
    }, 100);
});

// Prevent horizontal scroll
document.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
    }
}, { passive: false });

console.log('✨ Portfolio loaded with animations!');