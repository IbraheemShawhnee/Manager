# Manager
Manager App


# Currently known issues:

* "passport" keeps forcing an "email" to be unique and users without email can be treated as duplicates
* Paginign is now supported in the backend (kinda)
* still no quries implementation to anything yet
* you still have to set admin and super user via your db directly

# Important notes:

* Make sure you set the ENV Vars for the admin when you run the app for the first time see [INIT VARS](https://github.com/AssadAnabosi/Manager#init-vars) below for more info
* Worker to Logs is One to many relationship
* Payee to Cheques is One to many relationship

# Env Var
* DB_PORT: Mongod port (default: 27017)
* DB_URL : Your Mongo Database URL (default: mongodb://localhost: + DB_PORT / managerDB)
* SECRET: Secret for cookies/sessions (default: ""whatawonderfullsecret!")
* SECURE_COOKIES: Secure property for cookies (default: false)
* PORT: The port the app will be listening at (auto default: 80)

# INIT VARS
* ADMIN_EMAIL: default: ""
* ADNMIN_USERNAME: default "admin"
* ADMIN_PASSWORD: default "admin"
* ADMIN_PHONE_NUMBER: default ""
