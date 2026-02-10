const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  },
];

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector("#profile-name");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description");
const editProfileForm = document.forms["editProfileForm"];
const newPostForm = document.forms["newPostForm"];
const newPostModal = document.querySelector("#new-post-modal");
const newPostTitleInput = document.querySelector("#post-title");
const newPostLinkInput = document.querySelector("#post-link");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");


const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewModalTitle = previewModal.querySelector(".modal__title");

const cardTemplate = document
.querySelector("#card-template")
.content.querySelector(".card");
const cardsList = document.querySelector(".cards__list")

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const  cardTitleEl = cardElement.querySelector(".card__title");
  const  cardImageEl = cardElement.querySelector(".card__image");

cardImageEl.src = data.link;
cardImageEl.alt = data.name;
cardTitleEl.textContent = data.name;

const cardLikeBtnEl = cardElement.querySelector(".card__like-btn")
cardLikeBtnEl.addEventListener("click", () => {
  cardLikeBtnEl.classList.toggle("card__like-btn_active")
})

const cardDeleteBtnEL = cardElement.querySelector(".card__delete-btn");
cardDeleteBtnEL.addEventListener("click", () => {
cardElement.remove();
});

cardImageEl.addEventListener("click", () => {
  previewImageEl.src = data.link;
  previewImageEl.alt = data.name;
  previewModalTitle.textContent = data.name;
  openModal(previewModal);
})

return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

  function handleAddCardSubmit(evt) {
  evt.preventDefault();

    const inputValues = {
    name: newPostTitleInput.value,
    link: newPostLinkInput.value,
  };

  const cardElement = getCardElement(inputValues)
  cardsList.prepend(cardElement);

  closeModal(newPostModal);
};

newPostForm.addEventListener('submit', handleAddCardSubmit);


function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});