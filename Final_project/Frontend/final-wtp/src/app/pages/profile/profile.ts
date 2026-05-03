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
  user: User | null = null; //Cuando no hay nadie logueado

  constructor(private userService: UserService) {} //Aquí se imyecta el servicio

  ngOnInit(): void {
    this.user = this.userService.getUserLocal(); //Revisa si ya hay algún usuario guardado
  }

  logout(): void {
    this.userService.logout();
    this.user = null;//Se limían los datos
  }
}