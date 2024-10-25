"use client";

import { useAuthContext } from "../../hooks/use-auth-context";

const Page = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-4">
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  );
};
export default Page;
