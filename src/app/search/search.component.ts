import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ClientService } from '../service/client.service';
import { Client } from '../model/Client';

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
  columnsTable: string [] = ['id', 'name', 'cpf', 'birthdayDate', 'email'];
  filterValue: string = '';

  constructor(private clientService: ClientService) {

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
}
