import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SideNav } from "./SideNav";
import { useAuth } from "../context/AuthContext";

export const Layout: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  // Define protected routes that should show the side navigation
  const protectedRoutes = [
    "/dashboard",
    "/my-events",
    "/my-dps",
    "/admin",
    "/templates",
  ];

  // Check if current route is a protected route
  const isProtectedRoute =
    isLoggedIn &&
    protectedRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-neutral flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Side Navigation - Only show on protected routes */}
        {isProtectedRoute && (
          <div className="hidden md:block">
            <SideNav
              isCollapsed={isSideNavCollapsed}
              setIsCollapsed={setIsSideNavCollapsed}
            />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto ${
            isProtectedRoute
              ? isSideNavCollapsed
                ? "md:ml-[80px]"
                : "md:ml-64"
              : ""
          }`}
        >
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer showSimplified={isProtectedRoute} />
    </div>
  );
};
