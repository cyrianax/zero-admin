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

export const delContent = (ids) => {
	return axios.request({
		url: `content`,
		method: 'delete',
		data: { ids }
	})
}

export const findContentById = (id) => {
	return axios.request({
		url: `content/${id}`,
		method: 'get'
	})
}

export const addContent = (data) => {
	console.log(data);
	return axios.request({
		url: `content`,
		method: 'post',
		data
	})
}

export const gather = (params) => {
	return axios.request({
		url: `http://attunmen.karazhan.online/api/crawler`,
		method: 'get',
		params
	})
}
