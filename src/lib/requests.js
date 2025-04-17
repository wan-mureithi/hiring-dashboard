import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function makeRequest(options) {
  const { url, method = "GET", params, body, headers } = options;

  const config = {
    url,
    method,
    params,
    data: body,
    headers,
  };

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error("No response from server:", error.request);
      throw new Error("No response from server.");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error(error.message);
    }
  }
}

export async function fetchApplicants() {
  const res = await makeRequest({
    url: "/applicants",
    method: "GET",
  });
  return res.data;
}

export async function scoreBatchApplicants(n) {
  const res = await makeRequest({
    url: "/score/cvs",
    method: "POST",
    params: { n },
  });
  return res.data;
}

export async function scoreSingleApplicant(id) {
  const res = await makeRequest({
    url: `/score/cv/${id}`,
    method: "POST",
  });
  return res.data;
}

export async function runEloComparison() {
  const res = await makeRequest({
    url: "/elo/rank/random",
    method: "POST",
  });
  return res.data;
}
