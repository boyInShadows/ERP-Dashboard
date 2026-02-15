import { apiGet } from "@/lib/api";
import type { AnalyticsOverview } from "@/lib/types";

export default async function DashboardPage() {
  // Adjust these paths to your backend routes:
  const overview = await apiGet<AnalyticsOverview>("/api/analytics/overview").catch(() => ({}));

  const cards = [
    { label: "Total Calls", value: overview.total_calls ?? "-" },
    { label: "Reservations", value: overview.total_reservations ?? "-" },
    { label: "Transfers", value: overview.transfers ?? "-" },
    { label: "Failures", value: overview.failures ?? "-" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="border rounded p-3">
            <div className="text-xs text-gray-500">{c.label}</div>
            <div className="text-2xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="border rounded p-3 text-sm text-gray-600">
        Next: add charts + intent breakdown (Plan B).
      </div>
    </div>
  );
}
