import decode from "jwt-decode";

class AuthService {
  getProfile() {}

  loggedIn() {
    
  }

  isTokenExpired(token) {

  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    // TODO: to assign different user_role to different page after logging in
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/signin");
  }
}

export default new AuthService();
