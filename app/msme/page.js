'use client'
// app/msme/page.js
import { useState } from 'react'

const STEPS = ['Business info', 'Financial signals', 'Your score']

export default function MSMEPage() {
  const [step, setStep]       = useState(0)
  const [form, setForm]       = useState({
    ownerName: '', businessName: '', phone: '', city: '',
    yearsInOperation: '', gstReturnsFiled: '', gstReturnsOnTime: '',
    monthlyUpiVolume: '', utilityBillsOnTime: true, bankAccountAgeYears: '',
  })
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function submit() {
    setLoading(true)
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        yearsInOperation:    Number(form.yearsInOperation),
        gstReturnsFiled:     Number(form.gstReturnsFiled),
        gstReturnsOnTime:    Number(form.gstReturnsOnTime),
        monthlyUpiVolume:    Number(form.monthlyUpiVolume),
        bankAccountAgeYears: Number(form.bankAccountAgeYears),
      }),
    })
    const data = await res.json()
    setResult(data)
    setStep(2)
    setLoading(false)
  }

  const gradeColors = {
    A: { bg: '#E1F5EE', text: '#0F6E56', ring: '#5DCAA5' },
    B: { bg: '#FAEEDA', text: '#633806', ring: '#EF9F27' },
    C: { bg: '#E6F1FB', text: '#0C447C', ring: '#378ADD' },
    D: { bg: '#FCEBEB', text: '#791F1F', ring: '#E24B4A' },
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0] pb-16">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm">← Home</a>
          <span className="text-gray-200">/</span>
          <span className="text-sm font-medium text-gray-700">🏪 MSME Credit Scorer</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-blue-600' : 'text-gray-300'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium
                  ${i < step ? 'bg-blue-600 text-white' :
                    i === step ? 'border-2 border-blue-600 text-blue-600' :
                    'border-2 border-gray-200 text-gray-300'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-sm hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-200 w-8" />}
            </div>
          ))}
        </div>

        {/* Step 0: Business Info */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">Tell us about your business</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Your name</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  placeholder="Ramesh Patil"
                  value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Business name</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  placeholder="Patil Kirana Store"
                  value={form.businessName} onChange={e => set('businessName', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">WhatsApp number</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  placeholder="9876543210"
                  value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">City</label>
                <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  placeholder="Nashik"
                  value={form.city} onChange={e => set('city', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Years in business</label>
                <input type="number" min="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                  placeholder="5"
                  value={form.yearsInOperation} onChange={e => set('yearsInOperation', e.target.value)} />
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={!form.ownerName || !form.businessName}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 1: Financial Signals */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold text-gray-900 text-lg">Financial details</h2>
            <p className="text-sm text-gray-400">This is the data banks don't ask for — but we use it to build your profile.</p>

            {/* GST */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
              <p className="text-sm font-medium text-gray-700">📋 GST returns</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Total filed (last 12 months)</label>
                  <input type="number" min="0" max="12"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="10" value={form.gstReturnsFiled}
                    onChange={e => set('gstReturnsFiled', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Filed on time</label>
                  <input type="number" min="0" max="12"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    placeholder="9" value={form.gstReturnsOnTime}
                    onChange={e => set('gstReturnsOnTime', e.target.value)} />
                </div>
              </div>
            </div>

            {/* UPI */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <label className="text-sm font-medium text-gray-700 mb-2 block">💳 Monthly UPI collections (₹)</label>
              <input type="number" min="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder="150000" value={form.monthlyUpiVolume}
                onChange={e => set('monthlyUpiVolume', e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">Total amount received via UPI/GPay/PhonePe per month</p>
            </div>

            {/* Utility */}
            <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">⚡ Utility bills paid on time?</p>
                <p className="text-xs text-gray-400 mt-0.5">Electricity, water, shop rent</p>
              </div>
              <div className="flex gap-3">
                {[true, false].map(v => (
                  <button key={String(v)}
                    onClick={() => set('utilityBillsOnTime', v)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      form.utilityBillsOnTime === v
                        ? v ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-600'
                    }`}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bank */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <label className="text-sm font-medium text-gray-700 mb-2 block">🏦 How long with your current bank? (years)</label>
              <input type="number" min="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                placeholder="4" value={form.bankAccountAgeYears}
                onChange={e => set('bankAccountAgeYears', e.target.value)} />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button onClick={submit} disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-40">
                {loading ? 'Calculating...' : 'Get my score →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 2 && result && (() => {
          const g = gradeColors[result.grade] || gradeColors.C
          return (
            <div className="space-y-5">
              {/* Score card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <p className="text-sm text-gray-400 mb-4">Credit score for {form.businessName}</p>
                <div className="w-28 h-28 rounded-full mx-auto flex items-center justify-center mb-4"
                  style={{ background: g.bg, border: `4px solid ${g.ring}` }}>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: g.text }}>{result.score}</p>
                    <p className="text-xs" style={{ color: g.text }}>/100</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900">{result.label}</p>
                <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">{result.summary}</p>
              </div>

              {/* Score breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Score breakdown</h3>
                <div className="space-y-3">
                  {result.breakdown?.map(b => (
                    <div key={b.factor}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{b.icon} {b.factor}</span>
                        <span className="font-medium text-gray-900">{b.points}/{b.maxPoints}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(b.points / b.maxPoints) * 100}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{b.status}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligible schemes */}
              {result.eligibleSchemes?.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-1">You qualify for {result.eligibleSchemes.length} loan schemes</h3>
                  <p className="text-sm text-gray-400 mb-4">Click any scheme to apply directly</p>
                  <div className="space-y-3">
                    {result.eligibleSchemes.map(s => (
                      <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{s.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-blue-600 text-sm">{s.amount}</p>
                          <p className="text-xs text-gray-400">{s.interestRate}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Improvements */}
              {result.improvements?.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                  <h3 className="font-semibold text-amber-800 mb-3">How to improve your score</h3>
                  <ul className="space-y-2">
                    {result.improvements.map(imp => (
                      <li key={imp.factor} className="flex items-start gap-2 text-sm text-amber-700">
                        <span className="mt-0.5">→</span>
                        <span><strong>{imp.factor}:</strong> {imp.tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button onClick={() => { setStep(0); setResult(null); setForm({
                ownerName: '', businessName: '', phone: '', city: '',
                yearsInOperation: '', gstReturnsFiled: '', gstReturnsOnTime: '',
                monthlyUpiVolume: '', utilityBillsOnTime: true, bankAccountAgeYears: '',
              })}}
                className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Check another business
              </button>
            </div>
          )
        })()}
      </div>
    </main>
  )
}