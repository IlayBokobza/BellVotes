# BellVotes
### A system for bell voting.

## Requirements
[NodeJS v14](https://nodejs.org/en/blog/release/v14.17.3/)

A google OAuth2 client ID.

A google API key with access to the YouTube Data API v3.

A MongoDB instance.

An install of [ffmpeg](https://ffmpeg.org/).

## Setup

Clone the project.
```bash
git clone https://github.com/IlayBokobza/BellVotes.git
```
Install the dependencies.
```bash
npm install
```
Go to the server folder and copy the `config-example.js` file into a new file named `config.js`. Open `config.js` and config the app to your liking.

Here is an example of a config file.
```javascript
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
        youtubeApiKey:'your-api-key', //google api key with access to the youtube v3 api
        googleClientId:'your-client-id', //google oauth client id
        ffmpegPath:'C:/ffmpeg.exe', // path to ffmpeg install
    },
}
```
After you configured the app to your liking.
Go to `public/index.html` and configure the metadata to fit your needs.
```xml
<!-- metadata to change -->
<meta name="description" content="מערכת הצבעה לצילצול של פלך בנים">
<meta content="!הצביעו לצילצול הבא של פלך" property="og:title" />
<meta content="מערכת הצבעה לצילצול של פלך בנים" property="og:description" />
<meta content="https://vote.pelech.me" property="og:url" />
<meta content="#3a7ca5" data-react-helmet="true" name="theme-color" />
``` 
Once you finished run the build command.
```bash
npm run build
```
Now the app the ready to launch. To start the app run:
```bash
npm start
```

## Contribute
Feel free to create pull request and suggest features.

I even challenge you break my app and tell me how! I would love to know.