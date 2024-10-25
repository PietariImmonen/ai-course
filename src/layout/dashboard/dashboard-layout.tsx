import { Sidebar } from "@/components/navigation/side-nav";
import TopNav from "@/components/navigation/top-nav";
import { LayoutDashboard, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <Sidebar
          items={[
            { href: "/", icon: LayoutDashboard, children: "Dashboard" },
            { href: "/settings", icon: Settings, children: "Settings" },
          ]}
        />

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
