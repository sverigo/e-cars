import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-news',
    templateUrl: './card-news.component.html',
    styleUrls: ['./card-news.component.scss']
})
export class CardNewsComponent implements OnInit {
    @Input() data: any;


    constructor() { }

    ngOnInit() {
    }

    truncate(text: string, length: number) {
        return (text.length <= length) ? text : text.substring(0, length - 3) + '...';
    }

}
