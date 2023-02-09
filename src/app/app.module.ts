import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonListComponent } from './person-list/person-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockPersonBackendService } from './services/mock-person-backend.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule} from '@angular/router';
import { appRoutes } from './app-routes';
import { AddPersonComponent } from './add-person/add-person.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonDetailComponent,
    PersonListComponent,
    PageNotFoundComponent,
    AddPersonComponent
  ],
  
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockPersonBackendService, {dataEncapsulation: false}
    ),
    
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
