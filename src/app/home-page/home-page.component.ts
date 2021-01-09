import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
} from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { merge, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck, shareReplay, take } from 'rxjs/operators';
import { SmoothScrollingService } from '../shared/services/smooth-scrolling.service';

@Component({
  selector: 'ck-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SmoothScrollingService],
})
export class HomePageComponent implements OnInit {
  public readonly githubIcon = faGithub;
  public readonly linkedInIcon = faLinkedin;
  public readonly emailIcon = faEnvelope;

  public readonly openDrawer = new EventEmitter<boolean>();
  public readonly shouldDefaultShowingDrawer: Observable<boolean> = this.breakpointObserver
    .observe('(min-width: 690px)')
    .pipe(pluck('matches'), shareReplay(1));

  public readonly shouldShowDrawer: Observable<boolean> = merge(
    this.shouldDefaultShowingDrawer,
    this.openDrawer
  );

  @ViewChild('sidenavContent', { read: ElementRef, static: true })
  private readonly sidenavElementRef: ElementRef;

  constructor(
    private readonly smoothScrollingService: SmoothScrollingService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.smoothScrollingService.setScrollHost(this.sidenavElement);
  }

  public scrollToAnchor(anchor: string): void {
    this.shouldDefaultShowingDrawer
      .pipe(take(1))
      .subscribe((doesDefaultShowDrawer) => {
        const scrollPad = doesDefaultShowDrawer ? 40 : 0;
        const target = document.body.querySelector(anchor);

        this.smoothScrollingService.scrollElementIntoView(target, scrollPad);

        if (!doesDefaultShowDrawer) {
          this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              this.openDrawer.emit(false);
            }, 250);
          });
        }
      });
  }

  private get sidenavElement(): HTMLElement {
    return this.sidenavElementRef.nativeElement;
  }
}
