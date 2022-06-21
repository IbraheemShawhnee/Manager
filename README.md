# Manager
Manager App


# Currently known issues:

* "passport" keeps forcing an "email" to be unique and users without email can be treated as duplicates
* For now one page of logs can only view up to 31 logs and cheques page can view up to 10 cheques (paging is underworking)
* still no quries implementation to anything yet

# Important notes:

* Make sure you set the ENV Vars for the admin when you run the app for the first time see INIT VARS below for more info
* Worker to Logs is One to many relationship
* Payee to Cheques is One to many relationship

# Env Var
* DB_PORT: Mongod port (auto default: 27017)
* DB_URL : Your Mongo Database URL (auto default: mongodb://localhost: + DB_PORT / managerDB)
* SECRET: Secret for cookies/sessions (auto default: ""whatawonderfullsecret!")
* PORT: The port the app will be listening at (auto default: 80)

# INIT VARS
* ADMIN_EMAIL: default: ""
* ADNMIN_USERNAME: default "admin"
* ADMIN_PASSWORD: default "admin"
* ADMIN_PHONE_NUMBER: default ""
