import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { AddProductComponent } from './add-product.component';
import { EditProductComponent } from './edit-product.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'edit/:id', component: EditProductComponent },
];
