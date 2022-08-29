import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  public id: string | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl('', [Validators.required]),
    file: new FormControl(''),
    fileSource: new FormControl(''),
    image: new FormControl('', [Validators.required]),
  });
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.service.get(this.id).subscribe((data) => {
          this.id = data._id;
          this.form.patchValue(data);
        });
      }
    });
  }

  public upload(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
  }

  public submit() {
    const service = this.id
      ? this.service.update(this.id, this.form.value)
      : this.service.add(this.form.value);
    service.subscribe((response) => {
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
