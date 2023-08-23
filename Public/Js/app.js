console.log("Client side javascript file is loaded!");
//window.alert("Welcome");
// client side javascript
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
//messageOne.textContent = "From JavaScript"; // to give a paragraph a value and output it on web page

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // to stop the auto refresh when you click on button
  messageOne.textContent = "Loading..."; // to indicate that the server is response to button
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      // here we wait for json data that's for we use then
      response.json().then((data) => {
        // when the data is ready it will parse by default using json
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
