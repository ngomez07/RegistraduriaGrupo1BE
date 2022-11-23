import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Página Principal',
    icon: 'home-outline',
    link: '/pages/principal/ingresar',
    home: true,
  },

  {
    title: 'REGISTRADURIA',
    group: true,
  },

  {
    title: 'Candidato',
    icon: 'person-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/candidato/listar',
      },
      {
        title: 'Crear',
        link: '/pages/candidato/crear',
      },
    ],
  },

  {
    title: 'Partido',
    icon: 'flag-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/partido/listar',
      },
      {
        title: 'Crear',
        link: '/pages/partido/crear',
      },
    ],
  },

  {
    title: 'Mesa',
    icon: 'archive-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/mesa/listar',
      },
      {
        title: 'Crear',
        link: '/pages/mesa/crear',
      },
    ],
  },
  {
    title: 'Resultado',
    icon: 'checkmark-circle-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/resultado/listar',
      },
      {
        title: 'Crear',
        link: '/pages/resultado/crear',
      },
    ],
  },
  
  {
    title: 'SEGURIDAD',
    group: true,
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/usuario/listar',
      },
      {
        title: 'Crear',
        link: '/pages/usuario/crear',
      },
    ],
  },
  {
    title: 'Roles',
    icon: 'share-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/rol/listar',
      },
      {
        title: 'Crear',
        link: '/pages/rol/crear',
      },
    ],
  },
  {
    title: 'Permisos',
    icon: 'grid-outline',
    children: [
      {
        title: 'Listar',
        link: '/pages/permiso/listar',
      },
      {
        title: 'Crear',
        link: '/pages/permiso/crear',
      },
    ],
  },

  {
    title: 'OTROS',
    group: true,
  },

  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/iot-dashboard',
  },
];
