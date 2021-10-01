const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH)

const getSong = (id,starting) => {
    return new Promise((resolve,reject) => {
        console.log(chalk.bgCyan('Getting song'))
        let stream = ytdl(`https://www.youtube.com/watch?v=${id}`);
        const p = ffmpeg({source:stream})
        const filename = Math.random().toString(36).substring(2, 15)
        const filepath = path.resolve(__dirname,`../temp/${filename}.mp3`)
        let isDone = false
        
        p.save(filepath)
        .setStartTime(`00:${starting}`).setDuration('10')
        .on('error',(e) => {
            reject(e)
            console.log(e)
        })
        .on('start',() => {
            console.log(chalk.bgCyan('Converting and cutting song'))
        })
        .on('end',() => {
            if(isDone) return
            isDone = true

            const songData = fs.readFileSync(filepath).toString('base64')
            fs.rmSync(filepath)

            console.log(chalk.bgBlue('DONE!'))

            resolve(songData)
        }).run()
    })
}

module.exports = getSong