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

export const getTeamData = async () => {
  const res = await axios.get(`${apiServer}${teamsEndPoint}`)
  const teams = res.data

  teams.forEach(async (team) => {
    await Team.findOneAndUpdate(
      { teamId: team.teamId },
      {
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
