import { Component, OnInit } from '@angular/core';
import { ExchangeRate } from 'src/app/_models/exchangeRate';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';

@Component({
  selector: 'app-exchangerate-list',
  templateUrl: './exchangerate-list.component.html',
  styleUrls: ['./exchangerate-list.component.scss'],
})
export class ExchangerateListComponent implements OnInit {
  constructor(public exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getAllExchangeRates();
  }

  editExchangeRate(exchangeRate: ExchangeRate) {
    return this.exchangeRateService.retrieveExchangeRate(exchangeRate);
  }
}
