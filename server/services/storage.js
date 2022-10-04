const fs = require('fs')
const path = require('path')

module.exports = class Storage{
    static folder = path.resolve(__dirname,'../data')

    static createDataFolder(){
        if(!fs.existsSync(this.folder)){
            fs.mkdirSync(this.folder)
        }
    }

    static updateSong(base64Data){
        if(!base64Data) return;
        Storage.createDataFolder()
        
        const data = Buffer.from(base64Data,'base64')
        fs.writeFileSync(`${this.folder}/song.mp3`,data)
    }

    static getSong(){
        Storage.createDataFolder()
        return fs.readFileSync(`${this.folder}/song.mp3`).toString('base64')
    }

    static updateDate(){
        Storage.createDataFolder()
        fs.writeFileSync(`${this.folder}/lastUpdate.txt`,Date.now().toString())
    }

    static getDate(){
        Storage.createDataFolder()

        if(!fs.existsSync(`${this.folder}/lastUpdate.txt`)){
            Storage.updateDate()
        }

        return fs.readFileSync(`${this.folder}/lastUpdate.txt`).toString()
    }

    static doesSongExist(){
        return fs.existsSync(`${this.folder}/song.mp3`)
    }

}