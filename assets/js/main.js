const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.site-nav__toggle');
const navList = document.querySelector('.site-nav__list');
const revealElements = document.querySelectorAll('[data-reveal]');
let lastScrollY = window.scrollY;

const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (header) {
    const onScroll = () => {
        const currentY = window.scrollY;
        header.classList.toggle('is-solid', currentY > 12);

        if (currentY > lastScrollY && currentY > 160) {
            header.classList.add('is-hidden');
        } else {
            header.classList.remove('is-hidden');
        }

        lastScrollY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}

if (navToggle && navList) {
    const isNavOpen = () => navToggle.getAttribute('aria-expanded') === 'true';

    const setNavState = open => {
        navToggle.setAttribute('aria-expanded', String(open));
        navList.setAttribute('aria-hidden', String(!open));
    };

    const closeNav = (focusToggle = false) => {
        if (!isNavOpen()) return;
        setNavState(false);
        if (focusToggle) navToggle.focus();
    };

    const syncNavAccessibility = () => {
        if (window.innerWidth > 960) {
            setNavState(true);
        } else if (!isNavOpen()) {
            setNavState(false);
        }
    };

    syncNavAccessibility();
    window.addEventListener('resize', syncNavAccessibility);

    navToggle.addEventListener('click', () => {
        const open = !isNavOpen();
        setNavState(open);
    });

    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 960) {
                closeNav();
            }
        });
    });

    document.addEventListener('click', event => {
        if (window.innerWidth > 960) return;
        if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
            closeNav();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeNav(true);
        }
    });
}

if (!supportsReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add('is-visible'));
}
