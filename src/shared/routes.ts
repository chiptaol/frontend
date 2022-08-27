export const routesMap = {
  home: '/',
  cinemas: '/cinemas',
  cinema: (cid: number) => `/cinemas/${cid}`,
  premiere: (pid: number) => `/premiere/${pid}`,
  seance: (sid: number) => `/seance/${sid}`,
  bought: '/bought',
}
