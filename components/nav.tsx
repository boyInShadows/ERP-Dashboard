import Link from "next/link";

export function Nav() {
  const item = "block px-3 py-2 rounded hover:bg-gray-100";
  return (
    <aside className="w-56 border-r min-h-screen p-3">
      <div className="font-semibold mb-4">ERP Dashboard</div>
      <nav className="space-y-1 text-sm">
        <Link className={item} href="/dashboard">Dashboard</Link>
        <Link className={item} href="/reservations">Reservations</Link>
        <Link className={item} href="/calls">Calls</Link>
        <Link className={item} href="/faqs">FAQs</Link>
      </nav>
    </aside>
  );
}
