import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryJobsProvider } from "./contexts/QueryJobsContext";
import { DashboardScreen } from "./screens/DashboardScreen/DashboardScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <QueryJobsProvider>
                <DashboardScreen />
              </QueryJobsProvider>
            }
          />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
