import { AuthContextProvider } from './Contexts/AuthContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/adminRoom';


function App() {
  return (
   <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new/" component={NewRoom} />
          <Route path="/room/:id" component={Room} />

          <Route path="/admin/room/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
   </BrowserRouter>
  );
}

export default App;