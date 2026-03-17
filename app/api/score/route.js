// app/api/score/route.js
import { calculateCreditScore } from '@/lib/scorer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()

  const result = calculateCreditScore({
    ...body,
    yearsInOperation:    Number(body.yearsInOperation)    || 0,
    gstReturnsFiled:     Number(body.gstReturnsFiled)     || 0,
    gstReturnsOnTime:    Number(body.gstReturnsOnTime)    || 0,
    monthlyUpiVolume:    Number(body.monthlyUpiVolume)    || 0,
    bankAccountAgeYears: Number(body.bankAccountAgeYears) || 0,
  })

  return NextResponse.json(result)
}