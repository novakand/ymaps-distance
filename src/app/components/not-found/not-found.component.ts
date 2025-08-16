import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    templateUrl: './not-found.component.html',
    imports: [CommonModule, ButtonModule, RouterModule]
})
export class NotfoundComponent { }