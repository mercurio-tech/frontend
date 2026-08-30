function checkAuth(name, password) {
    if (!name && !password) {
        const storedName = localStorage.getItem("nome");
        const storedPassword = localStorage.getItem("senha");
        if (!storedName && !storedPassword) return false;
        return getAuthRequest(storedName, storedPassword);
    }
    return getAuthRequest(name, password);
}
