// Get variables
const form = document.querySelector(".form");
const fieldName = document.querySelector('input[name="name"]');
const fieldEmail = document.querySelector('input[name="email"]');
const fieldPhoneOne = document.querySelector('input[name="phoneOne"]');
const fieldPhoneTwo = document.querySelector('input[name="phoneTwo"]');

// Fields
const name = document.querySelector(".name span");
const email = document.querySelector(".email span");
const phoneOne = document.querySelector(".phoneOne span");
const phoneTwo = document.querySelector(".phoneTwo span");

// Details
const nothingContent = document.querySelector(".hint");
const detailsUser = document.querySelector(".contentFields");
const alert = document.querySelector(".alertSucess");

// Masks
const maskPhoneOne = IMask(fieldPhoneOne, {
  mask: "(00) 0000-0000",
});

const maskPhoneTwo = IMask(fieldPhoneTwo, {
  mask: "(00) 0000-0000",
});

// Adds a listener for the "submit" event.
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Sets fields
  setFields();

  // Clean inputs
  resetFields();

  // Show alert
  showAlert();

  // Show details
  nothingContent.classList.add("hd");
  detailsUser.classList.remove("hd");
});

// Functions
function setFields() {
  name.innerHTML = fieldName.value;
  email.innerHTML = fieldEmail.value;
  phoneOne.innerHTML = fieldPhoneOne.value;

  // Validation field
  if (fieldPhoneTwo.value == "") {
    phoneTwo.classList.add("none");
    phoneTwo.innerHTML = "Não informado";
  } else {
    phoneTwo.innerHTML = fieldPhoneTwo.value;
  }
}

function resetFields() {
  fieldName.value = "";
  fieldEmail.value = "";
  fieldPhoneOne.value = "";
  fieldPhoneTwo.value = "";
}

function showAlert() {
  alert.style.opacity = "1";

  setTimeout(function () {
    alert.style.opacity = "0";
  }, 3000);
}

function setContent(data) {
  // Hidden loader
  document.querySelector(".loaderContainer").classList.add("hd");

  data.forEach((value) => {
    const carousel = document.querySelector(".swiper-wrapper");
    const container = document.createElement("div");
    const img = document.createElement("img");

    container.classList.add("swiper-slide");
    img.classList.add("imgCarousel");

    img.setAttribute("src", value.download_url);
    img.setAttribute("alt", value.author);

    container.appendChild(img);
    carousel.appendChild(container);
  });

  // Init Swipper
  const swiper = new Swiper(".swiper-container", {
    loop: false,
    direction: "horizontal",
    transitionTime: 200,

    slidesPerView: 1,
    spaceBetween: 5,

    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },

    navigation: {
      nextEl: ".pagination-nextEl",
      prevEl: ".pagination-prevEl",
    },
  });
}

function setLoader() {
  const containerLoader = document.createElement("div");
  const loader = document.createElement("div");

  containerLoader.classList.add("loaderContainer");
  loader.classList.add("loader");

  containerLoader.appendChild(loader);
  document.querySelector(".swiper-container").appendChild(containerLoader);
}

setLoader();

// Api
fetch(
  "https://employeeregistrationapi.herokuapp.com/list" ??
    "http://localhost:3333/list"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    setContent(data);
  })
  .catch(function (error) {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
  });
