import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema(
  {
    teamUID: String,
    name: String,
    logo: String,
    // From API
    teamId: Number,
    killNum: Number,
    liveMemberNum: Number,
    // Calculations
    matchPoints: Number,
    totalTournamentPoints: Number,
  },
  { timestamps: true }
)

export const Team = mongoose.model('Team', teamSchema)

const playerSchema = new mongoose.Schema({
  playerUID: String,
  // From API
  uID: Number,
  playerName: String,
  teamId: Number,
  damage: Number,
  Knockouts: Number,
  headShotNum: Number,
  heal: Number,
  gotAirDropNum: Number,
  liveState: Number,
  killNumByGrenade: Number,
  surviceTime: Number,
  // Calculations
  totalKnockouts: Number,
  totalHeadShotNum: Number,
})

export const Player = mongoose.model('Player', playerSchema)

const infoSchema = new mongoose.Schema({
  GameTime: Number,
})

export const Info = mongoose.model('Info', infoSchema)

const matchSchema = new mongoose.Schema(
  {
    matchNumber: Number,
    matchName: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
)

export const Match = mongoose.model('Match', matchSchema)
