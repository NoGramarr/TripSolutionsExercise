import Vue from 'vue';
import Vuetify, {
  VBtn,
  VSelect,
  VSlideXTransition,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  comments: {
    VBtn,
    VSelect,
    VSlideXTransition,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#077d01',
        secondary: '#c5ffc2',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
