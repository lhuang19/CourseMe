# Penn Labs Frontend Challenge Submission for Spring 2021

See it live on [http://lj-studios.com/](http://lj-studios.com/)

---

### Running This Project

-   `git clone` from this repo
-   `npm install`
-   then `npm run start`

---

### General structure

```
public/
  index.html           Root HTML file for each page
  courses.json         Contains information on Penn courses

src/                   Where the JS logic is
  components/          Contains all React components
    Checkout/          Checkout page
    Context/           Context for managing auth, cart, and courses
    CourseGraph/       Course graph visualization page
    Courses/           Course catalogue pagee
    Header/            Header display
    Login/             Login modal
    Receipt/           Receipt page
    Schedules/         Course lists page
    types/             Typescript type definitions
    UI/                UI components

  hoc/                 Wrapping components
  img/                 Contains cart and receipt icons

  App.css              CSS for the app
  App.tsx              Root component for the app
  axios-instance.tsx   Custom axios base url  
  index.tsx            Renders the React app
```

---

### Features

-   Register and login to save course list information
-   Interactive graph showing prerequisite/successor classes and overall course topology and progression
-   Search & Sort
-   Draggable cart items to rank courses
-   Installed on Arvixe web hosting server
---

### Technologies Used

-   Typescript: strict types
-   react-router-dom: routing between pages
-   react-transition-group: animations for route transitions
-   react-beautiful-dnd: draggable cart items
-   react-graph-vis: create graphics to display relationship between courses
-   CSS modules and CSS-in-JS: styling
-   Google Firebase: basic backend management

---