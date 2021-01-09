import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'ck-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectItemComponent {
  @Input() name: string;
  @Input() imageUrl: string;

  @Input() usesAngular: boolean;
  @Input() usesAWS: boolean;
  @Input() usesiOS: boolean;
  @Input() usesAndroid: boolean;
  @Input() usesRails: boolean;
  @Input() usesNodeJs: boolean;
  @Input() usesSpark: boolean;
  @Input() usesWebGL: boolean;

  public readonly shouldUseCardDisplay: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 690px)')
    .pipe(pluck('matches'), shareReplay(1));

  constructor(private readonly breakpointObserver: BreakpointObserver) {}
}
