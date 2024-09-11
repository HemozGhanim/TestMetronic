import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/handlers/api.service';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getAllUsers(endpoint: string) {
    return this.apiService.get<any>(environment.apiUrl, endpoint);
  }
}
