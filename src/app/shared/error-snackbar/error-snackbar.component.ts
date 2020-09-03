import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'error-snackbar',
    templateUrl: 'error-snackbar.component.html',
    styles: ['error-snackbar.component.scss'],
  })
  export class SnackbarErrorComponent implements OnInit {

    public message: string = 'unknown';
    public isError: boolean;
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

    ngOnInit(){
      this.isError = this.data.isSuccess
      this.message = this.data.message;
    }
    
  }