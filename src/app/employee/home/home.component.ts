import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: any;
  pasword: any;

  isId: boolean;
  isPassword: boolean;

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    if (this.userName == 'admin' && this.pasword == 'admin') {
      this.router.navigate(["/add-purchase"]);
    } else {
      this.userName = '';
      this.pasword = '';
      this.isId = true;
      this.isPassword = true;
      this.toastr.warning('Invalid Username Or Password!');
    }
  }

  idChange() {
    this.isId = false;
  }

  passChange() {
    this.isPassword = false;
  }


}
