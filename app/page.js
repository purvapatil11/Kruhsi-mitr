import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6f0]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-xl text-gray-900">MandiWise</span>
          </div>
          <p className="text-sm text-gray-500">Empowering farmers & businesses</p>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Real tools for real problems
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Live mandi prices for farmers. Credit scores for small businesses.
          Built for Maharashtra, free for everyone.
        </p>
      </section>

      {/* Two product cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-6">

        {/* Farmer Tool */}
        <Link href="/farmer" className="group block">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-green-200 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-6">
              🌽
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Mandi Price Tracker
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Check today's prices across all Maharashtra mandis.
              Set WhatsApp alerts when your target price is reached.
              Know <em>before</em> you load the truck.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Live prices from Agmarknet (govt data)',
                'Best mandi finder — sorted by price',
                '7-day price trend chart',
                'WhatsApp alert when price hits target',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium group-hover:bg-green-700 transition-colors">
              Check prices →
            </span>
          </div>
        </Link>

        {/* MSME Tool */}
        <Link href="/msme" className="group block">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-6">
              🏪
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              MSME Credit Scorer
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Find out your business credit score in 2 minutes.
              Discover which government loan schemes you qualify for —
              without visiting a bank.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Score based on GST, UPI, bank history',
                'No collateral? Find schemes that don\'t need it',
                'Personalised tips to improve your score',
                'Match to PM Mudra, CGTMSE, PSB Loans',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-blue-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium group-hover:bg-blue-700 transition-colors">
              Check eligibility →
            </span>
          </div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        Built for hackathon · Data from data.gov.in · Free forever
      </footer>
    </main>
  )
}
