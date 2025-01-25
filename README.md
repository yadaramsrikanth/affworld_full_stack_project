<=> Project Description: 

  This is a task management website where users can register, log in, and manage tasks. The application provides a simple interface for users to add, delete, and update the status of tasks. Users can also manage photos by adding images and captions. The system stores authentication tokens securely in cookies, ensuring that only logged-in users can access the home section. The app also handles redirecting users when they try to access restricted routes. The drag-and-drop feature for task status updates is powered by the react-beautiful-dnd package.



<=> Features implemented:

1.User Registration and Login: Users can register with a name, email, and password. After registration, they can log in with their credentials.
2.Password Recovery: If a user forgets their password, they can use the "Forgot Password" feature to recover their account.
3.Task Management:
  A. Users can add new tasks with a name and description, which will appear in the "Pending" column.
  B.Tasks can be deleted via a confirmation pop-up when the delete button is clicked.
  C.Tasks can be moved between columns (Pending, Completed, Done) via drag-and-drop, with updates reflected in the database..4.
4.Photo Section: Users can add images and captions, which will be displayed on the screen.
5.JWT Authentication: JWT tokens are stored in cookies for session management.
6.Route Protection: Users who are not logged in will be redirected to the login page when trying to access the home section. Logged-in users will be redirected to the home page if they try to access the login page.
7.Not Found Page: If an invalid URL is entered, a "Not Found" page is displayed with a button to redirect users to the home section.
8.Drag-and-Drop Functionality: The task status is updated via drag-and-drop functionality, implemented using the react-beautiful-dnd package.



<=>Steps to run the project:  
1.Clone the Repository.[clone repository url]
2.Navigate to the Project Directory.[cd directory_name]
3.Install Dependencies.[npm install]
4.Start the Development Server.[npm start]

<=>NOTE<=>:

The backend of this project is deployed on Render, and I am using a free Redis instance for data storage. Please note that free Redis instances are not backed by persistent disk storage, which means that whenever the instance restarts, all data stored in Redis is lost. As a result, any data added or stored during development might not persist after a restart.

