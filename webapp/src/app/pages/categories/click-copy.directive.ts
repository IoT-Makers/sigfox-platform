import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[click-copy]'
})
export class ClickCopyDirective {

  private element;

  @Output() onCopy = new EventEmitter();

  constructor(private elm: ElementRef) {
    this.element = elm.nativeElement;
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    const selection = getSelection();
    const range = document.createRange();

    range.selectNodeContents(this.element);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    this.onCopy.emit(range);
    // console.log(`Copied ${range} to your clipboard!`);
  }
}
