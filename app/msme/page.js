'use client'

import { useState } from 'react'

const STEPS = ['Business 🌱', 'Financials 💰', 'Score 🏆']

export default function MSMEPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    ownerName: '', businessName: '', phone: '', city: '',
    yearsInOperation: '', gstReturnsFiled: '', gstReturnsOnTime: '',
    monthlyUpiVolume: '', utilityBillsOnTime: true, bankAccountAgeYears: '',
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit() {
    setLoading(true)
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        yearsInOperation: Number(form.yearsInOperation),
        gstReturnsFiled: Number(form.gstReturnsFiled),
        gstReturnsOnTime: Number(form.gstReturnsOnTime),
        monthlyUpiVolume: Number(form.monthlyUpiVolume),
        bankAccountAgeYears: Number(form.bankAccountAgeYears),
      }),
    })
    const data = await res.json()
    setResult(data)
    setStep(2)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pb-20">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            🏪 MSME Growth Engine
          </h1>
          <p className="text-green-100 mt-2">
            Understand your business strength before banks do.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* STEPPER */}
        <div className="flex justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center w-full relative">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition
                ${i <= step ? 'bg-green-600 text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-2 ${i <= step ? 'text-green-600' : 'text-gray-400'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-5">

            <h2 className="text-xl font-semibold text-gray-800">🌱 Business Details</h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input placeholder="👤 Owner Name" className="input-big"
                value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />

              <input placeholder="🏢 Business Name" className="input-big"
                value={form.businessName} onChange={e => set('businessName', e.target.value)} />

              <input placeholder="📱 WhatsApp Number" className="input-big"
                value={form.phone} onChange={e => set('phone', e.target.value)} />

              <input placeholder="📍 City" className="input-big"
                value={form.city} onChange={e => set('city', e.target.value)} />

              <input type="number" placeholder="⏳ Years in Business" className="input-big"
                value={form.yearsInOperation} onChange={e => set('yearsInOperation', e.target.value)} />

            </div>

            <button onClick={() => setStep(1)} className="btn-green">
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-6">

            <h2 className="text-xl font-semibold text-gray-800">💰 Financial Signals</h2>

            <input placeholder="📋 GST Returns Filed (12 months)" className="input-big"
              value={form.gstReturnsFiled} onChange={e => set('gstReturnsFiled', e.target.value)} />

            <input placeholder="⏱️ GST Filed On Time" className="input-big"
              value={form.gstReturnsOnTime} onChange={e => set('gstReturnsOnTime', e.target.value)} />

            <input placeholder="💳 Monthly UPI Volume ₹" className="input-big"
              value={form.monthlyUpiVolume} onChange={e => set('monthlyUpiVolume', e.target.value)} />

            <input placeholder="🏦 Bank Account Age (years)" className="input-big"
              value={form.bankAccountAgeYears} onChange={e => set('bankAccountAgeYears', e.target.value)} />

            {/* Utility toggle */}
            <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
              <span className="text-sm font-medium">⚡ Bills paid on time?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => set('utilityBillsOnTime', true)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    form.utilityBillsOnTime ? 'bg-green-600 text-white' : 'bg-white'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => set('utilityBillsOnTime', false)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    !form.utilityBillsOnTime ? 'bg-red-500 text-white' : 'bg-white'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-outline">Back</button>
              <button onClick={submit} className="btn-green">
                {loading ? 'Calculating...' : 'Get Score →'}
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === 2 && result && (
          <div className="space-y-6">

            {/* SCORE CARD */}
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
              <p className="text-gray-500">Your Business Score</p>
              <h1 className="text-6xl font-bold text-green-600 mt-2">{result.score}</h1>
              <p className="text-xl font-semibold mt-2">{result.label}</p>
              <p className="text-gray-500 mt-2">{result.summary}</p>
            </div>

            {/* BREAKDOWN */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-semibold mb-4">📊 Score Breakdown</h3>

              {result.breakdown?.map(b => (
                <div key={b.factor} className="mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{b.icon} {b.factor}</span>
                    <span>{b.points}/{b.maxPoints}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(b.points / b.maxPoints) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* SCHEMES */}
            <div className="space-y-3">
              {result.eligibleSchemes?.map(s => (
                <a key={s.name} href={s.url} target="_blank"
                  className="block p-5 bg-white rounded-xl shadow hover:shadow-lg border hover:border-green-300 transition">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                  <p className="text-green-600 font-bold mt-1">{s.amount}</p>
                </a>
              ))}
            </div>

            <button onClick={() => { setStep(0); setResult(null) }}
              className="btn-outline w-full">
              Start Again
            </button>
          </div>
        )}

      </div>
    </main>
  )
}