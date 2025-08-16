import { CommonModule } from '@angular/common';
import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MapService } from '../../services/map-service';
@Component({
  selector: 'map-legend-control',
  templateUrl: './map-legend-control.component.html',
  styleUrls: ['./map-legend-control.component.scss'],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    CardModule,
    TranslateModule,
    ToggleSwitchModule
  ]
})
export class MapLegendControlComponent {
  public showCityBoundaries = true;

  constructor(
    public mapService: MapService
  ) {
    this.showCityBoundaries = this.mapService.cityBoundaries$.value;
  }

  public onToggle(v: boolean) {
    this.mapService.cityBoundaries$.next(v);
  }

}
