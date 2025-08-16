import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'isTextOverflowing',
    pure: false,
    standalone:true,
  })
  export class IsTextOverflowingPipe implements PipeTransform {
    transform(element: HTMLElement | null): boolean {
      if (!element) return false;
      return element.offsetWidth < element.scrollWidth;
    }
  }