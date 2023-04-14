const dropdown = document.getElementById("dropdown");
const selectedOption = document.getElementById("selected-option");
const dropdownList = document.querySelector("#dropdown ol");
const dropdownOptions = document.querySelectorAll("#dropdown li");

function active() {
  dropdown.classList.toggle("active");
  dropdown.setAttribute(
    "aria-expanded",
    !dropdown.classList.contains("active")
  );
  dropdownList.classList.toggle("filtreInvisible");
  dropdownList.setAttribute(
    "aria-hidden",
    !dropdownList.classList.contains("filtreInvisible")
  );
  toggleSelectedOptionVisibility();
}

// Au clic sur le menu déroulant
dropdown.addEventListener("click", active);

// Ajoute un écouteur d'événement à chaque élément `li`
dropdownOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    const value = this.dataset.value;
    selectedOption.textContent = value;
    selectedOption.dataset.value = value;
    dropdownOptions.forEach(function (option) {
      option.setAttribute("aria-selected", option === this);
    }, this);
    removeRoundedBottom();
    addRoundedBottomOnLastLi();
  });
});

function selectDefaultOption() {
  // Récupérer la première option
  const defaultOption = dropdownOptions[0];

  // Mettre à jour la valeur de l'option sélectionnée
  const value = defaultOption.dataset.value;
  selectedOption.textContent = value;
  selectedOption.dataset.value = value;

  // Mettre à jour l'attribut aria-selected pour chaque option
  dropdownOptions.forEach(function (option) {
    option.setAttribute("aria-selected", option === defaultOption);
  });
}
// Appeler la fonction pour sélectionner l'option par défaut
selectDefaultOption();

function toggleSelectedOptionVisibility() {
  const selectedOptionValue = selectedOption.dataset.value;
  dropdownOptions.forEach(function (option) {
    if (option.dataset.value === selectedOptionValue) {
      option.classList.add("hidden");
    } else {
      option.classList.remove("hidden");
    }
  });
}

function addRoundedBottomOnLastLi() {
  // Récupération de tous les li, sauf ceux qui ont la class "hidden"
  const lis = Array.from(document.querySelectorAll("#dropdown li"));

  // Récupération de la valeur de selectedOption
  const selectedOptionValue = selectedOption.dataset.value;

  // Création d'un nouveau tableau sans le li qui a la même valeur que selectedOption
  const filteredLis = lis.filter(
    (li) => li.dataset.value !== selectedOptionValue
  );

  // Récupération du dernier li du nouveau tableau, sauf s'il a l'id "titreFiltre"
  let lastLi = filteredLis[filteredLis.length - 1];
  if (
    lastLi &&
    lastLi.id === "titreFiltre" &&
    lastLi.getAttribute("aria-selected") === "true"
  ) {
    lastLi = filteredLis[filteredLis.length - 2];
  }

  console.log(lastLi);
  lastLi.classList.add("roundedBottom");
}

function removeRoundedBottom() {
  const roundedBottomLi = document.querySelector("#dropdown li.roundedBottom");
  if (roundedBottomLi) {
    roundedBottomLi.classList.remove("roundedBottom");
  }
}

// Ajouter un écouteur d'événement click sur le document
document.addEventListener("click", function (event) {
  if (dropdown.classList.contains("active")) {
    return;
  } else {
    // Vérifier si le clic a été déclenché à l'intérieur de l'élément dropdown ou de son élément ol
    if (
      !dropdown.contains(event.target) &&
      !dropdownList.contains(event.target)
    ) {
      active();
    }
  }
});