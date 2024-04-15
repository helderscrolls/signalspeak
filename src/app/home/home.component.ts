import { Component, inject } from '@angular/core';
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponent } from './ui/message-input.component';
import { MessageListComponent } from './ui/message-list.component';

@Component({
  standalone: true,
  selector: 'ss-home',
  template: `
    <div class="container">
      <ss-message-list [messages]="messageService.messages()"></ss-message-list>
      <ss-message-input
        (send)="messageService.add$.next($event)"
      ></ss-message-input>
    </div>
  `,
  imports: [MessageListComponent, MessageInputComponent],
})
export default class HomeComponent {
  messageService = inject(MessageService);
}
