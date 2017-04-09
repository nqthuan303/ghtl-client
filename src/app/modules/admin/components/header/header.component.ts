import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'admin-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    showUserProfileDropdown: boolean
    nameOfUser: string;

    constructor(private router: Router) {
        this.showUserProfileDropdown = false;
    }

    ngOnInit() {
        let auth = JSON.parse(localStorage.getItem('auth'));

        if (auth && auth.name) {
            this.nameOfUser = auth.name;
        }
    }

    logout() {
        localStorage.removeItem('auth');
        this.router.navigate(['user/login']);
    }
}
