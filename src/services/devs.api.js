import { API_BASE_URL, HEADERS } from './api.js'

export const all = async () => {
  const res = await fetch(
    `${API_BASE_URL}/devs`,
    {
      method: 'GET',
      headers: HEADERS()
    }
  )
  return await res.json()
}

export const save = async (params) => {
    console.log(params)
  const res = await fetch(
    `${API_BASE_URL}/devs`,
    {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify(params)
    }
  )
  return await res.json()
}

export const update = async (data) => { 
  const { id, params } = data
  const res = await fetch(
    `${API_BASE_URL}/devs/${id}`,
    {
      method: 'PUT',
      headers: HEADERS(),
      body: JSON.stringify(params)
    }
  )
  return await res.json()
}

export const remove = async (id) => { 
    const res = await fetch(
      `${API_BASE_URL}/devs/${id}`,
      {
        method: 'DELETE',
        headers: HEADERS()
      }
    )
    return await res.json()
  }
  