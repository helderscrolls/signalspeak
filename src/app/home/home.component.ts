import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/data-access/auth.service';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponent } from './ui/message-input.component';
import { MessageListComponent } from './ui/message-list.component';
@Component({
  standalone: true,
  selector: 'ss-home',
  template: `
    <div class="container">
      <mat-toolbar color="primary">
        <span class="spacer"></span>
        <button mat-icon-button (click)="authService.logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <ss-message-list [messages]="messageService.messages()" />
      <ss-message-input (send)="messageService.add$.next($event)" />
    </div>
  `,
  imports: [
    MessageListComponent,
    MessageInputComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
})
export default class HomeComponent {
  public messageService = inject(MessageService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
