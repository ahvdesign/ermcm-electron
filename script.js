const slotListControls = document.querySelectorAll("[modal=slot-list]");
const slotListModal = document.querySelector(".slot-list");

for (let i = 0; i < slotListControls.length; i++) {
  let self = slotListControls[i];

  self.addEventListener("click", function (e) {
    e.preventDefault();

    if (slotListModal.classList.contains("open")) {
      slotListModal.classList.remove("open");
    } else {
      slotListModal.classList.add("open");
    }
  });
}

const slotNameControls = document.querySelectorAll("[modal=slot-name]");
const slotNameModal = document.querySelector(".slot-name");

for (let i = 0; i < slotNameControls.length; i++) {
  let self = slotNameControls[i];

  self.addEventListener("click", function (e) {
    e.preventDefault();

    if (slotNameModal.classList.contains("open")) {
      slotNameModal.classList.remove("open");
    } else {
      slotNameModal.classList.add("open");
    }
  });
}

const characterNameControls = document.querySelectorAll(
  "[modal=character-name]"
);
const characterNameModal = document.querySelector(".character-name");

for (let i = 0; i < characterNameControls.length; i++) {
  let self = characterNameControls[i];

  self.addEventListener("click", function (e) {
    e.preventDefault();

    if (characterNameModal.classList.contains("open")) {
      characterNameModal.classList.remove("open");
    } else {
      characterNameModal.classList.add("open");
    }
  });
}
