const container = document.querySelector('.container')
const title = document.querySelector('h1')

let teams = []

setInterval(() => {
  fetch('/get-teams')
    .then((response) => response.json())
    .then((teams) => {
      console.clear()
      console.log(teams)
    })
}, 1000)
