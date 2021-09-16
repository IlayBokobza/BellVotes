import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const loadApp = () => {
  try{
    if(!window.gapi){
      throw new Error('no gappi')
    }

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  catch{
    setTimeout(loadApp,100)
  }
}
loadApp()