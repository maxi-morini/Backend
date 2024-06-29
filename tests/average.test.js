const {test , describe} = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

describe('average',() => {
    test('de uno de los valores solo', () => {
        assert.strictEqual(average([1]),1)
    })

    test('un array', () => {
        assert.strictEqual(average([0,1,2,3,4,5,6]),3)
    })
    
    test('array vacio', () => {
        assert.strictEqual(average([]),0)
    })
})