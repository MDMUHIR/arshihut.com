export const apiBase = "https://xyz.deshori.deshori.com/";

export const fetchApiData = async (
  endPoint = "",
  params = {},
  requestType = "GET"
) => {
  try {
    const request = {
      method: requestType.toUpperCase(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    };

    if (
      requestType.toUpperCase() === "POST" ||
      requestType.toUpperCase() === "PUT"
    ) {
      request.body = JSON.stringify(params);
    }

    const res = await $fetch(apiBase + endPoint, request);
    const response = await res;
    return response;
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
};

export const fetchUploadApi = async (endPoint = "", params = {}) => {
  const axios = useNuxtApp().$axios;
  const auth = useAuthStore();
  const token = auth.getUserToken();

  // console.log(auth.getUserToken());
  const res = await axios.post(apiBase + endPoint, params, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await res.data;
  return response;
};

export const fetchAuthorizedApi = async (
  endPoint = "",
  params = {},
  requestType = "GET"
) => {
  const auth = useAuthStore();
  const token = auth.getUserToken();
  try {
    const request = {
      method: requestType.toUpperCase(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (
      requestType.toUpperCase() === "POST" ||
      requestType.toUpperCase() === "PUT"
    ) {
      request.body = JSON.stringify(params);
    }

    const res = await $fetch(apiBase + endPoint, request);
    const response = await res;
    return response;
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
};
