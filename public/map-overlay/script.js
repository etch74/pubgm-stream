const container = document.querySelector('.container')
const title = document.querySelector('h1')

fetch('/get-teams')
  .then((response) => response.json())
  .then((data) => console.log(data))
