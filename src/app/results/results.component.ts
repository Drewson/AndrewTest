import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StateAPIService } from '../apiService/states';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [ StateAPIService ]
})
export class ResultsComponent implements OnInit {

  usaState: string;
  notFound: boolean;
  isLoading: boolean;
  stateResults: Array<Object>;
  private sub: any;

  constructor(private stateApiService: StateAPIService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = false;
    this.notFound = false;
    this.sub = this.route.params.subscribe(params => {
      this.usaState = params['usaState'];
    });

    this.stateApiService.getState(this.usaState)
      .subscribe(val => {
        this.isLoading = true;
        this.notFound = !val.RestResponse.messages[0].includes('No matching state') && true;
        this.stateResults = val.RestResponse.result;
      });
  }
}
