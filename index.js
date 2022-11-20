import mongoose from 'mongoose'
import * as getData from './files/getData.js'
import * as setUID from './files/setUid.js'
import express from 'express'
import { Match, Team, Player, Info } from './files/schema.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { match } from 'assert'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()
app.listen(3000)

let tournamentName = 'pubgm'
let matchName = 'Pre-Finals'
const mongoDB = `mongodb://localhost:27017/${tournamentName}`

mongoose.connect(mongoDB).then(() => {
  console.log('CONNECTED')
})

app.use(express.static(path.join(__dirname, 'endPoints')))
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html' }))

const createMatch = async () => {
  const matchExist = await Match.findOne({ matchName })
  if (!matchExist) {
    setUID.setTeamUID()
  }
  await Match.findOneAndUpdate(
    { matchName: matchName },
    {
      matchName: matchName,
    },
    {
      new: true,
      upsert: true,
    }
  )
}

createMatch()

app.get('/', function (req, res) {
  res.send('Hello')
})

app.get('/get-teams', async function (req, res) {
  const teams = await Team.find({})
  res.send(teams)
})

app.get('/get-players', async function (req, res) {
  const players = await Player.find({})
  res.send(players)
})

app.get('/get-info', async function (req, res) {
  const info = await Info.find({})
  res.send(info)
})

setInterval(() => {
  getData.getCircleInfo()
  getData.getPlayerData()
  getData.getTeamData()
}, 1000)
