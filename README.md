# The Aura 2023 Repo

This is the source code of KLS GIT's fest AURA23 website.

<p align="center"> 
 <img src="https://raw.githubusercontent.com/KishorBalgi/aura-git/main/src/Assets/logo1.png" alt="LOGO" border="0" width=300/>&nbsp;</a></p>

# Tech Stack

<p align="center">
<a href="https://react.dev/"><img src="https://user-images.githubusercontent.com/75678927/229337642-bc08741b-a9f1-4d8b-9c20-0e63ebed6fcb.png" width="70px" border="0" alt="React" title="React"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://tailwindcss.com/"><img src="https://user-images.githubusercontent.com/75678927/229337644-4ac5c67a-b19b-4745-9648-6008b7982014.png" width="70px" border="0" alt="Tailwind" title="Tailwind"/></a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://nodejs.org/"><img src="https://user-images.githubusercontent.com/75678927/229337648-36131d8b-8098-4c33-95c7-3438a7990d83.png" border="0" width="70px" alt="NodeJS" title="NodeJS"/></a>&nbsp;&nbsp;&nbsp;&nbsp; 
<a href="https://expressjs.com/"><img src="https://user-images.githubusercontent.com/75678927/229337923-e4f100a3-4378-49b0-a1c3-26e47a9f7de5.png" border="0" width="70px" alt="ExpressJS" title="ExpressJS"/></a>&nbsp;&nbsp;&nbsp;&nbsp; 
<a href="https://www.mongodb.com/"><img src="https://user-images.githubusercontent.com/75678927/229337732-ec83ff2c-3029-4dc0-a316-f10146037e8e.png" width="70px" border="0" alt="MongoDB" title="MongoDB"/></a>  
</p>
  
<p align="center">
<a href="https://github.com/pi22by7/aura-git/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/pi22by7/aura-git"></a>
<a href="https://github.com/pi22by7/aura-git"><img alt="GitHub stars" src="https://img.shields.io/github/last-commit/pi22by7/aura-git"></a>
<a href="https://github.com/pi22by7/aura-git/blob/main/LICENSE.md"><img alt="GitHub License" src="https://img.shields.io/github/license/pi22by7/aura-git?label=license"></a>
</p>

## [AURA23 Website](https://aura-git.vercel.app)

1. Frontend: **React Tailwind**
2. Backend: **NodeJS ExpressJS**
3. Database: **MongoDB**

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#pages">Pages</a></li>
    <li><a href="#project-maintainers">Project Maintainers</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Features

- Register For events.
- Automated Email verification through email.
- Password rest through email verification.
- Create and edit team
- View participations and status
- Record Payments

### Installation

