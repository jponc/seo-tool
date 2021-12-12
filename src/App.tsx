import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryJobsProvider } from "./contexts/QueryJobsContext";
import { DashboardScreen } from "./screens/DashboardScreen/DashboardScreen";
import { QueryJobScreen } from "./screens/QueryJobScreen/QueryJobScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { QueryJobProvider } from "./contexts/QueryJobContext";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <QueryJobsProvider>
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route
              path="/query-jobs/:id"
              element={
                <QueryJobProvider>
                  <QueryJobScreen />
                </QueryJobProvider>
              }
            />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </QueryJobsProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
