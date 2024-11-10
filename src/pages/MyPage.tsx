import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { updateProfileApi } from "../api/api";

const MyPage = () => {
  const { userId, nickname, avatar, accessToken, setUser, clearUser } =
    useUserStore((state) => state);
  const navigate = useNavigate();

  const [newNickname, setNewNickname] = useState(nickname || "");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!accessToken) {
    navigate("/login");
    return <p>Redirecting to login...</p>;
  }

  const handleProfileUpdate = async () => {
    if (!userId) {
      setError("User is not logged in");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nickname", newNickname);
      if (newAvatar) {
        formData.append("avatar", newAvatar);
      }

      const response = await updateProfileApi(userId, formData, accessToken);
      setUser(
        response.userId,
        response.nickname,
        response.avatar,
        response.accessToken
      );
      setSuccessMessage("Profile updated successfully");
      setError("");
    } catch {
      setError("Profile update failed");
      setSuccessMessage("");
    }
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-6">My Page</h1>

        <div className="text-center mb-6">
          <img
            src={avatar || "/avatar-gray.svg"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium mb-2">User ID: {userId}</p>
          <p className="text-lg font-medium mb-4">Nickname: {nickname}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="New Nickname"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewAvatar(e.target.files ? e.target.files[0] : null)
            }
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleProfileUpdate}
            className="w-1/2 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
