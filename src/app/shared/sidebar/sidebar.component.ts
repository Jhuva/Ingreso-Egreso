import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private authService: AuthService,
              private router: Router) {}

  logout() {
    Swal.fire({
      title: 'Cerrando sesión',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    this.authService.logout().then(res => {
      this.router.navigate(['/login']);
      Swal.close();
    })
  }

}
