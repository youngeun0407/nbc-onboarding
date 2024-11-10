import { useState } from "react";
import { loginApi } from "../api/api";
import { useUserStore } from "../store/useUserStore"; // Zustand store import

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const setUser = useUserStore((state) => state.setUser); // Zustand의 setUser 함수

  const handleLogin = async () => {
    try {
      const response = await loginApi(id, password); // expiresIn 제거
      // 로그인 성공 후, 유저 정보를 Zustand에 저장
      setUser(
        response.userId,
        response.nickname,
        response.avatar,
        response.accessToken
      );
      setSuccessMessage("Login successful");
      setError("");
    } catch {
      setError("Login failed");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="User ID"
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
