
export function checkIfLoggedIn(token, navigate) {
    if(!token) {
        navigate("/login");
    }
}