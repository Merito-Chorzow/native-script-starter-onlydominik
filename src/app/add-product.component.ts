import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { requestCameraPermissions, takePicture } from '@nativescript/camera';
import { ProductService } from './product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AddProductComponent {
  productName: string = '';
  productCode: string = '';
  productDescription: string = '';
  photoPath: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: RouterExtensions, private cd: ChangeDetectorRef) {}

  takePhoto() {
    requestCameraPermissions().then(() => {
      takePicture({ width: 300, height: 300, keepAspectRatio: true }).then((imageAsset) => {
        this.photoPath = imageAsset.android || imageAsset.ios;
        this.cd.detectChanges();
      });
    });
  }

  saveProduct() {
    if (this.productName === '') {
      this.errorMessage = 'Nazwa jest wymagana';
      this.cd.detectChanges();
      return;
    }
    if (this.productCode === '') {
      this.errorMessage = 'Kod jest wymagany';
      this.cd.detectChanges();
      return;
    }

    const newProduct = {
      name: this.productName,
      code: this.productCode,
      description: this.productDescription,
      status: 'dostępny',
      photoPath: this.photoPath
    };

    this.productService.addProduct(newProduct);
    this.router.back();
  }

  goBack() {
    this.router.back();
  }
}
