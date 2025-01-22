// store/index.js
import { createStore } from 'vuex'
import cameras from './modules/cameras'

export default createStore({
  modules: {
    cameras
  }
})