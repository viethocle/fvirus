import { FormCustomerComponent } from './../form-customer/form-customer.component';
import { Subject } from 'rxjs/Subject';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { Customer } from '@modules/customer/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { CustomerService } from "@modules/customer/customer.service";

@Destroyable
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnChanges {
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  @ViewChild(FormCustomerComponent) formCustomer: FormCustomerComponent;

  @Output() dismissModalEdit: EventEmitter<any> = new EventEmitter();
  @Output() customerUpdatedEmit = new EventEmitter<Customer>();
  @Input('customerEdit') customer: Customer;
  private customer$ = new Subject<Customer>();

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customer$
        .pipe(
          takeUntilDestroy(this),
          filter (customer => customer != undefined),
          tap(cus => this.formCustomer.setValueForm(cus))
        )
        .subscribe(_ => this.modalEdit.open());
    this.modalEdit.onDismiss
      .subscribe(_ => this.dismissModalEdit.next())
  }

  ngOnChanges(changes: SimpleChanges) {
    this.customer$.next(changes.customer.currentValue);
  }

  sendRequestEditCustomer() {
    this.customerService.updateCustomer(this.formCustomer.getValueForm(), this.customer.id)
      .pipe(
        takeUntilDestroy(this),
        tap(_ => this.modalEdit.close())
      )
      .subscribe(cus => this.customerUpdatedEmit.next(cus));
  }

}
