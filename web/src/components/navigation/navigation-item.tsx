import Link from "next/link";

export const NavigationItem = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="flex items-center p-2 text-text rounded-lg hover:bg-muted"
  >
    <Icon className="w-5 h-5 mr-2" />
    {children}
  </Link>
);
