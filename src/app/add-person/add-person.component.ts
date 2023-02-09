import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
/**
 * Diese Komponente kümmert sich um das Hinzufügen neuer Personen
 */
export class AddPersonComponent {
  
  @Input() firstName: string="";
  @Input() surname:string="";
  @Input() mail: string = "";

  addPerson(): void{
    //Die ID wird bei der Erstellung eines Eintrags vom Backend neu vergeben
    let addition: Person = {id:-Infinity, firstName:this.firstName.trim(), surname:this.surname.trim(), mail:this.mail.trim()};
    this.service.addPerson(addition).subscribe();
    this.goBack();
  }
  goBack():void{
    this.router.navigate(["list-people"]);
  }
  constructor(private service:PersonService, private router:Router){}
}
