import { flattenArray } from '../flattenArray'

describe('flattenArray', () => {
  it('returns []', () => {
    expect(flattenArray([])).toEqual([])
  })
  it('flattens [ 1, 4 ] -> [ 1, 4 ]', () => {
    expect(flattenArray([1, 4])).toEqual([1, 4])
  })
  it('flattens [ 1, 4, [2] ] -> [ 1, 4, 2 ]', () => {
    expect(flattenArray([1, 4, [2]])).toEqual([1, 4, 2])
  })
  it('flattens [ 1, [ 2, [ 3 ] ], 4 ] -> [ 1, 2, 3, 4 ]', () => {
    expect(flattenArray([1, [2, [3]], 4])).toEqual([1, 2, 3, 4])
  })
})
