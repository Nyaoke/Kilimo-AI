import "server-only";

import { createHash } from "crypto";

export function hashPhone(phone: string): string {
  const salt = process.env.PHONE_HASH_SALT ?? "dev-salt";
  return createHash("sha256").update(`${salt}:${phone}`).digest("hex");
}
