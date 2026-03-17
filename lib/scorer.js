export function calculateCreditScore(business) {
  let score = 0
  const breakdown = []

  // ── 1. GST Compliance (0–25 points) ──────────────────────────────────────
  // Consistent GST filing = disciplined business
  const gstScore = scoreGST(business.gstReturnsFiled, business.gstReturnsOnTime)
  score += gstScore.points
  breakdown.push(gstScore)

  // ── 2. Business Age (0–20 points) ────────────────────────────────────────
  const ageScore = scoreAge(business.yearsInOperation)
  score += ageScore.points
  breakdown.push(ageScore)

  // ── 3. UPI Transaction Volume (0–25 points) ───────────────────────────────
  // Monthly UPI volume = proxy for real revenue (banks can't see cash)
  const upiScore = scoreUPI(business.monthlyUpiVolume)
  score += upiScore.points
  breakdown.push(upiScore)

  // ── 4. Utility Bills on Time (0–15 points) ───────────────────────────────
  const utilityScore = scoreUtility(business.utilityBillsOnTime)
  score += utilityScore.points
  breakdown.push(utilityScore)

  // ── 5. Bank Account Age (0–15 points) ────────────────────────────────────
  const bankScore = scoreBank(business.bankAccountAgeYears)
  score += bankScore.points
  breakdown.push(bankScore)

  const grade = getGrade(score)

  return {
    score,                          // 0–100
    grade,                          // A / B / C / D
    label: grade.label,
    color: grade.color,
    breakdown,                      // per-factor breakdown
    eligibleSchemes: matchSchemes(score),
    improvements:    getImprovements(breakdown),
    summary: getSummary(score),
  }
}

// ── Scoring functions ─────────────────────────────────────────────────────

function scoreGST(total, onTime) {
  const compliance = total > 0 ? (onTime / total) * 100 : 0
  let points = 0
  let status = ''

  if (compliance >= 90) { points = 25; status = 'Excellent — filed on time consistently' }
  else if (compliance >= 70) { points = 15; status = 'Good — mostly on time' }
  else if (compliance >= 50) { points = 8;  status = 'Average — some delays' }
  else                       { points = 0;  status = 'Poor — frequent delays hurt your score' }

  return {
    factor: 'GST compliance',
    points,
    maxPoints: 25,
    status,
    icon: '📋',
    improve: compliance < 90 ? 'File all pending GST returns to improve this score' : null,
  }
}

function scoreAge(years) {
  let points = 0
  let status = ''

  if (years >= 5)      { points = 20; status = '5+ years — well established' }
  else if (years >= 3) { points = 13; status = '3+ years — growing business' }
  else if (years >= 1) { points = 7;  status = '1+ year — early stage' }
  else                 { points = 2;  status = 'Less than a year — new business' }

  return {
    factor: 'Business age',
    points,
    maxPoints: 20,
    status,
    icon: '📅',
    improve: years < 5 ? 'Score improves automatically as your business grows' : null,
  }
}

function scoreUPI(monthlyVolume) {
  let points = 0
  let status = ''

  if (monthlyVolume >= 500000)      { points = 25; status = `₹${fmt(monthlyVolume)}/mo — high volume` }
  else if (monthlyVolume >= 200000) { points = 18; status = `₹${fmt(monthlyVolume)}/mo — good volume` }
  else if (monthlyVolume >= 50000)  { points = 12; status: `₹${fmt(monthlyVolume)}/mo — medium volume` }
  else if (monthlyVolume >= 10000)  { points = 5;  status = `₹${fmt(monthlyVolume)}/mo — low volume` }
  else                              { points = 0;  status = 'Very low UPI usage detected' }

  return {
    factor: 'Monthly UPI transactions',
    points,
    maxPoints: 25,
    status,
    icon: '💳',
    improve: monthlyVolume < 200000
      ? 'Encourage customers to pay via UPI — every transaction builds your profile'
      : null,
  }
}

