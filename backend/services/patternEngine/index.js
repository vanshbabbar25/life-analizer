import LifeEvent from "../../models/LifeEvent.js";
import DailyOutcome from "../../models/DailyOutcome.js";
import {normalizeEvents} from "./eventNormalizer.js";
import {calculateBaseline} from "./baselineCalculator.js";
import {matchWindows} from "./windowMatcher.js";
import {calculateConfidence} from "./confidenceCalculator.js";
import {buildInsight} from "./insightBuilder.js";

const timeWindow = [1,2,3];
const minOccurance = 3;

export const generatePatterns = async(userId)=>{
    const events = await LifeEvent.find({userId}).lean();
    const outcomes = await DailyOutcome.find({userId}).lean();
    if(!events || !outcomes)return[];
    const baseline = calculateBaseline(outcomes);
    const groupedEvents = normalizeEvents(events);
    const insights = [];
    const eventTypes = Object.keys(groupedEvents);

    for(let i=0;i<eventTypes.length;i++){
       const eventType = eventTypes[i];
       const eventList = groupedEvents[eventType];
       if(eventList.length<minOccurance)continue;

       for(let j=0;j<timeWindow;j++){
        const days = timeWindow[j];
        const impacts = matchWindows(eventList,outcomes,baseline,days);
        if(impacts.length === 0)continue;

        const confidence = calculateConfidence(impacts.length,eventList.length);
        if(confidence<0.5)continue;

        const insight = buildInsight(eventType,impacts,days,confidence);
        if(insight !== null)insights.push(insight);
       }
    }
}