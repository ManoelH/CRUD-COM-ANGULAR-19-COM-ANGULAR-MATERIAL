import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  clientList: Client[] = [];
  columnsTable: string [] = ['id', 'name', 'cpf', 'birthdayDate', 'email', "state", "city", "actions"];
  filterValue: string = '';
  isDeleting: boolean = false;
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(
    private clientService: ClientService,
    private router: Router) {

  }

  ngOnInit() {
    this.searchClients();
  }

  searchClients(name?: string) {
    if(name) 
      this.clientList = this.clientService.searchClients(name);
    else 
      this.clientList = this.clientService.searchClients(this.filterValue);
  }

  getClientToEdit(id: string) {
    this.router.navigate(['/register'], {queryParams: { "id": id}});
  }

  prepareToDelete(client: Client) {
    client.isDeleting = true;
  }

  deleteCliente(client: Client) {
    this.clientService.delete(client);
    this.searchClients();
    this.showMessageSucess("Cliend has been deleted sucessfully!");
  }

  showMessageSucess(message: string) {
    this.snackBar.open(message, "Ok")
  }
}
