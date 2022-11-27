import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./app-pagination.component.html",
  styleUrls: ["./app-pagination.component.css"],
})
export class AppPaginationComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() totalRecord = 0;
  @Input() recordsPerPage = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  activePage: number;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
    let totalPages = 0;
    if (this.totalRecord > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecord / this.recordsPerPage;
      const roundedPageCOunt = Math.floor(pageCount);

      totalPages =
        roundedPageCOunt < pageCount ? roundedPageCOunt + 1 : roundedPageCOunt;
    }
    return totalPages;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
    }
  }
}
