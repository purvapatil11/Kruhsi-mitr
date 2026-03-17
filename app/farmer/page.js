'use client'
// app/farmer/page.js
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CROPS = ['Onion', 'Tomato', 'Potato', 'Grapes', 'Pomegranate', 'Banana', 'Wheat', 'Soyabean']

export default function FarmerPage() {
  const [crop, setCrop]         = useState('Onion')
  const [prices, setPrices]     = useState([])
  const [history, setHistory]   = useState([])
  const [trend, setTrend]       = useState('stable')
  const [best, setBest]         = useState(null)
  const [loading, setLoading]   = useState(true)

  // Alert form
  const [phone, setPhone]       = useState('')
  const [target, setTarget]     = useState('')
  const [alertSent, setAlertSent] = useState(false)

  useEffect(() => {
    fetchPrices()
  }, [crop])

  async function fetchPrices() {
    setLoading(true)
    try {
      const res  = await fetch(`/api/prices?commodity=${crop}&state=Maharashtra`)
      const data = await res.json()
      setPrices(data.prices  || [])
      setHistory(data.history || [])
      setTrend(data.trend    || 'stable')
      setBest(data.best      || null)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function setAlert(e) {
    e.preventDefault()
    const res = await fetch('/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, commodity: crop, targetPrice: Number(target), state: 'Maharashtra' }),
    })
    if (res.ok) { setAlertSent(true); setPhone(''); setTarget('') }
  }

  const trendIcon  = { up: '📈', down: '📉', stable: '➡️' }[trend]
  const trendColor = { up: 'text-green-600', down: 'text-red-500', stable: 'text-gray-500' }[trend]
  const trendText  = { up: 'Rising — good time to sell', down: 'Falling — consider waiting', stable: 'Stable prices' }[trend]

  return (
    <main className="min-h-screen bg-[#f8f6f0] pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</a>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-700">🌾 Mandi Price Tracker</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Crop selector */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select your crop</label>
          <div className="flex flex-wrap gap-2">
            {CROPS.map(c => (
              <button
                key={c}
                onClick={() => setCrop(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  crop === c
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
            Fetching live prices...
          </div>
        ) : (
          <>
            {/* Best mandi highlight */}
            {best && (
              <div className="bg-green-600 text-white rounded-2xl p-6">
                <p className="text-green-100 text-sm mb-1">Best price today</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">₹{best.modalPrice}<span className="text-lg font-normal">/quintal</span></p>
                    <p className="text-green-100 mt-1">📍 {best.market}</p>
                  </div>
                  <div className={`text-right ${trendColor.replace('text-', 'text-white opacity-80 text-')}`}>
                    <p className="text-2xl">{trendIcon}</p>
                    <p className="text-sm text-green-100">{trendText}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Price trend chart */}
            {history.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">7-day price trend — {crop}</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={history}>
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => [`₹${v}`, 'Price']} />
                    <Line
                      type="monotone"
                      dataKey="avgPrice"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ fill: '#16a34a', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* All mandi prices table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">All Maharashtra mandis — {crop}</h3>
                <p className="text-sm text-gray-400 mt-0.5">Sorted by highest price</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-gray-500 font-medium">Mandi</th>
                      <th className="text-right px-4 py-3 text-gray-500 font-medium">Min</th>
                      <th className="text-right px-4 py-3 text-gray-500 font-medium">Modal</th>
                      <th className="text-right px-6 py-3 text-gray-500 font-medium">Max</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...prices]
                      .sort((a, b) => b.modalPrice - a.modalPrice)
                      .map((p, i) => (
                        <tr key={i} className={i === 0 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                          <td className="px-6 py-3 font-medium text-gray-900">
                            {i === 0 && <span className="text-green-600 mr-1">★</span>}
                            {p.market}
                            <span className="text-gray-400 font-normal ml-1">· {p.district}</span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500">₹{p.minPrice}</td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-900">₹{p.modalPrice}</td>
                          <td className="px-6 py-3 text-right text-gray-500">₹{p.maxPrice}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* WhatsApp alert setup */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Get WhatsApp alert</h3>
          <p className="text-sm text-gray-400 mb-4">
            We'll message you when {crop} price crosses your target
          </p>

          {alertSent ? (
            <div className="bg-green-50 text-green-700 rounded-xl p-4 text-sm">
              ✅ Alert set! You'll get a WhatsApp message when the price is right.
            </div>
          ) : (
            <form onSubmit={setAlert} className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                placeholder="WhatsApp number (10 digits)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400"
                required
              />
              <input
                type="number"
                placeholder="Target ₹/quintal"
                value={target}
                onChange={e => setTarget(e.target.value)}
                className="w-40 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Set alert
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}
