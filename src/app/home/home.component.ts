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
      <ss-message-list
        [messages]="messageService.messages()"
        [activeUser]="authService.user()"
      />
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
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }

      mat-toolbar {
        box-shadow: 0px -7px 11px 0px var(--accent-color);
      }

      ss-message-list {
        height: 100%;
        width: 100%;
      }

      ss-message-input {
        position: fixed;
        bottom: 0;
      }
    `,
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
