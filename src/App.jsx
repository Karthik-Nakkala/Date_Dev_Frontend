import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import DeveloperCardStack from "./components/DeveloperCardStack/DeveloperCardStack";
import Profile from "./components/Profile/Profile";
import EditDeveloperProfileModal from "./components/Profile/EditDeveloperProfileModal";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store) => store.user);

  return (
    <BrowserRouter basename="/">
      {!user ? (
        <Landing />
      ) : (
        <div className="bg-[#070B18]">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<DeveloperCardStack />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route
                path="/profile-edit"
                element={<EditDeveloperProfileModal />}
              ></Route>
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/requests" element={<ConnectionRequests />}></Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
