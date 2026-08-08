import { BrowserRouter,Route,Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DeveloperCardStack from './components/DeveloperCardStack/DeveloperCardStack';
import developers from "./utils/dummyDevs";
import Profile from "./components/Profile/Profile";
import EditDeveloperProfileModal from "./components/Profile/EditDeveloperProfileModal";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";

function App() {

  return (
    <div className="bg-[#070B18]">
       <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route index element={<DeveloperCardStack/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/profile-edit" element={<EditDeveloperProfileModal/>}></Route>
          <Route path="/connections" element={<Connections/>}></Route>
          <Route path="/requests" element={<ConnectionRequests/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
       </BrowserRouter>
    </div>  
  )
}

export default App;
