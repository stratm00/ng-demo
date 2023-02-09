import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Person} from '../person';
@Injectable({
  providedIn: 'root'
})

export class MockPersonBackendService implements InMemoryDbService{
  createDb(){
    const persons: Person[] = [
    {id: 0, firstName:"F.P.", surname:"Schubert", mail:"mail1"},
    {id: 1, firstName:"J.S.", surname:"Bach", mail:"mail2"},
    {id: 2, firstName:"W.A.", surname:"Mozart", mail:"mail3"}];
    return {persons};
  }
  genId(persons: Person[]): number{
    return (persons.length>0) ? Math.max(...persons.map(person=> person.id))+1:3;
  }
  
}
