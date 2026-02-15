export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          ERP Dashboard
        </h1>
      </header>
      <main className="flex-1 p-6">
        <p className="text-zinc-600 dark:text-zinc-400">
          Ready for development. Edit <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800">app/page.tsx</code> to get started.
        </p>
      </main>
    </div>
  );
}
