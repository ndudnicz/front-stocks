import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateElementDto, Elem } from '../entities/element';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  private baseUri = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  get(): Promise<Elem[]> {
    return new Promise<Elem[]>((resolve, reject) => {
      this.http.get(`${this.baseUri}/v1/element`).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (e) => {
          reject(e);
        }
      });
    })
  }

  create(element: CreateElementDto): Promise<Elem> {
    return new Promise<Elem>((resolve, reject) => {
      this.http.post(`${this.baseUri}/v1/element`, element).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (e) => {
          reject(e);
        }
      });
    })
  }
}