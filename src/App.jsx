import { useLayoutEffect, useState } from "react";
import "./App.css";
import { AllRoutes } from "./Components/AllRoutes";
import webSocket from "./Utils/socket";

function App() {
  return (
    <AllRoutes />
  );
}

export default App;
