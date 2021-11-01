const fs = require('fs')
const path = require('path')

module.exports = class Storage{
    static folder = path.resolve(__dirname,'../data')

    static updateSong(base64Data){
        if(!base64Data) return;

        const data = Buffer.from(base64Data,'base64')
        fs.writeFileSync(`${this.folder}/song.mp3`,data)
    }

    static getSong(){
        return fs.readFileSync(`${this.folder}/song.mp3`).toString('base64')
    }

    static updateDate(){
        fs.writeFileSync(`${this.folder}/lastUpdate.txt`,Date.now().toString())
    }

    static getDate(){
        return fs.readFileSync(`${this.folder}/lastUpdate.txt`).toString()
    }

}