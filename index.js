import mongoose from 'mongoose'
import * as getData from './files/get_data.js'
import * as setUID from './files/set_uid.js'
import express from 'express'
import { Match } from './files/schema.js'

const app = express()
app.listen(3000)

let tournamentName = 'pubgm'
let matchName = 'Pre-Finals'
const mongoDB = `mongodb://localhost:27017/${tournamentName}`

mongoose.connect(mongoDB).then(() => {
  console.log('CONNECTED')
})

// hello world

app.use(express.static('end_points'))

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

setInterval(() => {
  getData.getCircleInfo()
  getData.getPlayerData()
  getData.getTeamData()
}, 1000)

app.get('/', function (req, res) {
  res.send('Hello')
})
