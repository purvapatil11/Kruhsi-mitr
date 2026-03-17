import mongoose from 'mongoose'

const AlertSchema = new mongoose.Schema({
  phone:       { type: String, required: true },
  commodity:   { type: String, required: true },
  state:       { type: String, default: 'Maharashtra' },
  targetPrice: { type: Number, required: true },
  triggered:   { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
})

export const Alert = mongoose.models.Alert || mongoose.model('Alert', AlertSchema)

// ── MSME Business model ───────────────────────────────────────────────────

const BusinessSchema = new mongoose.Schema({
  // Basic info
  ownerName:         { type: String, required: true },
  businessName:      { type: String, required: true },
  phone:             { type: String, required: true },
  city:              { type: String, required: true },
  category:          { type: String }, // kirana / manufacturing / services / etc.

  // Credit signals
  yearsInOperation:      { type: Number, default: 0 },
  gstReturnsFiled:       { type: Number, default: 0 },
  gstReturnsOnTime:      { type: Number, default: 0 },
  monthlyUpiVolume:      { type: Number, default: 0 },   // in rupees
  utilityBillsOnTime:    { type: Boolean, default: true },
  bankAccountAgeYears:   { type: Number, default: 0 },

  // Calculated score (stored after calculation)
  creditScore:   { type: Number },
  creditGrade:   { type: String },
  lastScored:    { type: Date },

  createdAt: { type: Date, default: Date.now },
})

export const Business = mongoose.models.Business || mongoose.model('Business', BusinessSchema)

