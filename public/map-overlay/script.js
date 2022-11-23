const container = document.querySelector('.container')
const title = document.querySelector('h1')
const tableContainer = document.createElement('div')
tableContainer.classList.add('table-container')
container.append(tableContainer)
const tableElements = []

const createTable = async () => {
  const getTeams = await fetch('/get-teams')
  const teams = await getTeams.json()
  teams.forEach((team, index) => {
    const teamElements = {}
    const row = document.createElement('div')
    row.classList.add(`row-${index + 1}`)
    row.classList.add('row')
    tableContainer.append(row)
    const teamRank = document.createElement('p')
    teamRank.classList.add('team-rank')
    row.append(teamRank)
    teamElements.teamRank = teamRank
    const teamLogo = document.createElement('img')
    teamLogo.classList.add('team-logo')
    row.append(teamLogo)
    teamElements.teamLogo = teamLogo
    const teamName = document.createElement('p')
    teamName.classList.add('team-name')
    row.append(teamName)
    teamElements.teamName = teamName
    const teamPts = document.createElement('p')
    teamPts.classList.add('team-pts')
    row.append(teamPts)
    teamElements.teamPts = teamPts
    const aliveContainer = document.createElement('div')
    aliveContainer.classList.add('alive-container')
    row.append(aliveContainer)
    for (let index = 0; index < team.players.length; index++) {
      const playerAlive = document.createElement('div')
      playerAlive.classList.add('player-alive')
      aliveContainer.append(playerAlive)
    }
    tableElements.push(teamElements)
  })
  console.log(tableElements)
}

const refreshTable = async () => {
  const getTeams = await fetch('/get-teams')
  const teams = await getTeams.json()

  tableElements.forEach((teamElement, index) => {
    teamElement.teamLogo.src = teams[index].logo
    teamElement.teamName.innerText = teams[index].name
  })
}

createTable()
refreshTable()

setInterval(() => {
  refreshTable()
}, 1000)
