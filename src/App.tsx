import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { FunctionComponent } from 'react';
import { PointsContextProvider } from './context/PointsContext.tsx';

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <PointsContextProvider child={<AppRouter />} />
    </BrowserRouter>
  );
};

export default App;
