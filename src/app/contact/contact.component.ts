import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';

@Component({
  selector: 'ck-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  public readonly githubIcon = faGithub;
  public readonly linkedInIcon = faLinkedin;
}
