// YAK ATTACK - Yakubu Aiyegbeni Interactive Features

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for triggering animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => statsObserver.observe(stat));
});

// ========================================
// SCROLL ANIMATIONS FOR SECTIONS
// ========================================

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

document.addEventListener('DOMContentLoaded', () => {
    // Apply fade-in animation to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // Apply fade-in to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        fadeInObserver.observe(card);
    });

    // Apply fade-in to quote section
    const quoteSection = document.querySelector('.quote-container');
    if (quoteSection) {
        quoteSection.style.opacity = '0';
        quoteSection.style.transform = 'translateY(30px)';
        quoteSection.style.transition = 'opacity 1s ease, transform 1s ease';
        fadeInObserver.observe(quoteSection);
    }
});

// ========================================
// SCROLL INDICATOR HIDE ON SCROLL
// ========================================

let lastScrollY = window.scrollY;
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// ========================================
// GAME CARD HOVER EFFECTS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle scale to score
            const score = card.querySelectorAll('.score');
            score.forEach(s => {
                s.style.transform = 'scale(1.1)';
                s.style.transition = 'transform 0.3s ease';
            });
        });

        card.addEventListener('mouseleave', () => {
            const score = card.querySelectorAll('.score');
            score.forEach(s => {
                s.style.transform = 'scale(1)';
            });
        });
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    if (hero && window.innerWidth > 768) {
        // Parallax on hero content
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }

        // Parallax on hero image
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// ========================================
// EASTER EGG - CLICK ON BADGE FOR FUN ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.badge-circle');
    let clickCount = 0;

    if (badge) {
        badge.addEventListener('click', () => {
            clickCount++;

            // Spin animation
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'spin 1s ease-out';
            }, 10);

            // After 5 clicks, show a fun message
            if (clickCount === 5) {
                const message = document.createElement('div');
                message.textContent = '⚽ YAK ATTACK! ⚽';
                message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Antonio', sans-serif;
                    font-size: 3rem;
                    color: var(--gold);
                    background: var(--green);
                    padding: 2rem 3rem;
                    border: 5px solid var(--white);
                    z-index: 10000;
                    animation: pop-in 0.5s ease-out;
                `;
                document.body.appendChild(message);

                setTimeout(() => {
                    message.remove();
                    clickCount = 0;
                }, 2000);
            }
        });
    }
});

// Add spin animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(-10deg); }
        50% { transform: rotate(370deg) scale(1.2); }
        100% { transform: rotate(350deg) scale(1); }
    }

    @keyframes pop-in {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// ========================================
// PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable heavy animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}
