import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // if the token is expired, remove it from localStorage
        localStorage.removeItem("id_token"); // TODO: to check if this is correct
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getRole() {
    this.loggedIn();
    const user = this.getProfile();
    const { role, status } = user.data;
    switch (role) {
      case "Admin":
        if (status === "active") {
          return "Admin";
        }
        break;
      case "FOH Manager":
        if (status === "active") {
          return "FOH Manager";
        }
        break;
      case "Kitchen Manager":
        if (status === "active") {
          return "Kitchen Manager";
        }
        break;
      default:
        return null;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken, role, status) {
    localStorage.setItem("id_token", idToken);
    // TODO: is it possible to pass the error message from resolvers function
    if (role === "Admin" && status === "active") {
      window.location.assign("/pos");
    } else if (role === "FOH Manager" && status === "active") {
      window.location.assign("/pos");
    } else if (role === "Kitchen Manager" && status === "active") {
      window.location.assign("/kitchen-orders");
    } else {
      window.location.assign("/order-status-report");
    }
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/signin");
  }
}

export default new AuthService();
