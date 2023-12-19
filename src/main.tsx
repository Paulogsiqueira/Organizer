import store from '@/redux/store.tsx'
import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.tsx'
import '@/style/main.sass'
import { Provider} from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);