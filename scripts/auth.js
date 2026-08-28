function checkAuth(name, password) {
    if (!name && !password) {
        return getAuthRequest(
            localStorage.getItem("nome"), localStorage.getItem("senha")
        )
    }
    return getAuthRequest(name, password);
}