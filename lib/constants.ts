export type TRole = keyof typeof ROLES;
export type TPermisions = (typeof ROLES)[TRole][number];
export const ROLES = {
  admin: [
    "create:comments",
    "view:comments",
    "update:comments",
    "delete:comments",
    "create:users",
    "view:users",
    "update:users",
    "delete:users",
  ],
  moderator: ["view:comments", "delete:comments", "view:users"],
  user: ["view:comments", "create:comments"],
};
