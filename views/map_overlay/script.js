import { Match } from './files/schema.js'

const container = document.querySelector('.container')
const title = document.querySelector('h1')

const changeTitle = async () => {
  await Team.find({ teamId: 3 }).teamId
}
