import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[highLight]",
})
export class HighLightError {
  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.background = "red";
    elRef.nativeElement.style.color = "black";
  }
}
