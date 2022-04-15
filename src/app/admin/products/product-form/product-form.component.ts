import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseService } from '../../../core/core.service';
import { FileUploader } from 'ng2-file-upload';

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
  });
  fileToUpload: File | null = null;

  constructor(public fb: FormBuilder, public baseService: BaseService) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  public upload(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
  }

  public submit() {
    const formData = new FormData();
    formData.append('file', this.form.get('fileSource')?.value);
    this.baseService.upload(formData).subscribe(async (response) => {});
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.form.patchValue({
        fileSource: file,
      });
      this.baseService.upload({ file });
      console.log('patched');
    }
  }
}
