const revealElements = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
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
