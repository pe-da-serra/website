// Composables
import { createRouter, createWebHistory } from 'vue-router'

export const routeNames = {
  home: 'Home',
  hotel: 'Hotel',
  rooms: 'Rooms',
  photos: 'Photos',
  contact: 'Contact',
  room: {
    example: 'ExampleRoom'
  }
}

export const menuRoutes = [
  { title: 'Home',    route: routeNames.home,   icon: 'mdi-home' },
  { title: 'O Hotel', route: routeNames.hotel,   icon: 'mdi-domain' },
  { title: 'Quartos', route: routeNames.rooms,   icon: 'mdi-bed-outline' },
  { title: 'Galeria', route: routeNames.photos,  icon: 'mdi-image-multiple-outline' },
  { title: 'Contato', route: routeNames.contact, icon: 'mdi-phone-outline' },
]

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
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
        path: 'quartos/exemplo-1',
        name: routeNames.room.example,
        component: () => import(/* webpackChunkName: "rooms-example1" */ '@/views/rooms/Example.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
