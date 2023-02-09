import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Person } from '../person';
import { PersonService } from '../services/person.service';

/**
 * Diese Komponente regelt die Detailsicht und Bearbeitung der Personen
 */
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit{
  //Hier sind defaultwerte, die nur zur Typsicherheit gesetzt werden. Diese Werte werden im normalen Durchlauf nicht gesehen
    person$: Observable<Person> = of({id:-1, firstName:"a", surname: "b", mail: "c"});
    
    personID: number = 0;
    @Input() newFirstName: string="";
    @Input() newSurname: string="";
    @Input() newMail: string= "";
    
    constructor(
      private service: PersonService,
      private actRoute: ActivatedRoute,
      private router: Router
    ){}
    ngOnInit(): void {

      this.person$ = this.actRoute.paramMap.pipe(
        switchMap((params: ParamMap) =>{
          //in der ParamMap sind Werte als string gespeichert, daher wandeln wir die ID hier in eine Basis-10 Int um
          let id_num = parseInt(params.get("id")!, 10);
          let personObserve: Observable<Person> = this.service.getPerson(id_num);
          //Diese Eigenschaften brauchen wir um die Bearbeitung zu ermöglichen
          personObserve.subscribe((p:Person)=>{
                      this.newFirstName = p.firstName;
                      this.newMail = p.mail;
                      this.newSurname = p.surname;
                      this.personID = p.id;
                            });
          return personObserve;
        }
      ));  
    }

    updatePerson(): void {
      let update: Person = {id:this.personID,
         firstName:this.newFirstName.trim(), 
         surname :this.newSurname.trim(),
          mail : this.newMail.trim()
          };
      this.service.updatePerson(update).subscribe();
    }
    deletePerson(): void{
      this.service.removePerson(this.personID).subscribe();
      this.router.navigate(["list-people"])
    }
}
