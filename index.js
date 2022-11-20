import mongoose from 'mongoose'
import * as getData from './files/get_data.js'
import * as setUID from './files/set_uid.js'
import express from 'express'
import { Match } from './files/schema.js'
import path from 'path'
import { fileURLToPath } from 'url'

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

app.use(express.static(path.join(__dirname, 'end_points')))
app.use(express.static(path.join(__dirname, 'views')))

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

app.get('/map-overlay', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/map_overlay/index.html'))
})

setInterval(() => {
  getData.getCircleInfo()
  getData.getPlayerData()
  getData.getTeamData()
}, 1000)
