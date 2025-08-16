import { inject } from '@angular/core';
  import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
  import { PageLayout } from '../enums/page-layout.enum';
  import { PageLayoutService } from '../services/page-layout.service';

  export const setLayout = (inputLayout: PageLayout): ResolveFn<void> => {
      return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
          inject(PageLayoutService).setLayout(inputLayout)
      };
  }