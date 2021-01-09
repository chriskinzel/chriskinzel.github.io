import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  private readonly events$ = new Subject<string>();

  public broadcast(event: string): void {
    this.events$.next(event);
  }

  public listen(): Observable<string> {
    return this.events$.asObservable();
  }
}
