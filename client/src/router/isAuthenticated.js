import api from "../helpers/api";
import Vue from "vue";

const isAuthenticated = async () => {
  try {
    const token = Vue.$cookies.get("token");
    const response = await api.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const user = response.data.data;
    return user;
  } catch (error) {
    console.log(error, "error");
  }
};

export default isAuthenticated;
