const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#forecast-display-1");
const message2 = document.querySelector("#forecast-display-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
          message2.textContent = "";
          return;
        }
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      });
    }
  );
});
