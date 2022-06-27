import {getJwt} from "@/cookie";

export function getTasks() {
    return fetchApi('/tasks');
}

export function registerUser(user) {
    return fetchApi('/users/new', 'POST', {...user});
}

export function loginUser(user) {
    return fetchApi('/users/login', 'POST', {...user});
}

async function fetchApi(url, method = 'GET', body = null, authCheck = false) {
    const fetchOptions = {
        method,
        headers: {'Content-type': 'application/json'}
    }
    if (body)
        fetchOptions.body = JSON.stringify(body);
    if (authCheck)
        fetchOptions.headers['Authorization'] = 'Bearer' + getJwt();

    const responce = await fetch('/api' + url, fetchOptions);
    try {
        const responceData = await responce.json();
        if (!responce.ok)
            return {error: responceData.message};
        return responceData;
    } catch (e) {
        return {error: responce.statusText};
    }
}