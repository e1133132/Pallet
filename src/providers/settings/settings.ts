import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import {Platform} from "ionic-angular";

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<String>;

  constructor(public http: HttpClient, public platform:Platform) {
    console.log('Hello SettingsProvider Provider');

    this.theme = new BehaviorSubject('blue-theme');
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  getDeviceSize(){
    if(this.platform.width() >= 992){
      return 'lg'
    } else if(this.platform.width() >=768 ){
      return 'md'
    } else if(this.platform.width() >= 576){
      return 'sm'
    } else {
      return 'xs'
    }
  }

}
