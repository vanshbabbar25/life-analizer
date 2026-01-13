import DailyOutcome from "../models/DailyOutcome.js";

export const createOrUpdateOutcome = async(req,res,next)=>{
    try {
        const{date,mood,productivity,focus,energy} = req.body;
        if(!date) return res.status(400).json({message: "date is reqquired"});
           const normalizedDate = (date) => {
           const d = new Date(date);
           d.setUTCHours(0, 0, 0, 0);
           return d;
        };


        const outcome = await DailyOutcome.findOneAndUpdate({userId:req.user.id, date: normalizedDate},
            {mood,productivity,focus,energy},{new: true,upsert:true}
        );

        res.status(200).json(outcome);
    } catch (error) {
        next(error);
    }
}

export const getMyOutcome = async(req,res,next)=>{
    try {
        const{startDate,endDate} = req.query;
        const filter = {userId: req.user.id};
        if(startDate && endDate){
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            filter.date = {
                $gte: start,
                $lte: end
            };
        }

        const outcome = await DailyOutcome.find(filter).sort({date:-1});
        res.status(200).json(outcome);
    } catch (error) {
        next(error);
    }
}

export const getLatestOutcome = async(req,res,next)=>{
    try {
        const outcome = await DailyOutcome.findOne({userId: req.user.id}).sort({date:-1});
        res.status(200).json(outcome);
    } catch (error) {
        next(error);
    }
}

export const deleteOutcome = async(req,res,next)=>{
    try {
        const { date } = req.params;
        if (!date) {
            return res.status(400).json({ message: "date is required" });
        }
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        await DailyOutcome.findOneAndDelete({
            userId: req.user.id,
            date: normalizedDate
        });

        res.status(200).json({ message: "Outcome deleted" });
    } catch (error) {
        next(error);
    }
}