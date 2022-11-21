const container = document.querySelector('.container')
const title = document.querySelector('h1')
const tableContainer = document.createElement('div')
tableContainer.classList.add('table-container')
container.append(tableContainer)

const createTable = async () => {
  tableContainer.innerHTML = ''
  const getTeams = await fetch('/get-teams')
  const teams = await getTeams.json()
  teams.forEach((team, index) => {
    const row = document.createElement('div')
    row.classList.add(`row-${index + 1}`)
    row.classList.add('row')
    tableContainer.append(row)
    const teamRank = document.createElement('p')
    teamRank.classList.add(`team-${index + 1}-rank`)
    teamRank.classList.add('team-rank')
    row.append(teamRank)
    const teamLogo = document.createElement('img')
    teamLogo.classList.add(`team-${index + 1}-logo`)
    teamLogo.classList.add('team-logo')
    row.append(teamLogo)
    const teamName = document.createElement('p')
    teamName.classList.add(`team-${index + 1}-name`)
    teamName.classList.add('team-name')
    row.append(teamName)
    const teamPts = document.createElement('p')
    teamPts.classList.add(`team-${index + 1}-pts`)
    teamPts.classList.add('team-pts')
    row.append(teamPts)
    const aliveContainer = document.createElement('div')
    aliveContainer.classList.add(`alive-container-${index + 1}`)
    aliveContainer.classList.add('alive-container')
    row.append(aliveContainer)
    for (let index = 0; index < team.players.length; index++) {
      const playerAlive = document.createElement('div')
      playerAlive.classList.add(`player-${index + 1}-alive`)
      playerAlive.classList.add('player-alive')
      aliveContainer.append(playerAlive)
    }
  })
}

setInterval(async () => {
  createTable()
}, 1000)
