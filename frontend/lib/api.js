const BASE_URL = 'http://localhost:5000/api'

async function request(path , options = { }) {
    const res = await fetch(`${BASE_URL}${path}`,{
         headers: {'Content-Type': 'application/json'},
         ...options
    })
    if(!res.ok){
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || err.err || 'Request failed')
    }

    return res.json()

}

export const getSubjects = () => request('/subjects')

export const getTopics = () => request('/topic')
export const updateTopic = (id,data) => request(`/topic/${id}` , {method : "PUT" , body: JSON.stringify(data)})

export const getSessions = () => request('/session')
export const createSession = (data) => request('/session', { method: 'POST', body: JSON.stringify(data) })

export const getSetting = () => request('/settings/') 
export const createSetting = (data) => request('/settings/',{method:'POST',body : JSON.stringify(data)})


