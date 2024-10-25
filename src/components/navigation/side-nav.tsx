import { NavigationItem } from "./navigation-item";

import { NavItem } from "@/types/NavItem";

export const Sidebar = ({
  items,
  isMobile = false,
}: {
  items: NavItem[];
  isMobile?: boolean;
}) => (
  <nav
    className={`${
      isMobile ? "lg:hidden" : "hidden lg:block"
    } w-64 h-full bg-white border-r border-gray-200`}
  >
    <div className="h-full px-3 py-4 overflow-y-auto">
      <ul className="space-y-2 font-medium">
        <li>
          {items.map((item) => (
            <NavigationItem key={item.href} {...item} />
          ))}
        </li>
      </ul>
    </div>
  </nav>
);
