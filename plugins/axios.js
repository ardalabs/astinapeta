export default ({ $axios }) => {
    $axios.onRequest((config) => {
      config.headers.common.Authorization = `Basic R0VOSV9QUk9EVUNUSU9OX1VTRVJOQU1FOkdFTklfUFJPRFVDVElPTl9QQVNTV09SRA==`
    })
  }
  