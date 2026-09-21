const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const perspectiveContent = {
  tender: "Me encantan esas lindas sonrisas, tus pucheros tiernos que ruegan por mimitos y todas esas pequeñas caritas que haces. Quizás tu las haces sin pensarlo, pero a mi me derriten de solo verlas.",
  silly: "Me encanta ese humor bobo que tienes,las caritas raras y exoticas que pones,  esas cosas tontas que hacemos y las veces que termino riendome contigo. Creo que esa parte de ti es de las cosas que mas amo.",
  warm: "Si tuviera que convertirte en algo, probablemente serias algo calido: una manta calentita, una taza de cafe o un rico guaterito. Estar contigo tiene esa tranquilidad y comodidad que hace que simplemente quiera dormirme encima tuyo.",
  "little-one": "Me encanta llamarte mi pequeña, y mas cuando te pones tan sumisa y tierna cuando lo digo, adoro el efecto que tiene esa frase en ti. Cada vez que te pones tierna o nerviosa, me dan mas ganas de decirtelo y jugar contigo~.",
};

const perspectiveButtons = document.querySelectorAll(".perspective-button");
const perspectiveDisplay = document.querySelector("#perspective-display");
let perspectiveTransition = 0;

perspectiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPerspective = button.dataset.perspective;
    const transitionId = ++perspectiveTransition;
    const renderContent = () => {
      if (transitionId !== perspectiveTransition) {
        return;
      }

      perspectiveDisplay.innerHTML = `<p class="perspective-display__text perspective-display__text--${selectedPerspective}">${perspectiveContent[selectedPerspective]}</p>`;
    };

    perspectiveButtons.forEach((currentButton) => {
      currentButton.setAttribute("aria-pressed", String(currentButton === button));
    });

    const currentText = perspectiveDisplay.querySelector(".perspective-display__text");

    if (currentText) {
      currentText.classList.add("is-leaving");
      window.setTimeout(renderContent, 180);
      return;
    }

    renderContent();
  });
});
