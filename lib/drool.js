module.exports = exports = function(s) { s = s || ''; return Object.create(o, {
    number : { value: intAfter(s, 0)              || 1, writeable: true },
    sides  : { value: intAfter(s, s.indexOf('d')) || 6, writeable: true },
    times  : { value: intAfter(s, s.indexOf('#')) || 1, writeable: true },
    low    : { value: intAfter(s, s.indexOf('l')) || 0, writeable: true },
    high   : { value: intAfter(s, s.indexOf('h')) || 0, writeable: true },
    explode: { value: intAfter(s, s.indexOf('e')) || 0, writeable: true },
    reroll : { value: intAfter(s, s.indexOf('r')) || 0, writeable: true }
});};

var o = Object.create({}, { roll : { value: function(transform) {
    var r = [], i, j, v, sides = this.sides, low = this.low, high = this.high,
        reroll  = this.reroll  < sides ? this.reroll  : 0,
        explode = this.explode > 1     ? this.explode : 0;
    for (i = 0; i < this.times; i++) {
        r[i] = [];
        for (j = 0; j < this.number; j++) {
            do { v = rollDie(sides); } while (reroll && v <= reroll);
            r[i].push(v);
            while (explode && v >= explode) r[i].push(v = rollDie(sides));
        }
        r[i] = r[i].sort(descending).slice(-(low || 0), high || r[i].length);
        if (typeof transform === 'function') r[i] = transform.apply(this, r[i]);
    }
    return  r.length !== 1 ? r : r[0].length !== 1 ? r[0] : r[0][0];
}}});

function intAfter(s, i) { return i !== -1 ? parseInt(s.slice(i+1), 10) : NaN; }
function rollDie(sides) { return Math.floor(Math.random() * sides) + 1; }
function descending(a, b) { return b - a; }
