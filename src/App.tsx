import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { FunctionComponent } from 'react';

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
