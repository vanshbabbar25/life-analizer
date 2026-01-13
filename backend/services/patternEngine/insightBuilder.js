export const buildInsight=(eventType,impacts,days,confidence)=>{
    let totalMood = 0;
    let totalProductivity=0;
    let totalFocus=0;
    let totalEnergy=0;

    for(let i=0;i<impacts.length;i++){
        totalMood += impacts[i].mood;
        totalProductivity += impacts[i].productivity;
        totalFocus += impacts[i].focus;
        totalEnergy += impacts[i].energy;
    }
    const count = impacts.length;
    const avgMood = +(totalMood / count).toFixed(2);
    const avgProductivity = +(totalProductivity / count).toFixed(2);
    const avgFocus = +(totalFocus / count).toFixed(2);
    const avgEnergy = +(totalEnergy / count).toFixed(2);

    let worstMetric = "mood";
    let worstValue = avgMood;

    if (avgProductivity < worstValue) {
        worstMetric = "productivity";
        worstValue = avgProductivity;
    }
    if (avgFocus < worstValue) {
        worstMetric = "focus";
        worstValue = avgFocus;
    }
    if (avgEnergy < worstValue) {
        worstMetric = "energy";
        worstValue = avgEnergy;
    }
    if(worstValue>=0)return null;

    return{
        Event: eventType,
        window: `${days*24}h`,
        impact:{mood:avgMood, productivity:avgProductivity,focus:avgFocus,energy:avgEnergy},
        confidence,
        message:`${eventType} is followed by a drop in ${worstMetric} within ${days*24} hours (confidence ${(confidence * 100).toFixed(0)}%)`
    };
};