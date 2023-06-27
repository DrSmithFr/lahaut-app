import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  public setData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string): string|null {
    return localStorage.getItem(key)
  }

  public setObject<T>(key: string, value: T|null): void {
    if (value === null) {
      this.remove(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  public getObject<T>(key: string): T|null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }
}
