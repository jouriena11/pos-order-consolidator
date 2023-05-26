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
        localStorage.removeItem("id_token");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getRole() {
    if(!this.loggedIn()) {
      return null;
    }
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
    // Note: the goal of frontend error message is to notify users what go wrong, whereas backend validation is all about granting permissions to access database
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
