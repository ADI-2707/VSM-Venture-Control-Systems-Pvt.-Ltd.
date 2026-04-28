"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { hasAccess } from "@/utils/rbac";

export function useRBACGuard() {
  const { user, authReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAllowed = !!user && hasAccess(user.role as any, pathname);

  useEffect(() => {
    if (!authReady) return;

    if (!user) {
      router.replace("/internal");
      return;
    }

    if (!isAllowed) {
      router.replace("/internal");
    }
  }, [user, authReady, isAllowed, router]);

  return {
    isAllowed,
    isLoading: !authReady,
  };
}
