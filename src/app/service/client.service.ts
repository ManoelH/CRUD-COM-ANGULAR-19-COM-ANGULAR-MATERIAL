import { Injectable } from '@angular/core';
import { Client } from '../model/client.model';

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

  update(client: Client) {
    const storage = this.getStorage();
    storage.forEach(c => {
      if(c.id === client.id) {
        Object.assign(c, client);
      }
    });
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  delete(client: Client) {
    const storage = this.getStorage();
    const clients: Client[] = storage.filter(c => c.id !== client.id)
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));
  }

  searchClients(name: string) {
    if(!name)
      return this.getStorage();
    else {
      return this.getStorage().filter(client => client.name?.indexOf(name) !== -1);
    }
  }

  findClientById(id: string) : Client | undefined{
    return this.getStorage().find(client => client.id === id);
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
