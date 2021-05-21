import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeComponent } from '../shop/home/home.component';
// Import the library
import { MainComponent } from '../shop/main/main.component';

import { CategoriesComponent } from './widgets/categories/categories.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { SubcategoryItemsComponent } from './subcategory-items/subcategory-items.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    SearchComponent,
    MainComponent,
    HomeComponent,
    MainCarouselComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductLeftSidebarComponent,
    CategoriesComponent,
    CategoryItemsComponent,
    SubcategoryItemsComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    CarouselModule
   ],
  exports: [
    MatIconModule,
  ]
})

export class ShopModule { }
