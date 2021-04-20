## Expendable Employees
A Managerial Tool webapp for managing your employees.
The main registration is for Admins, with the Admins later then getting access to a secondary registration for adding their employees to the app.

> * [Installation & Setting up](https://github.com/CSCI3230U/majorgroupproject-studio-wejustwanttopass/blob/main/expendable-employees/README.md#installation--setting-up)
> * [About The Database](https://github.com/CSCI3230U/majorgroupproject-studio-wejustwanttopass/blob/main/expendable-employees/README.md#about-the-database)
> * [Features](https://github.com/CSCI3230U/majorgroupproject-studio-wejustwanttopass/blob/main/expendable-employees/README.md#features)
> * [Premade Test Accounts](https://github.com/CSCI3230U/majorgroupproject-studio-wejustwanttopass/blob/main/expendable-employees/README.md#premade-test-accounts)
> * [Independent Study Component](https://github.com/CSCI3230U/majorgroupproject-studio-wejustwanttopass/blob/main/expendable-employees/README.md#independent-study-component)
> * [Screenshots](https://github.com/CSCI3230U/majorgroupproject-studio-wejustwanttopass/blob/main/expendable-employees/README.md#screenshots)

## Installation & Setting up
1. Clone repo
2. Open `expendable-employees/client/` as a project and run `npm install` to get all the necessary dependencies
3. Run `npm start` to start the client server
4. Open `expendable-employees/server/` as a project and run `npm install` to get all the necessary dependencies
5. Run `npm run server` to start the client server

## About The Database
The database being used for this project is a mongodb. It is being hosted on the free tier of [MondoDB Cloud](https://www.mongodb.com/cloud) so the space and speed are both limited. If you wish to view the database in something like MongoDB Compass this url will get you access `mongodb+srv://dbUser:mER6V5dlVljmcy0x@cluster0.wxnsv.mongodb.net/test`. The full schema can be viewed in `schema.json` in the root of this git repo.

## Features
- Clean modern frontend design with React.js & Material UI
- Dynamic routing & views
- Database integration
- Admin Registration
- User Login
- Admins can create accounts for Regular Users
- Sending Mail
- Receiving mail with Mark As Read functionality on button press
- Events
- Calendar Schedules
- Account info editing (Personal info, Password, etc)
- Admins can remove/"fire" Regular Users
- Admins can edit Regular User's payrate
- Visual Database
- ...and more!

## Premade Test Accounts
  Admins:
  
    cole@gmail.com
      password
      
    aron@gmail.com
      password
  Regulars:
  
    employee1@gmail.com
      password 
      
    employee2@gmail.com
      password  
      
    employee3@gmail.com
      password  
      
    employee4@gmail.com
      password 
      
    employee5@gmail.com
      password 
      
    employee6@gmail.com
      password 
      
Employees 1 through 3 are owned/managed by cole@gmail.com and has some pre-filled info including:
  - Events in Schedules
  - Sent/Received mail between users
    
Employees 4 through 6 are owned/managed by aron@gmail.com
  aron@gmail.com is a blank slate.

## Independent Study Component 
Presentation on Independent Study Component can be found at https://docs.google.com/presentation/d/1o2Fuk2XBOVB76uwcESpkLm3kqGYXxJSImSdfrZb0qUU/edit?usp=sharing

## Screenshots
