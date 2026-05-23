"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
      }}
      disabled={loading}
      className="text-xs px-3 py-1.5 rounded-md border border-ink/15 hover:bg-ink/5 transition"
    >
      {loading ? "..." : "Logout"}
    </button>
  );
}