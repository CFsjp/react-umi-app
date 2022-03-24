export const cookies = {
  get: (cname: string): string => {
    const cookiestr = document.cookie
    const cookieList = cookiestr.split('; ')
    const cookieMap = {}

    cookieList.forEach((cookie) => {
      const [cookieKey, cookieVal] = cookie.split('=')
      cookieMap[cookieKey] = cookieVal
    })

    return cookieMap[cname]
  },
  set: (cname: string, cval: string | number | boolean, exdays = 7): void => {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)

    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cname}=${cval};${expires}`
  },
  remove: (cname: string): void => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  },
  removeUserToken(): void {
    this.remove('token')
    this.remove('refresh_token')
  }
}
