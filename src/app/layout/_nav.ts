import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/home/index',
    icon: 'cil-apps',
    badge: {
      color: 'warning',
      text: 'UND'
    }
  },
  {
    title: true,
    name: 'Generadores'
  },
  {
    name: "Unidades G",
    icon: 'cil-input-power',
    url: '/home/list'
  },
  {
    name: "Modelos G",
    icon: 'cil-list',
    url: '/home/model'
  },
  {
    title: true,
    name: 'Configuracion'
  },
  {
    name: "Usuarios",
    icon: 'cil-user',
    url: '/home/users'
  },
  {
    name: "Empresas",
    icon: 'cil-institution',
    url: '/home/company'
  },
];
