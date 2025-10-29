import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(UsersService);
  const token = auth.getToken();
  const toastr = inject(ToastrService)
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT para obter o perfil

    // Verifica o perfil do usuário
    if (payload._profile_id === 1) {
      // Admin: Acesso total
      return true;
    } else if (payload._profile_id === 3) {
      // Coordenador: Acesso intermediário (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('Coordenador')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    } else if (payload._profile_id === 4) {
      // User: Acesso restrito (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('Colaborador')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    } else if (payload._profile_id === 5) {
      // Coordenador: Acesso intermediário (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('Parceiro')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    }
    else if (payload._profile_id === 2) {
      // Secretário: Acesso intermediário (verifique a rota permitida)
      if (route.data['roles'] && route.data['roles'].includes('Secretario')) {
        return true;
      } else {
        toastr.warning('Acesso não autorizado!');
        router.navigate(['/home']);
        return false;
      }
    }    else {
      // Perfil desconhecido
      router.navigate(['/login']);
      return false;
    }
  } else {
    // Se o token não existir, redireciona para a página de login
    router.navigate(['/login']);
    return false;
  }
};
