import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductByCateComponent } from './list-product-by-cate.component';

describe('ListProductByCateComponent', () => {
  let component: ListProductByCateComponent;
  let fixture: ComponentFixture<ListProductByCateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductByCateComponent]
    });
    fixture = TestBed.createComponent(ListProductByCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
