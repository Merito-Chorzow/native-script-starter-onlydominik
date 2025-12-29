import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductDetailComponent {
  product: any = null;
  photoPath: string = '';
  loaded: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: RouterExtensions,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.http.get('https://jsonplaceholder.typicode.com/posts/' + id).subscribe((data: any) => {
      this.product = {
        id: data.id,
        name: data.title.substring(0, 20),
        code: 'PRD-' + data.id,
        description: data.body,
        status: data.id % 2 === 0 ? 'dostepny' : 'niedostepny'
      };
      this.loaded = true;
      this.cd.detectChanges();
    }, (error) => {
      this.errorMessage = 'Blad przy ladowaniu produktu';
      this.loaded = true;
      this.cd.detectChanges();
    });
  }

  deleteProduct() {
    this.http.delete('https://jsonplaceholder.typicode.com/posts/' + this.product.id).subscribe(() => {
      this.router.back();
    });
  }

  editProduct() {
    this.router.navigate(['/edit', this.product.id]);
  }

  goBack() {
    this.router.back();
  }
}

