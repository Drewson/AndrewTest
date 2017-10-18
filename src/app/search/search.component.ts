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
  flashRed: boolean;

  constructor(private router: Router) {

    this.searchForm = new FormGroup({
      state: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    });
    
    this.flashRed = false;
  }

  getState(event){
    event.preventDefault();
    const state = this.searchForm.get('state').value;    
    this.state = state;

    if(!this.searchForm.invalid && this.allLetter(this.state)){
      this.router.navigate(['/results', { state } ])
    } else {
      this.flashRed = true;
    }
  }

  allLetter(inputtxt){  
    var letters = /^[A-Za-z]+$/;  
    if(inputtxt.match(letters)){  
      return true;  
    }else{  
      return false;  
    }  
  }

  ngOnInit() {
  }

}
