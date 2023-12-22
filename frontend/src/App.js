import { Route, Routes } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register}/>
      <Route path="/profile" />
      <Route path="*" />
    </Routes>
  );
}

export default App;
