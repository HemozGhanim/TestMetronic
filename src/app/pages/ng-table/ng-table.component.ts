import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/handlers/api.service';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  edit_id: number;
}

@Component({
  selector: 'app-ng-table',
  standalone: true,
  imports: [],
  templateUrl: './ng-table.component.html',
  styleUrl: './ng-table.component.scss',
})
export class NgTableComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('http://localhost:3000', 'users').subscribe({
      next: (res: any) => {
        this.users = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
