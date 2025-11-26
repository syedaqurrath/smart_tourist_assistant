export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-amber-900">Smart Tourist Assistant</h1>
          <p className="text-amber-700">Plan, explore, and experience destinations with confidence</p>
        </div>
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

