import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductDetailComponent {
  product: any = null;
  loaded: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: RouterExtensions,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productService.loadProducts().then(() => {
      this.product = this.productService.getProduct(id);
      this.loaded = true;
      this.cd.detectChanges();
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id);
    this.router.back();
  }

  toggleStatus() {
    this.productService.toggleStatus(this.product.id);
    this.cd.detectChanges();
  }

  editProduct() {
    this.router.navigate(['/edit', this.product.id]);
  }

  goBack() {
    this.router.back();
  }
}

