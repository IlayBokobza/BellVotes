# stops server
pm2 stop server/index.js

# updates server
cd /root/BellVotes
git pull origin master
npm i
npm run build

# starts server again
pm2 start server/index.js