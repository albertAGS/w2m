import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercase]',
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement) {
    console.log(input);
    input.value = input.value.toUpperCase();
  }

  @HostListener('blur', ['$event.target'])
  onBlur(input: HTMLInputElement) {
    input.value = input.value.toUpperCase();
  }
}
