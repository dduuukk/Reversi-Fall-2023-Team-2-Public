const Prototype = require('../model/prototype.js');
jest.setTimeout(5000);

describe('Prototype class testing', () => {
    var prototype;

    test("deepCopy", () => {
        //test copy of array
        prototype = new Prototype();
        var testArray = [1, 2, 3];
        var result = prototype.deepCopy(testArray);
        expect(result).toStrictEqual([1, 2, 3]);
    });

    test("deepCopyObject", () => {
        //test copy of array
        var testArray = [[1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],];
        var result = prototype.deepCopyObject(testArray);
        expect(result).toStrictEqual([[1, 2, 3],
                                    [4, 5, 6],
                                    [7, 8, 9],]);
    });

});