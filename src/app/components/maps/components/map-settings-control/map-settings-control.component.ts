import { CommonModule } from '@angular/common';
import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';

@Component({
  selector: 'map-settings-control',
  templateUrl: './map-settings-control.component.html',
  styleUrls: ['./map-settings-control.component.scss'],
  imports: [
    CommonModule, ButtonModule, TooltipModule, FormsModule
  ]
})
export class MapSettingsControlComponent {

  @Input() public isShowSettingsControl = false;
  @Input() public isDisableSettingsControl = false;
  @Input() public isResetSettingsControl = true;

  @Output() public onChange: Subject<boolean> = new Subject<boolean>();


  public onChangeSettings(): void {
    this.onChange.next(true);
  }

}
