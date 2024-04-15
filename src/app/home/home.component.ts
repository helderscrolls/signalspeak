import { Component, inject } from '@angular/core';
import { MessageService } from '../shared/data-access/message.service';
import { MessageListComponent } from './ui/message-list.component';

@Component({
  standalone: true,
  selector: 'ss-home',
  template: `
    <div class="container">
      <ss-message-list [messages]="messageService.messages()"></ss-message-list>
    </div>
  `,
  imports: [MessageListComponent],
})
export default class HomeComponent {
  messageService = inject(MessageService);
}
