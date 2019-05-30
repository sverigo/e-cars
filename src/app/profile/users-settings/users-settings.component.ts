import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users-settings',
    templateUrl: './users-settings.component.html',
    styleUrls: ['./users-settings.component.scss']
})
export class UsersSettingsComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    displayedColumns = ['email', 'username', 'moderator'];
    dataSource = new MatTableDataSource<User>();

    private usersChanges: Subscription;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.usersChanges = this.userService.getUsers().subscribe((data: User[]) => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy() {
        this.usersChanges.unsubscribe();
    }

    setModeratorRights(user: User): void {
        if (user.role === 1) {
            user.role = 2;
        } else if (user.role === 2) {
            user.role = 1;
        }
        this.userService.update(user);
    }

    filter(value: string): void {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
}
