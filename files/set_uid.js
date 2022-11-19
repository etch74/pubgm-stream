import { Team, Player, Info } from './schema.js'
import axios from 'axios'
import { nanoid } from 'nanoid'

let apiServer = 'http://localhost:3000/'

// END POINTS
// add .json in strings for local file
const teamsEndPoint = 'getteaminfolist.json'
const payersEndPoint = 'gettotalplayerlist.json'
const gameGlobalInfoEndPoint = 'getgameglobalinfo.json'
const circleInfoEndPoint = 'setcircleinfo.json'

export const setTeamUID = async () => {
  const res = await axios.get(`${apiServer}${teamsEndPoint}`)
  const teams = res.data

  teams.forEach(async (team) => {
    Team.insertMany({ teamUID: nanoid(12), teamId: team.teamId })
  })
}

export const setPlayerUID = async () => {
  const res = await axios.get(`${apiServer}${payersEndPoint}`)
  const players = res.data

  players.forEach(async (player) => {
    Player.insertMany({ playerUID: nanoid(12), uID: player.uID })
  })
}
