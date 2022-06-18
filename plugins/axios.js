export default function ({ $axios, $auth, redirect, store }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Authorization: "Bearer " + token,
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 500) {
      // redirect('/error')
    }
  })
}