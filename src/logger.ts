import fs from 'fs'
import path from 'path'

const pathHistoryFile = (path.resolve(__dirname + '../../history.log'))
var ws = fs.createWriteStream(pathHistoryFile)

export const log = (text: string) => {
  ws.write(text)
}
