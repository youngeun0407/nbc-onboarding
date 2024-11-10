import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-400 text-white py-4 fixed top-0 left-0 right-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-6xl font-semibold">Onboarding</h1>
          <div className="space-x-4">
            <button
              onClick={() => handleNavigate("/login")}
              className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate("/signup")}
              className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition"
            >
              Signup
            </button>
            <button
              onClick={() => handleNavigate("/mypage")}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 transition"
            >
              MyPage
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 flex justify-center items-center h-screen bg-gray-50">
        <p className="text-3xl text-gray-700">환영합니다!</p>
      </main>
    </div>
  );
};

export default Home;
