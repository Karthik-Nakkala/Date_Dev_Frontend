import { BrowserRouter,Route,Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import DeveloperCardStack from './components/DeveloperCardStack/DeveloperCardStack';
import developers from "./utils/dummyDevs";
import Profile from "./components/Profile/Profile";
import EditDeveloperProfileModal from "./components/Profile/EditDeveloperProfileModal";
import Connections from "./components/Connections";

function App() {

  return (
    <div className="bg-[#070B18]">
       <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/feed" element={<DeveloperCardStack/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/profile-edit" element={<EditDeveloperProfileModal/>}></Route>
          <Route path="/connections" element={<Connections/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}/>
          
        </Routes>
       </BrowserRouter>
    </div>  
  )
}

export default App;
