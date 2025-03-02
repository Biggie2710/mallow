import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
