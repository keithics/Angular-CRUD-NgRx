import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router: Router
  ) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  public upload(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
  }

  public submit() {
    this.service.add(this.form.value).subscribe((response) => {
      if (response._id) {
        this.router.navigateByUrl('/admin/products');
      }
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.form.patchValue({
        fileSource: file,
      });
      const formData = new FormData();
      formData.append('file', this.form.get('fileSource')?.value);
      this.service
        .upload(formData, 'image/single')
        .subscribe(async (response) => {
          this.form.patchValue({
            image: response.Location,
          });
        });
    }
  }
}
