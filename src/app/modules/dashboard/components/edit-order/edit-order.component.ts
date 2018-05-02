import { RoleUser, AuthService } from './../../../auth/auth.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { tap } from 'rxjs/operators';
import { CustomerService } from './../../../customer/customer.service';
import { Order } from './../../order';
import { DashboardService } from './../../dashboard.service';
import {
  Component,
  OnInit, OnDestroy,
  ViewChild, Output, EventEmitter, ViewChildren, ElementRef, Renderer2,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray
} from '@angular/forms';
import { Customer } from "@modules/customer/customer.model";
import { FlyInOut } from '../../flyInOut.animate';
import * as _ from 'lodash';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { BsmodalService } from '@core/services/bsmodal.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';



@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
  animations: [
    FlyInOut
  ]
})
export class EditOrderComponent implements OnInit, OnDestroy {

  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  @ViewChild(PerfectScrollbarComponent) componentScroll: PerfectScrollbarComponent;
  @ViewChildren("listCustomers") listCustomers;
  @Output() updateOrderOutput = new EventEmitter<Order>();
  order: Order;
  formEditOrder: FormGroup = null;
  startAt: Date;
  minDueDate: Date;
  customers: Customer[];
  termCustomer = "";
  currentFocusIndex: number = -1;
  customerSelected: Customer;
  roleUser: RoleUser;
  contents: any;
  control: any;

  priceMask = Object.freeze({
    mask: createNumberMask({
      allowDecimal: false,
      prefix: '',
      thousandsSeparatorSymbol: ','
    })
  });


  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService,
    private customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
    private renderer2: Renderer2,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.initDate();
    this.bsmodalService.orderEdit$
        .pipe(
          takeUntilDestroy(this),
        )
        .subscribe(order => {
          if (order) {
            this.order = order;
            this.customerSelected = this.customers.find(cus => cus.id === this.order.customer.id);
            this.startAt = new Date(Date.parse(order.due_date));
            this.setFormValue();
            this.modalEdit.open();
          }
        });
    this.customerService.getCustomersWithObservable()
        .subscribe(customers => this.customers = customers);
    this.modalEdit.onDismiss.subscribe ( _ => this.exitEdit());
    console.log(this.formEditOrder);
  }

  ngOnDestroy() {
    this.cdRef.reattach();
  }

  updateOrder() {
    this.modalEdit.close();
    this.formEditOrder.patchValue({
      customer_id: this.customerSelected.id
    });
    this.dashboardService.updateOrder(this.order.id, this.formEditOrder.value)
        .pipe(
          takeUntilDestroy(this)
        )
      .subscribe(order => this.updateOrderOutput.emit(order));

  }

  private initDate() {
    let d = new Date();
    this.minDueDate = new Date(new Date().setDate(new Date().getDate() - 1)); // mean yesterday
  }

  private buildForm() {
    this.formEditOrder = this.formBuilder.group({
      description: [""],
      contents: this.formBuilder.array([this.createContent()]),
      due_date: ["", Validators.required],
      price: ["",  Validators.max(99999999)],
      paid_amount: [""],
      customer_id: [""]
    });

  }

  createContent(): FormGroup {
    return this.formBuilder.group({
      content: '',
      unit: '',
      quantity: ''
    });
  }

  get formData() { return <FormArray>this.formEditOrder.get('contents'); }

  addRowContent(): void {
    this.contents = this.formEditOrder.get('contents') as FormArray;
    this.contents.push(this.createContent());
  }

  exitEdit() {
    JSON.parse(this.order.contents).forEach(cont => {
      this.control.removeAt(cont);
    });
    this.modalEdit.dismiss();
  }

  private setFormValue() {
    this.formEditOrder.patchValue({
      description: this.order.description,
      due_date: this.order.due_date,
      price: this.order.price,
      paid_amount: this.order.paid_amount,
      customer_id: this.order.customer.id
    });
    this.setContents();
    console.log(this.formEditOrder);
  }

  setContents() {
    this.control = <FormArray>this.formEditOrder.controls.contents;
    JSON.parse(this.order.contents).forEach(cont => {
      this.control.removeAt(cont);
    });
    JSON.parse(this.order.contents).forEach(cont => {
      this.control.push(this.formBuilder.group({content: cont.content,
      unit: cont.unit,
      quantity: cont.quantity}));
      console.log(cont);
    });
  }
  // * handle event keyup enter andn click customer
  selectCustomer(cus: Customer) {
    this.customerSelected = cus;
    this.termCustomer = "";
  }

  chooseCustomer() {
    if (this.currentFocusIndex === -1) return;
    let listsButton = this.listCustomers.toArray().map(res => res.nativeElement);
    let selectedCustomerId = listsButton[this.currentFocusIndex].dataset.idcustomer;
    let selectedCustomer = this.customers.find(cus => cus.id === _.toNumber(selectedCustomerId));
    this.selectCustomer(selectedCustomer);
  }


  shiftFocusDown(e) {
    e.preventDefault();
    let lengthResults = this.listCustomers.toArray().length;
    if (this.currentFocusIndex === lengthResults - 1) return;
    this.currentFocusIndex++;
    this.focusElement(this.currentFocusIndex);
  }

  onChangeTermCustomer() {
    this.cdRef.detectChanges();
    // See this issue to know reason why I added that code
    // https://github.com/angular/angular/issues/17572
    this.currentFocusIndex = -1; // reset focus when typing new term
  }


  shiftFocusUp(e) {
    e.preventDefault();
    if (this.currentFocusIndex == 0) return;
    this.currentFocusIndex--;
    this.focusElement(this.currentFocusIndex);
  }

  escapeSearch(e) {
    this.termCustomer = "";
  }

  private focusElement(id) {
    let listsButton = this.listCustomers.toArray().map(res => res.nativeElement);
    if (id > listsButton.count || id < 0) {
      return;
    }
    listsButton.forEach(e => {
      this.renderer2.removeClass(e, 'focus-customer');
    });
    this.renderer2.addClass(listsButton[id], 'focus-customer');
    this.componentScroll.directiveRef.scrollToY(40 * id);
  }


}
