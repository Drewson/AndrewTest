import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  usaState: string;
  searchForm: FormGroup;
  flashRed: boolean;

  constructor(private router: Router) {

    this.searchForm = new FormGroup({
      usaState: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    });
    
    this.flashRed = false;
  }

  getUSAState(event){
    event.preventDefault();
    const usaState = this.searchForm.get('usaState').value;    
    this.usaState = usaState;

    if(!this.searchForm.invalid && this.allLetter(this.usaState)){
      this.router.navigate(['/results', { usaState } ])
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
