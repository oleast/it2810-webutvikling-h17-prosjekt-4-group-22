import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class DiscoverService {
  private discoveryURL = '/api/tmdb/discover/movie'

  constructor(private http: Http) {}

  public async getDiscovery(): Promise<any> {
    try {
      const response = await this.http.get(this.discoveryURL).toPromise()
      return response.json()
    } catch (err) {
      console.error(err)
    }
  }
}