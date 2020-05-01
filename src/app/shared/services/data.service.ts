import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private visitSource =  new BehaviorSubject<any>('');
  visitData = this.visitSource.asObservable();



  visitMessage(message: any) {
    this.visitSource.next(message);
  }
}
