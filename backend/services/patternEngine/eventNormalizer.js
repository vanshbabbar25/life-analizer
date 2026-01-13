export const normalizeEvents=(events)=>{
    const grouped=[];
    
    for(let i=0;i<events.length;i++){
        const event = events[i];
        if(!grouped[event.type]){
            grouped[event.type] = [];
        }
        grouped[event.type].push({
            occuredAt: new Date(event.occuredAt),
            intensity: event.intensity || 1
        });
    }
    return grouped;
}