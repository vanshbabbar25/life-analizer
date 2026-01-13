export const matchWindows = (events,outcomes,baseline,days)=>{
    const impacts =[];
    events.forEach(event=>{
        const start = event.occurredAt;
        const end = new Date(start);
        end.setDate(end.getDate()+days);

        outcomes.forEach(outcome=>{
           const date = new Date(outcome.date);
           if(date<start || date>end)return;

           impacts.push({
              mood:(outcome.mood ?? baseline.mood)-baseline.mood,
              productivity: (outcome.productivity ?? baseline.productivity) - baseline.productivity,
              focus: (outcome.focus ?? baseline.focus) - baseline.focus,
              energy: (outcome.energy ?? baseline.energy) - baseline.energy
           });
        });
    });
    return impacts;
};