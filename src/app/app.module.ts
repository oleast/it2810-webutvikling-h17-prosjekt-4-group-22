import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { Routes, RouterModule, Router } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { AgWordCloudModule} from 'angular4-word-cloud'

/**
 * Import Components
 */
import { AppComponent } from './app.component'
import { HomeComponent } from 'components/home/home.component'
import { UserComponent } from 'components/user/user.component'
import { CardComponent } from 'components/card/card.component'
import { NavbarComponent } from 'components/navbar/navbar.component'
import { LibraryComponent } from 'components/library/library.component'
import { SearchComponent } from 'components/search/search.component'
import { WatchlistComponent } from 'components/watchlist/watchlist.component'
import { NotFoundComponent } from 'components/not-found/not-found.component'
import { FilterComponent } from './components/filter/filter.component'

/**
 * Import Services
 */


import { UserService } from 'services/user.service'
import { DiscoverService } from 'services/discover.service'
import { SearchService } from 'services/search.service'
import { WatchlistService } from 'services/watchlist.service'
import { AuthGuard } from 'services/auth-guard.service';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component'


export const initUserServiceFactory = (userService: UserService): Function => {
  return () => userService.getUser()
}

export const USER_INIT = {
  provide: APP_INITIALIZER,
  useFactory: initUserServiceFactory,
  deps: [UserService],
  multi: true
}

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'find', redirectTo: 'search'},
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent},
  {path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  {path: 'watchlist', component: WatchlistComponent, canActivate: [AuthGuard]},
  {path: '**', component: WordCloudComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    CardComponent,
    NavbarComponent,
    LibraryComponent,
    SearchComponent,
    WatchlistComponent,
    NotFoundComponent,
    FilterComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: false}),
    AgWordCloudModule
  ],
  providers: [
    DiscoverService,
    WatchlistService,
    SearchService,
    UserService,
    AuthGuard,
    USER_INIT
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
