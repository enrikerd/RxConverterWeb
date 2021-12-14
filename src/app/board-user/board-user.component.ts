import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExchangeRateOperationResquest } from 'src/app/_models/exchangeRateOperationRequest';
import { ExchangeRateOperationResponse } from 'src/app/_models/exchangeRateOperationResponse';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss'],
})
export class BoardUserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  susbcription?: Subscription;
  exchangeRateOperationRequest?: ExchangeRateOperationResquest;
  exchangeRateOperationResponse?: ExchangeRateOperationResponse;
  currentUser: any;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private exchangeRateService: ExchangeRateService,
    private token: TokenStorageService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      originCurrency: ['', [Validators.required]],
      destinationCurrency: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  ngOnDestroy() {
    this.susbcription?.unsubscribe();
  }

  callExchangeRateOperation() {
    const exchangeRateOperationRequest: ExchangeRateOperationResquest = {
      originCurrency: this.form.get('originCurrency')?.value,
      destinationCurrency: this.form.get('destinationCurrency')?.value,
      amount: this.form.get('amount')?.value,
      createdBy: this.currentUser.username,
    };
    this.exchangeRateService
      .operationExchangeRate(exchangeRateOperationRequest)
      .subscribe((data) => {
        this.exchangeRateOperationResponse = data;
        //this.toastr.success('Success Save','Registered credit card')
        //this.exchangeRateService.getAllExchangeRates();
        //this.form.reset();
      });
  }
}
