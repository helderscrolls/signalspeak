import { Component, inject } from '@angular/core';
import { RegisterService } from './data-access/register.service';
import { RegisterFormComponent } from './ui/register-form.component';

@Component({
  standalone: true,
  template: `
    <div class="container gradient-bg">
      <ss-register-form
        [status]="registerService.status()"
        (register)="registerService.createUser$.next($event)"
      />
    </div>
  `,
  providers: [RegisterService],
  imports: [RegisterFormComponent],
})
export default class RegisterComponent {
  public registerService = inject(RegisterService);
}
