import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { delay, Subject } from 'rxjs';
import { LoadProgressService } from '../../../../../services/load-progress.service';

@Component({
    selector: 'app-layout',
    imports: [CommonModule, RouterOutlet, ProgressBarModule],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

  public showProgress: boolean = false;

  public destroy$ = new Subject<boolean>();


  constructor(
    private _loadProgressService: LoadProgressService,
  ) { }

  public ngOnInit(): void {
    this._watchForLoadProgress();
  }


  public ngOnDestroy(): void {
  }

  private _watchForLoadProgress(): void {
    this._loadProgressService.inProgress
      .pipe(
        delay(100)
      )
      .subscribe((progress: boolean) => {
        this.showProgress = progress;
      });
  }

  public onActivateRouterOutlet() {
   
  }

}
