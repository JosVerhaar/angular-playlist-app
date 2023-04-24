import { TestBed } from '@angular/core/testing';

import { ToastInfo, ToastService, ToastType } from './toast.service';
import { createTestToast } from '../../../test/test-objects';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    let testToast: ToastInfo;
    beforeEach(() => {
      testToast = createTestToast();
    });

    it('should set the type to the default \'success\'', () => {
      testToast.type = null;
      service.show(testToast);
      expect(testToast.type).toBe(ToastType.success);
    });

    it('can show a Toast with each type', () => {
      Object.keys(ToastType).forEach(obj => {
        service.show(testToast, ToastType[obj]);
        expect(testToast.type).toBe(ToastType[obj]);
      });
    });

    it('sets the given type', () => {
      service.show(testToast, ToastType.warning);
      expect(testToast.type).toBe(ToastType.warning);
    });
  });

  describe('showGeneralError', () => {
    it('should add a toast to the toasts array', () => {
      service.showGeneralError();
      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].type).toBe(ToastType.error);
    });
  });

  describe('delete', () => {
    let testToast_01: ToastInfo = createTestToast();
    let testToast_02: ToastInfo = createTestToast();

    beforeEach(() => {
      service.show(testToast_01, ToastType.warning);
      service.show(testToast_02);
    });

    it('it should delete the right toast', () => {
      expect(service.toasts.length).toBe(2);
      service.delete(testToast_02);
      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0]).toBe(testToast_01);
    });
  });

  afterEach(() => {
    service.toasts = [];
  });
});
