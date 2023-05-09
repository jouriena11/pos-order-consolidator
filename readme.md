# **Order Consolidator**

## **Project Description**
---
This point-of-sale (POS) web application is designed to manage restaurant orders more efficiently with a unique feature for order consolidation. By consolidating multiple orders into a single batch, the web app enables restaurants to adopt batch cooking, which is generally faster than per-order cooking. This approach can result in significant time savings for restaurant staff, leading to an increase in overall order management efficiency. Order consolidations allow restaurants to streamline their operations, reduce wait times for customers, and ultimately enhance their dining experience. With this innovative approach, restaurant owners can take advantage of the latest technology to optimize their order management processes and gain a competitive edge in the industry.

<br>

## **URLs**
---
- [Deployed Application](https://post-order-consolidator.herokuapp.com/)
- [GitHub Repository URL](https://github.com/jouriena11/pos-order-consolidator)

<br>

## **Table of Contents**
---
- [Technologies Used](#technologies-used)
- [Usage](#usage--expected-behavior)
- [Future Developments](#future-development)
- [Contact](#contact)

<br>

## **Technologies Used**
---
- MERN stack
    - MongoDB x Mongoose
    - Express.js
    - React x react-router-dom
    - Node.js
- Redux
- Material UI (MUI)
- JavaScript
- GraphQL x Apollo Server
- Day.js
- JSON Web Token x jwt-decode
- Client-side localStorage
- Socket.io (pending)
- Stripe (pending)

<br>

## **Usage / Expected Behavior**

---
### **Pages**
- [Sign In](#sign-in)
- [Sign Up](#sign-up)
    - Dashboard (pending)
    - [POS Order](#pos-order)
    - Profile
        - Update Profile (pending)
        - Change Password (pending)
    - Menu
        - [Add Menu Category](#add-menu-category)
        - Update/Delete Menu Category (pending)
        - [Add Menu](#add-menu)
        - Update/Delete Menu (pending)
    - [Kitchen Orders](#kitchen-orders)
    - Report
        - [Order Status](#order-status)
    - [Permissions](#permissions)

<br>

#### **Sign In**

The landing page you'll be redirected to is a sign-in page. If you would like to go straight to testing the web app, feel free to use the following admin credentials, which would give you access to all the app functionalities including the following:
- `Menu`: creating new menu and menu category
- `POS Order`: submitting orders
- `Reports`: accessing and updating order status 
- `Permissions`: assigning roles and updating user status

**username**: admin@test.com <br>
**password**: `1234asdf`

<br>

![Sign-in page with built-in validation](/client/src/assets/img/readme/readme-img-signin.jpg)
<br><br>

**Key features in Sign-in page:**
- real-time built-in input validation
- sign-in button is disabled until all the inputs are provided
<br><br>

#### **Sign Up**

If you would like to create a new user account, feel free to go to the sign up page via the `Don't have an account? Sign Up` text link below the `SIGN IN` button.

![Sign-up page with built-in validation](/client/src/assets/img/readme/readme-img-signup-incomplete.jpg)
![Sign-up page when all the inputs are entered](/client/src/assets/img/readme/readme-img-signup-complete.jpg)

**Key features in Sign-in page:**
- real-time built-in input validation
- sign-in button is disabled until all the inputs are provided

After you sign up, you'll be automatically logged and have limited access to the web app functionalities. The new user account would also require an admin to assign a role (to either `FOH Manager` or `Kitchen Manager`) and status to `active` before being able to perfrom CRUD requests. This is exactly why I provide an admin user credentials above.

If you happen to be on the sign-up page but already has a user account, return to the sign-in page via the `Already have an account? Sign in` text link below the `SIGN UP` button

<br>

#### **POS Order**

**Key features in POS Order page:**
- Click on the menu card would add the menu item to the order summary drawer on the right with a quantity of one; clicking the menu card again would increase the quantity by another one.

- Clicking on the +/- button on each menu item in the order summary drawer would respectively increase and decrease the order quantity of that item by 1. The app is coded so that the quantity cannot go below zero.

- Once a `Submit Order` button is clicked, an alert message confirming that the order has been submitted would appear, and the order data would be saved to the database.

![POS order page with left drawer closed](/client/src/assets/img/readme/readme-img-pos-order-close-drawer.jpg)
<br>
POS order page with left drawer closed

![POS order page with left drawer opened](/client/src/assets/img/readme/readme-img-pos-order-open-drawer.jpg)
<br>
POS order page with left drawer opened

<br>

#### **Add Menu Category**

Each menu must have an associated menu category. If your desired category doesn't exist yet, you can add it here, and it will be available for selection in the Add Menu page.

Again, the `SUBMIT` button is disabled until you provide an input value.

Once you click `SUBMIT`, an alert message confirming that the menu category has been created would appear, and the menu category data would be saved to the database.

![Add Menu Category Page](/client/src/assets/img/readme/readme-img-add-menu-category.jpg)

<br>

#### **Add Menu**

Similar to Add Menu Category page, you must provide all the input value to create a new menu.

Once you click `SUBMIT`, an alert message confirming that the menu has been created would appear, the menu data would be saved to the database, and a corresponding menu card would be rendered on the POS Order page (note: refresh the page if it doesn't).

![Add Menu Page](/client/src/assets/img/readme/readme-img-add-menu.jpg)

<br>

#### **Kitchen Orders**

This is where order consolidation takes place. The same menu from different orders would be consolidated unless the cooking status is changed from "On Queue" to "Cooking" (note: this is still pretty much a work in progress).

When the arrow icon on the left side of each menu row, it would open a collapsible table that shows order IDs and respective order quantity. As shown in the screenshot below, the Greek Salad has a total order quantity of 3, coming from 2 separate orders.

![Kitchen Orders page where order consolidation takes place](/client/src/assets/img/readme/readme-img-kitchen-orders.jpg)

<br>

#### **Order Status**

The Order Status page would be used mainly by the FOH Manager. While the final cooking status is `Ready`, the final order status is `Served`. This is where the FOH Manager keeps track of order status from the front-of-house perspective.

Please note here that the save button is disabled unless a checkbox is checked. Checking a checkbox and then clicking a save button would update a respective order data in the database.

![Order Status page](/client/src/assets/img/readme/readme-img-order-status.jpg)

<br>

#### **Permissions**

This page is only accessible by admin users. It is where admin users assign a role and update user status. Similar to Order Status page, save button is disabled unless a checkbox is checked. Checking a checkbox and then clicking a save button would update a respective user data in the database.

![Permissions page](/client/src/assets/img/readme/readme-img-permissions.jpg)

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
- to implement consecutive order number (instead of using order ID randomly generated by MongoDB)
- to include category tabs
- to implement pagination to accommodate sizable menu collection
- consecutive order number (instead of randomly generated by MongoDB)
- to include discount options (e.g. percentage or absolute discount, total bill discount, and per-item discount)
- to implement GST calculation
- to implement `Stripe` library
- to support post-paid (i.e. pay later) orders
- to support support split billing
- to implement cash change calculation
- to improve mobile responsiveness
- to implement the `pending orders` icon in the AppBar, clicking on it should open a modal that displays only the pending orders (i.e. orders that have not been served yet).
- to implement `notification` icon in the AppBar that displays an unread badge on top of the icon when there is an incoming update from the kitchen, clicking on it should open a modal that displays a list of notification messages

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
- [Bug Fix] order consolidation currently only works when cooking status is "On Queue"

### **Permissions**
- to apply sorting, filtering (e.g. by user role or user status), and pagination 

### **Order Status Report**
- to allow updating customer name
- to implement real-time timer, showing minutes elapsed since an order has been created
- to implement collapse table showing [menu items, qty, and remarks] that belong to each order 

### **Reports/Analytics**
- to include more reports, e.g.
    - average time elapsed from the moment an order's status changes from 'ready' to 'served' -- this helps monitor whether FOH managers are promptly serving the food or regularly updating the order status.  By identifying any delays, this report can assist in improving customer satisfaction and optimizing restaurant operations.

<br>

## **Contact**
---

Please feel free to contact me through any of the following channels
- Email: p.teeraprasert@gmail.com 
- LinkedIn: https://www.linkedin.com/in/piyawit-teeraprasert/
