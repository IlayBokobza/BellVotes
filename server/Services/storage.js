const fs = require('fs')
const path = require('path')

module.exports = class Storage{
    static folder = path.resolve(__dirname,'../data')

    static updateSong(base64Data){
        const data = Buffer.from(base64Data,'base64')
        fs.writeFileSync(`${this.folder}/song.mp3`,data)
    }

    static getSong(){
        return fs.readFileSync(`${this.folder}/song.mp3`).toString('base64')
    }
}