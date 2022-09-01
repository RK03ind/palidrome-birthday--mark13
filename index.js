document.querySelector("main button").addEventListener("click", () => {
  const date = document.querySelector("input[type='date']").value;
  const dateArray = date.split("-");

  const dateObj = {
    day: dateArray[2],
    month: dateArray[1],
    year: dateArray[0],
  };

  let dateObjInNumber = {
    day: parseInt(dateArray[2]),
    month: parseInt(dateArray[1]),
    year: parseInt(dateArray[0]),
  };

  const dateInAllFormats = getAllDateFormats(dateObj);

  if (dateInAllFormats.some((item) => isPalindrome(item))) {
    return setMessage("The given date is palindrome.");
  }

  getNearestPalindromeDate(dateObjInNumber);
});

const setMessage = (msg) => {
  document.querySelector("main span").innerText = msg;
};

const getAllDateFormats = (date) => {
  const ddmmyyyy = date.day + date.month + date.year;
  const mmddyyyy = date.month + date.day + date.year;
  const mmddyy = date.month + date.day + date.year.slice(2);
  const yyddmm = date.year.slice(2) + date.day + date.month;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(2);
  console.log([ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm]);
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

const isPalindrome = (date) => {
  const reversedDate = date.split("").reverse().join("");
  if (reversedDate === date) {
    console.log(reversedDate + " " + date);
    return true;
  }
};

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

const getPreviousDate = ({ day, month, year }) => {
  const dayPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day - 1 === 0) {
    if (month === 3) {
      if (isLeapYear(year)) {
        return {
          day: 29,
          month: 02,
          year: year,
        };
      } else {
        return {
          day: 28,
          month: 02,
          year: year,
        };
      }
    } else if (month === 1) {
      return {
        day: 31,
        month: 12,
        year: year - 1,
      };
    } else {
      return {
        day: dayPerMonth[month - 2],
        month: month - 1,
        year: year,
      };
    }
  } else {
    return {
      day: day - 1,
      month: month,
      year: year,
    };
  }
};

const getNextDay = ({ day, month, year }) => {
  const dayPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day === dayPerMonth[month - 1] || (day === 29 && month === 2)) {
    if (month === 2 && isLeapYear(year) && day === 28) {
      return {
        day: 29,
        month: 2,
        year: year,
      };
    } else if (month === 12) {
      return {
        day: 1,
        month: 1,
        year: year + 1,
      };
    } else {
      return {
        day: 1,
        month: month + 1,
        year: year,
      };
    }
  } else {
    return {
      day: day + 1,
      month: month,
      year: year,
    };
  }
};

const convertDateToString = ({ day, month, year }) => {
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return {
    day: `${day}`,
    month: `${month}`,
    year: `${year}`,
  };
};

const getNearestPalindromeDate = (dateObj) => {
  let dayCounter = 0,
    dayCounter2 = 0;

  let nextDay = dateObj,
    previousDay = dateObj;

  //checking next day
  while (true) {
    nextDay = getNextDay(nextDay);
    dayCounter++;
    if (
      getAllDateFormats(convertDateToString(nextDay)).some((item) =>
        isPalindrome(item)
      )
    ) {
      break;
    }
  }

  //checking previous day
  while (true) {
    previousDay = getPreviousDate(previousDay);
    dayCounter2++;
    if (
      getAllDateFormats(convertDateToString(previousDay)).some((item) =>
        isPalindrome(item)
      )
    ) {
      break;
    }
  }

  if (dayCounter < dayCounter2) {
    setMessage(
      `You missed the nearest palindrome date ${nextDay.day}/${nextDay.month}/${nextDay.year} by ${dayCounter} days`
    );
  } else {
    setMessage(
      `You missed the nearest palindrome date ${previousDay.day}/${previousDay.month}/${previousDay.year} by ${dayCounter2} days`
    );
  }
};
