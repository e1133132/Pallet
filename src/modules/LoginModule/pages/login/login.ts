import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { ApiURL } from "../../../../shared/ApiURL";
import { LoginProvider } from "../../providers/login/login";
import { HomePage } from "../../../HomeModule/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("userNameInput") userNameInput: HTMLInputElement;
  @ViewChild("passWordInput") passWordInput: HTMLInputElement;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiURL,
    private loginProvider: LoginProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async tryLogin() {
    const loading = await this.loadingCtrl.create({
      message: "Logging in..."
    });

    await loading.present();

    this.loginProvider.getToken(this.userNameInput.value.toString(), this.passWordInput.value.toString()).then(async data => {
      console.log(data);
      if (data != null) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', data);
        localStorage.setItem('userId', data.userNumber);
        localStorage.setItem('userName', data.userName);
        this.api.updateBearerToken();
        console.log("A: " + this.api.httpOptions.toString());
        await loading.dismiss();
        this.navCtrl.navigateRoot('/home'); // Navigate to HomePage
      } else {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: "Log In Unsuccessful",
          message: "The Username or Password may be wrong. Please try again.",
          buttons: [{
            text: "OK",
            role: 'cancel'
          }]
        });
        await alert.present();
      }
    }).catch(async error => {
      await loading.dismiss();
      const errorAlert = await this.alertCtrl.create({
        header: "Error",
        message: "An error occurred during login. Please try again later.",
        buttons: ['OK']
      });
      await errorAlert.present();
      console.error('Login error:', error);
    });
  }
}
