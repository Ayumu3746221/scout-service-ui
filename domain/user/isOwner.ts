import User, { Role } from "@/types/User";

export function isOwner(
  currentUser: User | null,
  targetId: number,
  requiredRole: Role,
): boolean {
  if (currentUser === null) {
    return false;
  }

  return currentUser.role === requiredRole && currentUser.id === targetId;
}
