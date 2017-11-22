import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserComponent } from './user.component'
import { AverageRatingComponent } from '../average-rating/average-rating.component'
import { WordCloudComponent } from '../word-cloud/word-cloud.component'
import { WordCloudWishComponent } from '../word-cloud-wish/word-cloud-wish.component'
import { AgWordCloudModule } from 'angular4-word-cloud'
import { UserService } from '../../services/user.service'
import { HttpModule} from '@angular/http'
import { HistoryService } from '../../services/history.service'
import { RouterTestingModule } from '@angular/router/testing'
import {LibraryService} from '../../services/library.service'
import {WatchlistService} from '../../services/watchlist.service'

describe('UserComponent', () => {
  let component: UserComponent
  let fixture: ComponentFixture<UserComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgWordCloudModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [
        UserComponent,
        AverageRatingComponent,
        WordCloudComponent,
        WordCloudWishComponent,
      ],
      providers: [
        UserService,
        HistoryService,
        LibraryService,
        WatchlistService
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
