'use client'
import { useState } from 'react'
import Link from 'next/link'

const CROPS = ['🌽 Maize', '🍅 Tomato', '🧅 Onion', '🥔 Potato', '🍇 Grapes', '🍌 Banana', '🌾 Wheat']

export default function AuthPage() {
  const [step, setStep] = useState(0)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    district: '',
    crop: '',
    mandi: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6">

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl">🌾</div>
          <h1 className="text-2xl font-bold mt-2">Join KisanMitr</h1>
          <p className="text-sm text-gray-500">
            Built for farmers of Maharashtra
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6 text-xs text-gray-400">
          {['Basic', 'Farming', 'Done'].map((s, i) => (
            <span key={i} className={i <= step ? 'text-green-600 font-medium' : ''}>
              {s}
            </span>
          ))}
        </div>

        {/* STEP 1: BASIC */}
        {step === 0 && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-green-400 outline-none"
            />

            <input
              type="tel"
              placeholder="WhatsApp Number"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-green-400 outline-none"
            />

            <input
              type="text"
              placeholder="District (e.g. Nashik)"
              value={form.district}
              onChange={e => set('district', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-green-400 outline-none"
            />

            <button
              onClick={() => setStep(1)}
              disabled={!form.name || !form.phone}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

        {/* STEP 2: FARM INFO */}
        {step === 1 && (
          <div className="space-y-4">

            <label className="text-sm text-gray-600">Select your main crop</label>
            <div className="flex flex-wrap gap-2">
              {CROPS.map(c => (
                <button
                  key={c}
                  onClick={() => set('crop', c)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    form.crop === c
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Nearest mandi (optional)"
              value={form.mandi}
              onChange={e => set('mandi', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-green-400 outline-none"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 border border-gray-200 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
              >
                ← Back
              </button>

              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700"
              >
                Finish →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 2 && (
          <div className="text-center space-y-4">

            <div className="text-5xl">✅</div>

            <h2 className="text-xl font-semibold">
              Welcome, {form.name}!
            </h2>

            <p className="text-gray-500 text-sm">
              You're all set to track mandi prices and get alerts.
            </p>

            <Link
              href="/"
              className="block bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all"
            >
              Go to Dashboard →
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}