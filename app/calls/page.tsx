import Link from "next/link";
import { backendGet } from "@/lib/backend";
import type { CallLogListItem } from "@/lib/types";

export default async function CallsPage() {
  // Adjust to match your backend
  const rows = await backendGet<CallLogListItem[]>("/api/calls").catch(() => []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Calls</h1>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Time</th>
              <th className="text-left p-2">CallSid</th>
              <th className="text-left p-2">Outcome</th>
              <th className="text-left p-2">Intent</th>
              <th className="text-left p-2">Mood</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.callSid} className="border-t hover:bg-gray-50">
                <td className="p-2">{c.created_at ?? "-"}</td>
                <td className="p-2">
                  <Link className="underline" href={`/calls/${c.callSid}`}>{c.callSid}</Link>
                </td>
                <td className="p-2">{c.outcome ?? "-"}</td>
                <td className="p-2">{c.intent ?? "-"}</td>
                <td className="p-2">{c.mood ?? "-"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-2 text-gray-500" colSpan={5}>No calls found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
