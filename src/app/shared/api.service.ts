import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageI} from './interfaces/page';
import {UserI} from './interfaces/user';
import {PayloadI} from './interfaces/payload';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  public getPaginatedUsers(page: number): Observable<PageI<UserI>> {
    return this.http.get<PageI<UserI>>(`https://reqres.in/api/users?page=${page}`);
  }

  public getUserById(id): Observable<PayloadI<UserI>> {
    return this.http.get<PayloadI<UserI>>(`https://reqres.in/api/users/${id}`);
  }

}
