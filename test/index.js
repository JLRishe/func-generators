const assert = require('assert');
const { genMap, genFilter, genZip, genTimes, genTake, genDrop, genHead, genLast, genInfinite, genLength, genTransform, genStop, genFrom, genToArray } = require('..');

const testArr = [1, 3, 6,'hello', { a: 1, b: 2 }];

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
    
    it('should drop', () => {
        const fourToNine = genDrop(4, zeroToNine);
        const values = Array.from(fourToNine());
        
        assert.deepEqual(values, [4, 5, 6, 7, 8, 9]);
    });
    
    it('should get the first element', () => {
        const gt5 = genFilter(n => n > 5, zeroToNine);
        
        assert.equal(genHead(gt5), 6);
    });
    
    it('should get the last element', () => {
        const lt5 = genFilter(n => n < 5, zeroToNine);
        
        assert.equal(genLast(lt5), 4);
    });

    it('should generate as many values as needed', () => {
        const firstSeven = Array.from(genTake(7, genInfinite())());
        
        assert.deepEqual(firstSeven, [0, 1, 2, 3, 4, 5, 6]);
        
        const oddsFrom7 = Array.from(genTake(4, genInfinite(7, 2))());
        
        assert.deepEqual(oddsFrom7, [7, 9, 11, 13]);
    });
    
    it('should determine length', () => {
        const values = genTake(28, genInfinite(9, 13));
        
        assert.equal(genLength(values), 28);
    });
    
    it('should transform', () => {
        const tf = genTransform(
            ({ a, b }) => ({ a: b + 1, b: a + 2 }),
            { a: 0, b: 0 }
        );
        const firstFive = genTake(5, tf);
        
        const values = Array.from(firstFive());
        
        assert.deepEqual(
            values,
            [
                { a: 0, b: 0 },
                { a: 1, b: 2 },
                { a: 3, b: 3 },
                { a: 4, b: 5 },
                { a: 6, b: 6 },
            ]
        );        
    });
    
    it('should stop transforming', () => {
        const tf = genTransform(
            ({ a, b }) => a > 3 ? genStop : ({ a: b + 1, b: a + 2 }),
            { a: 0, b: 0 }
        );
        
        const values = Array.from(tf());
        
        assert.deepEqual(
            values,
            [
                { a: 0, b: 0 },
                { a: 1, b: 2 },
                { a: 3, b: 3 },
                { a: 4, b: 5 },
            ]
        );        
    });

    it('should make generator functions', () => {
        assert.deepEqual(genToArray(genFrom(testArr)), testArr);

        const mapValues = [[1, 2], [4, 5]];

        assert.deepEqual(
            genToArray(genFrom(new Map(mapValues))),
            mapValues,
        );

        assert.deepEqual(
            genToArray(genFrom(new Set(testArr))),
            testArr,
        );
    });

    it('should convert generators to arrays', () => {
        assert.deepEqual(genToArray(genFrom(testArr)), testArr);

        assert.deepEqual(genToArray(genTimes(5)), [0, 1, 2, 3, 4]);
    });
});
