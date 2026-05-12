import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Agregamos Router
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
  showDeleteModal = false; // Controla la ventana de confirmación

  constructor(
    private userService: UserService, //Aquí se imyecta el servicio
    private router: Router // Inyectamos el router para redirigir tras borrar
  ) {} 

  ngOnInit(): void {
    this.user = this.userService.getUserLocal(); //Revisa si ya hay algún usuario guardado
  }

  logout(): void {
    this.userService.logout();
    this.user = null;//Se elimían los datos
  }

  // En el futuro se implementará aquí una opción para eliminar y para editar el perfil
}