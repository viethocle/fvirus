import { Subject } from 'rxjs/Subject';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Customer } from '@modules/customer/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile, tap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnChanges {
  @ViewChild("modalEdit") modalEdit: BsModalComponent;
  @Input('customerEdit') customer: Customer;
  private customer$ = new Subject<Customer>();
  formEditCustomer: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.customer$
        .pipe(
          takeWhile(customer => customer != undefined),
          tap(cus => this.setFormValue(cus))
        )
        .subscribe(_ => this.modalEdit.open());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.customer$.next(changes.customer.currentValue);
  }

  private setFormValue(customer: Customer) {
    this.formEditCustomer.patchValue({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address
    })
  }

  private buildForm() {
    this.formEditCustomer = this.formBuilder.group({
      name: ["", Validators.required],
      phone: [""],
      email: [""],
      address: [""]
    });
  }

}
