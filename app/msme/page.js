'use client'

import { useState } from 'react'

const STEPS = ['Business 🌱', 'Financials 💰', 'Score 🏆']

export default function MSMEPage() {
  const [step, setStep] = useState(0)

  const [form, setForm] = useState({
    ownerName: '',
    businessName: '',
    phone: '',
    city: '',
    yearsOfBusiness: '',
    turnover: '',
    investment: '',
    monthlyTransactions: '',
    repaymentScore: '',
    bankAge: ''
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
        turnover: Number(form.turnover),
        investment: Number(form.investment),
        monthlyTransactions: Number(form.monthlyTransactions),
        repaymentScore: Number(form.repaymentScore),
        yearsOfBusiness: Number(form.yearsOfBusiness),
        bankAge: Number(form.bankAge),
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
          <h1 className="text-4xl font-bold">🏪 MSME Readiness Calculator</h1>
          <p className="text-green-100 mt-2">
            Understand your business strength before banks do.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* STEPPER */}
        <div className="flex justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center w-full">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
                ${i <= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
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
          <div className="bg-white rounded-3xl shadow p-8 space-y-5">
            <h2 className="text-xl font-semibold">🌱 Business Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Owner Name" className="input-big"
                value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />

              <input placeholder="Business Name" className="input-big"
                value={form.businessName} onChange={e => set('businessName', e.target.value)} />

              <input placeholder="Phone" className="input-big"
                value={form.phone} onChange={e => set('phone', e.target.value)} />

              <input placeholder="City" className="input-big"
                value={form.city} onChange={e => set('city', e.target.value)} />

              <input type="number" placeholder="Years of Business" className="input-big"
                value={form.yearsOfBusiness}
                onChange={e => set('yearsOfBusiness', e.target.value)} />
            </div>

            <button onClick={() => setStep(1)} className="btn-green">
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow p-8 space-y-6">
            <h2 className="text-xl font-semibold">💰 Financial Details</h2>

            <input type="number" placeholder="Annual Turnover ₹" className="input-big"
              value={form.turnover} onChange={e => set('turnover', e.target.value)} />

            <input type="number" placeholder="Investment ₹" className="input-big"
              value={form.investment} onChange={e => set('investment', e.target.value)} />

            <input type="number" placeholder="Monthly Transactions ₹" className="input-big"
              value={form.monthlyTransactions} onChange={e => set('monthlyTransactions', e.target.value)} />

            <select className="input-big"
              value={form.repaymentScore}
              onChange={e => set('repaymentScore', e.target.value)}>
              <option value="">Repayment Behavior</option>
              <option value="100">Always on time</option>
              <option value="50">Sometimes late</option>
              <option value="20">Mostly late</option>
            </select>

            <input type="number" placeholder="Bank Account Age (years)" className="input-big"
              value={form.bankAge} onChange={e => set('bankAge', e.target.value)} />

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
          <div className="bg-white rounded-3xl shadow p-10 text-center">
            <p className="text-gray-500">Your MSME Score</p>
            <h1 className="text-6xl font-bold text-green-600">{result.score}</h1>
            <p className="text-xl font-semibold mt-2">{result.status}</p>
            <p className="text-gray-500 mt-2">Category: {result.category}</p>

            <button onClick={() => { setStep(0); setResult(null) }}
              className="btn-outline mt-6">
              Start Again
            </button>
          </div>
        )}

      </div>
    </main>
  )
}