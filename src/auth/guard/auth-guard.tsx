"use client";

import { useState, useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";
import { paths } from "@/routes/paths";

import { useAuthContext } from "@/hooks/use-auth-context";
import LoadingScreen from "@/components/loaders/loading-screen";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { authenticated, loading } = useAuthContext();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    // If not authenticated, redirect to login
    if (!authenticated) {
      const signInPath = paths.auth.login;
      const returnTo = pathname;
      const href = `${signInPath}?returnTo=${encodeURIComponent(returnTo)}`;
      router.replace(href);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading, pathname]);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
