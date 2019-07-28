import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = config.baseUrl[process.env.NODE_ENV];

const axios = new HttpRequest(baseUrl)
export default axios
