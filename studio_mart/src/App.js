import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Feature from './Screens/Feature';
import { CartProvider } from './components/contextReducer';
import Cart from './Screens/Cart';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './Screens/SignUp';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/feature" element={<Feature />} />
            <Route exact path="/createuser" element={<SignUp />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>


  );
}

export default App;
