import "../styles/scroll-trigger.scss";

function processSlideIn(): void {
    const elementsToAnimate = document.querySelectorAll<HTMLElement>("[slide-up]");
    elementsToAnimate.forEach((element) => {
        const notVisibleClass = element.dataset.whenNotVisible || "invisible";
        element.classList.add(notVisibleClass);
        if (!element.dataset.whenVisible) {
            element.dataset.whenVisible = "slide-in";
        }
    });
}

function processAddClassWhenVisible(): void {
    const elementsToAnimate = document.querySelectorAll("[data-when-visible]");
    const intersectionObserver = new IntersectionObserver(
        (entries) => {
            if ("requestIdleCallback" in window) {
                requestIdleCallback(() => checkVisibility(entries));
            } else {
                checkVisibility(entries);
            }
        },
        {rootMargin: "400px 0px 0px 0px"}
    );

    elementsToAnimate.forEach((element) => {
        intersectionObserver.observe(element);
    });
}

function checkVisibility(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
        const elem = entry.target as HTMLElement;
        if (entry.isIntersecting) {
            if (!elem.classList.contains(elem.dataset.whenVisible!)) {
                const delay = parseInt(elem.dataset.delay!) || 0;
                setTimeout(() => {
                    elem.classList.add(elem.dataset.whenVisible!);
                }, delay);
            }
        } else {
            elem.classList.remove(elem.dataset.whenVisible!);
        }
    }
}

export function initializeScrollTrigger(): void {
    const prefersReducedMotion = window.matchMedia(
        `(prefers-reduced-motion: reduce)`
    ).matches;

    if (!prefersReducedMotion) {
        processSlideIn();
        processAddClassWhenVisible();
    }
}
