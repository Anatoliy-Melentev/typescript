export function responseToJson(url: string, method: string = 'GET') {
  return fetch(url, {
    method: method,
  })
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
}
