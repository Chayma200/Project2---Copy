import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { SubcategoryItemsComponent } from './subcategory-items/subcategory-items.component';
import { HomeComponent } from '../shop/home/home.component';
import { SearchComponent } from './search/search.component';


// Routes
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'category-items/:categoryID', component: CategoryItemsComponent },
  { path: 'subcategory-items/:categoryID/:subcategoryID', component: SubcategoryItemsComponent },
  { path: 'search/:KeyWord', component: SearchComponent },
  { path: 'products/:category/left-sidebar', component: ProductLeftSidebarComponent },
  { path: 'product/product-details/:item-id', component: ProductDetailsComponent },
  { path: 'product/product-details/:item-id/:skU_ID', component: ProductDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
