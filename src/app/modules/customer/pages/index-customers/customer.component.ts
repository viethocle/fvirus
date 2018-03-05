import { tap, switchMap, map, debounceTime } from 'rxjs/operators';
import { Customer } from '@modules/customer/customer.model';
import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { BsModalComponent } from "ng2-bs3-modal";
import * as _ from "lodash";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { CustomerService } from "@modules/customer/customer.service";
import { ToastrService } from "@shared/toastr.service";
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { fromEvent } from 'rxjs/observable/fromEvent';

@Destroyable
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalConfirm") modalConfirm: BsModalComponent;

  formAdd: FormGroup;
  formEditCustomer: FormGroup;
  customers: Customer[];
  cus: Customer = new Customer();
  lists: Array<any> = [];
  editing = -1;
  customerSelected: Customer;
  keyUpSearch = new Subject<string>();
  currentPerPage = 10;
  currentSearch = "";
  customerToEdit: Customer;

  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
   
  }

  ngOnInit() {
    this.buildForm();
    this.getPage(1, 10);
    this.initEvent();
  }

  initEvent() {
    this.route.queryParams
        .pipe(
          takeUntilDestroy(this),
          tap(params => {
            this.configPagination.currentPage = params.page;
            this.configPagination.itemsPerPage = params.per_page;
          }),
          switchMap(params => 
            this.customerService.getCustomersWithPage(params.page, params.per_page, params.search))
        )
        .subscribe((res: any) => {
          this.customers = res.customers;
          this.configPagination.totalItems = res.total;
        })


    const inputSearch = document.getElementById('search-customer');
    const inputSearch$ = fromEvent(inputSearch, 'keyup')
        .pipe(
          map((i: any) => i.currentTarget.value),
          debounceTime(500),
          tap(value => this.currentSearch = value)
        )
        .subscribe(value => this.navigateUrl(1, this.currentPerPage, value));
  }

  navigateUrl(page, per_page, search_text) {
    this.router.navigate(['/customers'], { queryParams: { page: page, per_page: per_page, search: search_text } })
  }

  buildForm() {
    this.formAdd = this.formBuilder.group({
      name: ["", Validators.required],
      phone: [""],
      email: [""],
      address: [""]
    });
  }

  getCustomers() {
    
  }

  onChangeCount($event) {
    this.navigateUrl(1, this.currentPerPage, this.currentSearch);
  }

  getPage(page: number, per_page = this.currentPerPage, search = this.currentSearch) {
    this.navigateUrl(page, per_page, search);
  }

  openModalEdit(customer: Customer) {
    this.customerToEdit = customer;
  }

  openModalDelete(customer: Customer) {
    this.customerSelected = customer;
    this.modalConfirm.open();
  }

  deleteCustomer() {
    this.modalConfirm.close();
    this.sendRequestDeleteCustomer(this.customerSelected);
  }

  sendRequestDeleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(res => {
      this.customers = _.reject(this.customers, ["id", customer.id]);
      this.toastrService.SetMessageSuccess("Deleted");
    });
  }

  handleUpdateCustomer(customer) {
    _.assign(this.customers.find(cus => cus.id === customer.id, customer));
    this.customerToEdit = null;
  }

  addCustomer(value: any) {
    this.customerService
      .addCustomer(value)
      .subscribe((customer: Customer) => {
        this.customers.unshift(customer);
        this.formAdd.reset();
        // this.toastrService.SetMessageSuccess("Success");
      });
  }
}