1. - Fork the [repo](https://github.com/pi22by7/aura-git)
   - Clone the repo to your local system

   ```git
   git clone https://github.com/pi22by7/aura-git
   cd aura-git
   ```

2. - Front End:
     Install all the dependencies

   ```bash
   npm install # This will install all the required dependencies for the front-end
   ```

   - Front End Enivronment Configurations:
     create a .env file in the root directory and add the following env variables

   ```text
    REACT_APP_BACKEND_HOST="url_where_your_server_is_listening"
   ```

   - Run Front End:

   ```bash
   npm start
   ```

3. - Back End:
     Install all the dependencies

   ```bash
   cd backend/
   npm install # This will install all the required dependencies for the back-end
   ```

   - Backend End Enivronment Configurations:
     create a .env file in the backend directory and add the following env variables

   ```text
    PORT=port_number_where_u_want_to_run_your_server_to_listen
    DB=mongodb_db_access_url_with_username_and_password
    NODEMAILER_EMAIL=email_address_which_u_want_to_use_to_send_emails
    NODEMAILER_PASS=app_password_for_the_email
    JWT_SECRET=random_string_atleast_16_characters_long
   ```

   - Run Back End:

   ```bash
   npm run dev # For Development with nodemon
   npm start # Without nodemon
   ```

4. - Populate Database with events:
   ```bash
    cd backend/
    node data/populate.js
   ```
   This will populate your database with all the events present in data/events.json

### Pages

- Home Page
  <img src="https://user-images.githubusercontent.com/75678927/229338439-b73529fc-9762-4aba-a620-b7e3ce6acf4d.png" alt="Home Page">
  
- Registration
  <img src="https://user-images.githubusercontent.com/75678927/229338492-c8d47487-7ef1-4ffa-a724-35bd874c30c1.png" alt="Signup Form">
  <img src="https://user-images.githubusercontent.com/75678927/229338501-1664f060-7505-489a-9661-5648163081fd.png" alt="Login Form">

- Competitions
  <img src="https://user-images.githubusercontent.com/75678927/229338534-e6400df3-e0a7-4232-b4c1-aeed9abf8129.png" alt="Competitions Page">
  <img src="https://user-images.githubusercontent.com/75678927/229338549-52014c18-a3ed-4a14-9e3d-96b42a77724c.png" alt="Competitions Page">
  <img src="https://user-images.githubusercontent.com/75678927/229338596-651a5695-0c04-4c9f-88b6-aa16ec7de029.png" alt="Competitions Page">
  <img src="https://user-images.githubusercontent.com/75678927/229338576-88cadb06-11df-404f-8061-3c5e21be943f.png" alt="Competitions Page">

- Competition Details page

  <img src="https://user-images.githubusercontent.com/75678927/229338714-d332081e-e111-4a83-9cf4-eaa61b0e65e0.png" alt="Competition Details page">
  <img src="https://user-images.githubusercontent.com/75678927/229338747-e6759dad-809b-4e5b-9142-4d94e87e36b6.png" alt="Competition Details page">

- Contact Us Page
  <img src="https://user-images.githubusercontent.com/75678927/229338774-a35efa5c-3098-4981-848a-ceed72c499fb.png" alt="Schedule Page">

- Rulebook Page
  <img src="https://user-images.githubusercontent.com/75678927/229338808-e5d2fcbf-56a7-46a9-80a3-d9fb0311c392.png" alt="Schedule Page">

- Schedule Page
  <img src="https://user-images.githubusercontent.com/75678927/229338832-0d1b97a7-50b0-451e-9847-8e0e7db9d388.png" alt="Schedule Page">
  <img src="https://user-images.githubusercontent.com/75678927/229338844-f8897040-0274-4f57-aaa0-4e0ab3400191.png" alt="Schedule Page">
  <img src="https://user-images.githubusercontent.com/75678927/229338854-2faf16a8-080c-4367-9fd8-8365b8de72db.png" alt="Schedule Page">
  <img src="https://user-images.githubusercontent.com/75678927/229338875-173030cd-b43c-4f44-af3e-4926fab88e0f.png" alt="Schedule Page">

- Profile Page
  <img src="https://user-images.githubusercontent.com/75678927/229338991-67cbb6e3-59f6-4171-86cf-9985f7a5bdc6.png" alt="Profile Page">
  <img src="https://user-images.githubusercontent.com/75678927/229339121-890583dc-9a18-42b2-8473-f5a126259760.png" alt="Profile Page">

### Project Maintainers

| <img src = "https://avatars.githubusercontent.com/u/70760826?v=4" width="50px"> | <img src = "https://avatars.githubusercontent.com/u/75678927?v=4" width="50px"> |  <img src = "https://avatars.githubusercontent.com/u/25717503?v=4" width="50px">| <img src = "https://avatars.githubusercontent.com/u/79470399?v=4" width="50px"> |
| :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- 
|                   [Piyush Airani](https://github.com/pi22by7)                   |                 [Kishor Balgi](https://github.com/KishorBalgi/)                 | [Saumitra Topinkatti](https://github.com/SBTopZZZ-LG)                           | [parishkar singh](https://github.com/parishkar-9790)                            |

### License

[GNU Affero General Public License v3.0](https://github.com/pi22by7/aura-git/blob/main/LICENSE.md)
