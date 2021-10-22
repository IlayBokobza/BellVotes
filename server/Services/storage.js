const fs = require('fs')

module.exports = class Storage{
    static updateSong(base64Data){
        console.log(base64Data)
        console.log(typeof base64Data)
        // const data = Buffer.from(base64Data,'base64')
        // fs.writeFileSync('../data/song.mp3',data)
    }

    static getSong(){
        return fs.readFileSync('../data/song.mp3').toString('base64')
    }
}