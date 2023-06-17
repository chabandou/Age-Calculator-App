const bDay = document.querySelector(".js-bDay");
const bMonth = document.querySelector(".js-bMonth");
const bYear = document.querySelector(".js-bYear");

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

let validationSuccess = false;
let calculatedYear = 0;
let calculatedMonth = 0;
let calculatedDay = 0;
const calculatedYearDisplay = document.querySelector(".js-cYear");
const calculatedMonthDisplay = document.querySelector(".js-cMonth");
const calculatedDayDisplay = document.querySelector(".js-cDay");

const calculate = document.querySelector(".arrow");

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-display");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error-display");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");
};

const validateDates = () => {
  let inputDay = parseInt(bDay.value);
  let inputMonth = parseInt(bMonth.value);
  let inputYear = parseInt(bYear.value);
  if (inputYear > currentYear) {
    setError(bYear, "Must be in the past");
  } else if (bYear.value === "") {
    setError(bYear, "This field is required");
  } else {
    setSuccess(bYear);
  }

  if (inputMonth > 12 || inputMonth === 0) {
    setError(bMonth, "Must be a valid month");
  } else if (bMonth.value === "") {
    setError(bMonth, "This field is required");
  } else {
    setSuccess(bMonth);
    if (inputMonth % 2 === 1) {
      if (inputDay > 31) {
        setError(bDay, "Must be a valid day");
      } else {
        setSuccess(bDay);
      }
    } else if (inputMonth % 2 === 0) {
      if (inputMonth === 2) {
        if (inputDay > 28) {
          setError(bDay, "Must be a valid date");
          setError(bMonth, "");
        } else {
          setSuccess(bMonth);
          setSuccess(bDay);
        }
      } else {
        if (inputDay > 30) {
          setError(bDay, "Must be a valid Date");
          setError(bMonth, "");
        } else {
          setSuccess(bMonth);
          setSuccess(bDay);
        }
      }
    }
  }

  if (bDay.value === "") {
    setError(bDay, "This field is required");
  } else if (inputDay === 0) {
    setError(bDay, "Must be a valid day");
  } else if (inputDay > 31) {
    setError(bDay, "Must be a valid day");
  }
  if (inputYear === currentYear && inputMonth > currentMonth) {
    setError(bMonth, "Must be in the past");
    setError(bYear, "");
  }
  if (inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay) {
    setError(bMonth, "");
    setError(bYear, "");
    setError(bDay, "Must be in the past");
  }
};

calculate.addEventListener("click", function () {
  validateDates();
  if (
    bDay.parentElement.querySelector(".error-display").innerText === "" &&
    bMonth.parentElement.querySelector(".error-display").innerText === "" &&
    bYear.parentElement.querySelector(".error-display").innerText === ""
  ) {
    validationSuccess = true;
  }

  let inputDay = parseInt(bDay.value);
  let inputMonth = parseInt(bMonth.value);
  let inputYear = parseInt(bYear.value);

  if (validationSuccess === true) {
    if (inputYear <= currentYear && inputMonth <= currentMonth && inputDay <= currentDay) {
        calculatedYear = currentYear - inputYear;
        calculatedMonth = currentMonth - inputMonth;
        calculatedDay = (currentDay - inputDay);

    } else if (inputYear <= currentYear && inputMonth < currentMonth && inputDay > currentDay ) {
        calculatedYear = currentYear - inputYear;
        calculatedMonth = currentMonth - (inputMonth + 1);
        if (inputMonth % 2 === 0) {
            if (inputMonth === 2) {
                calculatedDay = (currentDay - inputDay) + 28
            } else {
                caculatedDay = (currentDay - inputDay) + 30;
            }
        } else if (inputMonth % 2 === 1) {
            calculatedDay = (currentDay - inputDay) + 31
        }
    } else if (inputYear < currentYear && inputMonth > currentMonth && inputDay <= currentDay) {
        calculatedYear = currentYear - (inputYear + 1);
        calculatedMonth = (currentMonth - inputMonth) + 12;
        calculatedDay = (currentDay - inputDay);
    } else if (inputYear < currentYear && inputMonth > currentMonth && inputDay > currentDay) {
        calculatedYear = currentYear - (inputYear + 1);
        calculatedMonth = (currentMonth - (inputMonth + 1)) + 12;
        if (inputMonth % 2 === 0) {
            if (inputMonth === 2) {
                calculatedDay = (currentDay - inputDay) + 28
            } else {
                caculatedDay = (currentDay - inputDay) + 30;
            }
        } else if (inputMonth % 2 === 1) {
            calculatedDay = (currentDay - inputDay) + 31
        }
    }

    calculatedYearDisplay.innerHTML = calculatedYear;
    calculatedMonthDisplay.innerHTML = calculatedMonth;
    calculatedDayDisplay.innerHTML = calculatedDay;
  }
});
