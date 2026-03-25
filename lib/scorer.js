export function calculateMSMEScore(data) {
  const {
    turnover,
    investment,
    monthlyTransactions,
    repaymentScore,
    yearsOfBusiness,
    bankAge
  } = data

  // Normalize
  const turnoverScore = Math.min((turnover / 5000000) * 100, 100)
  const investmentScore = Math.min((investment / 1000000) * 100, 100)
  const transactionScore = Math.min((monthlyTransactions / 50000) * 100, 100)
  const experienceScore = Math.min((yearsOfBusiness / 10) * 100, 100)
  const bankScore = Math.min((bankAge / 5) * 100, 100)

  // Final Score
  const msmeScore =
    (0.30 * turnoverScore) +
    (0.20 * investmentScore) +
    (0.20 * transactionScore) +
    (0.15 * repaymentScore) +
    (0.10 * experienceScore) +
    (0.05 * bankScore)

  // Category
  let category = "Not MSME"

  if (turnover <= 5000000 && investment <= 1000000) {
    category = "Micro"
  } else if (turnover <= 50000000 && investment <= 10000000) {
    category = "Small"
  } else if (turnover <= 250000000 && investment <= 50000000) {
    category = "Medium"
  }

  // Status
  let status = "Not Ready"
  if (msmeScore >= 80) status = "MSME Ready"
  else if (msmeScore >= 60) status = "Near MSME Ready"
  else if (msmeScore >= 40) status = "Developing"

  return {
    score: Math.round(msmeScore),
    status,
    category
  }
}