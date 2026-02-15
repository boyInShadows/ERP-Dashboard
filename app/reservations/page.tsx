import Link from "next/link";
import { backendGet } from "@/lib/backend";
import type { ReservationListItem } from "@/lib/types";

export default async function ReservationsPage() {
  // Adjust path to match your backend
  const rows = await backendGet<ReservationListItem[]>("/api/reservations").catch(() => []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Reservations</h1>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Date/Time</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Department</th>
              <th className="text-left p-2">Doctor</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r.id)} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  <Link className="underline" href={`/reservations/${r.id}`}>
                    {r.datetime ?? (`${r.date ?? ""} ${r.time ?? ""}`.trim() || "-")}
                  </Link>
                </td>
                <td className="p-2">{r.customer_name ?? "-"} {r.customer_phone ? `(${r.customer_phone})` : ""}</td>
                <td className="p-2">{r.department ?? "-"}</td>
                <td className="p-2">{r.doctor ?? "-"}</td>
                <td className="p-2">{r.status ?? "-"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="p-2 text-gray-500" colSpan={5}>No reservations found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
