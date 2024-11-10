// src/types/api.ts

// Post 타입 정의
export interface Post {
  id: number;
  title: string;
  body: string;
}

// 사용자 정보 타입 정의
export interface User {
  id: number;
  email: string;
  username: string;
  profileImage?: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  user: User;
}

// 회원가입 요청 타입
export interface SignupRequest {
  email: string;
  password: string;
}
