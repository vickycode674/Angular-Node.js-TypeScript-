import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NavbarComponent,CommonModule], 
})
export class DashboardComponent implements OnInit {
  user: any;
  activities: any[] = [];


  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getUserDetails(user.userId).subscribe(data => {
      this.user = data;
      this.activities = data.activities || []; 
    });
  }
}
