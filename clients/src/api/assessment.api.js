// src/api/assessment.api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 15000
});

export const runAssessment = (payload) =>
  API.post("/api/assessment/run", payload); // ✅ MATCHES BACKEND
