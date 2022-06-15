
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/customers', component: () => import('src/pages/CustomersPage.vue') },
      { path: '/documents', component: () => import('src/pages/DocumentPage.vue') },
      { path: '/readings', component: () => import('src/pages/ReadingPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
