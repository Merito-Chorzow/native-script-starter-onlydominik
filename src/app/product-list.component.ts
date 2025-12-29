import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ProductService } from './product.service';
import { Page } from '@nativescript/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductListComponent {
  products: any[] = [];
  loaded: boolean = false;
  errorMessage: string = '';

  constructor(private productService: ProductService, private cd: ChangeDetectorRef, private page: Page) {}

  ngOnInit() {
    this.page.on('navigatedTo', () => {
      this.refreshProducts();
    });
    this.loadProducts();
  }

  loadProducts() {
    this.loaded = false;
    this.productService.loadProducts().then((data) => {
      this.products = data;
      this.loaded = true;
      this.cd.detectChanges();
    });
  }

  refreshProducts() {
    this.products = this.productService.products;
    this.cd.detectChanges();
  }
}
