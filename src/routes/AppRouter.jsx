import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout/Layout"; // your Ant Design layout component

// Lazy-loaded pages
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Sales = lazy(() => import("./pages/Sales"));
// const Products = lazy(() => import("./pages/Products"));
// const Layout = lazy(() => import("../components/Layout/Layout.jsx"));
const Layout = lazy(() => import("../components/Layout/NewLayout.jsx"));
const Login = lazy(() => import("../components/Login.jsx"));
const PublicHomePage = lazy(() => import("../components/PublicHomePage.jsx"));
const Signup = lazy(() => import("../components/NewSignUp.jsx"));
// const Signup = lazy(() => import("../components/SignUp.jsx"));
const ForgotPasswordFlow = lazy(() => import("../components/ForgotPass/ForgotPasswordFlow.jsx"));

const AppRouter = () => {
  // Example authentication state (replace with your real auth logic)
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes without layout */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
          <Route path="/admin" element={<Layout />} />

          {/* Protected routes with layout */}
          {/* <Route
            path="/admin"
            element={
              isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
            }
          > */}
            {/* <Route index element={<Dashboard />} />
            <Route path="sales" element={<Sales />} />
            <Route path="products" element={<Products />} /> */}
          {/* </Route> */}

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
