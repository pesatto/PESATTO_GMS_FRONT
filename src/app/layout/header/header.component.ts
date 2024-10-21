import { Component, computed, inject, Input } from '@angular/core';
import { ColorModeService } from '@coreui/angular-pro';
import { IconSetService } from '@coreui/icons-angular';
import { cilUser, cilSettings, cilAccountLogout, cilMenu, cilApplicationsSettings, cilSun, cilMoon, cilContrast } from '@coreui/icons';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  user: User = {
    _id: '',
    fullname: '',
    email: '',
    user_type: 0,
    userpassword: '',
    active: false,
    __v: 0,
    company: {
      _id: '',
      name: '',
      rfc: '',
      __v: 0
    }
  }

  readonly colorModes = [
    { name: 'dark', text: 'Dark', icon: 'cilMoon', disabled: false },
    { name: 'auto', text: 'Auto', icon: 'cilContrast', disabled: false },
    { name: 'light', text: 'Light', icon: 'cilSun', disabled: false },
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    let icon = this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
    return icon
  });

  constructor(public iconSet: IconSetService, public authService: AuthService) {
    this.user = this.authService.get_user()
    this.#colorModeService.localStorageItemName.set('color_mode_pest');
    this.#colorModeService.eventName.set('ColorSchemeChange');
    iconSet.icons = { cilUser, cilSettings, cilAccountLogout, cilMenu, cilApplicationsSettings, cilSun, cilMoon, cilContrast };

  }

  logout() {
    this.authService.logout();
  }

  @Input() sidebarId: string = 'sidebar1';



}
