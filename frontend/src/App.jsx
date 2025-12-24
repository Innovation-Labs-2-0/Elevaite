import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import IdeathonPage from "./pages/Ideathon/IdeathonPage";
import PitchWall from "./pages/PitchWall";
import ProtectedRoutes from "./routes/ProtectedRoutes";
// import MyHubPage from "./pages/MyHub/MyHubPage";
// import Login from "./pages/Login";
// import Hackathon from "./pages/Hackathon";
// import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Layout> */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/ideathon" element={<IdeathonPage />} />
            <Route path="/pitch-wall" element={<PitchWall />} />
          </Route>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/my-hub" element={<MyHubPage />} /> */}
          {/* <Route path="/hackathon" element={<Hackathon />} /> */}
          {/* <Route path="/admin" element={<Admin />} /> */}
          {/* <Route path="/" element={<IdeathonPage />} /> */}
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      {/* </Layout> */}
    </Router>
  );
};

export default App;
