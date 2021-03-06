import { Component, OnInit, ViewChild } from '@angular/core'
import { AgWordCloudData, AgWordCloudDirective } from 'angular4-word-cloud'

import { LibraryService } from 'services/library/library.service'


@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})

export class WordCloudComponent implements OnInit {

  // WordCloudDirective
  @ViewChild('word_cloud_chart') wordCloudChart: AgWordCloudDirective

  // Main word cloud.
  wordData: Array<AgWordCloudData> = []

  options = {
    settings: {
      minFontSize: 70,
      maxFontSize: 150,
    },
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    labels: false // false to hide hover labels
  }

  // Colors to use in cloud.
  colors = ['#653399', '#982d84', '#b5d83c', '#e3d83f', '#00D377']

  emptyLib: Array<AgWordCloudData> = [
    {size: 3, text: 'LIBRARY'},
    {size: 1, text: ' '},
    {size: 3, text: ' '},
    {size: 1, text: ' '},
    {size: 1, text: ' '},
    {size: 1, text: ' '},
    {size: 1, text: ' '},
    {size: 3, text: 'EMPTY'}
    ]

  addMore: Array<AgWordCloudData> = [
    {size: 3, text: 'ADD MORE'},
    {size: 1, text: ' '},
    {size: 3, text: ' '},
    {size: 1, text: ' '},
    {size: 1, text: ' '},
    {size: 1, text: ' '},
    {size: 1, text: ' '},
    {size: 3, text: 'TO LIBRARY'}
    ]


  constructor(public libraryService: LibraryService) {

  }

  async ngOnInit() {
    /**
     * On init, we will fetch the users
     * library and every instance of a genre.
     * Generate words and update cloud.
     */

    this.wordCloudChart.color = this.colors

    // Fetch movies and TV shows from Library.
    await this.libraryService.getLibrary()
    const libraryMov = this.libraryService.libraryMovie
    const libraryTV = this.libraryService.libraryTv
    let tvs: any
    let movs: any
    if (libraryTV != null) {
      tvs = libraryTV.map(movie => movie.genres)
    } else {
      tvs = []
    }

    if (libraryMov != null) {
      movs = libraryMov.map(movie => movie.genres)
    } else {
      movs = []
    }
    const genres = movs.concat(tvs)

    // Generate cloud data and update cloud.
    this.generateCloudWords(genres)
    this.wordCloudChart.update()
    }

  private generateCloudWords(genres) {
    /**
     * Generates cloud if there are more than 4 movies in the library.
     * If there are zero or less than 5 movies there, it shows a custom word cloud.
     * Else it will push two empty strings to the word cloud, with different weights.
     * This will make the cloud generate in 99.99 % of instances.
     * @param {genres} Array<Array> Genres list of lists.
     */
    if (!genres.length) {
      this.pushCloud(this.emptyLib)
    } else if (genres.length < 5) {
      this.pushCloud(this.addMore)
    } else {
      this.countGenres(genres)
      this.wordData.push({size: 1, text: ' '})
      this.wordData.push({size: 2, text: ' '})
    }
  }

  private countGenres(genres) {
    /**
     * Genres will look like genres = [[drama, crime], [comedy, action], ... ]
     * where every array in the genre array is a specific movie.
     * We want to concat this array as one array, and then count instances in countEm.
     * After counting we push the AgWordCloudData dictionary,
     * {size: counted_number, text: genre}, into the wordData.
     * @param {genres} Array<Array> Genres list of lists.
     */
    const arr = genres.reduce((a, b) => a.concat(b), [])
    const counted = this.countEm(arr, String)
    for (const key in counted) {
      if (key) {
        this.wordData.push({size: counted[key], text: key})
      }
    }
  }

  private countEm(ary, classifier) {
    /**
     * Main counter. Counts instances of each String (classifier) genre,
     * and returns number of instances.
     * @param { ary } Array<String> Array to count.
     * @param { classifier } Type Classifier.
     */
    classifier = classifier || String
    return ary.reduce(function (counter, item) {
      const p = classifier(item)
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1
      return counter
    }, {})
  }

  private pushCloud(cloud) {
    /**
     * Pushes cloud data to wordData.
     * @param {cloud} Array of AgWordCloudData
     */
    for (let i = 0; i < cloud.length; i++) {
      const item = cloud[i]
      this.wordData.push(item)
    }
  }
}
