const assert = require('assert');
const { genMap, genFilter, genZip, genTimes, genTake } = require('..');


describe('func-generators', () => {
    const zeroToNine = genTimes(10);

    it('should generate sequences', () => {
        const values = Array.from(zeroToNine());
        
        assert.deepEqual(values, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    
    it('should map', () => {
        const odds = genMap(n => n * 2 + 1, zeroToNine);
        const values = Array.from(odds());
        
        assert.deepEqual(values, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
    });
    
    it('should filter', () => {
        const odds = genFilter(n => n % 2 === 1, zeroToNine);
        const values = Array.from(odds());
        
        assert.deepEqual(values, [1, 3, 5, 7, 9]);
    });
    
    it('should zip', () => {
        const pairs = genZip(
            genFilter(n => n % 2 === 0, zeroToNine),
            genFilter(n => n % 2 === 1, zeroToNine)
        );
        const values = Array.from(pairs());
        
        assert.deepEqual(values, [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]);
    });
    
    it('should take', () => {
        const zeroToThree = genTake(4, zeroToNine);
        const values = Array.from(zeroToThree());
        
        assert.deepEqual(values, [0, 1, 2, 3]);
    });
});