import { Injectable } from '@angular/core';

@Injectable()
export class SmoothScrollingService {
  private scrollHost: Element | undefined;

  public setScrollHost(host: Element): void {
    this.scrollHost = host;
  }

  public scrollElementIntoView(
    target: Element,
    padding: number | 'center' = 0
  ): void {
    if (!this.scrollHost) {
      throw new Error('Scroll host is not set');
    }

    const offset =
      typeof padding === 'number'
        ? padding
        : target.getBoundingClientRect().height / 4;

    this.scrollHost.scroll({
      top:
        target.getBoundingClientRect().y + this.scrollHost.scrollTop - offset,
      behavior: 'smooth',
    });
  }
}
