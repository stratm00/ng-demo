import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';
/**
 * Dieses Stück regelt die URL-Routen und damit auch die einzelnen "Seiten" unserer Single Page Application
 */
export const appRoutes: Routes = [
  {path:'list-people', component:PersonListComponent},
  {path:'person-detail/:id', component:PersonDetailComponent},
  {path:'add-person', component:AddPersonComponent},
  {path: '', redirectTo:"list-people", pathMatch: "full"},
  {path: "**", component:PageNotFoundComponent}
]
