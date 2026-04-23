import logo from "../images/logo.svg";
import avatar from "../images/spots-images/avatar.jpg";
import pencil from "../images/pencil.svg";
import plus from "../images/plus.svg";

import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers";
import { resetValidation } from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { data } from "autoprefixer";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4956776f-b7fc-44b0-a4c7-0f7684938891",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    const profileAvatar = document.querySelector(".profile__avatar");
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");

    profileAvatarEl.src = userInfo.avatar;
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
  })
  .catch(console.error);

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector("#profile-name");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description",
);
const editProfileForm = document.forms["editProfileForm"];
const newPostForm = document.forms["newPostForm"];
const newPostModal = document.querySelector("#new-post-modal");
const newPostTitleInput = document.querySelector("#post-title");
const newPostLinkInput = document.querySelector("#post-link");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// Avatar form elements
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarLinkInput = document.querySelector("#avatar-link");
const editAvatarForm = document.forms["editAvatarForm"];
const profileAvatarEl = document.querySelector(".profile__avatar");

// Delete form elements
const deleteCardModal = document.querySelector("#delete-modal");
const deleteCardCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteCardConfirmBtn =
  deleteCardModal.querySelector(".modal__delete-btn");
const deleteCardCancelBtn = deleteCardModal.querySelector(".modal__cancel-btn");
const deleteForm = document.forms["deleteForm"];
deleteForm.addEventListener("submit", handleDeleteSubmit);

editAvatarBtn.addEventListener("click", function () {
  editAvatarLinkInput.value = profileAvatarEl.src;
  openModal(editAvatarModal);
  resetValidation(editAvatarForm, [editAvatarLinkInput], settings);
});

editAvatarCloseBtn.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

deleteCardCloseBtn.addEventListener("click", function () {
  closeModal(deleteCardModal);
});

deleteCardCancelBtn.addEventListener("click", function () {
  closeModal(deleteCardModal);
});

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Saving...", "Save");
  api
    .editUserAvatar({ avatar: editAvatarLinkInput.value })
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(submitBtn, false, "Saving...", "Save"));
}

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewModalTitle = previewModal.querySelector(".modal__caption");

// Card elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
let selectedCard;
let selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardEl = cardElement.querySelector(".card");
  const cardTitleEl = cardEl.querySelector(".card__title");
  const cardImageEl = cardEl.querySelector(".card__image");
  const cardLikeBtnEl = cardEl.querySelector(".card__like-btn");

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;


cardLikeBtnEl.addEventListener("click", () => {
  const isCurrentlyLiked = cardLikeBtnEl.classList.contains('cardLikeBtnEl');

  api.changeLikeStatus(data._id, isCurrentlyLiked)
    .then(() => {
      // Only update UI after successful response
      if (isCurrentlyLiked) {
        cardLikeBtnEl.classList.remove('card__like-btn_active');
      } else {
        cardLikeBtnEl.classList.add('card__like-btn_active');
      }
    })
    .catch((err) => {
      console.error('Error changing like status:', err);
    });
});

  const cardDeleteBtnEl = cardEl.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardEl, data);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewModalTitle.textContent = data.name;
    openModal(previewModal);
  });

  return cardEl;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", closeOnOverlay);
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", closeOnOverlay);
  document.removeEventListener("keydown", handleEscape);
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteCardModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Deleting...", "Delete");
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(submitBtn, false, "Deleting...", "Delete"));
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  );
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

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Saving...", "Save");

  // Instead of immediately creating the card, send to server first
  api
    .addCard(inputValues)
    .then((newCardData) => {
      // Only create and add card after successful server response
      const cardElement = getCardElement(newCardData);
      cardsList.prepend(cardElement);

      newPostForm.reset();
      disableButton(evt.submitter, settings);
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => setButtonText(submitBtn, false, "Saving...", "Save"));
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  // change text content to Saving
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Saving...", "Save");

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(submitBtn, false, "Saving...", "Save"));
}

//todo implement loading text for all other form submissions

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

enableValidation(settings);
