// Composables
import { fromIsoDate, useToday } from '@/features/date';
import { BookProps } from '@/views/Book.vue';
import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const routeNames = {
  home: 'Home',
  hotel: 'Hotel',
  rooms: 'Rooms',
  photos: 'Photos',
  contact: 'Contact',
  book: 'Book',
  room: {
    single: 'SingleRoom',
    couple: 'CoupleRoom',
    // triple: 'TripleRoom',
    double: 'DoubleRoom',
    doubleSharedBathroom: 'DoubleSharedBathroomRoom',
    apartment: 'ApartmentRoom',
  }
}

export const menuRoutes = [
  { title: 'Home',    route: routeNames.home,   icon: 'mdi-home' },
  { title: 'O Hotel', route: routeNames.hotel,   icon: 'mdi-domain' },
  { title: 'Quartos', route: routeNames.rooms,   icon: 'mdi-bed-outline' },
  { title: 'Galeria', route: routeNames.photos,  icon: 'mdi-image-multiple-outline' },
  { title: 'Contato', route: routeNames.contact, icon: 'mdi-phone-outline' },
]

const parseBookRoute = (route: RouteLocationNormalized): BookProps => {
  return {
    checkIn: fromIsoDate(route.query.checkin as string),
    checkOut: fromIsoDate(route.query.checkout as string),
  };
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.home,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'hotel',
        name: routeNames.hotel,
        component: () => import(/* webpackChunkName: "hotel" */ '@/views/Hotel.vue'),
      },
      {
        path: 'quartos',
        name: routeNames.rooms,
        component: () => import(/* webpackChunkName: "rooms" */ '@/views/Rooms.vue'),
      },
      {
        path: 'galeria',
        name: routeNames.photos,
        component: () => import(/* webpackChunkName: "photos" */ '@/views/Photos.vue'),
      },
      {
        path: 'contato',
        name: routeNames.contact,
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
      },
      {
        path: 'quartos/solteiro',
        name: routeNames.room.single,
        component: () => import(/* webpackChunkName: "rooms-single" */ '@/views/rooms/Single.vue'),
      },
      {
        path: 'quartos/casal',
        name: routeNames.room.couple,
        component: () => import(/* webpackChunkName: "rooms-couple" */ '@/views/rooms/Couple.vue'),
      },
      // {
      //   path: 'quartos/triplo',
      //   name: routeNames.room.triple,
      //   component: () => import(/* webpackChunkName: "rooms-triple" */ '@/views/rooms/Triple.vue'),
      // },
      {
        path: 'quartos/duplo',
        name: routeNames.room.double,
        component: () => import(/* webpackChunkName: "rooms-double" */ '@/views/rooms/Double.vue'),
      },
      {
        path: 'quartos/duplo-banheiro-compartilhado',
        name: routeNames.room.doubleSharedBathroom,
        component: () => import(/* webpackChunkName: "rooms-double-shared-bathroom" */ '@/views/rooms/DoubleSharedBathroom.vue'),
      },
      {
        path: 'quartos/apartamento',
        name: routeNames.room.apartment,
        component: () => import(/* webpackChunkName: "rooms-apartment" */ '@/views/rooms/Apartment.vue'),
      },
    ],
  },
  {
    path: '/reserva',
    component: () => import('@/layouts/BookLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.book,
        component: () => import('@/views/Book.vue'),
        props: parseBookRoute,
        beforeEnter: (to, from, next) => {
          const today = useToday();

          if (!fromIsoDate(to.query.checkin as string).isValid ||
           !fromIsoDate(to.query.checkout as string).isValid) {
            console.error('Invalid book query params')
            to.query.checkin = today.toISODate();
            to.query.checkout = today.plus({ days: 1 }).toISODate();
            next(to);
          }

          next();
          return true;
        }
      },
    ],
  },
];

export const routerOptions = {
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0, smooth: true }
  },
};

const router = createRouter(routerOptions);

export default router
