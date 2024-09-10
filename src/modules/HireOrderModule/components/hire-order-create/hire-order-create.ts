import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {HireOrderCreateSelectCustomerPopoverComponent} from "../hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HireOrderProvider} from "../../providers/hire-order/hire-order";

/**
 * Generated class for the HireOrderCreateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hire-order-create',
  templateUrl: 'hire-order-create.html'
})
export class HireOrderCreateComponent {

  allPallets;
  allCustomers;
  allHireOrders;
  customerChosenFromPopOver;
  customerLastHireOrder;
  @ViewChild("customerInput") customerInput: HTMLInputElement;
  @ViewChild("custDeliveryAdd") custDeliveryAdd: HTMLInputElement;
  @ViewChild("createBut") createBut: HTMLButtonElement;
  @ViewChild("editBut") editBut: HTMLButtonElement;

  createHireOrderForm: FormGroup;

  //for editing hire orders
  toEdit: boolean=false;
  hireOrderToEdit;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popOverCtrl: PopoverController,
              private formBuilder: FormBuilder,
              private hireOrderProvider: HireOrderProvider) {
    console.log('Hello HireOrderCreateComponent Component');
    this.allPallets= this.navParams.get("pallets");
    this.allCustomers=this.navParams.get("customers");
    this.allHireOrders=this.navParams.get("hireOrders");

    this.toEdit= this.navParams.get("toEdit");      //when edithireorder comes to here, form will transform accordingly. edithireorder must have a boolean
    this.hireOrderToEdit = this.navParams.get("hireOrderToEdit");

    this.createHireOrderForm = this.formBuilder.group({
      Hire_Order_No:['', Validators.compose([Validators.maxLength(255)])],
      Customer_ID: ['', Validators.compose([Validators.required])],
      Qty: ['', Validators.compose([Validators.required])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.required])],
      Hire_Date:['',Validators.compose([Validators.required])],
      Expected_Issue_Date: ['', Validators.compose([Validators.required])],
      Delivery_Type: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      Delivery_Address: ['', Validators.compose([Validators.required])],    //regex for only +ve numbers
      Status: ['',Validators.required],
      Advance_Order: ['',Validators.required]
    });

    if (this.toEdit && this.hireOrderToEdit) {

      this.createHireOrderForm.controls["Customer_ID"].setValue(this.hireOrderToEdit.Customer_ID);
      this.createHireOrderForm.controls["Hire_Order_No"].setValue(this.hireOrderToEdit.Hire_Order_No);
      this.createHireOrderForm.controls["Qty"].setValue(this.hireOrderToEdit.Qty);
      this.createHireOrderForm.controls["Pallet_Profile_ID"].setValue(this.hireOrderToEdit.Pallet_Profile_ID);
      this.createHireOrderForm.controls["Hire_Date"].setValue(this.hireOrderToEdit.Hire_Date);
      this.createHireOrderForm.controls["Expected_Issue_Date"].setValue(this.hireOrderToEdit.Expected_Issue_Date);
      this.createHireOrderForm.controls["Delivery_Type"].setValue(this.hireOrderToEdit.Delivery_Type);
      this.createHireOrderForm.controls["Delivery_Address"].setValue(this.hireOrderToEdit.Delivery_Address);
      this.createHireOrderForm.controls["Status"].setValue("New");
      this.createHireOrderForm.controls["Advance_Order"].setValue(this.hireOrderToEdit.Advance_Order);
      this.createHireOrderForm.controls["Customer_ID"].disabled;
      this.createHireOrderForm.controls["Hire_Order_No"].disabled;
    }
  }

  async openHireOrderSelectCustomerPopOver(event) {
    const popover = await this.popOverCtrl.create({
      component: HireOrderCreateSelectCustomerPopoverComponent,
      componentProps: { 'customers': this.allCustomers },
      cssClass: 'custom-customer-popover'
    });
  
    await popover.present();
    
    // 使用 await 获取 onDidDismiss 的结果
    const { data } = await popover.onDidDismiss();
  
    if (data) {
      console.log(data);
      this.customerChosenFromPopOver = data;  // 获取选择的客户对象
      this.hireOrderProvider.GetLatestHireOrderOfCustomerId(this.customerChosenFromPopOver.customer_ID).then(result => {
        if (result) {
          this.customerLastHireOrder = result;
          this.createHireOrderForm.controls["Customer_ID"].setValue(this.customerChosenFromPopOver.customer_ID);
          this.createHireOrderForm.controls["Hire_Order_No"].setValue(this.customerLastHireOrder.Hire_Order_No);
          this.createHireOrderForm.controls["Qty"].setValue(this.customerLastHireOrder.Qty);
          this.createHireOrderForm.controls["Pallet_Profile_ID"].setValue(this.customerLastHireOrder.Pallet_Profile_ID);
          this.createHireOrderForm.controls["Hire_Date"].setValue(this.customerLastHireOrder.Hire_Date);
          this.createHireOrderForm.controls["Expected_Issue_Date"].setValue(this.customerLastHireOrder.Expected_Issue_Date);
          this.createHireOrderForm.controls["Delivery_Type"].setValue(this.customerLastHireOrder.Delivery_Type);
          this.createHireOrderForm.controls["Delivery_Address"].setValue(this.customerLastHireOrder.Delivery_Address);
          this.createHireOrderForm.controls["Advance_Order"].setValue(this.customerLastHireOrder.Advance_Order);
        } else {
          this.createHireOrderForm.reset();
          this.createHireOrderForm.controls["Customer_ID"].setValue(this.customerChosenFromPopOver.customer_ID);
          this.createHireOrderForm.controls["Delivery_Address"].setValue(this.customerChosenFromPopOver.Address);
        }
      });
    }
  }
  

  createHireOrder(formData) {
    this.hireOrderProvider.postCreateHireOrder(formData);
    alert("Hire Order has been added!");
    this.navCtrl.pop();
  }

  editHireOrder(formData) {
    console.log("edited"+formData);
  }
}
