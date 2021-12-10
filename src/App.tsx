import { Routes, Route } from "react-router-dom";
import { DashboardScreen } from "./screens/DashboardScreen/DashboardScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </div>
  );
};

export default App;
