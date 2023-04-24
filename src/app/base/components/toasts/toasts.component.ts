import { Component } from '@angular/core';
import { ToastService, ToastType } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  public ToastType = ToastType;

  constructor(public toastService: ToastService) {
  }
}
