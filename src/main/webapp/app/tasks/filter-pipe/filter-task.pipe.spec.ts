import { FilterTaskPipe } from './filter-task.pipe';

describe('FilterTaskPipe', () => {
  let filterPipe: FilterTaskPipe;

  const arrToBeFiltered = [
    {id: '1', name: 'Mark'},
    {id: '2', name: 'Tony'},
    {id: '3', name: 'Stas'},
    {id: '4', name: 'Hana Joe Sarah'}
  ];

  beforeEach(() => {
    filterPipe = new FilterTaskPipe();
  });

  it('create an instance', () => {
    expect(filterPipe).toBeTruthy();
  });

  it('should return empty array if no items found', () => {
    // given
    const filterText = 'Mike';

    // then
    const filtered = filterPipe.transform(arrToBeFiltered, filterText);

    // expected
    expect(filtered).toEqual([]);
  });

  it('should return array with 1 found element', () => {
    // given
    const filterText = 'Stas';

    // then
    const filtered = filterPipe.transform(arrToBeFiltered, filterText);

    // expected
    expect(filtered).toEqual([{id: '3', name: 'Stas'}]);
  });

  it('should return array with 2 found element using operator OR', () => {
    // given
    const filterText = 'Stas OR Mark';

    // then
    const filtered = filterPipe.transform(arrToBeFiltered, filterText);

    // expected
    expect(filtered).toEqual([{id: '1', name: 'Mark'}, {id: '3', name: 'Stas'}]);
  });

  it('should return array with 1 found element using operator AND', () => {
    // given
    const filterText = 'Hana AND Sarah';

    // then
    const filtered = filterPipe.transform(arrToBeFiltered, filterText);

    // expected
    expect(filtered).toEqual([{id: '4', name: 'Hana Joe Sarah'}]);
  });
});
