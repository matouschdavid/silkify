import "../styles/side-scroll.scss";

function calculateAnimationTimings(): void {
    const horizontalScroller = document.querySelectorAll<HTMLElement>(".horizontal-scroll");

    horizontalScroller.forEach((scroller) => {
        const scrollSpeed = parseFloat(scroller.dataset.scrollSpeed!) || 1;

        const offsetTop = scroller.offsetTop;
        const contentHeight = scroller.children[0].clientHeight;
        const height =
            (contentHeight + window.innerHeight) * scrollSpeed - contentHeight;
        scroller.style.setProperty("--scroll-start", `${offsetTop}px`);
        scroller.style.setProperty("--scroll-end", `${offsetTop + height}px`);

        scroller.style.setProperty("--content-height", `${contentHeight}px`);
        scroller.style.setProperty("--scroll-speed", scrollSpeed.toString());
    });
}

export function initializeSideScroll(): void {
    calculateAnimationTimings();

    window.addEventListener("resize", () => {
        calculateAnimationTimings();
    });
}
