module.exports = {
    index: function returnResponseJson(users, request, status, message) {
        switch(request.method) {
            case "GET":
                return {
                    status: status,
                    method: request.method,
                    url: request.url,
                    data: users
                }
            case "POST":
                return {
                    status: status,
                    method: request.method,
                    url: request.url,
                    message: message,
                    data: users
                }
            case "PUT": 
                return {
                    status: status,
                    method: request.method,
                    url: request.url,
                    message: message,
                    data: users
                }
            case "DELETE": 
                return {
                    status: status,
                    method: request.method,
                    url: request.url,
                    message: message,
                    data: users
                }
            default:
                return {error: 'Kamu error'}
        }
    }
    
}