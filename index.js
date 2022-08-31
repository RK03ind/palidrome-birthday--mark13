document.querySelector("main button").addEventListener("click", () => {
  const date = document.querySelector("input[type='date']").value;
  const dateArray = date.split("-");

  const dateObj = {
    day: dateArray[2],
    month: dateArray[1],
    year: dateArray[0],
  };

  const dateInAllFormats = getAllDateFormats(dateObj);

  console.log(dateInAllFormats);
  if (dateInAllFormats.some((item) => isPalindrome(item))) {
    setMessage("The given date is palindrome.");
  }
});

const setMessage = (msg) => {
  document.querySelector("main span").innerText = msg;
};

const getAllDateFormats = (date) => {
  const ddmmyyyy = date.day + date.month + date.year;
  const mmddyyyy = date.month + date.day + date.year;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(2);
  const mmddyy = date.month + date.day + date.year.slice(2);
  const yyddmm = date.year.slice(2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

const isPalindrome = (date) => {
  const reversedDate = date.split("").reverse().join("");
  if (reversedDate === date) return true;
};
