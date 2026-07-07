import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f8fc]">
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-50 h-full">
              <Sidebar />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <section className="p-4 sm:p-6 lg:p-8">{children}</section>
        </main>
      </div>
    </div>
  );
}