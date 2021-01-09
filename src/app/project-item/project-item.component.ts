import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostListener,
  ElementRef,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';
import { BroadcastService } from '../shared/services/broadcast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SmoothScrollingService } from '../shared/services/smooth-scrolling.service';

const cardLayoutBreakpoint = '(max-width: 1270px)';

@UntilDestroy()
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
    .observe(cardLayoutBreakpoint)
    .pipe(pluck('matches'), shareReplay(1));

  public isEnlarged = false;

  private readonly id = Math.random().toString(36).slice(2);

  constructor(
    private readonly smoothScrollingService: SmoothScrollingService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly elementRef: ElementRef,
    private readonly broadcastService: BroadcastService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {
    this.watchSiblings();
  }

  public toggleEnlarge(event: Event): void {
    if (this.breakpointObserver.isMatched(cardLayoutBreakpoint)) {
      event.stopPropagation();

      this.isEnlarged = !this.isEnlarged;

      if (this.isEnlarged) {
        this.broadcastService.broadcast(this.id);

        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.smoothScrollingService.scrollElementIntoView(
              this.elementRef.nativeElement,
              'center'
            );
          }, 250);
        });
      }
    }
  }

  @HostListener('document:click') private deflate(): void {
    this.isEnlarged = false;
  }

  private watchSiblings(): void {
    this.broadcastService
      .listen()
      .pipe(untilDestroyed(this))
      .subscribe((event) => {
        if (event !== this.id && this.isEnlarged) {
          this.isEnlarged = false;
          this.changeDetector.detectChanges();
        }
      });
  }
}
