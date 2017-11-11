import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { CardElement } from 'classes/CardElement'


@Injectable()
export class WatchlistService {
  private URL = '/api/watchlist'
  private findURL = 'api/tmdb/find'
  watchlist: any

  constructor(private http: Http) {}

  public async addMovieToWatchlist(id: string) {
    try {
      const response = await this.http.post(this.URL + '/movie/', {id: id}).toPromise()
    } catch (err) {
      console.error(err)
    }
  }
  public async removeMovieFromWatchlist(id: string) {
    try {
      const response = await this.http.get(this.URL + '/movie/remove/' + id ).toPromise()
    } catch (err) {
      console.error(err)
    }
  }
  public async getWatchlist() {
    try {
      const url = `${this.findURL}/${'tt0100507'}?`
      const response = await this.http.get(url).toPromise()
      if (response.status === 200) {
        this.reconfigure(response.json())
      }
    }catch (err) {
      console.error(err)
    }
  }

  private reconfigure(json) {
    console.log(json.movie_results[0])
    json = json.movie_results
    this.watchlist = json.map((result) => new CardElement(result))

  }
}
