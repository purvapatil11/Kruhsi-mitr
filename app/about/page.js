'use client'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-white to-green-50 text-gray-900">

      {/* NAVBAR */}
      <nav className="bg-green-800/90 backdrop-blur-md text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2 text-2xl font-extrabold">
            <span className="uppercase">KISSANMITR</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="underline">About Us</Link>
            <Link href="/auth" className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-green-800 transition-all">
              Become a User
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Built for those who grow India 🌾
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              KissanMitr is a smart platform designed for farmers and small businesses
              across Maharashtra — helping them make better selling and financial decisions
              using real-time data and simple tools.
            </p>
          </div>

          <div>
            <img
              src="/farmer.jpg"
              alt="Farmer"
              className="rounded-3xl shadow-xl object-cover w-full h-[350px]"
            />
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-2xl">

          <h2 className="text-2xl font-semibold italic mb-4">
            “Farmers should not guess prices — they should know them.”
          </h2>

          <p className="text-gray-700 leading-relaxed italic">
            For years, farmers have depended on uncertainty, middlemen, and incomplete information.
            WiseKisan changes that by bringing transparency, live mandi data, and actionable insights —
            so every farmer can sell at the right place, at the right time, for the right price.
          </p>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-10">
            What KissanMitr offers
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Farmer Tool */}
            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all border">
              <div className="text-4xl mb-4">🌽</div>
              <h3 className="text-xl font-bold mb-3">Farmer Mandi Tracker</h3>
              <p className="text-gray-600 text-sm mb-4">
                A real-time mandi intelligence tool helping farmers make smarter selling decisions.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✔ Live prices from government data</li>
                <li>✔ Best mandi finder for highest returns</li>
                <li>✔ 7-day trend insights</li>
                <li>✔ WhatsApp alerts on target price</li>
              </ul>
            </div>

            {/* MSME Tool */}
            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all border">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold mb-3">MSME Credit Scorer</h3>
              <p className="text-gray-600 text-sm mb-4">
                Helping small businesses understand their financial strength and access loans easily.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✔ Instant credit score (rule-based)</li>
                <li>✔ Govt loan scheme matching</li>
                <li>✔ Personalized improvement tips</li>
                <li>✔ Covers Mudra, CGTMSE & more</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-10">
            Why KissanMitr matters
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              "📊 Real government data — no guesswork",
              "🚫 Reduces dependency on middlemen",
              "📍 Focused on Maharashtra mandis",
              "⚡ Simple, fast, and accessible",
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border bg-[#f8f6f0] hover:shadow-md transition-all text-sm font-medium"
              >
                {item}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-2xl font-semibold mb-4">
            Built with purpose 💡
          </h2>

          <p className="text-gray-600 leading-relaxed">
            KissanMitr was built during a hackathon with a simple vision —
            to solve real-world problems faced by farmers and small businesses.
            By combining technology with real data, we aim to create impact
            where it truly matters.
          </p>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-10">
        Made with purpose for farmers 🌱
      </footer>

    </main>
  )
}