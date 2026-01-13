export const calculateBaseline=(outcomes)=>{
    const totals = {mood:0, productivity:0, focus:0, energy:0};
    const counts = {mood:0, productivity:0, focus:0, energy:0};

    outcomes.forEach(o=>{
        if (o.mood != null) {
           totals.mood += o.mood;
           counts.mood++;
        }
        if (o.productivity != null) {
           totals.productivity += o.productivity;
           counts.productivity++;
        }
        if (o.focus != null) {
           totals.focus += o.focus;
           counts.focus++;
        }
        if (o.energy != null) {
           totals.energy += o.energy;
           counts.energy++;
        }
    });
    return {
        mood: counts.mood ? totals.mood / counts.mood : 0,
        productivity: counts.productivity ? totals.productivity / counts.productivity : 0,
        focus: counts.focus ? totals.focus / counts.focus : 0,
        energy: counts.energy ? totals.energy / counts.energy : 0
    };
}