function scoreUtility(onTime) {
  const points = onTime ? 15 : 0
  return {
    factor: 'Utility bills paid on time',
    points,
    maxPoints: 15,
    status: onTime ? 'All bills paid on time' : 'Late payments detected',
    icon: '⚡',
    improve: !onTime ? 'Set up auto-pay for electricity and water bills' : null,
  }
}

function scoreBank(years) {
  let points = 0
  if (years >= 5)      points = 15
  else if (years >= 3) points = 10
  else if (years >= 1) points = 5
  else                 points = 0

  return {
    factor: 'Bank account age',
    points,
    maxPoints: 15,
    status: `${years} year${years !== 1 ? 's' : ''} with same bank`,
    icon: '🏦',
    improve: years < 3 ? 'Maintain the same bank account — history matters' : null,
  }
}

// ── Grade system ──────────────────────────────────────────────────────────

function getGrade(score) {
  if (score >= 80) return { grade: 'A', label: 'Excellent',  color: '#0F6E56', bg: '#E1F5EE' }
  if (score >= 60) return { grade: 'B', label: 'Good',       color: '#854F0B', bg: '#FAEEDA' }
  if (score >= 40) return { grade: 'C', label: 'Fair',       color: '#185FA5', bg: '#E6F1FB' }
  return                  { grade: 'D', label: 'Needs work', color: '#A32D2D', bg: '#FCEBEB' }
}

// ── Government schemes matching ────────────────────────────────────────────
// Only shows schemes the business actually qualifies for

const SCHEMES = [
  {
    name: 'PM Mudra Loan – Shishu',
    amount: '₹50,000',
    minScore: 15,
    interestRate: '10–12%',
    url: 'https://mudra.org.in',
    desc: 'For very early stage micro businesses',
  },
  {
    name: 'PM Mudra Loan – Kishore',
    amount: '₹5 lakh',
    minScore: 35,
    interestRate: '11–13%',
    url: 'https://mudra.org.in',
    desc: 'For growing businesses needing working capital',
  },
  {
    name: 'PM Mudra Loan – Tarun',
    amount: '₹10 lakh',
    minScore: 55,
    interestRate: '12–14%',
    url: 'https://mudra.org.in',
    desc: 'For established businesses looking to expand',
  },
  {
    name: 'CGTMSE (Collateral-free loan)',
    amount: '₹2 crore',
    minScore: 60,
    interestRate: '9–11%',
    url: 'https://cgtmse.in',
    desc: 'No collateral needed — guarantee by govt',
  },
  {
    name: 'Stand-Up India',
    amount: '₹1 crore',
    minScore: 50,
    interestRate: 'Base rate + 3%',
    url: 'https://standupmitra.in',
    desc: 'For SC/ST/Women entrepreneurs',
  },
  {
    name: 'PSB Loans in 59 Minutes',
    amount: '₹5 crore',
    minScore: 65,
    interestRate: '8.5% onwards',
    url: 'https://psbloansin59minutes.com',
    desc: 'Instant in-principle approval using GST + ITR data',
  },
]

export function matchSchemes(score) {
  return SCHEMES.filter(s => score >= s.minScore)
}

// ── Helpers ───────────────────────────────────────────────────────────────

function getImprovements(breakdown) {
  return breakdown
    .filter(b => b.improve)
    .map(b => ({ factor: b.factor, tip: b.improve }))
}

function getSummary(score) {
  if (score >= 80) return 'Your business has a strong credit profile. You qualify for the best loan schemes.'
  if (score >= 60) return 'Good profile. A few improvements will unlock better loan amounts and rates.'
  if (score >= 40) return 'Fair profile. Focus on the improvements below to qualify for more schemes.'
  return 'Your score needs improvement. Start with GST compliance and UPI adoption.'
}

function fmt(n) {
  return new Intl.NumberFormat('en-IN').format(n)
}
