import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from 'services/user.service'
import { HistoryService } from 'services/history.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private historyService: HistoryService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userService.getUser()
    await this.historyService.getHistory()
  }

  public async delete() {
    console.log(`[Component|User](delete) Triggered delete()`)
    await this.userService.delete()
    this.router.navigate(['/'])
    console.log(`[Component|User](delete) Finished delete()`)
  }
}
