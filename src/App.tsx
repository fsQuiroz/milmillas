import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { FunctionComponent } from 'react';
import { PointsContextProvider } from './context';

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <PointsContextProvider>
        <AppRouter />
      </PointsContextProvider>
    </BrowserRouter>
  );
};

export default App;
