"use client";
import React from "react";

import { Button } from "../ui/button";

import ProfileDropdown from "./profile-dropdown";
import { LayoutDashboard, Menu, Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Sidebar } from "./side-nav";

const TopNav: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-64"
              aria-describedby={undefined}
            >
              <SheetTitle className="hidden">Navigation</SheetTitle>
              <SheetDescription id="sidebar-description" className="hidden">
                Navigation menu for mobile devices
              </SheetDescription>

              <Sidebar
                isMobile={true}
                items={[
                  {
                    href: "/",
                    icon: LayoutDashboard,
                    children: "Dashboard",
                  },
                  {
                    href: "/settings",
                    icon: Settings,
                    children: "Settings",
                  },
                ]}
              />
            </SheetContent>
          </Sheet>
          <h1 className="ml-4 text-xl font-semibold">My App</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <ProfileDropdown />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
