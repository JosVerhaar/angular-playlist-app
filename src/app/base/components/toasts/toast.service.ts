import { Injectable } from '@angular/core';
import { $localize } from '@angular/localize/init';

export enum ToastType {
  success, error, warning
}

export interface ToastInfo {
  header: string,
  body: string,
  type?: ToastType,
  delay?: number,
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: ToastInfo[] = [];

  show(toast: ToastInfo, toastType?: ToastType) {
    toast.type = toastType ?? ToastType.success;
    this.toasts.push(toast);
  }

  showGeneralError() {
    this.toasts.push({
        header: $localize`There has been an error`,
        body: $localize`There went something wrong with the request. Please try again.`,
        type: ToastType.error
      }
    )
  }

  delete(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
