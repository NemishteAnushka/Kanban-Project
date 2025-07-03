import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import TaskBoard from "../pages/Tasks/TaskBoard";
import PrivateRoute from "./PrivateRoute";
import { lazy, Suspense } from "react";

function AppRoute() {
  const MainLayout = lazy(() => import("../layout/MainLayout"));

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register/>}/>
      </Route>
     
        <Route element={
          <PrivateRoute>
             <Suspense fallback={<div>Loading layout...</div>}>
              <MainLayout />
            </Suspense>
          </PrivateRoute>
         }>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/tasks" element={<TaskBoard/>}/>
        </Route>
    </Routes>
  );
}

export default AppRoute;
