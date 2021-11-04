const ytdl = require('ytdl-core')
// const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const chalk = require('chalk')
const axios = require('axios')
const path = require('path')
const {exec} = require('child_process')
// ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH)

module.exports = class ProccessVideo {
    id;
    startingTime;
    startingTimeInSeconds;

    constructor(id, starting = "") {
        this.id = id
        this.startingTime = starting.trim()

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

    async getBellFromVideo() {
        return new Promise(async(resolve, reject) => {
            try {
                const isTimeStampValid = await this.checkVideoLength()

                if (!isTimeStampValid) {
                    console.log(chalk.bgRed('Error the timestamp was invalid'))
                    reject('זמן הצילצול גדול מדי')
                    return
                }

                const filename = Math.random().toString(36).substring(2, 15)
                const uncutFilepath = path.resolve(__dirname, `../temp/${filename}.mp4`)
                const filepath = path.resolve(__dirname, `../temp/${filename}.mp3`)
                
                // const p = ffmpeg({ source: stream })
                // let isDone = false
                ProccessVideo.logProgress('Downloading song')
                let startingTimestamp = Date.now();
                
                ytdl(`https://www.youtube.com/watch?v=${this.id}`,{filter:'audioonly'})
                .pipe(fs.createWriteStream(uncutFilepath)).on('finish',() => {
                    console.log(chalk.bgBlue(`Finished downloading took ${(Date.now()-startingTimestamp)/1000} seconds`))
                    exec(`${process.env.FFMPEG_PATH} -ss 00:02:00 -i ${uncutFilepath} -ss 00:00:10 -t 00:00:10 -vn -acodec libmp3lame -ac 2 -ab 160k -ar 48000 ${filepath}`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            reject(error.message)
                            return;
                        }

                        const songData = fs.readFileSync(filepath).toString('base64')
                        fs.rmSync(uncutFilepath)
                        fs.rmSync(filepath)
                        
                        resolve(songData)
                    });
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}