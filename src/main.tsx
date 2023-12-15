import store from '@/redux/store.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/style/main.sass'
import { Provider} from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')!).render(

     <Provider store={store}>
          <App />
    </Provider>

)
