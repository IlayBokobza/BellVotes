//THIS IS AN EXAMPLE CONFIG
//please change this file's name to config.js
module.exports = {

    maxSongs:60, //The max songs allowed to be on te list
    repeatingSongs:true, //when a new cycle starts the songs from the previous one will remain
    port:3000, //the server port
    emailDomain:null, //email filter, only accepts emails from that domain, leave null to accept all email domains
    schoolName:'schoolName', //school name in english 
    hebSchoolName:'שם בית הספר', //school name in hebrew

    //app theme colors
    colors:{
        one:'#2f6690',
        two:'#d9dcd6',
        three:'#3a7ca5',
        four:'#81c3d7',
        five:'#16425b',
        highlight:'#ffd700',
    },

    //songs rules to show on the app
    rules:[
        "הקישור חייב להיות קישור לשיר",
        "השיר חייב להיות בעברית",
        "השיר חייב להיות ראוי",
        'עבירה על החוקים יכולה למנוע ממך מלשלוח עוד הצעות',
    ],
    
    //list of the admins' emails
    admins:[
        "admin1@gmail.com",
        "admin2@gmail.com",
        "admin3@yahoo.com",
    ],

    //external keys and paths
    external:{
        mongoPath:'mongodb://localhost:27017', //mongo url
        youtubeApiKey:'', //google api key with access to the youtube v3 api
        googleClientId:'', //google oauth client id
        ffmpegPath:'C:/ffmpeg.exe', // path to ffmpeg install
    },
}