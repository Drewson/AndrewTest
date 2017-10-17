import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { State } from '../models'
import { StateAPIService } from '../apiService/states';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ StateAPIService ]
})
export class ResultsComponent implements OnInit {

  isLoaded: true;
  state: string;
  notFound: boolean;
  stateResults: Array<Object>;
  private sub: any;

  constructor(private stateApiService: StateAPIService,
              private route: ActivatedRoute,
              private router: Router) { }

  getStyle() {
    return '500px'
  }

  ngOnInit() {
      
    this.sub = this.route.params.subscribe(params => {
      this.state = params['state'];
    });

    this.stateApiService.getState(this.state)
      .subscribe(val => {
        this.notFound = !val.RestResponse.messages[0].includes('No matching state');
        this.stateResults = val.RestResponse.result
        console.log(val.RestResponse.messages)
        console.log(this.stateResults)
      })
  }

}
