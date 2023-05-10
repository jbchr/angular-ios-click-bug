import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Angular iOS Click Bug Demo</h1>
    <p> In all browsers clicking the 'Hello' button will trigger an alert immediately.</p>
    <p> But in iOS Safari two clicks are needed. However this only happens if the dynamic view inside the ngIf contains an interactive element.<p>
    <p> If you remove the click listener manually it will work.</p>
    <button (click)="alert('test')">Hello</button>
    <div *ngIf="active$ | async"><span (click)="alert('you clicked the span')">Some interactive element</span></div>
  `
})
export class AppComponent {
  activeSubject = new BehaviorSubject<boolean>(false);
  active$ = this.activeSubject.asObservable();
  alert = alert;

  constructor() {
      window.addEventListener('touchstart', () => this.setActive());
      window.addEventListener('mousedown', () => this.setActive());
  }

  setActive() {
    if (!this.activeSubject.getValue()) {
      this.activeSubject.next(true);
    }
  }
}
