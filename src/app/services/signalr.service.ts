import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Stock } from '../entities/stock';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor(private dataService: DataService) {}

  public stopConnection = () => {
    this.hubConnection.stop().then(() => {
      console.log('SignalR Connection stopped');
    });
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hub') // URL of the SignalR hub
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connection started')
        this.addMessageListener();
        this.handleDisconnects();
      })
      .catch(err => console.log('Error establishing SignalR connection: ' + err));
  }

  public handleDisconnects = () => {
    console.log('Set disconnections handler');
    this.hubConnection.onclose(() => {
      console.log('Connection lost. Attempting to reconnect...');
      setTimeout(() => this.startConnection(), 3000);  // Try reconnecting after 3 seconds
    });
  }

  public addMessageListener = () => {
    this.hubConnection.on('messageReceived', (msg: Stock) => {
      console.log(`message: ${msg.isin}, ${msg.lastPrice}, ${msg.variation}`);
      this.dataService.upsertStockValue(msg);
    });
  }

  public sendTestMessage = (str: string) => {
    this.hubConnection.invoke('TestMessage', str)
      .catch(err => console.error(err));
  }
}