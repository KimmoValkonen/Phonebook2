import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes'
// after deployed to https://notes-a2vo.onrender.com (Note! httpS: - not http:)
// const baseUrl = 'https://notes-a2vo.onrender.com/api/notes'
// "npm run build" and copy build into backend allows to use same relative baseUrl and use below

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject)
  return req.then((res) => res.data)
}

const remove = (id, name) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then((res) => res.data)
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then((res) => res.data)
}

const exportedObject = {
  getAll,
  create,
  update,
  remove
}

export default exportedObject