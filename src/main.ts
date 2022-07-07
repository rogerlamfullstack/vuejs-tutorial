import { createApp } from 'vue'
import App from './App.vue'
import HelloWorldVue from './components/HelloWorld.vue'

const app  = createApp(App);
app.mount('#app');

app.component('TodoDeleteButton', HelloWorldVue)

app.config.errorHandler = (err: any) => {
    /* handle error */
    console.log("Error handler:" + err);
}
