import { Component, OnInit } from '@angular/core';
import {Person} from '../person';
import { PersonService } from '../services/person.service';
@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit{
    personList: Person[]  = [];    
    ngOnInit(){
      
      this.personService.getPersons()
      .subscribe(persons => this.personList = persons);
    }

    constructor(private personService:PersonService){}
}
