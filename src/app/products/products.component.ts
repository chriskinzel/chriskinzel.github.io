import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ck-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {}
