import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangeRate } from 'src/app/_models/exchangeRate';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.component.html',
  styleUrls: ['./exchangerate.component.scss'],
})
export class ExchangerateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  susbcription?: Subscription;
  exchangeRate?: ExchangeRate;
  idExchangeRate = 0;
  currentUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private exchangeRateService: ExchangeRateService,
    private token: TokenStorageService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      originCurrency: ['', [Validators.required]],
      originCurrencyDescription: ['', [Validators.required]],
      destinationCurrency: ['', [Validators.required]],
      destinationCurrencyDescription: ['', [Validators.required]],
      conversionFactor: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRate().subscribe((data) => {
      console.log(data);
      this.exchangeRate = data;
      this.form.patchValue({
        originCurrency: this.exchangeRate.originCurrency,
        originCurrencyDescription: this.exchangeRate.originCurrencyDescription,
        destinationCurrency: this.exchangeRate.destinationCurrency,
        destinationCurrencyDescription:
          this.exchangeRate.destinationCurrencyDescription,
        conversionFactor: this.exchangeRate.conversionFactor,
      });
      this.idExchangeRate = this.exchangeRate.id!;
      this.currentUser = this.token.getUser();
    });
  }

  ngOnDestroy() {
    this.susbcription?.unsubscribe();
  }
  saveExchangeRate() {
    if (
      this.idExchangeRate === 0 ||
      typeof this.idExchangeRate === 'undefined'
    ) {
      console.log(this.idExchangeRate);
      console.log('New ExchangeRate');
      this.addExchangeRate();
    } else {
      console.log(this.idExchangeRate);
      console.log('Update ExchangeRate');
      this.updateExchangeRate();
    }
  }

  addExchangeRate() {
    const exchangeRate: ExchangeRate = {
      originCurrency: this.form.get('originCurrency')?.value,
      originCurrencyDescription: this.form.get('originCurrencyDescription')
        ?.value,
      destinationCurrency: this.form.get('destinationCurrency')?.value,
      destinationCurrencyDescription: this.form.get(
        'destinationCurrencyDescription'
      )?.value,
      conversionFactor: this.form.get('conversionFactor')?.value,
      createdBy: this.currentUser.username,
      updatedBy: this.currentUser.username,
    };
    this.exchangeRateService
      .saveExchangeRate(exchangeRate)
      .subscribe((data) => {
        //this.toastr.success('Success Save','Registered credit card')
        this.exchangeRateService.getAllExchangeRates();
        this.form.reset();
      });
  }

  updateExchangeRate() {
    const exchangeRate: ExchangeRate = {
      id: this.exchangeRate?.id,
      originCurrency: this.form.get('originCurrency')?.value,
      originCurrencyDescription: this.form.get('originCurrencyDescription')
        ?.value,
      destinationCurrency: this.form.get('destinationCurrency')?.value,
      destinationCurrencyDescription: this.form.get(
        'destinationCurrencyDescription'
      )?.value,
      conversionFactor: this.form.get('conversionFactor')?.value,
      updatedBy: this.currentUser.username,
    };
    this.exchangeRateService
      .updateExchangeRate(this.idExchangeRate, exchangeRate)
      .subscribe((data) => {
        //this.toastr.info('Update OK','Update ExchangeRate  success');
        this.exchangeRateService.getAllExchangeRates();
        this.form.reset();
      });
  }
}
