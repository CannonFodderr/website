# Profile Website

## Features

* **NodeJS** with **Express** backend.
* **PostgresDB** with **Sequelize** (incl .sequelizerc file for custom configs).
* Switch **HOST || DB** state form development to production with .env variables. 
* **Express Sanitizer** - Sanitized inputs.
* **CSRF Protection** - on all form routes.
* Client side **serviceWorker** for caching + SW update/refresh notifications.
* **PassportJS** - local & Google oAuth2.0 strategies.
* **bycrypt** encryption for users passwords.
* Custom middleware for isAdmin / isLoggedIn users.
* **Nodemailer** connection via Google oAuth2.0.
* Automatic "Thank You" E-Mail on contact form submission.
* **Express-Flash** - Flash notifications for Success/Failure form submission.
* Admin managment system for CV / Projects & Jobs CRUD.
* CSS loading screen until document loads.
* CSS Typewriter animations on index and cv views.
* Seeding file execution with CLI args - ```node server.js seed```
* **PWA** manifest & Install notifications.
* **Image file uploads** with Multer & cloudify + Custom file checkups on server side.
* **CV Print version**


## SETUP
* git clone
* npm install
* Setup .env variables:
    * PROD_HOST - ```https://yourhost.hostname.com```
    * USERNAME - initial Admin setup
    * PASSWORD - initial Admin setup
    * DB_STATE - ```prod``` for production ```dev``` for deveopment
    * SECRET - Express Session Secret
    * OWNER - Name of site owner
    * DB_HOST - **DEV** ```localhost```
    * DB_NAME - **DEV** DB Name
    * DB_USER - **DEV** Username for DB access
    * DB_PASS - **DEV** Password for DB access
    * PROD_DB_HOST - **Production** ```localhost```
    * PROD_DB_NAME - **Production** DB Name
    * PROD_DB_USER - **Production** Username for DB access
    * PROD_DB_PASS - **Production** Password for DB access
    * OAUTH_ID - Admin ```Sign in with google```
    * OAUTH_SECRET - Admin ```Sign in with google```
    * EMAIL - Nodemailer email account.
    * REFRESH_TOKEN - Token for nodemailer - google oAuth2.0
* Seed DB for first admin
* Get oAuth2.0 credentials from googleapis
* ENJOY ♥
