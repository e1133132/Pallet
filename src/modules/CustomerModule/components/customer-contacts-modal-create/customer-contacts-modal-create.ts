import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, NavParams, ModalController } from "@ionic/angular";
import { CustomerProvider } from "../../providers/customer/customer";
import { CustomerContactsProvider } from "../../providers/customer-contacts/customer-contacts";

@Component({
  selector: 'customer-contacts-modal-create',
  templateUrl: 'customer-contacts-modal-create.html'
})
export class CustomerContactsModalCreateComponent {

  createCustomerContactForm: FormGroup;
  custId: any;
  customer: any;

  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private custProvider: CustomerProvider,
    private custContactProvider: CustomerContactsProvider,
    private navCtrl: NavController,
    private modalCtrl: ModalController  // 使用 ModalController 替代 ViewController
  ) {
    console.log('Hello CustomerContactsModalCreateComponent Component');

    this.custId = this.navParams.get("custId");
    console.log(this.custId);

    this.createCustomerContactForm = this.formBuilder.group({
      Name: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Designation: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Office_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Handphone_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Fax_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Email: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Customer_ID: [''],
    });

    this.custProvider.getOneCustomer(this.custId).then(data => {
      this.customer = data;
      console.log(this.customer);

      this.createCustomerContactForm.controls["Customer_ID"].setValue(this.customer.customer_ID);
      this.createCustomerContactForm.enable();
    });
  }

  createCustomerContact(formData) {
    this.custContactProvider.postCreateCustomerContact(JSON.stringify(formData)).then(result => {
      console.log("Customer contact created.");
    });
    this.navCtrl.pop();  // 用 NavController 返回上一个页面
  }

  close() {
    this.modalCtrl.dismiss();  // 使用 ModalController 关闭模态窗口
  }
}
