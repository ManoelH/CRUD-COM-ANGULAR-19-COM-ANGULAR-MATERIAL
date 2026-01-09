import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../model/Client';
import { ClientService } from '../service/client.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'app-register',
  imports: [FlexLayoutModule,
     MatCardModule, 
     FormsModule, 
     MatFormField, 
     MatLabel, 
     MatInputModule,
     MatIconModule,
     MatButtonModule,
    NgxMaskDirective],
  providers: [
    provideNgxMask()
  ],  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{

  client: Client = Client.newClient();
  isUpdate: boolean = false;
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((query:any) => {
      const params = query["params"];
      const id = params["id"];
    
      this.isUpdate = (id != undefined);
      if(this.isUpdate) this.client = this.clientService.findClientById(id) || Client.newClient();
      else this.client = Client.newClient();
    });
  }

  saveClient() {
    if(!this.isUpdate) {
      this.clientService.save(this.client);
      this.client = Client.newClient();
      this.showMessageSucess("Cliend has been registered sucessfully!");
    } else {
      this.clientService.update(this.client);
      this.router.navigate(['/search']);
      this.showMessageSucess("Cliend has been updated sucessfully!");
    }
  }

  showMessageSucess(message: string) {
    this.snackBar.open(message, "Ok")
  }

  clearClient() {
    this.client = Client.newClient();
  }
}
