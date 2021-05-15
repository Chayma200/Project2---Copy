import { error, newArray } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../SharedServices/categories.service';
import { AddItemService } from './add-item.service';
import { typesValues } from '../add-item/typesValues.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { SKUs } from './SKUs.model';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AddItemComponent implements OnInit {
  public mainimageprogress: number;
  public mainimagemessage: string;
  public skuimageprogress: number;
  public skuimagemessage: string;
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild("ItemSKUForm") ItemSKUForm;

  allSKUValues: Array<any> = new Array();
  prices: Array<any> = new Array();
  quantities: Array<any> = new Array();
  itemskuImageID: string;
  SKUimages: Array<string> = new Array();
  mainimageurl: string | ArrayBuffer;
  skuurl: string | ArrayBuffer;
  errorupload: boolean = false;
  erroruploadsku: boolean = false;
  skuimagerroremessage: string;
  imagemessage: string;
  itemMainImageID: string;
  types = new typesValues();
  skus = new SKUs();
  skuarray = [];
  ty: Array<any> = new Array();
  vl: Array<any> = new Array();
  dataarray = [];
  ItemId: string = "";
  t = new Array();
  v = new Array();
  checkedCategories: number[] = new Array();
  addItemForm: FormGroup;
  addSKUsForm: FormGroup;
  categories: {};
  subcategories = new Array();
  error: boolean = false;
  success: boolean = false;
  successMessage: string;
  errorMessage: string;
  _id: number;
  _name: number;
  companyName: string;

  constructor(private registerService: RegisterService, private http: HttpClient, private service: AddItemService, private router: Router, private catService: CategoriesService) { }

  ngOnInit(): void {
    this.dataarray.push(this.types);
    this.skuarray.push(this.skus);
    this.catService.getCategories().subscribe(data => this.categories = data);
    this.registerService.GetCompanyName().subscribe(data => { this.companyName = data; console.log(this.companyName); }, error => console.log(error));

    this.addItemForm = new FormGroup({
      ItemName: new FormControl("", Validators.required),
      //CompanyName: new FormControl("", Validators.required),
      ItemDescription: new FormControl("", Validators.required),
      shippingCost: new FormControl("", Validators.required),
      //Main_ImageID: new FormControl("", Validators.required),
      categories: new FormArray([], Validators.required),
      subCategories: new FormArray([], Validators.required),
      characteristicTypes: new FormArray([]),
      characteristicValues: new FormArray([])
    });

    this.addSKUsForm = new FormGroup({
      values: new FormArray([], Validators.required),
      price: new FormControl("", Validators.required),
      quantity: new FormControl("", Validators.required),
      //Image_ID: new FormControl("", Validators.required)
    });
    
  }


  addAnotherItem() {
    this.router.navigate(["pages/add-item"]).then(() => {
      window.location.reload();
    });
  }

  //upload item's main image
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    if (!files[0] || files[0].length == 0) {
      this.errorupload = true;
      this.imagemessage = 'You must select an image';
      return;
    }

    var mimeType = files[0].type;
    console.log(mimeType);

    if (mimeType.match(/image\/*/) == null) {
      this.errorupload = true;
      this.imagemessage = "Only images are supported";
      return;
    }
    this.errorupload = false;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.mainimageurl = reader.result;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:1264/api/Upload', formData, { responseType: "text", reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.mainimageprogress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.mainimagemessage = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          //console.log(event);
          this.itemMainImageID = event.body;
          console.log(this.itemMainImageID);
        }
      });
  }

  //upload item's sku image
  uploadFileSKU = (files) => {
    if (files.length === 0) {
      return;
    }
    if (!files[0] || files[0].length == 0) {
      this.erroruploadsku = true;
      this.skuimagerroremessage = 'You must select an image';
      return;
    }

    var mimeType = files[0].type;
    console.log(mimeType);

    if (mimeType.match(/image\/*/) == null) {
      this.erroruploadsku = true;
      this.skuimagerroremessage = "Only images are supported";
      return;
    }
    this.errorupload = false;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.skuurl = reader.result;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:1264/api/Upload', formData, { responseType: "text", reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.skuimageprogress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.skuimagemessage = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          //console.log(event);
          this.itemskuImageID = event.body;
          this.SKUimages.push(this.itemskuImageID);
        }
      });
  }

  //value change
  onChangeValue(event) {
    const valArray = <FormArray>this.addSKUsForm.controls.values;
    if (event.isUserInput) {
      console.log(event.source.value);
      valArray.push(new FormControl({ values: event.source.value }));
    }
  }

  //choose category 
  onChange(cat: string, isChecked: boolean) {
    const categoriesArray = <FormArray>this.addItemForm.controls.categories;
    this._id = cat["category_ID"];
    this._name = cat["category_nameEN"];
    if (isChecked) {
      categoriesArray.push(new FormControl({ category_ID: this._id }));
      this.checkedCategories.push(this._id);
      this.catService.getSubCategories(this._id).subscribe(data => this.subcategories.push(data));
    }
    else {
      let index = categoriesArray.controls.findIndex(x => x.value == { category_ID: this._id });
      categoriesArray.removeAt(index);
      const index1 = this.checkedCategories.indexOf(this._id, 0);
      if (index1 > -1) {
        this.checkedCategories.splice(index1, 1);
        this.subcategories.splice(index1,1)
      }
    }
  }

  //choose subcategories
  change(sub: string, isChecked: boolean) {
    const subcategoriesArray = <FormArray>this.addItemForm.controls.subCategories;
    const idd = sub["subCategoryID"];
    if (isChecked) {
      subcategoriesArray.push(new FormControl({ subCategoryID: idd }));
    }
    else {
      let index = subcategoriesArray.controls.findIndex(x => x.value == { subCategoryID: idd });
      subcategoriesArray.removeAt(index);
    }
  }

  //on type blur
  onBlurMethod(type: string) {
    const typesArray = <FormArray>this.addItemForm.controls.characteristicTypes;
    if (type != "") {
      //typesArray.at(i).setValue(new FormControl({ CharType: type}));
      typesArray.push(new FormControl({ CharType: type }));
    }
    else {
      alert("Enter a characteristic type!");
    }
  }

  //on value blur
  values(value: string) {
    const valuesArray = <FormArray>this.addItemForm.controls.characteristicValues;
    if (value != "") {
      var val = value.split("/");
      //valuesArray.at(i).setValue(new FormControl({ CharValue: val }));
      valuesArray.push(new FormControl({ CharValue: val }));
    }
    else {
      alert("Enter a characteristic value!");
    }
  }

  add() {
    const type = new typesValues();
    this.dataarray.push(type);
  }

  remove(index) {
    this.dataarray.splice(index, 1);
    this.t.splice(index, 1);
    this.v.splice(index, 1);
  }

  addSKU() {
    const sku = new SKUs();
    this.skuarray.push(sku);
    let v = new Array();
    for (let x = 0; x < this.addSKUsForm.value.values.length; x++) {
      if (this.addSKUsForm.value.values[x] != null) {
        v.push(this.addSKUsForm.value.values[x].values);
      }
    }
    this.allSKUValues.push(v);
    this.prices.push(parseFloat(this.addSKUsForm.value.price));
    this.quantities.push(parseInt(this.addSKUsForm.value.quantity));
    this.addSKUsForm.reset();
  }

  //Submit the add item form
  async onSubmit() {
    const c = new Array();
    const s = new Array();
    for (let i = 0; i < this.addItemForm.value.categories.length; i++) {
      c.push(this.addItemForm.value.categories[i].category_ID);
    }
    for (let j = 0; j < this.addItemForm.value.subCategories.length; j++) {
      s.push(this.addItemForm.value.subCategories[j].subCategoryID);
    }
    for (let a = 0; a < this.addItemForm.value.characteristicTypes.length; a++) {
      this.t.push(this.addItemForm.value.characteristicTypes[a].CharType);
    }
    for (let b = 0; b < this.addItemForm.value.characteristicValues.length; b++) {
      if (this.addItemForm.value.characteristicValues[b].CharValue.length != 0) {
        this.v.push(this.addItemForm.value.characteristicValues[b].CharValue);
      }
    }
    console.log(this.v);
    console.log(this.addItemForm.value.characteristicValues);
    console.log(this.addItemForm.value.characteristicTypes);
    console.log(this.addItemForm.value.categories);
    console.log(this.addItemForm.value.subCategories);


    const data = {
      "ItemName": this.addItemForm.value.ItemName,
      "CompanyName": this.companyName,
      "ItemDescription": this.addItemForm.value.ItemDescription,
      "shippingCost": parseFloat(this.addItemForm.value.shippingCost),
      "Main_ImageID": this.itemMainImageID,
      "categories": c,
      "subCategories": s,
      "characteristicTypes": this.t,
      "characteristicValues": this.v
    }
    console.log(data);
    if (this.addItemForm.valid) {
      console.log(this.addItemForm.value);
      this.ItemId = await this.service.AddItem(data);
      console.log('Added Item: ' + this.ItemId);

      this.ty = this.addItemForm.value.characteristicTypes;
      this.vl = this.addItemForm.value.characteristicValues;

      console.log(this.ty);
      console.log(this.vl);
    }
  }

  //submit add sku form
  onSubmitSKU() {
    this.addSKU();
    const data = {
      "ItemID": this.ItemId,
      "values": this.allSKUValues,
      "price": this.prices,
      "quantity": this.quantities,
      "Image_ID": this.SKUimages,
      "types": this.t
    }
    console.log(data);
    console.log(this.addSKUsForm.value);
    this.service.AddItemSKU(data).subscribe(
      data => {
        console.log(data);
        if (data.trim() === "Added Successfully") {
          this.success = true;
          this.successMessage = "Your Item has been successfully added!";
        }
        else {
          this.error = true;
          this.errorMessage = "There was a problem adding your item! Please Try Again!";
        }
      }),
      error => console.log("Error!",error);
  }
}
