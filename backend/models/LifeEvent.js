import mongoose from"mongoose";

const lifeEventSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,ref :"User",required:true,index:true
   },
   type:{
    type: String,
    required: true,
    enum: ["sleep", "alcohol", "conflict", "isolation", "study", "spending","exercise","custom"]
   },
   value: {type:Number, default: null},
   intensity: {type: Number,min: 1,max: 5,default: 3},
   occurredAt: Date
},{ timestamps: true });

lifeEventSchema.index({ userId: 1, occurredAt: 1 });
export default mongoose.model("LifeEvent",lifeEventSchema);