import { Component, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loaded = false;
    this.http.get('https://jsonplaceholder.typicode.com/posts?_limit=10').subscribe((data: any) => {
      this.products = data.map((item: any) => ({
        id: item.id,
        name: item.title.substring(0, 20),
        code: 'PRD-' + item.id,
        status: item.id % 2 === 0 ? 'dostepny' : 'niedostepny'
      }));
      this.loaded = true;
      this.cd.detectChanges();
    }, (error) => {
      this.errorMessage = 'Blad przy ladowaniu produktow';
      this.loaded = true;
      this.cd.detectChanges();
    });
  }
}
