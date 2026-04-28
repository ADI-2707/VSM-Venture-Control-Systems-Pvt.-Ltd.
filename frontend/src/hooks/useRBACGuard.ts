"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { hasAccess } from "@/utils/rbac";

export function useRBACGuard() {
  const { user, authReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authReady) return;

    if (!user) {
      router.replace("/internal");
      return;
    }

    if (!hasAccess(user.role as any, pathname)) {
      router.replace("/internal");
    }
  }, [user, authReady, pathname, router]);

  return {
    isAllowed: !!user,
    isLoading: !authReady,
  };
}