import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import * as Popper from "@popperjs/core";
import { update } from "lodash";

//Only parcel understand this//Automatically reload
if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////////////////////
////////////// ALERT - PAGE DOES NOT EXIST //////////////
/////////////////////////////////////////////////////////
document.querySelectorAll(".nav-link").forEach(function (el) {
  el.addEventListener("click", function () {
    alert(
      "Strona w przygotowaniu, przepraszamy za utrudnienia i zapraszamy wkrótce"
    );
  });
});

////////////////////////////////////////////////////////////
///////////////////// WEATHER API //////////////////////////
////////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  let long;
  let lat;
  let locationCountry = document.querySelector(".weather-country-code");
  let locationCity = document.querySelector(".weather-city-name");
  let temperatureDegree = document.querySelector(".weather-temperature");
  let temperatureSection = document.querySelector(
    ".weather-api-container span"
  );
  let temperatureDescription = document.querySelector(".weather-description");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ac4cd886a8a9e22cfa749a2bd871f9a9`;
      fetch(api)
        .then((response) => {
          //jeśli tylko weźmie info od fetcha to się zrobi ten .then
          return response.json();
        })
        .then((data) => {
          const temp = data.main.temp;
          const summary = data.weather[0].description;
          const country = data.sys.country;
          const city = data.name;
          let celcius = Math.floor(temp - 273.15);
          //set DOM elements from the API
          temperatureDegree.textContent = celcius;
          temperatureDescription.textContent = summary;
          locationCountry.textContent = country;
          locationCity.textContent = city;
          temperatureSection.textContent = "°C";
        });
    });
  } else {
    document.querySelector(".weather-api-container").innerHTML =
      "Musisz włączyć lokalizację";
  }
});

////////////////////////////////////////////////////////////
///////////////////// CURRENT TIME /////////////////////////
////////////////////////////////////////////////////////////

const displayTime = function () {
  let today = new Date();
  let currentHour = today.getHours();
  if (currentHour < 10) currentHour = "0" + currentHour;
  let currentMinute = today.getMinutes();
  if (currentMinute < 10) currentMinute = "0" + currentMinute;
  let currentSecond = today.getSeconds();
  if (currentSecond < 10) currentSecond = "0" + currentSecond;
  document.querySelector(".weather-container-current-time").innerHTML =
    currentHour + ":" + currentMinute + ":" + currentSecond;
  setTimeout(displayTime, 1000);
};
window.onload = displayTime;

/////////////////////////////////////////////////////////
/////////////////////// CALENDAR ////////////////////////
/////////////////////////////////////////////////////////
let today = new Date();
let currentYear = today.getFullYear();
let currentMonth =
  today.getMonth() + 1 <= 9
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1;
let currentDay = today.getDate() <= 9 ? "0" + today.getDate() : today.getDate();
let minDate = currentYear + "-" + currentMonth + "-" + currentDay;
//Overwrite input in html file, set min value
document.getElementById("deperture-date").setAttribute("min", minDate);
document.getElementById("arrival-date").setAttribute("min", minDate);
//assign departure date to variable
//const test2 = setDepartureDate;
function setDepartureDate() {
  departureDate = document.getElementById("deperture-date").value;
  return departureDate;
}
let departureDate;
document
  .getElementById("deperture-date")
  .addEventListener("change", setDepartureDate);
const test1 = showCalendar;
document.getElementById("deperture-date").onchange = test1;

function showCalendar() {
  //const showCalendar = document.getElementById("arrival-date");
  //showCalendar.classList.remove("hidden");
  document.getElementById("arrival-date").setAttribute("min", departureDate);
}
////////////////////////////////////////////////////////////
///////////////////// CURRENT DATE /////////////////////////
////////////////////////////////////////////////////////////

let currentDateApi = currentDay + "." + currentMonth + "." + currentYear;
document.querySelector(".weather-container-current-date").innerHTML =
  currentDateApi;

///////////////////////////////////////////////////////////
////////////////// LOG IN FORM OPEN ///////////////////////
///////////////////////////////////////////////////////////
const overlay = document.querySelector(".overlay");
const logIn = document.querySelector(".open-form-to-log-in");
const btnOpenLogInForm = document.querySelector(".log-in");
const btnCloseLogInForm = document.querySelector(".close-form-to-log-in");
//Open form
const openForm = function () {
  logIn.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//Close form
const closeForm = function () {
  logIn.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnOpenLogInForm.addEventListener("click", openForm);
btnCloseLogInForm.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);
document.addEventListener("keydown", function (b) {
  if (b.key === "Escape" && !logIn.classList.contains("hidden")) {
    closeForm();
  }
});

/////////////////////////////////////////////////////////////////////
////////////////////// LOG IN FROM JSON /////////////////////////////
/////////////////////////////////////////////////////////////////////

const hideLoginAndRegister = function () {
  document.querySelector(".log-in").classList.add("hidden");
  document.querySelector(".register").classList.add("hidden");
  document.querySelector(".message-log-in").classList.remove("hidden");
  document.querySelector(".log-out").classList.remove("hidden");
};

const logOut = function () {
  document.querySelector(".log-in").classList.remove("hidden");
  document.querySelector(".register").classList.remove("hidden");
  document.querySelector(".message-log-in").classList.add("hidden");
  document.querySelector(".log-out").classList.add("hidden");
  alert("Pomyślnie wylogowano");
};
const btnLogOut = document.querySelector(".log-out");
btnLogOut.addEventListener("click", logOut);

const btnLogin = document.querySelector(".confirm-log-in");
const inputLoginUsername = document.querySelector(".email-log-in");
const inputLoginPassword = document.querySelector(".password-log-in");
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  fetch("https://api.jsonbin.io/b/6145e0379548541c29b4506e/8")
    .then((res) => res.json())
    .then(function (data) {
      currentAccount = data.find(
        (acc) => acc.email === inputLoginUsername.value
      );

      if (currentAccount?.password === inputLoginPassword.value) {
        closeForm();
        hideLoginAndRegister();
      } else {
        alert("Niepoprawne dane logowania, spróbuj ponownie");
        return false;
      }

      //clear input fields
      inputLoginUsername.value = inputLoginPassword.value = "";
    });
});

///////////////////////////////////////////////////////////
/////////////// REGISTRATION FORM OPEN ////////////////////
///////////////////////////////////////////////////////////
const signIn = document.querySelector(".open-form-to-register");
const btnOpenSignInForm = document.querySelector(".register");
const btnCloseSignInForm = document.querySelector(".close-form-to-register");

//Open form
const openFormtoSignIn = function () {
  signIn.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//Close form
const closeFormtoSignIn = function () {
  signIn.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnOpenSignInForm.addEventListener("click", openFormtoSignIn);
btnCloseSignInForm.addEventListener("click", closeFormtoSignIn);
overlay.addEventListener("click", closeFormtoSignIn);
document.addEventListener("keydown", function (b) {
  if (b.key === "Escape" && !signIn.classList.contains("hidden")) {
    closeFormtoSignIn();
  }
});

/////////////////////////////////////////////////////////////////
////////////////////// CREATE INPUTS ////////////////////////////
/////////////////////////////////////////////////////////////////

const twoPassengers = document.querySelector(".pass-two");
const threePassengers = document.querySelector(".pass-three");
const fourPassengers = document.querySelector(".pass-four");

document.addEventListener("change", () => {
  document
    .getElementById("number-of-passengers-form")
    .addEventListener("input", handleSelect);
});

function handleSelect(e) {
  let select = e.target;
  if (select.value == 1) {
    twoPassengers.classList.add("hidden");
    threePassengers.classList.add("hidden");
    fourPassengers.classList.add("hidden");
    createOptionValues();
  }
  if (select.value == 2) {
    twoPassengers.classList.remove("hidden");
    threePassengers.classList.add("hidden");
    fourPassengers.classList.add("hidden");
    createOptionValues();
  }
  if (select.value == 3) {
    twoPassengers.classList.remove("hidden");
    threePassengers.classList.remove("hidden");
    fourPassengers.classList.add("hidden");
    createOptionValues();
  }
  if (select.value == 4) {
    twoPassengers.classList.remove("hidden");
    threePassengers.classList.remove("hidden");
    fourPassengers.classList.remove("hidden");
    createOptionValues();
  }
}

function createOptionValues() {
  let numberOfSeatsToSelect = `<option selected disabled value="">Wybierz l.pasażerów</option>`;
  for (let i = 1; i <= 19; i++) {
    numberOfSeatsToSelect =
      numberOfSeatsToSelect +
      `<option value="A${i}" class="seat-passenger-choose">A${i}</option>
      <option value="B${i}" class="seat-passenger-choose">B${i}</option>
      <option value="C${i}" class="seat-passenger-choose">C${i}</option>
      <option value="D${i}" class="seat-passenger-choose">D${i}</option>`;
  }
  document.querySelector(".passengers-seat").innerHTML = numberOfSeatsToSelect;
  document.querySelector(".passengers-seat-v2").innerHTML =
    numberOfSeatsToSelect;
  document.querySelector(".passengers-seat-v3").innerHTML =
    numberOfSeatsToSelect;
  document.querySelector(".passengers-seat-v4").innerHTML =
    numberOfSeatsToSelect;
}

/////////////////////////////////////////////////////////////////
///////////////////// OPEN PLANE IMAGE //////////////////////////
/////////////////////////////////////////////////////////////////

//SEATS CHOOSE WINDOW
const seatChoose = document.querySelector(".open-form-seat-choose");
const btnOpenSeatChoose = document.querySelector(".plane-map-seat-choose");
const btnCloseSeatChoose = document.querySelector(".close-form-seat-choose");

//Opens the map
const openFormToSeatChoose = function () {
  seatChoose.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//Closes the map
const closeFormToSeatChoose = function () {
  seatChoose.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnOpenSeatChoose.addEventListener("click", openFormToSeatChoose);
btnCloseSeatChoose.addEventListener("click", closeFormToSeatChoose);
overlay.addEventListener("click", closeFormToSeatChoose);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !seatChoose.classList.contains("hidden")) {
    closeFormToSeatChoose();
  }
});

////////////////////////////////////////////////////////////////
//////////////////////// VALIDATION ////////////////////////////
////////////////////////////////////////////////////////////////
const summaryButton = document.getElementById("summary-button");
summaryButton.addEventListener("click", function (e) {
  e.preventDefault();
  const departureCity = document.getElementById("departure-from").value;
  const arrivalCity = document.getElementById("departure-to").value;
  const departureDateInput = document.getElementById("deperture-date").value;
  const arrivalDateInput = document.getElementById("arrival-date").value;
  const numberOfPassengers = document.getElementById(
    "number-of-passengers-form"
  ).value;
  const typeOfLuggage = document.getElementById("luggage-choose").value;
  const chosenSeatOne = document.querySelector(".passengers-seat").value;
  let chosenSeatTwo = document.querySelector(".passengers-seat-v2").value;
  let chosenSeatThree = document.querySelector(".passengers-seat-v3").value;
  let chosenSeatFour = document.querySelector(".passengers-seat-v4").value;
  const departureHour = Math.floor(Math.random() * 10) + 5;
  //const arrivarHour = departureHour + 5;
  //const departureMinute = Math.floor(Math.random() * 59) + 1;

  if (departureCity == "") {
    alert("Wprowadź miejsce wylotu");
    return false;
  }
  if (arrivalCity == "") {
    alert("Wprowadź miejsce przylotu");
    return false;
  }
  if (departureDateInput == "") {
    alert("Wprowadź datę wylotu");
    return false;
  }
  if (arrivalDateInput == "") {
    alert("Wprowadź datę powrotu");
    return false;
  }
  if (numberOfPassengers == "") {
    alert("Wprowadź liczbę pasażerów");
    return false;
  }
  if (typeOfLuggage == "") {
    alert("Wprowadź rodzaj bagażu");
    return false;
  }
  if (chosenSeatOne == "") {
    alert("Wprowadź miejsce");
    return false;
  }
  if (numberOfPassengers == 2 && chosenSeatOne == chosenSeatTwo) {
    alert("Wprowadź różne miejsca");
    return false;
  }
  if (
    (numberOfPassengers == 3 && chosenSeatOne == chosenSeatTwo) ||
    chosenSeatOne == chosenSeatThree ||
    chosenSeatTwo == chosenSeatThree
  ) {
    alert("Wprowadź różne miejsca");
    return false;
  }
  if (
    (numberOfPassengers === 4 && chosenSeatOne == chosenSeatTwo) ||
    chosenSeatOne == chosenSeatThree ||
    chosenSeatTwo == chosenSeatThree ||
    chosenSeatOne == chosenSeatFour
  ) {
    alert("Wprowadź różne miejsca");
    return false;
  }
  if (departureDateInput > arrivalDateInput) {
    alert("Data wylotu musi być wcześniejsza niż data powrotu");
    return false;
  }
  displaySummary();

  payForTickets();

  return true;
});

/////////////////////////////////////////////////////////////////////
/////////////////////// CURRENCY CALCULATOR /////////////////////////
/////////////////////////////////////////////////////////////////////

const currencyChosen = document.getElementById("currency");
const currencyAfterChange = document.getElementById("selected");
const valueOfCurrency = document.getElementById("currency-value");
valueOfCurrency.value = "";
currencyChosen.addEventListener("change", countCurrency);
function countCurrency() {
  fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currencyChosen.value}/?format=json/`
  )
    .then((resp) => resp.json())
    .then(function (data) {
      currencyAfterChange.innerHTML = `${
        valueOfCurrency.value
      }zł po przeliczeniu to:  
      ${(valueOfCurrency.value * data.rates[0].mid).toFixed(
        2
      )} ${currencyChosen.value.toUpperCase()}`;
    });
}

