import { getPrices, getPriceHistory, getBestMandi, getPriceTrend } from '@/lib/agmarknet'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const commodity = searchParams.get('commodity') || 'Onion'
  const state     = searchParams.get('state')     || 'Maharashtra'
  const market    = searchParams.get('market')    || ''
  const mode      = searchParams.get('mode')      || 'today' // 'today' | 'history'

  try {
    if (mode === 'history') {
      const history  = await getPriceHistory({ commodity, state, market })
      const trend    = getPriceTrend(history)
      return NextResponse.json({ history, trend })
    }

    const prices  = await getPrices({ commodity, state })
    const best    = getBestMandi(prices)
    const history = await getPriceHistory({ commodity, state })
    const trend   = getPriceTrend(history)

    return NextResponse.json({ prices, best, history, trend, commodity, state })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}