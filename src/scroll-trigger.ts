import "./styles/scroll-trigger.scss";

function parseScrollReveal(element: HTMLElement): { from: string, to: string } {
    const value = element.getAttribute("scroll-reveal");

    if (!value) throw new Error("scroll-reveal attribute is missing");

    let from = "";
    let to = "";

    if (value.split("=>").length === 2) {
        const [f, t] = value.split("=>");
        from = f;
        to = t;
    } else if (value !== "") {
        to = value;
    }

    from = from.trim();
    to = to.trim();

    return {from, to};
}

function createIntersectionObserver(): IntersectionObserver {
    return new IntersectionObserver(
        (entries) => {
            if ("requestIdleCallback" in window) {
                requestIdleCallback(() => checkVisibility(entries));
            } else {
                checkVisibility(entries);
            }
        },
        {rootMargin: "400px 0px 0px 0px"}
    );
}

function processScrollReveal(): void {
    const intersectionObserver = createIntersectionObserver();

    const elementsToAnimate = document.querySelectorAll<HTMLElement>("[scroll-reveal]");
    elementsToAnimate.forEach((element) => {
        const {from, to} = parseScrollReveal(element);
        element.removeAttribute("scroll-reveal");

        if (from !== "") {
            element.classList.add(from);
        }
        element.setAttribute("scroll-reveal-from", from);
        element.setAttribute("scroll-reveal-to", to);

        intersectionObserver.observe(element);
    });
}

function checkVisibility(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
        const elem = entry.target as HTMLElement;

        if (entry.isIntersecting) {
            if (!elem.classList.contains(elem.getAttribute("scroll-reveal-to")!)) {
                const delay = parseInt(elem.getAttribute("scroll-delay")!) || 0;
                setTimeout(() => {
                    elem.classList.add(elem.getAttribute("scroll-reveal-to")!);

                    const from = elem.getAttribute("scroll-reveal-from");
                    if (from && from !== "") {
                        elem.classList.remove(from);
                    }
                }, delay);
            }
        }
    }
}

const prefersReducedMotion = window.matchMedia(
    `(prefers-reduced-motion: reduce)`
).matches;

if (!prefersReducedMotion) {
    processScrollReveal();
}
