import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormGroup, FormControl, FormArray, FormBuilder,
    Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { News } from '../../../core/models/news.model';
import { NewsDetails } from '../../../core/models/news-details.model';
import { NewsService } from '../../../core/services/news.service';

@Component({
    selector: 'app-profile-news-form',
    templateUrl: './profile-news-form.component.html',
    styleUrls: ['./profile-news-form.component.scss']
})
export class ProfileNewsFormComponent implements OnInit, OnDestroy {
    newsForm: FormGroup;
    news: News;
    private newsChanges: Subscription;
    private action: string;
    private currentNewsId: string;
    private file: File;
    photoUrl: any;
    private pattern = /^[\wa-zA-Zа-яА-ЯєЄґҐіІїЇ ;:`ʼ'"\n«»\/\!\?\.,\-+=()&]+$/;
    private patternErrorMessage =
        'Допускаются буквы, цифры и символы _;:/!?`ʼ\'\",.-()&';
    title: string;
    okButtonCaption: string;

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private newsService: NewsService,
    ) { }

    ngOnInit() {
        this.action = this.activatedRoute.snapshot.url[0].path;
        (this.action === 'add') ? this.add() : this.edit();
    }

    ngOnDestroy() {
        if (this.newsChanges) {
            this.newsChanges.unsubscribe();
        }
    }

    add() {
        this.title = 'Добавление новости';
        this.okButtonCaption = 'Добавить';
        this.news = new News();
        this.news.details = new NewsDetails();
        this.populateForm(this.news);
    }

    edit() {
        this.title = 'Редактирование новости';
        this.okButtonCaption = 'Сохранить';
        const id = this.activatedRoute.snapshot.params.id;
        if (id) {
            this.newsChanges = this.newsService.getNewsById(id).subscribe(news => {
                if (news) {
                    this.news = news;
                    this.currentNewsId = news.id;
                    this.populateForm(this.news);
                } else {
                    this.backToNews();
                }
            });
        } else {
            this.backToNews();
        }
    }

    inputValidators(config: any) {
        return [
            Validators.required,
            Validators.maxLength(config.maxLength),
            Validators.pattern(this.pattern)
        ];
    }

    populateForm(news: News) {
        this.newsForm = this.formBuilder.group({
            title: new FormControl(
                news.title, this.inputValidators({ maxLength: 50 })),
            description: new FormControl(
                news.description, this.inputValidators({ maxLength: 140 })),
            photoUrl: new FormControl(''),
            details: this.formBuilder.group({
                text: new FormControl(
                    news.details.text, this.inputValidators({ maxLength: 5000 }))
            })
        });
    }

    readUrl(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = e => this.photoUrl = reader.result;
        }
    }

    emptyErrorMessage(field: string) {
        return `Введите ${field}`;
    }

    maxlengthErrorMessage(length: number) {
        return `Максимум ${length} символов`;
    }

    onSubmit() {
        if (this.newsForm.valid) {
            const news = this.newsForm.value;

            if (this.news.photo) {
                news.photo = this.news.photo;
            }
            delete news.photoUrl;

            if (this.action === 'add') {
                this.newsService.addNews(news, this.file);
            } else {
                news.id = this.currentNewsId;
                this.newsService.updateNews(news, this.file);
            }
            this.backToNews();
        }
    }

    backToNews() {
        this.router.navigateByUrl('profile/news');
    }
}
