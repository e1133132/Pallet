import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiURL } from "../../../../shared/ApiURL";
import { take } from 'rxjs/operators';  // 导入 take 操作符

@Injectable()
export class LoginProvider {

  loginUrl;
  apiUrl;

  ionViewWillEnter() {
    this.apiUrl = this.api.getApiUrl();
  }

  constructor(public http: HttpClient, private api: ApiURL) {
    console.log('Hello LoginProvider Provider');
  }

  getToken(username: string, password: string): Promise<any> {
    this.loginUrl = this.api.getApiUrl().concat('token');
    let body = new URLSearchParams();
    body.set('UserName', username);
    body.set('Password', password);
    body.set('grant_type', 'password');

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    // 使用 pipe 和 take(1) 操作符
    return this.http.post(this.loginUrl, body.toString(), httpOptions)
      .pipe(take(1))  // 使用 pipe 和 take(1) 仅获取一次数据
      .toPromise();
  }

}
