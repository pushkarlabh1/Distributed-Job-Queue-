import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use environment variable for API URL, fallback to proxy path
const API_URL = import.meta.env.VITE_API_URL || "/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include' // Important for cookie-based auth
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
