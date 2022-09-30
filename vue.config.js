const path = require('path')

module.exports = {
    outputDir:path.resolve(__dirname,'./server/dist'),
    devServer: {
      proxy:{
        '^/api':{
          target:'http://localhost:3000',
          changeOrigin:true,
        }
      }
    },
    
}