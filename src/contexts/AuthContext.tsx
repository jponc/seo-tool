import React, { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  accessToken: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FunctionComponent = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Pull access token from localstorage on mount
  useEffect(() => {
    // For now set some random token as the endpoints doesn't validate the request
    setAccessToken("some-bogus-access-token");
  }, []);

  // if access token changes, check if the user is now logged in / logged out
  useEffect(() => {
    if (accessToken === "") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [accessToken]);

  const contextValue = {
    isLoggedIn,
    accessToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
