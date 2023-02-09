import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import { MessageService } from './message.service';
import { Person } from '../person';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/*
  Diese Klasse abstrahiert die Kommunikation mit dem Backend und lässt sich als Dienst in jede Komponente injizieren
*/
export class PersonService {
  private personsUrl = "api/persons";
  private httpOptions  = {
    headers : new HttpHeaders({"content-type":"application/json"})
  };
  getPersons(): Observable<Person[]> {
    
   return this.http.get<Person[]>(`/${this.personsUrl}/`, this.httpOptions)
    .pipe(
      catchError(this.handleError<Person[]>('getPersons', []))
    );
  }
  updatePerson(person: Person){
    return this.http.put(`/${this.personsUrl}/`, person, this.httpOptions)
    .pipe(
         catchError(this.handleError<any>("updatePerson"))
    );
    
  }
  addPerson(person: Person){
    return this.http.post(`/${this.personsUrl}/`, person, this.httpOptions)
    .pipe(
      catchError(this.handleError<Person>('addPerson', person))
    );
  }
  removePerson(id: number){
    return this.http.delete(`/${this.personsUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Person>('removePerson'))
      );
  }
  getPerson( id: number): Observable<Person>{
    return this.http.get<Person>(`/${this.personsUrl}/${id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError<Person>('getPerson'))
    );
  }
  resetDb():void{
    this.http.post("/commands/resetDb", "", this.httpOptions).subscribe();
  }
  private log(message: string){
      this.messageService.add(message);
  }
  private handleError<T>(operation="operation", result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} has failed: ${error.message}`);
      return of(result as T);
    }
  }
  constructor(
    private http:HttpClient,
    private messageService:MessageService
  ) { }
}
