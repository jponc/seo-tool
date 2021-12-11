import React, { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  accessToken: string | undefined;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FunctionComponent = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  // Pull access token from localstorage on mount
  useEffect(() => {
    // For now set some random token as the endpoints doesn't validate the request
    setAccessToken("some-bogus-access-token");
  }, []);

  const contextValue = {
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
