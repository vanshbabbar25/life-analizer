import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
const UserContext = createContext();

export function UserProvider({children}){
    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);

  useEffect(() => {
  async function checkAuth() {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data); // backend should return the user object
    } catch (err) {
      console.error("Auth check failed:", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  checkAuth();
}, []);

async function login(credentials) {
  try {
    const res = await axiosInstance.post("/auth/login", credentials);
    console.log("Login response:", res.data); // check this

    localStorage.setItem("authToken", res.data.token);
localStorage.setItem("userEmail", res.data.user.email);
console.log("Token:", res.data.token);


    setUser(res.data.user);
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
}


    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }
    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
          {children}
        </UserContext.Provider>
    );
}
export function useUser() {
  return useContext(UserContext);
}