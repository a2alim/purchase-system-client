import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { filter, take, map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

}
