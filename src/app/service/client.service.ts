import { Injectable } from '@angular/core';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENTS = "_CLIENTS"

  constructor() { }

  save(client: Client) {
    const storage = this.getStorage();
    storage.push(client);
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  searchClients(name: string) {
    if(!name)
      return this.getStorage();
    else {
      return this.getStorage().filter(client => client.name?.indexOf(name) !== -1);
    }
  }

  getStorage() :Client[] {
    const clientRepository = localStorage.getItem(ClientService.REPO_CLIENTS);
    
    if(clientRepository) {
      const clients: Client[] = JSON.parse(clientRepository);
      return clients;
    }
    else {
      const clients: [] = [];
      localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
      return clients;
    }
  }
}
