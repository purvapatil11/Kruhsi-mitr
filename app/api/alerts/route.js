import { connectDB } from '@/lib/mongodb'
import { Alert } from '@/models'
import { getPrices, getBestMandi } from '@/lib/agmarknet'
import { sendPriceAlert } from '@/lib/whatsapp'
import { NextResponse } from 'next/server'

// POST /api/alerts — create a new price alert
export async function POST(request) {
  await connectDB()
  const body = await request.json()
  const { phone, commodity, targetPrice, state = 'Maharashtra' } = body

  if (!phone || !commodity || !targetPrice) {
    return NextResponse.json({ error: 'phone, commodity, targetPrice required' }, { status: 400 })
  }

  const alert = await Alert.create({ phone, commodity, targetPrice, state })
  return NextResponse.json({ success: true, alert })
}

// GET /api/alerts — cron job: check all active alerts and send WhatsApp if triggered
// Call this from Vercel Cron (vercel.json) every morning at 7am IST
export async function GET() {
  await connectDB()

  const activeAlerts = await Alert.find({ triggered: false })
  const results = []

  for (const alert of activeAlerts) {
    try {
      const prices = await getPrices({ commodity: alert.commodity, state: alert.state })
      const best   = getBestMandi(prices)

      if (best && best.modalPrice >= alert.targetPrice) {
        // Price target hit! Send WhatsApp
        await sendPriceAlert({
          to:          alert.phone,
          commodity:   alert.commodity,
          market:      best.market,
          price:       best.modalPrice,
          targetPrice: alert.targetPrice,
        })

        await Alert.findByIdAndUpdate(alert._id, { triggered: true })
        results.push({ alert: alert._id, status: 'triggered', market: best.market })
      } else {
        results.push({ alert: alert._id, status: 'waiting', currentBest: best?.modalPrice })
      }
    } catch (err) {
      results.push({ alert: alert._id, status: 'error', error: err.message })
    }
  }

  return NextResponse.json({ checked: activeAlerts.length, results })
}