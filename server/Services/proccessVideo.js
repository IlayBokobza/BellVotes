const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const chalk = require('chalk')
const axios = require('axios')
const path = require('path')
ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH)

module.exports = class ProccessVideo {
    id;
    startingTime;
    startingTimeInSeconds;

    constructor(id, starting = "") {
        this.id = id
        this.startingTime = starting

        //get seconds from time
        let [minutes, seconds] = starting.split(':')
        minutes = parseInt(minutes)
        seconds = parseInt(seconds)
        this.startingTimeInSeconds = minutes * 60 + seconds
    }

    static logProgress(msg) {
        console.log(chalk.bgCyan(msg))
    }

    async checkVideoLength() {
        ProccessVideo.logProgress('Checking video length')

        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${this.id}&key=${process.env.YOUTUBE_API}`)
        let time = data.items[0].contentDetails.duration + ''
        time = time.replace(/PT/, '')

        if (time.includes('H')) {
            const split = time.split('H')
            time = split[1]
            var hours = parseInt(split[0])
        } else {
            var hours = 0
        }

        if (time.includes('M')) {
            const split = time.split('M')
            time = split[1]
            var minutes = parseInt(split[0])
        } else {
            var minutes = 0
        }

        if (time.includes('S')) {
            const split = time.split('S');
            var seconds = parseInt(split[0])
        } else {
            var seconds = 0
        }

        // console.log({ hours, minutes, seconds })
        const timeInSeconds = hours * 60 * 60 + minutes * 60 + seconds

        return timeInSeconds - 10 > this.startingTimeInSeconds
    }

    static checkForTempFolder() {
        if (!fs.existsSync('../temp')) {
            fs.mkdirSync('../temp')
        }
    }

    async getBellFromVideo() {
        return new Promise(async(resolve, reject) => {
            try {
                ProccessVideo.logProgress('Getting song')
                const stream = ytdl(`https://www.youtube.com/watch?v=${this.id}`);
                const isTimeStampValid = await this.checkVideoLength()

                if (!isTimeStampValid) {
                    console.log(chalk.bgRed('Error the timestamp was invalid'))
                    reject('זמן הצילצול גדול מדי')
                    return
                }

                const p = ffmpeg({ source: stream })
                ProccessVideo.checkForTempFolder()
                const filename = Math.random().toString(36).substring(2, 15)
                const filepath = path.resolve(__dirname, `../temp/${filename}.mp3`)
                let isDone = false
                let startingTimestamp;

                p.save(filepath)
                    .setStartTime(`00:${this.startingTime}`).setDuration('10')
                    .on('error', (e) => {
                        reject(e)
                        console.log(e)
                    })
                    .on('progress', (a, b) => {
                        console.log('loading...')
                    })
                    .on('start', () => {
                        ProccessVideo.logProgress('Converting and cutting song')
                        startingTimestamp = Date.now()
                    })
                    .on('end', () => {
                        if (isDone) return
                        isDone = true

                        const songData = fs.readFileSync(filepath).toString('base64')
                        fs.rmSync(filepath)

                        ProccessVideo.logProgress('Done!')
                        ProccessVideo.logProgress(`Took ${(Date.now() - startingTimestamp)/1000} seconds.`)

                        resolve(songData)
                    }).run()
            } catch (error) {
                reject(error)
            }
        })
    }
}