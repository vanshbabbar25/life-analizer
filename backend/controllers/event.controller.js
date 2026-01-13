import LifeEvent from "../models/LifeEvent.js";

export const createEvent = async(req, res,next)=>{
    try {
        const{type,value,intensity,occurredAt} = req.body;
        if(!type){
            return res.status(400).json({
                message:"event and time is require"
            })
        }
        const event = await LifeEvent.create({
            userId: req.user.id, type,value,intensity,occurredAt
        });
        res.status(201).json({
            message:"life event recorded",event
        });
    } catch (error) {
        next(error);
    }
}

export const getEvent = async(req, res,next)=>{
    try {
        const{startDate,endDate,type} = req.query;
        const query = {userId: req.user.id};
        if(type)query.type = type;
        if(startDate || endDate){
            query.occuredAat = {};
            if(startDate)query.occuredAat.$gte = new Date(startDate);
            if(endDate)query.occuredAat.$lte = new Date(endDate);
        }
        const events = await LifeEvent.find(query).sort({ occurredAt: -1 });
        res.status(200).json({ events });

    } catch (error) {
        next(error);
    }
}

export const deleteEvent = async(req, res,next)=>{
    try {
        const event2 = await LifeEvent.findById(req.params.id);
        if(!event2){
            return res.status(400).json({
                message: "event not found"
            })
        }
        LifeEvent.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        res.status(200).json({
            message: "Event deleted"
        });
    } catch (error) {
        next(error);
    }
}