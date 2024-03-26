import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Users from './Pages/Users/Users';
import SenderPosts from './Pages/SenderPost/SenderPosts';
import TravellerPosts from './Pages/TravelerPost/TravellerPosts';
import SignIn from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Home";
import Review from "./Pages/Review/Review";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />

        <Route path="/users" element={<Users />} />
        <Route path="/TravelerPosts" element={<TravellerPosts />} />
        <Route path="/SenderPosts" element={<SenderPosts />} />
        <Route path="/Reviews" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;