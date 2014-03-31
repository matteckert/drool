require('should');
var drool = require('../lib/drool');

describe('o', function() {
    it('should bad tests :(', function() {
        var dndCharacter = drool('4d6h3#6');
        console.log(dndCharacter.roll(sum));
        var whiteWolf = drool('8d10e10');
        console.log(whiteWolf.roll(ww));
    });
});

function greaterThan7(p, c) { return c > 7 ? p + 1 : p; }
function addPrevious(p, c) { return p += c; }

function ww() { return [].reduce.call(arguments, greaterThan7, 0); }
function sum() { return [].reduce.call(arguments, addPrevious, 0); }

