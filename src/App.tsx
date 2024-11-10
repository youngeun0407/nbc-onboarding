import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인한 유저만 접근할 수 있는 라우트 */}
        <Route element={<PrivateRoute requiresAuth={true} />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* 로그인하지 않은 유저만 접근할 수 있는 라우트 */}
        <Route element={<PrivateRoute requiresAuth={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* 기본 메인 페이지 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
