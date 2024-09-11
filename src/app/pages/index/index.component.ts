import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../shared/handlers/api.service';
import { RouterModule } from '@angular/router';

// import { KTDataTable } from '../../../metronic/core/index';
declare var KTDataTable: any;
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  edit_id?: number;
}
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private apiService: ApiService) {}
  users: User[] = [];
  userSub: Subscription;
  datatable!: any;
  rowId: any;
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initializeDataTable();
    this.handleEditButtonClick();
    this.handleDeleteButtonClick();
  }

  initializeDataTable() {
    const element: HTMLElement | null =
      document.querySelector('#kt_remote_table');

    const apiUrl = 'http://localhost:3000/users';
    const dataTableOptions = {
      apiEndpoint: apiUrl,
      requestMethod: 'GET',
      pageSize: 5,

      columns: {
        id: {
          title: 'id',
          data: 'id',
          createdCell(cell: any) {
            cell.classList.add('text-center');
          },
        },
        email: {
          title: 'email',
          data: 'email',
        },
        firstName: {
          title: 'firstName',
          data: 'firstName',
        },
        lastName: {
          title: 'lastName',
          data: 'lastName',
        },
        username: {
          title: 'username',
          data: 'username',
        },
        edit: {
          title: 'id',
          data: 'id',
          orderable: true,
          render: (item: any, data: any, context: any) => {
            return `

            <i class="btn btn-sm btn-icon  btn-clear btn-light text-base d-flex justify-center items-center text-center ki-outline ki-notepad-edit edit-btn " data-id="${data.id}"></i> `;
          },
        },
        delete: {
          data: 'id',
          orderable: false,
          render: (item: any, data: any, context: any) => {
            return `
            <i class="btn btn-sm btn-icon  btn-clear btn-light text-base d-flex justify-center items-center text-center ki-outline ki-trash delete-btn" data-id="${data.id}"></i>`;
          },
        },
      },
    };
    try {
      this.datatable = element
        ? new KTDataTable(element, dataTableOptions)
        : null;

      this.datatable.on('drew', () => {
        this.handleEditButtonClick();
        this.handleDeleteButtonClick();
      });
    } catch (error) {
      console.error('Error initializing KTDataTable', error);
    }
  }
  private getValueId(btnElement: Element): string {
    return btnElement.getAttribute('value') || '';
  }

  handleEditButtonClick() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach((btn: any) => {
      btn.addEventListener('click', (event: any) => {
        if (event.target && event.target.matches('.edit-btn')) {
          const userId = event.target.getAttribute('data-id');
          console.log('Edit user with ID:', userId);
        }
      });
    });
  }

  handleDeleteButtonClick() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((btn: any) => {
      btn.addEventListener('click', (event: any) => {
        if (event.target && event.target.matches('.delete-btn')) {
          const userId = event.target.getAttribute('data-id');
          console.log('Delete user with ID:', userId);
          const userIndex = this.datatable._data.findIndex(
            (item: any) => item.id == userId
          );
          console.log(userIndex);
          this.datatable.showSpinner();
          this.apiService
            .delete('http://localhost:3000', `users/${userId}`)
            .subscribe((res) => {
              this.datatable.reload();
              console.log(res);
              this.datatable._data.splice(userIndex, 1);
            });
        }
      });
    });
  }

  // editUser(id: any) {
  //   console.log('Edit user with id:', id);
  // }

  toRefresh() {
    this.datatable.reload();
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }
}
