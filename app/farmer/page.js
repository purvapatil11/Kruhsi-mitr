'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const CROPS = [
  { name: 'Onion', emoji: '🧅' },
  { name: 'Tomato', emoji: '🍅' },
  { name: 'Potato', emoji: '🥔' },
  { name: 'Grapes', emoji: '🍇' },
  { name: 'Pomegranate', emoji: '🍎' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Wheat', emoji: '🌾' },
  { name: 'Soyabean', emoji: '🌱' },
]

export default function FarmerPage() {
  const [crop, setCrop] = useState('Onion')
  const [prices, setPrices] = useState([])
  const [history, setHistory] = useState([])
  const [trend, setTrend] = useState('stable')
  const [best, setBest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const [phone, setPhone] = useState('')
  const [target, setTarget] = useState('')
  const [alertSent, setAlertSent] = useState(false)

  const selectedCrop = CROPS.find(c => c.name === crop)

  useEffect(() => { fetchPrices() }, [crop])

  async function fetchPrices() {
    setLoading(true)
    try {
      const res = await fetch(`/api/prices?commodity=${crop}&state=Maharashtra`)
      const data = await res.json()
      setPrices(data.prices || [])
      setHistory(data.history || [])
      setTrend(data.trend || 'stable')
      setBest(data.best || null)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function setAlert(e) {
    e.preventDefault()
    const res = await fetch('/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, commodity: crop, targetPrice: Number(target), state: 'Maharashtra' }),
    })
    if (res.ok) {
      setAlertSent(true)
      setPhone('')
      setTarget('')
    }
  }

  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-500',
    stable: 'text-gray-500'
  }[trend]

  const trendIcon = {
    up: '📈',
    down: '📉',
    stable: '➡️'
  }[trend]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pb-20">

      {/* HERO STRIP */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-10 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            {selectedCrop.emoji} {crop} Market Intelligence
          </h1>
          <p className="text-green-100 mt-2">
            Don’t sell blind. Sell smart.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* CROP SELECTOR */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow flex flex-wrap gap-2">
          {CROPS.map(c => (
            <button
              key={c.name}
              onClick={() => setCrop(c.name)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm transition ${
                crop === c.name
                  ? 'bg-green-600 text-white scale-105 shadow'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-400">
            Fetching live mandi data...
          </div>
        ) : (
          <>
            {/* BEST MANDI */}
            {best && (
              <div className="bg-white rounded-3xl p-6 shadow-xl border flex justify-between items-center hover:scale-[1.02] transition">
                <div>
                  <p className="text-gray-500 text-sm">Best mandi today</p>
                  <p className="text-3xl font-bold text-green-700">
                    ₹{best.modalPrice}
                  </p>
                  <p className="text-gray-500">📍 {best.market}</p>
                </div>

                <div className={`text-right ${trendColor}`}>
                  <p className="text-3xl">{trendIcon}</p>
                  <p className="text-sm capitalize">{trend}</p>
                </div>
              </div>
            )}

            {/* INSIGHT STRIP */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Total Mandis</p>
                <p className="text-xl font-bold">{prices.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Top Price</p>
                <p className="text-xl font-bold text-green-600">
                  ₹{best?.modalPrice}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Trend</p>
                <p className={`text-xl font-bold ${trendColor}`}>
                  {trendIcon}
                </p>
              </div>
            </div>

            {/* CHART */}
            {history.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="mb-4 font-semibold">Price Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={history}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="avgPrice" stroke="#16a34a" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* SEARCH */}
            <input
              placeholder="🔍 Search mandi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-4 py-2 rounded-xl shadow-sm"
            />

            {/* TABLE */}
            <div className="bg-white rounded-2xl overflow-hidden shadow">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Mandi</th>
                    <th className="px-4 text-right">Min</th>
                    <th className="px-4 text-right">Modal</th>
                    <th className="px-6 text-right">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {prices
                    .filter(p => p.market.toLowerCase().includes(search.toLowerCase()))
                    .sort((a, b) => b.modalPrice - a.modalPrice)
                    .map((p, i) => (
                      <tr key={i} className="hover:bg-green-50 transition">
                        <td className="px-6 py-3">
                          {i === 0 && '🏆 '}
                          {p.market}
                        </td>
                        <td className="text-right px-4">₹{p.minPrice}</td>
                        <td className="text-right px-4 font-bold text-green-700">
                          ₹{p.modalPrice}
                        </td>
                        <td className="text-right px-6">₹{p.maxPrice}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ALERT */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-2">📲 Set Smart Alert</h3>

          {alertSent ? (
            <p>✅ Alert set! We'll notify you.</p>
          ) : (
            <form onSubmit={setAlert} className="flex gap-3 flex-wrap">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="px-4 py-2 rounded text-black"
                required
              />
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Target price"
                className="px-4 py-2 rounded text-black"
                required
              />
              <button className="bg-white text-green-700 px-5 py-2 rounded font-medium">
                Set Alert
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}