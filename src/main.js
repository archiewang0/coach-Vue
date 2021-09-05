import { createApp ,defineAsyncComponent} from 'vue';


import router from './router';
import store from './store/index';
import App from './App';
import BaseCard from './components/UI/BaseCard';
import BaseButton from './components/UI/BaseButton';
import BaseBadge from './components/UI/BaseBadge';
import BaseSpinner from './components/UI/BaseSpinner';
// import BaseDialog from './components/UI/BaseDialog';

const BaseDialog = defineAsyncComponent(()=>{
    return import('./components/UI/BaseDialog')
})


const app = createApp(App)

app.use(router);
app.use(store);

// 在這裡引入 component 與或是在個別的component引入component
// 的差別 是一個為全域 一個為區塊 
// 全域引入的話 每個component 需要使用 直接使用tag 即可
// 區塊需要的話 需要再個別引入 才可以使用 tag
// 全域引入 通常使用在ui component 因為可能其他page 或是 ui component 會需要這個
// 如果像區塊每個都引入的話會
app.component('base-card',BaseCard);
app.component('base-button',BaseButton);
app.component('base-badge',BaseBadge);
app.component('base-spinner',BaseSpinner);
app.component('base-dialog',BaseDialog);


app.mount('#app');