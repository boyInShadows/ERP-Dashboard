import { apiGet } from "@/lib/api";
import type { ReservationDetail } from "@/lib/types";

export default async function ReservationDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  // Adjust path to match your backend
  const r = await apiGet<ReservationDetail>(`/api/reservations/${id}`);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Reservation #{id}</h1>

      <div className="border rounded p-4 grid md:grid-cols-2 gap-3 text-sm">
        <div><span className="text-gray-500">Date/Time:</span> {r.datetime ?? (`${r.date ?? ""} ${r.time ?? ""}`.trim() || "-")}</div>
        <div><span className="text-gray-500">Status:</span> {r.status ?? "-"}</div>
        <div><span className="text-gray-500">Customer:</span> {r.customer_name ?? "-"}</div>
        <div><span className="text-gray-500">Phone:</span> {r.customer_phone ?? "-"}</div>
        <div><span className="text-gray-500">Department:</span> {r.department ?? "-"}</div>
        <div><span className="text-gray-500">Doctor:</span> {r.doctor ?? "-"}</div>
      </div>

      <div className="border rounded p-4 text-sm">
        <div className="font-semibold mb-2">Notes / Special Requests</div>
        <div className="text-gray-700 whitespace-pre-wrap">
          {r.special_requests ?? r.notes ?? "—"}
        </div>
      </div>
    </div>
  );
}
