import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// 로그인 API
export const loginApi = async (id: string, password: string) => {
  try {
    const url = `${API_URL}/login`;

    const response = await axios.post(url, {
      id,
      password,
    });

    return response.data; // 로그인 성공 시 { accessToken, userId, avatar, nickname }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};

// 회원가입 API
export const signupApi = async (
  id: string,
  password: string,
  nickname: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      id,
      password,
      nickname,
    });

    return response.data; // 서버에서 보내준 메시지를 반환
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
    throw new Error("An error occurred during signup");
  }
};

// 사용자 정보 가져오기 API (마이페이지용)
export const getUserInfoApi = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user info"
      );
    }
    throw new Error("Failed to fetch user info");
  }
};

// 사용자 정보 업데이트 API (마이페이지에서 닉네임, 프로필 이미지 변경)
export const updateProfileApi = async (
  userId: string,
  formData: FormData,
  accessToken: string
) => {
  try {
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch {
    throw new Error("Profile update failed");
  }
};
