// Reads mandi prices from MongoDB (imported from data.gov.in CSV)
// Field names match exactly what was in the CSV:
//   State, District, Market, Commodity, Variety, Grade,
//   Arrival_Date, Min_x0020_Price, Max_x0020_Price, Modal_x0020_Price

import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'

// ── Mongoose model for the prices collection ──────────────────────────────
const PriceSchema = new mongoose.Schema({
  State:              String,
  District:           String,
  Market:             String,
  Commodity:          String,
  Variety:            String,
  Grade:              String,
  Arrival_Date:       String,
  Min_x0020_Price:    Number,
  Max_x0020_Price:    Number,
  Modal_x0020_Price:  Number,
}, { collection: 'prices' })

const Price = mongoose.models.Price || mongoose.model('Price', PriceSchema)

// ── Crop & Mandi lists ────────────────────────────────────────────────────

export const CROPS = [
  'Onion', 'Tomato', 'Potato', 'Grapes', 'Pomegranate',
  'Banana', 'Wheat', 'Rice', 'Soyabean', 'Cotton'
]

export const MAHARASHTRA_MANDIS = [
  'Lasalgaon', 'Nashik', 'Pune', 'Mumbai', 'Aurangabad',
  'Solapur', 'Kolhapur', 'Nagpur', 'Ahmednagar', 'Satara'
]

// ── Main functions ────────────────────────────────────────────────────────

/**
 * Get prices for a commodity across all mandis in a state
 * Queries MongoDB — no API key needed
 */
export async function getPrices({ commodity = 'Onion', state = 'Maharashtra', limit = 50 }) {
  try {
    await connectDB()

    const records = await Price.find({
      Commodity: { $regex: new RegExp(`^${commodity}$`, 'i') },
      State:     { $regex: new RegExp(state, 'i') },
    })
    .sort({ Arrival_Date: -1 })
    .limit(limit)
    .lean()

    if (records.length === 0) {
      console.warn(`No data for ${commodity} in ${state}, using mock data`)
      return getMockData(commodity)
    }

    return records.map(normalize)

  } catch (err) {
    console.error('MongoDB query failed:', err.message)
    return getMockData(commodity)
  }
}

/**
 * Get price history grouped by date (for the 7-day trend chart)
 */
export async function getPriceHistory({ commodity, state, market }) {
  try {
    await connectDB()

    const query = {
      Commodity: { $regex: new RegExp(`^${commodity}$`, 'i') },
      State:     { $regex: new RegExp(state, 'i') },
    }
    if (market) query.Market = { $regex: new RegExp(market, 'i') }

    const records = await Price.find(query)
      .sort({ Arrival_Date: -1 })
      .limit(200)
      .lean()

    const byDate = {}
    records.forEach(r => {
      const date = r.Arrival_Date
      if (!byDate[date]) byDate[date] = []
      byDate[date].push(r.Modal_x0020_Price || 0)
    })

    return Object.entries(byDate)
      .map(([date, prices]) => ({
        date,
        avgPrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      }))
      .sort((a, b) => parseDate(a.date) - parseDate(b.date))
      .slice(-7)

  } catch (err) {
    console.error('History query failed:', err.message)
    return []
  }
}

/**
 * Find the best mandi — highest modal price
 */
export function getBestMandi(prices) {
  if (!prices || prices.length === 0) return null
  return [...prices].sort((a, b) => b.modalPrice - a.modalPrice)[0]
}

/**
 * Simple trend: up / down / stable
 */
export function getPriceTrend(history) {
  if (!history || history.length < 2) return 'stable'
  const latest   = history[history.length - 1].avgPrice
  const previous = history[history.length - 2].avgPrice
  const diff = ((latest - previous) / previous) * 100

  if (diff >  2) return 'up'
  if (diff < -2) return 'down'
  return 'stable'
}

// ── Helpers ───────────────────────────────────────────────────────────────

// Maps MongoDB document → clean shape the UI expects
function normalize(r) {
  return {
    market:     r.Market    || '',
    district:   r.District  || '',
    state:      r.State     || '',
    commodity:  r.Commodity || '',
    variety:    r.Variety   || '',
    grade:      r.Grade     || '',
    minPrice:   Number(r.Min_x0020_Price)   || 0,
    maxPrice:   Number(r.Max_x0020_Price)   || 0,
    modalPrice: Number(r.Modal_x0020_Price) || 0,
    date:       r.Arrival_Date || '',
  }
}

// Parse DD/MM/YYYY → timestamp for sorting
function parseDate(str) {
  if (!str) return 0
  const [d, m, y] = str.split('/')
  return new Date(`${y}-${m}-${d}`).getTime()
}

// Fallback mock data — used when DB is empty or unreachable during dev
function getMockData(commodity) {
  const mandis = ['Lasalgaon', 'Nashik', 'Pune', 'Mumbai', 'Aurangabad', 'Solapur']
  return mandis.map(market => ({
    market,
    district:   'Nashik',
    state:      'Maharashtra',
    commodity,
    variety:    'Local',
    grade:      'Local',
    minPrice:   Math.floor(Math.random() * 500) + 1000,
    maxPrice:   Math.floor(Math.random() * 500) + 1800,
    modalPrice: Math.floor(Math.random() * 500) + 1400,
    date:       new Date().toLocaleDateString('en-GB'),
  }))
}

