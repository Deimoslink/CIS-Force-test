import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {UserI} from '../shared/interfaces/user';
import {PayloadI} from '../shared/interfaces/payload';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  private userId;
  public user: UserI;


  constructor(private apiService: ApiService,
              private route: ActivatedRoute) {
    this.userId = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.apiService.getUserById(this.userId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: PayloadI<UserI>) => {
        this.user = res.data;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
