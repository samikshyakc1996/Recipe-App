import Pages from "./pages/Pages";
import Category from "./components/Category";
import "./index.css";
import {BrowserRouter} from 'react-router-dom'
import Cuisine from "./pages/Cuisine";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Search/>
         <Category/>
         <Pages/>
         <Cuisine/>
         
     </BrowserRouter>
    </div>
  );
}

export default App;
