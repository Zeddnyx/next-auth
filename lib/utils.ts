export function hideEmail(email: string): string {
  const [username, domain] = email.split("@");
  if (username.length <= 2) {
    // If the username is too short, just replace it with asterisks
    return `${username.charAt(0)}***@${domain}`;
  }

  const halfLength = Math.floor(username.length / 2);
  const hiddenUsername = `${username.slice(0, 1)}${"*".repeat(
    halfLength,
  )}${username.slice(-1)}`;

  return `${hiddenUsername}@${domain}`;
}
