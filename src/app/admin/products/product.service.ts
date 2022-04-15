import { BaseService } from 'src/app/core/core.service';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  public override api = environment.hosts.products;
  public override moduleName = 'products';
}