////////////////////////////////////////////////////////////////////
/////////////////////// DISPLAY SUMMARY ////////////////////////////
////////////////////////////////////////////////////////////////////

function displaySummary() {
  const departureCity = document.getElementById("departure-from").value;
  const arrivalCity = document.getElementById("departure-to").value;
  const departureDateInput = document.getElementById("deperture-date").value;
  const arrivalDateInput = document.getElementById("arrival-date").value;
  const numberOfPassengers = document.getElementById(
    "number-of-passengers-form"
  ).value;
  const typeOfLuggage = document.getElementById("luggage-choose").value;
  const chosenSeatOne = document.querySelector(".passengers-seat").value;
  let chosenSeatTwo = document.querySelector(".passengers-seat-v2").value;
  let chosenSeatThree = document.querySelector(".passengers-seat-v3").value;
  let chosenSeatFour = document.querySelector(".passengers-seat-v4").value;
  const departureHour = Math.floor(Math.random() * 10) + 5;
  const arrivarHour = departureHour + 5;
  const departureMinute = Math.floor(Math.random() * 59) + 1;
  document.getElementById(
    "summary-departure-city"
  ).innerHTML = `Wylot z: ${departureCity}`;
  document.getElementById(
    "summary-arrival-city"
  ).innerHTML = `Przylot do: ${arrivalCity}`;
  document.getElementById(
    "summary-departure-date"
  ).innerHTML = `Data wylotu: ${departureDateInput}`;
  document.getElementById(
    "summary-arrival-date"
  ).innerHTML = `Data powrotu: ${arrivalDateInput}`;
  document.getElementById(
    "summary-number-of-passengers"
  ).innerHTML = `Liczba pasażerów: ${numberOfPassengers}`;
  document.getElementById(
    "summary-luggage"
  ).innerHTML = `Bagaż: ${typeOfLuggage}`;
  document.getElementById(
    "summary-chosen-seat-one"
  ).innerHTML = `Miejsce: ${chosenSeatOne}`;
  if (chosenSeatTwo)
    document.getElementById(
      "summary-chosen-seat-two"
    ).innerHTML = `Drugie miejsce: ${chosenSeatTwo}`;
  if (chosenSeatThree)
    document.getElementById(
      "summary-chosen-seat-three"
    ).innerHTML = `Trzecie miejsce: ${chosenSeatThree}`;
  if (chosenSeatFour)
    document.getElementById(
      "summary-chosen-seat-four"
    ).innerHTML = `Czwarte miejsce: ${chosenSeatFour}`;
  document.getElementById(
    "summary-flight-time"
  ).innerHTML = `Znalezione loty: <br> Wylot o: ${
    departureHour < 10 ? "0" + departureHour : departureHour
  }:${
    departureMinute < 10 ? "0" + departureMinute : departureMinute
  }  Przylot o: ${arrivarHour < 10 ? "0" + arrivarHour : arrivarHour}:${
    departureMinute < 10 ? "0" + departureMinute : departureMinute
  }
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
  </label><br>
  Wylot o: ${departureHour + 6}:${
    departureMinute < 10 ? "0" + departureMinute : departureMinute
  }  Przylot o: ${departureHour + 9}:${
    departureMinute < 10 ? "0" + departureMinute : departureMinute
  } <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
  <label class="form-check-label" for="flexRadioDefault2">
  </label>`;
  let costOne = 400;
  let costTwo = 1600;
  let costThree = 100;

  if (arrivalCity === "Paryż")
    document.getElementById(
      "summary-costs"
    ).innerHTML = `Twój lot do ${arrivalCity}a kosztuje ${
      typeOfLuggage === "Płatny"
        ? `${
            numberOfPassengers > 2 ? costTwo / 2 : costThree * 3
          }zł łacznie z bagażem płatnym`
        : `${numberOfPassengers > 2 ? costOne * 3 : costThree * 3.5}zł`
    }`;
  if (arrivalCity === "Nowy Jork")
    document.getElementById(
      "summary-costs"
    ).innerHTML = `Twój lot do Nowego Jorku kosztuje ${
      typeOfLuggage === "Płatny"
        ? `${
            numberOfPassengers > 2 ? costTwo * 2 : costOne * 2
          }zł łacznie z bagażem płatnym`
        : `${numberOfPassengers > 2 ? costTwo * 3 : costOne * 2.5}zł`
    }`;
  if (arrivalCity === "Warszawa")
    document.getElementById(
      "summary-costs"
    ).innerHTML = `Twój lot do Warszawy kosztuje ${
      typeOfLuggage === "Płatny"
        ? `${
            numberOfPassengers > 2 ? costThree * 3 : costOne * 2
          }zł łacznie z bagażem płatnym`
        : `${numberOfPassengers > 2 ? costThree * 4 : costOne * 2.5}zł`
    }`;
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PAY FOR TICKETS //////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function payForTickets() {
  document.querySelector(
    ".pay-for-tickets"
  ).innerHTML = `<button class="btn btn-primary pay-for-the-tickets" id="pay-button" type="button">Zapłać za bilet</button>`;
  const btnPayForTicket = document.getElementById("pay-button");
  btnPayForTicket.addEventListener("click", function openAlertAndLogin(ev) {
    ev.preventDefault();
    if (!document.querySelector(".log-in").classList.contains("hidden")) {
      alert("Musisz się zalogować aby kupić bilet");
      openForm();
    } else {
      alert(
        "Zaraz zostaniesz przekierwoany na stronę banku. Dziękujemy za skorzystanie z usług naszych lini lotniczych"
      );
    }
  });
}

//////////////////////////////////// END ////////////////////////////////////
