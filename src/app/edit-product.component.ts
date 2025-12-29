import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
    private router: RouterExtensions,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    this.http.get('https://jsonplaceholder.typicode.com/posts/' + this.productId).subscribe((data: any) => {
      this.productName = data.title.substring(0, 20);
      this.productCode = 'PRD-' + data.id;
      this.productDescription = data.body;
      this.loaded = true;
      this.cd.detectChanges();
    }, (error) => {
      this.errorMessage = 'Blad przy ladowaniu produktu';
      this.loaded = true;
      this.cd.detectChanges();
    });
  }

  saveProduct() {
    if (this.productName === '') {
      this.errorMessage = 'Nazwa jest wymagana';
      return;
    }

    const updatedProduct = {
      id: this.productId,
      title: this.productName,
      body: this.productDescription,
      userId: 1
    };

    this.http.put('https://jsonplaceholder.typicode.com/posts/' + this.productId, updatedProduct).subscribe(() => {
      this.router.back();
    });
  }

  goBack() {
    this.router.back();
  }
}

