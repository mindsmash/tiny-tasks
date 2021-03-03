import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('Storage Service', () => {
  let storageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'StorageService',
          useValue: {},
        },
        StorageService,
      ]
    });

    storageService = TestBed.inject(StorageService);
  });


  it('save() should call localStorage.setItem with correct value', () => {
    const service = new StorageService();
    const spy = spyOn(localStorage, 'setItem');
    const expectedValue = ['key', 'value'];
    service.save('key', 'value', 'local');
    expect(spy.calls.argsFor(0)).toEqual(expectedValue);
  });

  it('save() should call sessionStorage.setItem with correct value', () => {
    const service = new StorageService();
    const spy = spyOn(sessionStorage, 'setItem');
    const expectedValue = ['key', 'value'];
    service.save('key', 'value', 'session');
    expect(spy.calls.argsFor(0)).toEqual(expectedValue);
  });

  it('remove() should call localStorage.removeItem with correct value', () => {
    const service = new StorageService();
    const spy = spyOn(localStorage, 'removeItem');
    const expectedValue = ['key'];
    service.remove('key', 'local');
    expect(spy.calls.argsFor(0)).toEqual(expectedValue);
  });

  it('remove() should call sessionStorage.removeItem with correct value', () => {
    const service = new StorageService();
    const spy = spyOn(sessionStorage, 'removeItem');
    const expectedValue = ['key'];
    service.remove('key', 'session');
    expect(spy.calls.argsFor(0)).toEqual(expectedValue);
  });

  it('get() should call localStorage.getItem with correct value', () => {
    const service = new StorageService();
    const spy = spyOn(localStorage, 'getItem');
    const expectedValue = ['key'];
    service.get('key', 'local');
    expect(spy.calls.argsFor(0)).toEqual(expectedValue);
  });

  it('get() should call sessionStorage.getItem with correct value', () => {
    const service = new StorageService();
    const spy = spyOn(sessionStorage, 'getItem');
    const expectedValue = ['key'];
    service.get('key', 'session');
    expect(spy.calls.argsFor(0)).toEqual(expectedValue);
  });

  it('exists() should call localStorage.getItem and return true', () => {
    const service = new StorageService();
    service.save('key', 'value', 'local');
    const result = service.exists('key', 'local');
    expect(result).toBe(true);
  });

  it('exists() should call sessionStorage.getItem and return true', () => {
    const service = new StorageService();
    service.save('key', 'value', 'session');
    const result = service.exists('key', 'session');
    expect(result).toBe(true);
  });
});
