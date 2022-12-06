import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("response =>", response);

    const json = await response.json();
    console.log("json =>", json);

    if (!response.ok) {
      setError(json.msg);
      setIsLoading(false);
      return;
    }
    if (response.ok) {
      //save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json.token));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json.user });

      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
