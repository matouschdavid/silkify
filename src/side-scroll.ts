import "./styles/side-scroll.scss";

const scrollContainers = [] as HTMLElement[];

processSideScroll();

window.addEventListener("resize", () => {
  scrollContainers.forEach((element) => {
    calculateAnimationTiming(element);
  });
});

function processSideScroll(): void {
  const elementsToAnimate =
    document.querySelectorAll<HTMLElement>("[scroll-direction]");
  elementsToAnimate.forEach((element) => {
    const direction = element.dataset.scrollDirection!;
    const scrollSpeed = parseInt(element.getAttribute("scroll-speed")!) || 1;

    const scrollContainer = document.createElement("div");
    scrollContainer.classList.add("horizontal-scroll");
    scrollContainer.classList.add(`to-${direction}`);
    scrollContainer.dataset.scrollSpeed = scrollSpeed.toString();

    element.removeAttribute("scroll-direction");
    element.removeAttribute("scroll-speed");

    const innerContainer = document.createElement("div");
    innerContainer.classList.add("horizontal-scroll-inner");
    innerContainer.appendChild(element);

    scrollContainer.appendChild(innerContainer);

    element.parentElement!.replaceChild(scrollContainer, element);

    calculateAnimationTiming(scrollContainer);

    scrollContainers.push(scrollContainer);
  });
}

function calculateAnimationTiming(element: HTMLElement): void {
  const scrollSpeed = parseInt(element.getAttribute("scroll-speed")!) || 1;

  const offsetTop = element.offsetTop;
  const contentHeight = element.children[0].clientHeight;
  const height =
    (contentHeight + window.innerHeight) * scrollSpeed - contentHeight;
  element.style.setProperty("--scroll-start", `${offsetTop}px`);
  element.style.setProperty("--scroll-end", `${offsetTop + height}px`);

  element.style.setProperty("--content-height", `${contentHeight}px`);
  element.style.setProperty("--scroll-speed", scrollSpeed.toString());
}
