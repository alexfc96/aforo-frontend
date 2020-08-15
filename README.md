# README Modulo3 by Alex Fernández Cánovas
# Frontend Readme

## Project Name
  AFORO

## Description

Web app that allows you to register your company and establishments to limit the access establishing a percentage of people allowed in a certain period of time. Once the establishments have been created and you have invited the clients, they will be able to join the available sessions that we have scheduled.

## User Stories

  The natural process to follow would be to register the company, data (how much is the maximum capacity in that establishment), location and invite users who will be able to access as company controllers.
  Once this process has been carried out, they will be able to indicate what hours will be possible for the clients and how many people will be allowed (with a limit already indicated). Once all the configuration is established, you can invite clients. For example, directly inviting them to their mail.

  Once the client user connects, they will be able to see the calendar and book whenever they want / can with some limitations. For example, one hour in the gym every 2 days. If this user has been invited to another companies, they can also manage their "reservations" there.

## Backlog

  ​List of other features outside of the MVPs scope:

  -Add notifications

  -Create public establishments

  -Invite via mail
  ​
  -Geo Location: - add geolocation of the establishments.

## Views

| View (Component) | Path         | description    |
| :--------------- | ------------ | -------------- |
| Main             | `/`          | Title          |
| Login            | `/login`     | login page     |
| Signup           | `/signup`    | signup page    |
| Home             | `/home`      | Home where the user can see in the calendar their next bookings and their favorites establishemnts  |
| MyCompanies      | `/company`   | company page where appears your own companies and where are you suscribed    |
| Company          | `/company/:id` | info company page  |
| MyEstablishments | `/establishment` | establishment page where appears your own companies and where are you suscribed|
| Establishment    | `/establishment/:id` | info establishment page |
| MyBookings       | `/bookings`  | bookings page where appears all your next and past bookings|
| MyUser           | `/user`      | user page where appears the info related to the profile|
| Logout           | `/logout`    | logout         |


## Links

  **Backend Repo Git**
  ​​ https://github.com/alexfc96/aforo-backend

  **Frontend Repo Git**
  ​​ https://github.com/alexfc96/aforo-frontend
  
  **Trello**
  ​ https://trello.com/b/TW4KSt9j/aforo

  **Deploy backend by Heroku**
  https://aforo-api.herokuapp.com/

  ​**Deploy by Heroku**
  https://aforo.herokuapp.com/

  **Slides**
  https://slides.com/alexfernandez-1/aforo/

2020