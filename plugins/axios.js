export default ({ $axios }) => {
    $axios.onRequest((config) => {
      config.headers.common.Authorization = `Basic Uk9IQU4tREVWRUxPUE1FTlQ6Uk9IQU4tREVWRUxPUE1FTlQ='`
    })
  }
  