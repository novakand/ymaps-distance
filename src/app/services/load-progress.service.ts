import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadProgressService {

  public get inProgress(): Observable<boolean> {
    return this._loaderSubject.asObservable();
  }

  private _loaderSubject = new Subject<boolean>();
  private _priority = 0;

  constructor() { }

  public show(priority: number = 0): void {
    this._priority =  priority > this._priority ? priority : this._priority;
    this._loaderSubject.next(true);
  }

  public hide(priority: number = 0): void {
    if (priority >= this._priority) {
      this._priority = 0;
      this._loaderSubject.next(false);
    }
  }

}