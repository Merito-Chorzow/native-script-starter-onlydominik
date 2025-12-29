import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { HttpClient } from '@angular/common/http';
import { requestCameraPermissions, takePicture } from '@nativescript/camera';

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

  constructor(private http: HttpClient, private router: RouterExtensions, private cd: ChangeDetectorRef) {}

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
      title: this.productName,
      body: this.productDescription,
      userId: 1
    };

    this.http.post('https://jsonplaceholder.typicode.com/posts', newProduct).subscribe(() => {
      this.router.back();
    });
  }

  goBack() {
    this.router.back();
  }
}

