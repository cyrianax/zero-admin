import axios from '@/libs/api.request'

export const getContent = (params) => {
	return axios.request({
		url: 'content',
		method: 'get',
		params
	})
}

export const getTags = () => {
	return axios.request({
		url: 'tag',
		method: 'get'
	})
}
