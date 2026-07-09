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

    return res.json

}

export const getSubjects = () => request('/subject')
export const createSubject = (data) => request('/subject',{method:'POST' , body : JSON.stringify(data)})

export const getTopics = () => request('/topic')
export const createTopic = (data) => request('topic',{method:"POST" , body : JSON.stringify(data)})
export const updateTopic = (id,data) => request(`topic/${id}` , {method : "PUT" , body: JSON.stringify(data)})

export const getSessions = () => request('/sessions')
export const createSession = (data) => request('/sessions', { method: 'POST', body: JSON.stringify(data) })