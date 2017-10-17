import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';

import { State } from '../models'

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() state: State;
  searchForm: FormGroup;

  constructor(private router: Router) {

    this.searchForm = new FormGroup({
      state: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
    
  }

  getState(event){
    event.preventDefault();
    const state = this.searchForm.get('state').value;    
    this.state = state;
    this.router.navigate(['/results', { state } ])
  }

  ngOnInit() {
  }

}
