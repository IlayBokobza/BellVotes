const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const {getVideoDurationInSeconds} = require('get-video-duration')
ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH)

module.exports = class ProccessVideo{
    id;
    startingTime;
    startingTimeInSeconds;

    constructor(id,starting=""){
        this.id = id
        this.startingTime = starting

        //get seconds from time
        let [minutes,seconds] = starting.split(':')
        minutes = parseInt(minutes)
        seconds = parseInt(seconds)
        this.startingTimeInSeconds = minutes*60 + seconds
    }

    async checkVideoLength(stream){
        const videoLengh = await getVideoDurationInSeconds(stream)
        return videoLengh-10 > this.startingTimeInSeconds
    }

    static checkForTempFolder(){
        if(!fs.existsSync('../temp')){
            fs.mkdirSync('../temp')
        }
    }

    async getBellFromVideo(){
        return new Promise(async (resolve,reject) => {
            try {
                console.log(chalk.bgCyan('Getting song'))
                let stream = ytdl(`https://www.youtube.com/watch?v=${this.id}`);
                
                const isTimeStampValid = await this.checkVideoLength(stream)
                if(!isTimeStampValid){
                    console.log(chalk.bgRed('Error the timestamp was invalid'))
                    reject('זמן הצילצול גדול מדי')
                    return
                }
                
                const p = ffmpeg({source:stream})
                ProccessVideo.checkForTempFolder()
                const filename = Math.random().toString(36).substring(2, 15)
                const filepath = path.resolve(__dirname,`../temp/${filename}.mp3`)
                let isDone = false
                
                p.save(filepath)
                .setStartTime(`00:${this.startingTime}`).setDuration('10')
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
            } catch (error) {
                reject(error)
            }
        })
    }
}