export type Role =
  | "manager"
  | "hr"
  | "marketing"
  | "analyst"
  | "sales";

type Route = string;

export const ROLE_ROUTES: Record<Role, Route[]> = {
  manager: ["*"],

  hr: [
    "/internal",
    "/internal/dashboard",
    "/internal/projects",
    "/internal/jobs",
    "/internal/jobs/applications",
  ],

  marketing: [
    "/internal",
    "/internal/dashboard",
    "/internal/projects",
    "/internal/content",
    "/internal/monitoring",
  ],

  analyst: [
    "/internal",
    "/internal/dashboard",
    "/internal/projects",
    "/internal/analytics",
    "/internal/monitoring",
  ],

  sales: [
    "/internal",
    "/internal/dashboard",
    "/internal/projects",
    "/internal/analytics",
  ],
};

export function hasAccess(role: Role, path: string): boolean {
  const allowedRoutes = ROLE_ROUTES[role];

  if (!allowedRoutes) return false;

  if (allowedRoutes.includes("*")) return true;

  return allowedRoutes.some((route) => path.startsWith(route));
}