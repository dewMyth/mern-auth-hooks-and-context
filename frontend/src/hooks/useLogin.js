import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("response =>", response);

    const json = await response.json();

    console.log("json =>", json);

    const { token, user } = json;

    const payload = {
      token,
      user,
    };

    if (!response.ok) {
      setError(json.msg);
      setIsLoading(false);
      return;
    }
    if (response.ok) {
      //save the user to the local storage
      localStorage.setItem("user", JSON.stringify(user));

      //update the auth context
      dispatch({ type: "LOGIN", payload: user });

      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
