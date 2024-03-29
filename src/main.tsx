import store, { persistor } from '@/redux/store.tsx';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import '@/style/main.sass';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);