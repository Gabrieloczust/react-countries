const api = async query => {
    const response = await fetch('https://countries-274616.ew.r.appspot.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: ` query {${query} }`
        }),
    })

    const { data } = await response.json()

    return data
}

export default api

