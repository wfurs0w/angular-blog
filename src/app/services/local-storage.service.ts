import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  subscribe(key: string): Observable<string | null> {
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === key),
      map(event => event.newValue)
    );
  }
}
