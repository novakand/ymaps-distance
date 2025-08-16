import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'safeDate', standalone: true })
export class SafeDatePipe implements PipeTransform {
    private dp: DatePipe;
    constructor(@Inject(LOCALE_ID) private locale: string) {
        this.dp = new DatePipe(this.locale);
    }
    transform(value: any, format: string = 'dd.MM.yyyy HH:mm'): string {
        if (!value || value === '–') {
            return '';
        }
        const d = new Date(value);
        if (isNaN(d.getTime())) {
            return '';
        }
        return this.dp.transform(d, format) ?? '';
    }
}