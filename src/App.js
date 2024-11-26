import logo from './logo.svg';
import './App.css';
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./Routers";

function App() {
  return (
      <div>
          <Header></Header>
          <Routers></Routers>
          <Footer></Footer>
      </div>
  )
}

export default App;
