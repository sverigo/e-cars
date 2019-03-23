import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnChanges {

    @Input() currentPage: number;
    @Input() totalCount: number;
    @Input() itemsPerPage: number;

    @Output() loadPage = new EventEmitter<number>();
    @Output() loadMore = new EventEmitter<number[]>();

    private pagesList: number[];
    private currentLoadMorePage: number;
    private pagesCount: number;

    constructor() { }

    ngOnChanges() {
        this.pagesList = this.getPages();
        this.currentLoadMorePage = this.currentPage;
    }

    handleLoadPage(pageNumber: number): void {
        this.loadPage.emit(pageNumber);
    }

    handleLoadMore(): void {
        const pages: number[] = [];

        if (this.currentLoadMorePage < this.pagesList.length) {
            this.currentLoadMorePage++;
        }

        for (let i = 1; i <= this.currentLoadMorePage; i++) {
            pages.push(i);
        }
        this.loadMore.emit(pages);
    }

    getPages(): number[] {
        this.pagesCount = Math.ceil(this.totalCount / this.itemsPerPage);
        const pages: number[] = [];
        for (let i = 1; i <= this.pagesCount; i++) {
            pages.push(i);
        }
        return pages;
    }

}
