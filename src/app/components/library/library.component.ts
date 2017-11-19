import { Component, OnInit, OnDestroy } from '@angular/core'
import { LibraryService } from 'services/library.service'
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  type: string
  sortBy: string
  search: string
  private sub: any
  constructor(public libraryService: LibraryService,
              private route: ActivatedRoute,
              private router: Router) {}


  async ngOnInit() {
    this.libraryService.getLibrary()
    this.sub = this.route.queryParams.subscribe(params => {
        this.type = params['type'] || 'movie'
        this.sortBy = params['sort_by'] || 'standard'
        this.search = params['search'] || ''
        this.libraryService.getLibrary(this.sortBy, this.search)
      })
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
