import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PageI} from '../shared/interfaces/page';
import {UserI} from '../shared/interfaces/user';
import {ApiService} from '../shared/api.service';
import {switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  private requestSubject = new Subject<number>();
  public users: PageI<UserI>;

  public pagination = {
    currentPage: 1,
    totalPages: 0
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.requestSubject.pipe(
      switchMap(page => this.apiService.getPaginatedUsers(page)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((res: PageI<UserI>) => {
      this.users = res;
      this.pagination.totalPages = res.total_pages;
    });

    this.requestSubject.next(this.pagination.currentPage);
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public refreshRequest(page) {
    this.pagination.currentPage = page;
    this.requestSubject.next(page);
  }

}
