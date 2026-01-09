(function () {
    const BASE_W = 300;
    const BASE_H = 500;
    const SCALE_SELECTOR = 'pokedex-case';
    function getViewportSize() {
        return {
            w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }
    function updateScale() {
        const node = document.querySelector(SCALE_SELECTOR);
        if (!node) return;
        const { w: vw, h: vh } = getViewportSize();
        const maxW = vw * 0.98;
        const maxH = vh * 0.98;
        const scale = Math.min(maxW / BASE_W, maxH / BASE_H);
        try { document.body.style.setProperty('--pokedex-scale', String(scale)); } catch (e) { }
        node.style.setProperty('--scale', String(scale));
    }
    let raf = null;
    function scheduleUpdate() {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { updateScale(); raf = null; });
    }
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('orientationchange', scheduleUpdate, { passive: true });
    document.addEventListener('DOMContentLoaded', updateScale);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        updateScale();
    }
})();
