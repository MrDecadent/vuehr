import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {postRequest} from './utils/api';
import {postKeyValueRequest} from './utils/api';
import {deleteRequest} from './utils/api';
import {getRequest  } from './utils/api';
import {putRequest} from './utils/api';
import {initMenu} from './utils/menus';
import 'font-awesome/css/font-awesome.min.css';


Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

// from从哪来，to到哪去，next()执行
router.beforeEach((to,from,next) => {
  if(to.path == '/'){
    next();
  }else{
    initMenu(router,store);
    next();
  }
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
