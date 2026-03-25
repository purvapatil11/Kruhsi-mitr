// app/api/score/route.js
import { calculateMSMEScore } from '@/lib/scorer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()

  const result = calculateMSMEScore({
    turnover: Number(body.turnover) || 0,
    investment: Number(body.investment) || 0,
    monthlyTransactions: Number(body.monthlyTransactions) || 0,
    repaymentScore: Number(body.repaymentScore) || 0, // 0–100
    yearsOfBusiness: Number(body.yearsOfBusiness) || 0,
    bankAge: Number(body.bankAge) || 0,
  })

  return NextResponse.json(result)
}