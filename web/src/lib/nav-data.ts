import { LayoutDashboard, Pen } from "lucide-react";
import { paths } from "../routes/paths";

export const navData = [
  {
    href: paths.dashboard.root,
    icon: LayoutDashboard,
    children: "Dashboard",
  },
  {
    href: paths.dashboard.createCourse,
    icon: Pen,
    children: "Create Course",
  },
];
