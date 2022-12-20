import { Route, Routes } from "react-router-dom";
import { LoginComp } from "./Auth/Login";
import { RegisterComp } from "./Auth/Registration";
import { HomeComp } from "./Home";
import { MeetingComp } from "./MeetingPage";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeComp />}></Route>
        <Route path="/meeting" element={<MeetingComp />}></Route>
        <Route path="/register" element={<RegisterComp />}></Route>
        <Route path="/login" element={<LoginComp />}></Route>
      </Routes>
    </>
  );
};
