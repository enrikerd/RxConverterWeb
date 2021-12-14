import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerateListComponent } from './exchangerate-list.component';

describe('ExchangerateListComponent', () => {
  let component: ExchangerateListComponent;
  let fixture: ComponentFixture<ExchangerateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangerateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangerateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
