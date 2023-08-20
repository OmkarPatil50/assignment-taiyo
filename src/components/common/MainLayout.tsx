import React, { ReactNode } from "react";
import TopNavigation from "./TopNavigation";
import SideNavigation from "./SideNavigation";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="mx-4 my-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
