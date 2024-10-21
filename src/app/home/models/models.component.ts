import { Component } from '@angular/core';
import { Model } from '../../models/unit'
import { ModelService } from '../../service/model.service';
import { freeSet } from '@coreui/icons';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss'
})
export class ModelsComponent {

  loading = true;
  icons = freeSet ;
  models: Model[] = []
  userType = 0
  constructor(private modelSerivce: ModelService, private authService: AuthService) {
    this.userType = this.authService.getUserType()
    this.modelSerivce.getModels().subscribe(data => {
      this.loading = false
      this.models = data.data
    })
  }

  openMode(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
