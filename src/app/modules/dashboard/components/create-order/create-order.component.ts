import { AuthService } from "@modules/auth/auth.service";
import { tap } from "rxjs/operators";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  Renderer2,
  AfterViewChecked,
  ChangeDetectorRef,
  Input
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray
} from "@angular/forms";
import { BsModalComponent } from "ng2-bs3-modal";
import { DashboardService } from "../../dashboard.service";

import { Order } from "../../order";
import { Customer } from "@modules/customer/customer.model";
import { CustomerService } from "@modules/customer/customer.service";
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";
import * as _ from "lodash";
import { FlyInOut } from "../../flyInOut.animate";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { Destroyable, takeUntilDestroy } from "take-until-destroy";

@Destroyable
@Component({
  selector: "app-create-order",
  templateUrl: "./create-order.component.html",
  styleUrls: ["./create-order.component.css"],
  animations: [FlyInOut]
})
export class CreateOrderComponent implements OnInit {
  controls: any;
  @ViewChild("modalCreate") modalCreate: BsModalComponent;
  @ViewChild(PerfectScrollbarComponent)
  componentScroll: PerfectScrollbarComponent;
  @ViewChildren("listCustomers") listCustomers;
  formNewOrder: FormGroup;
  @Output() newOrder = new EventEmitter<Order>();
  minDueDate: any;
  customers: Customer[] = [];
  termCustomer = "";
  currentFocusIndex: number = -1;
  customerSelected: Customer;
  @Input() isFormQuote = true;
  totalPrice: number = 0;


  contents: any;
  priceMask = Object.freeze({
    mask: createNumberMask({
      allowDecimal: false,
      // integerLimit: 8,
      prefix: "",
      thousandsSeparatorSymbol: ","
    })
  });

  constructor(
    public formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private customerService: CustomerService,
    private renderer2: Renderer2,
    private cdRef: ChangeDetectorRef,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.initDatetime();
    this.customerService
      .getCustomersWithObservable()
      .pipe(takeUntilDestroy(this))
      .subscribe(customers => (this.customers = customers));
    // this.totalPrice();
    this.formNewOrder.valueChanges.subscribe(_ => {
      this.totalPrice = 0;
      this.contents = this.formNewOrder.get("contents") as FormArray;
      this.contents.value.forEach(
        res => {
          res.total = res.quantity * res.price;
          console.log(this.formData);
          console.log(res);
          this.totalPrice += (res.quantity * res.price);
        }
      );
      this.formNewOrder.value.price = this.totalPrice;
    });
  }

  ngAfterViewChecked() {}

  get isTechnician() {
    return this.authService.isCurrentUserTechnician;
  }

  get formData() {
    return <FormArray>this.formNewOrder.get("contents");
  }

  buildForm() {
    this.formNewOrder = this.formBuilder.group({
      description: ["", Validators.required],
      contents: this.formBuilder.array([this.createContent()]),
      due_date: ["", Validators.required],
      price: ["", Validators.max(99999999)],
      customer_id: [""]
    });
  }

  createContent(): FormGroup {
    return this.formBuilder.group({
      content: "",
      unit: "",
      quantity: [1],
      price: [0],
      total: [0]
    });
  }

  addRowContent(): void {
    this.contents = this.formNewOrder.get("contents") as FormArray;
    this.contents.push(this.createContent());
  }

  deleteRow(index: number) {
    let control = <FormArray>this.formNewOrder.get("contents");
    control.removeAt(index);
  }

  initDatetime(): any {
    let d = new Date();
    this.minDueDate = new Date(new Date().setDate(new Date().getDate() - 1)); // mean yesterday
  }

  createOrder() {
    this.modalCreate.close();
    this.dashboardService
      .createOrder(this.formNewOrder.value)
      .pipe(
        tap(_ => {
          this.formNewOrder.reset();
          this.customerSelected = null;
        })
      )
      .subscribe((newOrder: Order) => this.newOrder.emit(newOrder));
  }

  chooseCustomer() {
    if (this.currentFocusIndex === -1) return;
    let listsButton = this.listCustomers
      .toArray()
      .map(res => res.nativeElement);
    let selectedCustomerId =
      listsButton[this.currentFocusIndex].dataset.idcustomer;
    let selectedCustomer = this.customers.find(
      cus => cus.id === _.toNumber(selectedCustomerId)
    );
    this.selectCustomer(selectedCustomer);
  }

  // * handle event keyup enter andn click customer
  selectCustomer(cus: Customer) {
    this.customerSelected = cus;
    this.formNewOrder.patchValue({
      customer_id: this.customerSelected.id
    });
    this.termCustomer = "";
  }

  shiftFocusDown(e) {
    e.preventDefault();
    let lengthResults = this.listCustomers.toArray().length;
    if (this.currentFocusIndex === lengthResults - 1) return;
    this.currentFocusIndex++;
    this.focusElement(this.currentFocusIndex);
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

  onChangeTermCustomer() {
    this.cdRef.detectChanges();
    // See this issue to know reason why I added that code
    // https://github.com/angular/angular/issues/17572
    this.currentFocusIndex = -1; // reset focus when typing new term
  }

  focusElement(id) {
    let listsButton = this.listCustomers
      .toArray()
      .map(res => res.nativeElement);
    if (id > listsButton.count || id < 0) {
      return;
    }
    listsButton.forEach(e => {
      this.renderer2.removeClass(e, "focus-customer");
    });
    this.renderer2.addClass(listsButton[id], "focus-customer");
    this.componentScroll.directiveRef.scrollToY(40 * id);
  }
}
