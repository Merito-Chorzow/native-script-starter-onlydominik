import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { ProductService } from './product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EditProductComponent {
  productId: number = 0;
  productName: string = '';
  productCode: string = '';
  productDescription: string = '';
  errorMessage: string = '';
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: RouterExtensions,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.productService.loadProducts().then(() => {
      const product = this.productService.getProduct(this.productId);
      if (product) {
        this.productName = product.name;
        this.productCode = product.code;
        this.productDescription = product.description;
      }
      this.loaded = true;
      this.cd.detectChanges();
    });
  }

  saveProduct() {
    if (this.productName === '') {
      this.errorMessage = 'Nazwa jest wymagana';
      this.cd.detectChanges();
      return;
    }

    this.productService.updateProduct(this.productId, {
      name: this.productName,
      code: this.productCode,
      description: this.productDescription
    });
    this.router.back();
  }

  goBack() {
    this.router.back();
  }
}
