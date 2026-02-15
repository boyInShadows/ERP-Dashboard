import { apiGet } from "@/lib/api";
import type { CallLogDetail } from "@/lib/types";

export default async function CallDetailPage({ params }: { params: { callSid: string } }) {
  const callSid = params.callSid;
  // Adjust to match your backend
  const c = await apiGet<CallLogDetail>(`/api/calls/${callSid}`);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Call {callSid}</h1>

      <div className="border rounded p-4 grid md:grid-cols-2 gap-3 text-sm">
        <div><span className="text-gray-500">Time:</span> {c.created_at ?? "-"}</div>
        <div><span className="text-gray-500">Outcome:</span> {c.outcome ?? "-"}</div>
        <div><span className="text-gray-500">Intent:</span> {c.intent ?? "-"}</div>
        <div><span className="text-gray-500">Mood:</span> {c.mood ?? "-"}</div>
        <div><span className="text-gray-500">Duration:</span> {c.duration_seconds ?? "-"} sec</div>
      </div>

      <div className="border rounded p-4 text-sm">
        <div className="font-semibold mb-2">Transcript</div>
        <div className="whitespace-pre-wrap text-gray-800">
          {c.transcript ?? "—"}
        </div>
      </div>
    </div>
  );
}
