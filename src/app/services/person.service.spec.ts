import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Person } from '../person';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;
  let testPerson : Person = {id:-Infinity, firstName:"test", surname:"test", mail:"test"};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should successfully add a person", () => {
    service.resetDb();
    //amount of stored Person objects should increase by one upon adding a new Person
    let prevLen: number = -1;
    let afterLen: number = -1;
    service.getPersons().subscribe((arr) => prevLen = arr.length);
    service.addPerson(testPerson).subscribe();
    service.getPersons().subscribe((arr) => afterLen=arr.length);
    
    expect(afterLen).toEqual(prevLen+1);
    expect(prevLen).toBeGreaterThan(0);
    expect(afterLen).toBeGreaterThan(0);
  });

  it("should successfully remove a person", () => {
    service.resetDb();
    //amount of stored Person objects should decrease by one upon removing an existing Person
    let prevLen: number = -1;
    let afterLen: number = -1;
    service.getPersons().subscribe((people) => prevLen = people.length);
    service.removePerson(0).subscribe();
    service.getPersons().subscribe((people)=>{ afterLen = people.length});

    expect(afterLen).toBeGreaterThan(0);
    expect(prevLen).toBeGreaterThan(0);
    expect(afterLen).toBe(prevLen-1);
  });
});
