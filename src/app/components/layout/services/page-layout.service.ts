import { Injectable } from '@angular/core';
import { PageLayout } from '../enums/page-layout.enum';
import { BehaviorSubject, filter, Observable, of, Subject, switchMap, tap, timer } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PageLayoutService {

    constructor(
        private router: Router
    ) { }

    private layoutSubject = new BehaviorSubject<PageLayout | null>(null);
    public layout$: Observable<PageLayout | null> = this.layoutSubject.asObservable();

    private isLoadingSubject = new BehaviorSubject<boolean>(true);
    public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    public setLayout(value: PageLayout): void {
        this.isLoadingSubject.next(true);

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                switchMap(() => {
                    this.layoutSubject.next(value);
                    return of(null);
                }),
                tap(() => this.isLoadingSubject.next(false))
            ).subscribe();
    }
}
