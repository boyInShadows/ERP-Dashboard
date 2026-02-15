import { backendGet } from "@/lib/backend";
import type { FaqItem } from "@/lib/types";

export default async function FaqsPage() {
  const faqs = await backendGet<FaqItem[]>("/api/faqs").catch(() => []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">FAQs</h1>

      <div className="border rounded p-4 space-y-3">
        {faqs.map((f) => (
          <div key={String(f.id)} className="border rounded p-3">
            <div className="font-semibold">{f.question}</div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{f.answer}</div>
            <div className="text-xs text-gray-500 mt-2">
              {f.category ? `Category: ${f.category}` : ""} {typeof f.active === "boolean" ? ` • Active: ${f.active}` : ""}
            </div>
          </div>
        ))}
        {faqs.length === 0 && <div className="text-sm text-gray-500">No FAQs found.</div>}
      </div>
    </div>
  );
}
