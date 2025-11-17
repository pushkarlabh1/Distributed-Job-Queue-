import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * 🔥 FINAL FIX
 *
 * We ALWAYS build backend URLs as:
 *
 *   VITE_API_URL   +   "/api"
 *
 * Example:
 *   VITE_API_URL = https://jobqueue-backend.onrender.com
 *   API_URL becomes → https://jobqueue-backend.onrender.com/api
 *
 * ❗ "/api" must NEVER be inside Vercel env
 * ❗ VITE_API_URL must NEVER be a relative path
 */
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

console.log("🚀 USING BACKEND URL:", API_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include", // required for cookies / JWT
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
