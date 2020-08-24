// Declare Variables
const user = this;
const skill = arguments[0];
let cost = 0;

// Calculations
const note = skill.note;
if (note.match(/<AC COST:[ ](\d+)>/i)) {
    cost += Number(RegExp.$1);
}
if (note.match(/<JS AC COST>\s*([\s\S]*)\s*<\/JS AC COST>/i)) {
    const code = String(RegExp.$1);
    eval(code);
}

// Apply Trait Cost Alterations
if (cost > 0) {
    const rateNote = /<AC COST:[ ](\d+\.?\d*)([%％])>/i;
    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));
    const flatNote = /<AC COST:[ ]([\+\-]\d+)>/i;
    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));
    cost = rates.reduce((r, rate) => r * rate, cost);
    cost = flats.reduce((r, flat) => r + flat, cost);
    cost = Math.max(1, cost);
}

// Set Cost Limits
if (note.match(/<AC COST MAX:[ ](\d+)>/i)) {
    cost = Math.min(cost, Number(RegExp.$1));
}
if (note.match(/<AC COST MIN:[ ](\d+)>/i)) {
    cost = Math.max(cost, Number(RegExp.$1));
}

// Return cost value
return Math.round(Math.max(0, cost));