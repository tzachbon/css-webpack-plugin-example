import { createApp } from 'vue';
import App from './app.vue';

const root = document.createElement('div')
root.id = 'root'

document.body.appendChild(root);

createApp(App).mount('#root')