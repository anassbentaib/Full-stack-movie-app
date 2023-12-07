import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const Logout = () => {
    localStorage.clear("user");
    handleRedirect();
  };

  useEffect(() => {
    const token = user?.user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
    }
  }, [user]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.user && storedUser.user.accessToken) {
      const decodedToken = jwtDecode(storedUser.user.accessToken);
      const username = decodedToken?.sub;
      const roles = decodedToken?.roles;

      setUser({ ...storedUser, username, roles });
    }
  }, []);
  const handleRedirect = () => {
    window.location.assign("/register");
  };

  return { user, handleRedirect, Logout };
};
