import mongoose from"mongoose";
const dailyOutcomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true, index: true },
  date: { type: Date, required: true},
  mood: { type: Number, min: 1, max: 5 },
  productivity: { type: Number, min: 1, max: 5 },
  focus: { type: Number, min: 1, max: 5 },
  energy: { type: Number, min: 1, max: 5 }, 
}, { timestamps: true });

dailyOutcomeSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyOutcome", dailyOutcomeSchema);
