import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import init from './components/App.jsx';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

app();
