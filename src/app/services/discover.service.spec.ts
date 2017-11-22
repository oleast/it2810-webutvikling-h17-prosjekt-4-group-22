import { TestBed, inject } from '@angular/core/testing'

import { DiscoverService } from 'services/discover.service'
import { HttpModule } from '@angular/http'

describe('DiscoverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        DiscoverService
      ]
    })
  })

  it('should be created', inject([DiscoverService], (service: DiscoverService) => {
    expect(service).toBeTruthy()
  }))
})
