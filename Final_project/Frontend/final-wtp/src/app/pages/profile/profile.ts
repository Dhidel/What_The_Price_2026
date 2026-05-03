import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';
import { UserService, User } from '../../services/user';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [SearchNavbar, CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUserLocal();
  }

  logout(): void {
    this.userService.logout();
    this.user = null;
  }
}