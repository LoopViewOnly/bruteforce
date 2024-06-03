const shakeInput = () => {
  const inputElement = document.getElementById("input");
  inputElement.classList.add("shake");
  input.style.border = "2px solid #ff3333";

  inputElement.addEventListener(
    "animationend",
    () => {
      inputElement.classList.remove("shake");
      input.style.border = "";
      input.disabled = false; 
      input.value = "";
      input.focus();
    },
    { once: true }
  );
};
const animateSuccess = (isLastLevel) => {
  const inputElement = document.getElementById("input");
  const successMessage = document.getElementById("successMessage");
  if (isLastLevel) {
    const lang = location.pathname.split("/")[1];
    if (lang === "ar") {
      successMessage.textContent = "رائع، لقد قمت باختراق النظام!";
    } else if (lang === "es") {
      successMessage.textContent = "¡Genial, has hackeado el sistema!";
    } else {
      successMessage.textContent = "Great, You hacked the system!";
    }
  }

  if (inputElement.value.trim() !== "") {
    successMessage.classList.add("show");

    successMessage.addEventListener(
      "animationend",
      () => {
        setTimeout(() => {
          successMessage.classList.remove("show");
        }, 750);
      },
      { once: true }
    );
  }
};
