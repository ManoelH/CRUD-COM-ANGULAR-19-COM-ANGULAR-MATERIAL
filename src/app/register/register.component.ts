import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../model/Client';
import { ClientService } from '../service/client.service'; 

@Component({
  selector: 'app-register',
  imports: [FlexLayoutModule,
     MatCardModule, 
     FormsModule, 
     MatFormField, 
     MatLabel, 
     MatInputModule,
     MatIconModule,
     MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  client: Client = Client.newClient();

  constructor(
    private clientService: ClientService
  ) {

  }

  saveClient() {
    this.clientService.save(this.client);
    this.client = Client.newClient();
  }
}
