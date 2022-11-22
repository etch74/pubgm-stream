import { Team, Player, Info } from './schema.js'
import axios from 'axios'
import * as config from './config.js'

let apiServer = 'http://localhost:3000/'

// END POINTS
// add .json in strings for local file
const teamsEndPoint = 'getteaminfolist.json'
const payersEndPoint = 'gettotalplayerlist.json'
const gameGlobalInfoEndPoint = 'getgameglobalinfo.json'
const circleInfoEndPoint = 'setcircleinfo.json'

export const getTeamData = async () => {
  const teamRes = await axios.get(`${apiServer}${teamsEndPoint}`)
  const teams = teamRes.data

  const playersRes = await axios.get(`${apiServer}${payersEndPoint}`)
  const players = playersRes.data

  teams.forEach(async (team, index) => {
    await Team.findOneAndUpdate(
      { teamId: team.teamId },
      {
        name: config.teamsNames[team.teamId],
        teamId: team.teamId,
        killNum: team.killNum,
        liveMemberNum: team.liveMemberNum,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    )
  })

  players.forEach(async (player) => {
    const playerTeam = player.teamId
    await Team.findOneAndUpdate(
      { teamId: playerTeam },
      { $pull: { players: player.uID } }
    )
  })
  players.forEach(async (player) => {
    const playerTeam = player.teamId
    await Team.findOneAndUpdate(
      { teamId: playerTeam },
      { $push: { players: player.uID } }
    )
  })
}
export const getPlayerData = async () => {
  const res = await axios.get(`${apiServer}${payersEndPoint}`)
  const players = res.data

  players.forEach(async (player) => {
    await Player.findOneAndUpdate(
      { uID: player.uID },
      {
        uID: player.uID,
        playerName: player.playerName,
        teamId: player.teamId,
        damage: player.damage,
        Knockouts: player.Knockouts,
        headShotNum: player.headShotNum,
        heal: player.heal,
        gotAirDropNum: player.gotAirDropNum,
        liveState: player.liveState,
        killNumByGrenade: player.killNumByGrenade,
        surviceTime: player.surviceTime,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    )
  })
}
export const getCircleInfo = async () => {
  const res = await axios.get(`${apiServer}${circleInfoEndPoint}`)
  const gameInfo = res.data
  const updateGameInfo = async () => {
    await Info.updateMany(
      {},
      {
        GameTime: gameInfo.GameTime,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    )
  }
  updateGameInfo()
}
