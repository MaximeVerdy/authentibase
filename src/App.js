import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Private from './pages/private/private';
import PrivateHome from './pages/private/privateHome/privateHome';

import { UserContextProvider } from './context/userContext';

function App() {
  return (

    <Router>
      <UserContextProvider>

        <SignUp />
        <SignIn />
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/private' element={<Private />} >
            <Route path='/private/private-home' element={<PrivateHome />} />
          </Route>
        </Routes>

      </UserContextProvider>
    </Router>

  );
}

export default App;
