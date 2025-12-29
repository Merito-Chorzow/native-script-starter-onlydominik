import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  loaded: boolean = false;

  constructor(private http: HttpClient) {}

  loadProducts(): Promise<any[]> {
    return new Promise((resolve) => {
      if (this.loaded) {
        resolve(this.products);
        return;
      }
      this.http.get('https://jsonplaceholder.typicode.com/posts?_limit=10').subscribe((data: any) => {
        this.products = data.map((item: any) => ({
          id: item.id,
          name: item.title.substring(0, 20),
          code: 'PRD-' + item.id,
          description: item.body,
          status: item.id % 2 === 0 ? 'dostępny' : 'niedostępny'
        }));
        this.loaded = true;
        resolve(this.products);
      }, () => {
        resolve([]);
      });
    });
  }

  getProduct(id: number): any {
    return this.products.find(p => p.id == id);
  }

  addProduct(product: any) {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    product.id = newId;
    this.products.unshift(product);
    this.http.post('https://jsonplaceholder.typicode.com/posts', {
      title: product.name,
      body: product.description,
      userId: 1
    }).subscribe();
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id != id);
    this.http.delete('https://jsonplaceholder.typicode.com/posts/' + id).subscribe();
  }

  updateProduct(id: number, product: any) {
    const index = this.products.findIndex(p => p.id == id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
    }
    this.http.put('https://jsonplaceholder.typicode.com/posts/' + id, {
      title: product.name,
      body: product.description,
      userId: 1
    }).subscribe();
  }
}

