const headers = new Headers()
headers.append("Content-Type", "application/x-www-form-urlencoded")

export function apiRequest(method, url, urlencoded = null) {
    const requestOptions = {
        method: method,
        headers: headers,
        body: urlencoded,
        redirect: 'follow',
    }

    return fetch(url, requestOptions)
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}