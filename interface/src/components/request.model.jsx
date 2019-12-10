export const decodeRequest = (request) => {
    const payload = JSON.parse(atob(request.payload));
    request.payload = payload;
    return request;
}

export const encodeRequest = (request) => {
    const payload = btoa(JSON.stringify(request.payload));
    request.payload = payload;
    return request;
}

export const decodeRequestList = (requests) => {
    return requests.map(r => decodeRequest(r));
}

