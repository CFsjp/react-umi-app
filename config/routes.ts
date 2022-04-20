/**
 * src目录下的可以直接写
 * src/pages目录下可以直接写
 * src/components目录下的可以直接写
 */

const route = [
  { path: '/', redirect: 'study' },
  { path: '/react-hook-study', component: 'react-hook-study' },
  { path: 'study', component: 'study' },
  { path: 'count', component: 'count' },
  { path: 'css', component: 'css' },
]

export default route
