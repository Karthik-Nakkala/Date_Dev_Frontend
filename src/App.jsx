import { BrowserRouter,Route,Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import DeveloperCardStack from './components/DeveloperCardStack/DeveloperCardStack';
import developers from "./utils/dummyDevs";

function App() {

  return (
    <div className="bg-[#070B18]">
       <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/feed" element={<DeveloperCardStack developers={developers}/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}/>
          
        </Routes>
       </BrowserRouter>
    </div>  
  )
}

export default App;
