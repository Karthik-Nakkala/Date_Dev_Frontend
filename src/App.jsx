import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootHandler from "./components/RootHandler";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import DeveloperCardStack from "./components/DeveloperCardStack/DeveloperCardStack";
import Profile from "./components/Profile/Profile";
import EditDeveloperProfileModal from "./components/Profile/EditDeveloperProfileModal";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";

function App() {
  return (
    <div className="bg-[#070B18] min-h-screen">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<RootHandler />}>
            <Route index element={<DeveloperCardStack />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile-edit" element={<EditDeveloperProfileModal />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<ConnectionRequests />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
