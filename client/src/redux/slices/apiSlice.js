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
  prepareHeaders: (headers, { getState }) => {
    // Add any custom headers if needed
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Enhanced base query with error handling
const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    console.log("API Call Result:", args.url, result);

    if (result.error) {
      console.error("API Call Error:", args.url, result.error);
    }

    return result;
  } catch (error) {
    console.error("API Call Exception:", args.url, error);
    return { error: { status: 'CUSTOM_ERROR', data: 'Network error or request failed' } };
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
