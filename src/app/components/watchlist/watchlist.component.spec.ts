import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WatchlistComponent } from 'components/watchlist/watchlist.component'

describe('WatchlistComponent', () => {
  let component: WatchlistComponent
  let fixture: ComponentFixture<WatchlistComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
