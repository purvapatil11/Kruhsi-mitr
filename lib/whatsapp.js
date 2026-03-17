const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken  = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_WHATSAPP_FROM // whatsapp:+14155238886

/**
 * Send a price alert to a farmer via WhatsApp
 */
export async function sendPriceAlert({ to, commodity, market, price, targetPrice }) {
  const message =
    `🌾 *MandiWise Price Alert*\n\n` +
    `Your target price reached!\n\n` +
    `📦 Crop: ${commodity}\n` +
    `📍 Mandi: ${market}\n` +
    `💰 Today's price: ₹${price}/quintal\n` +
    `🎯 Your target: ₹${targetPrice}/quintal\n\n` +
    `Good time to sell! Check all mandi prices:\n` +
    `${process.env.NEXT_PUBLIC_APP_URL}/farmer`

  return sendWhatsApp({ to, message })
}

/**
 * Send daily morning price update
 */
export async function sendDailyUpdate({ to, commodity, prices }) {
  const top3 = prices.slice(0, 3)
  const lines = top3.map((p, i) =>
    `${i + 1}. ${p.market}: ₹${p.modalPrice}/qtl`
  ).join('\n')

  const message =
    `🌅 *Good morning! Today's ${commodity} prices*\n\n` +
    `${lines}\n\n` +
    `Best rate at: *${top3[0]?.market}*\n` +
    `View all mandis: ${process.env.NEXT_PUBLIC_APP_URL}/farmer`

  return sendWhatsApp({ to, message })
}

// ── Core sender ───────────────────────────────────────────────────────────

async function sendWhatsApp({ to, message }) {
  // Format number: 9876543210 → whatsapp:+919876543210
  const toFormatted = to.startsWith('whatsapp:')
    ? to
    : `whatsapp:+91${to.replace(/\D/g, '')}`

  const body = new URLSearchParams({
    From: fromNumber,
    To:   toFormatted,
    Body: message,
  })

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type':  'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    }
  )

  const result = await res.json()
  if (result.error_code) throw new Error(result.message)
  return result
}
