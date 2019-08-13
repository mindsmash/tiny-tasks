import { HelperUtlis } from './helper-utlis.service';

describe('HelperUtlis', () => {
  let helperUtlis: HelperUtlis;

  beforeEach(() => {
    helperUtlis = new HelperUtlis();
  });

  it('should call callback funtion after amount of debounce time when immediate is false', (done) => {
    let testFunc = jasmine.createSpy('testFuncDebounce');
    let debounceFun = helperUtlis.debounce(testFunc,400,false);
    debounceFun();
    setTimeout(() => {
      expect(testFunc).toHaveBeenCalled();
      done();
    }, 500);
  });

  it('should not call callback funtion before amount of debounce time when immediate is false', (done) => {
    let testFunc = jasmine.createSpy('testFuncDebounce');
    let debounceFun = helperUtlis.debounce(testFunc,400,false);
    debounceFun();
    setTimeout(() => {
      expect(testFunc).not.toHaveBeenCalled();
      done();
    }, 200);
  });

  it('should call callback funtion immediately when immediate is false', () => {
    let testFunc = jasmine.createSpy('testFuncDebounce');
    let debounceFun = helperUtlis.debounce(testFunc,400,true);
    debounceFun();
      expect(testFunc).toHaveBeenCalled();
  });

});
