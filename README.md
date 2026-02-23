# SignalBoard
SignalBoard is a small web application where users can signup/login, post signals that all other users can see and delete his own signals.
The goal of this project was to learn how frontend and backend work toghether, create a working api and explore database querys. This was my first full-stack application so i learn a lot from this expirience.

## Why SignalBoard?
The idea of SignalBoard is an expansion of one of the most common beginner project ideas, which is a note taking app, with the social-media like twist of sharing your own signals with others. The semplicity of dealing with only text, while encountering interesting challenges like authentication, data ownership and real-time feed generation made this a great starting project for me. Initially the idea was to expand SignalBoard to make it a multi-user reflection tool on possibly wolrd level issues. Obviously this idea was too ambitious for a beginner like me, so i stripped it down to his core functionalities. The main idea is still there, users can share ideas, forecasts or other insights with other users, but the features that would have made this a viable reflection tool are missing.

## Core Features
 - Sign Up with username and password
 - Login with username and password
 - Logout of the account
 - Create a new signals with title and content
 - See the most recently created signals
 - Visualize your own signals
 - Delete your signals

## System Decription
This is a description of the backend structure and the decisions tht I took while developing this application.

### Separation of Concerns
The backend follows a layered structure where HTTP concerns, business logic and data access are separeted. This follows pruduction level convensions and improves testability and scalability.
The different layers are: 
 - Routes -> define API endpoints
 - Controllers -> handle business logic
 - Models -> communicate with PostgreSQL
 - Middleware -> cross-cutting concerns (authentication)

### Authentication and Authorization
When the user signs up or logs in a JWT is created and stored in localStoage. I am aware that this solution is not safe and exposes a user hashed password and id, but security was not the main learning point of this application so I decided to use a simpler strategy that i could implement fast, while keeping my focus on other aspects of backend architecture.
This JWT is used to identify the user whenever that is needed, for example when a user tries to delete a signal. In this specific case the user is not only authenticated but also needs to be authorized to make the API call, that is the case if the user id matches the user_id of the selected signal.
This highlights example the distinction between authentication and authorization, authe first requires only to read the JWT and extract the user information, while the second requires extra controls that the user has the necessary authority to execute the selected action.

### Database
The database schema is very simple, it contains only two tables: users and signals.
Users has 4 columns: id, username, password_hash and created_at.
Signals has 5 columns: id, user_id, title, content and creted_at.
This was my first time working with a database so the structure had to be easy to work with while still remaining scalable. In the future it will be possible to add many other columns to each tables, such as followers for each users or likes for each signal.
One thing i like to note is that user_id is a foreign key which is used to connect the users table with the signals table, allowing the backend to know which user owns which signals.
The database also has multiple indexes: id on both tables (since they are primary keys they are indexes by default), created_at on signals, and a composite index of created_at and id for signals.
The index on created_at improves ordering speed of the signals in the account page.
The composite index improves ordering speed of the main feed.
Since SignalBoard is a read heavy application indexes are a very good fit to improve performance at scale.


### Pagination and Feed design
One of the main challenges of this project was building a feed page that felt intentional and acted in a predictable way in every case. The strategy i decided to go for is an offset-base pagination that I will now explain.
In a starting condition the feed shows the 10 most recent signals, this are retrieved from the database by a simple query with a limit of 11 and an offset of 0. The limit is 11 and not 10 because if the query finds an 11th signal it informs the frontend to show a "show more" button. By clicking this button the user triggers another API call that executes the same quary as before but with an offset of 10, this way I don't retrieve the first 10 signals a second time. The next signals are added to the feed page. Whenever the user refreshes the page or creates a new signal the feed goes back to showing only the 10 most recent signals.

### API
The API endpoints are devided in 2 sections: /auth and /signals.
To /auth refer /signup, / login and /account. This endpoints are the one referring to users, their creation and the retrieval of their information.
To /signal refer / create, /mine, /recent and /:id. This endpoint are the one referring to signals, their creation, the retrieval of their information and their delition.
As previously explained most action are preceded by authentication and some are by authorization.


### Decisions
This is an overview of my decisions and the reasoning behind them:
 - JWT saved in local storage = simple implementation mixed with real world strategies
 - Offset pagination = simple, effective and a good introduction to how data should behave in a real application
 - Layered architecture = good organization and a scalable system
 - Simple UI = allowed me to focus on backend architecture 


 ## What i learned 
 - How to create a full stack project
 - How to connect frontend - server - database, by creating a "custom" api with his own endpoints and by connecting the database using a pool
 - How to structure the frontend of a real application, by creating reusable components, and layout components
 - How to structure the backend of a real application, by dividing routes, controllers, models and middleware.
 - How to create a proper database schema
 - How api endpoints work and how to create them
 - How to make a query on an api call
 - How to handle both errors and successfull responses in both the backend and the frontend
 - What pagination is and how to implement it
 - What a database index is and what is its purpose
 - What middleware is, why it's important and how to implement it
 - What a jwt is and what's its purpose
 - The difference between authentication and authorization
 - How to authenticate a user using middleware
 - What an envirioment variable is and how to safely create and store one
