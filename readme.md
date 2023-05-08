# **Order Consolidator**

## **Project Description**
---
**`MVP`**
- only support Prepaid orders (payment before cooking, i.e. 'pay-first' restaurant)
- does not support split billing
- no cash change calculation yet
- no discount yet?

<br>

## **URLs**
---
- [Deployed Application]()
- [GitHub Repository URL]()

<br>

## **Table of Contents**
---
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Usage](#usage--expected-behavior)
- [Future Developments](#future-development)
- [Contact](#contact)

<br>

## **Installation**
---
To run this web application in a local server, the following libraries must be installed:




<br>

## **Technologies Used**
---
- MERN stack
    - MongoDB x Mongoose
    - Express.js
    - React x react-router-dom
    - Node.js
- Material UI (MUI)
- GraphQL x Apollo Server
- Socket.io (pending)
- Stripe
- Day.js

<br>

## **Usage / Expected Behavior**
---
### **Pages**
- Sign Up
- Sign In
    - Dashboard
    - Profile
        - Update Profile
        - Change Password
    - Menu
        - Add New Menu
        - Update Menu
        - Delete Menu
    - Kitchen Orders
    - Report
        - Order Status 

<br>

## **Future Development**
---

### **Global**
- to include a proper app logo in the AppBar
- to incorporate socket.io for real-time notifications between the FOH and the kitchen
- to include a role of `super admin` that has a permission to update the status of `admins`
- to reorganize and clean up codes

<br>

### **Dashboard**
- to create a dashboard for different types of user

<br>

### **POS Order page**
- to implement search functionality (e.g. search by menu name or menu category)
- to include category tabs
- to implement pagination to accommodate sizable menu collection
- consecutive order number (instead of randomly generated by MongoDB)
- to include discount options (e.g. percentage or absolute discount, total bill discount, and per-item discount)
- to implement GST calculation
- to implememnt `Stripe` library
- to improve mobile responsiveness
- to code for 'Pending Orders' icon in the AppBar - when clicked, a modal displaying only pending orders (i.e. not yet served) would appear
- to code for notification icon in the AppBar (when there's an incoming update from the kitchen, the notification icon should display an unread badge on top of the icon)



### **Profile**
- to code `Update Profile` and `Change Password` pages

### **Menu / Menu Categories**
- to change `Menu` submenus to include just ["Category" and "Menu"] and have the ability to add, update, delete Menu and Menu Category in its own page instead
- to allow associated MenuCategory update from menu document (currently, it's not allowed)
- to include image upload functionality when adding a new menu (and possibly menu category)

### **Kitchen Orders page**
- to implement cutoff point for batch cooking, i.e. in real practice, there is a maximum limit to the amount of servings that can be cooked in batch
- to include reminder-type notifications (using setTimeout()), i.e. when there's no change in an order/cooking status after a certain period of time, e.g. 5 minutes
- to apply sorting, filtering, and pagination 

### **Permissions**
- to apply sorting, filtering (e.g. by user role or user status), and pagination 

### **Order Status Report**
- to implement real-time timer, showing minutes elapsed since an order has been created
- to implement collapse table showing [menu items, qty, and remarks] that belong to each order 

### **Reports/Analytics**
- to include more reports, e.g.
    - average time elapsed from the moment an order's status changes from 'ready' to 'served' -- this helps monitorwhether FOH managers are promptly serving the food or regularly updating the order status.  By identifying any delays, this report can assist in improving customer satisfaction and optimizing restaurant operations.

<br>

## **Contact**
---

Please feel free to contact me through any of the following channels
- Email: p.teeraprasert@gmail.com 
- LinkedIn: https://www.linkedin.com/in/piyawit-teeraprasert/
