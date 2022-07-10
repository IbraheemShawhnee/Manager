# Manager

Manager App Quick walk-through:
* MERN Stack Application
* Worker (normal user) can only view their own logs.
* Admin can access bills, payees, cheaques and add workers.
* Super can set passwords, delete workers and change permissions.
* All users including admin and super are considered to be workers as well.
* Worker to Logs is One to many relationship.
* Payee to Cheques is One to many relationship.
* Admins and Supers can be set via the edit worker page
* When a worker gets deleted his logs gets deleted
* When a payee gets deleted, all cheqeues related to this payee gets set as "Deleted Payee cheques"

# Currently known issues:

* Custom qureis when retreiving anything from the API
* Paginign for the responses

# Important notes:

* Some configuration needed, so take a look at [ENV VARS](https://github.com/AssadAnabosi/Manager#env-vars) below for more info
* Make sure you set the ENV Vars for the admin when you run the app for the first time see [INIT VARS](https://github.com/AssadAnabosi/Manager#init-vars) below for more info
* Express server rendering responses still works (Legacy code)

# ENV VARS
* DB_PORT: Mongod port (default: 27017)
* DB_URL : Your Mongo Database URL (default: mongodb://localhost: + DB_PORT / managerDB)
* SECRET: Secret for cookies/sessions (default: ""whatawonderfullsecret!")
* SECURE_COOKIES: Secure property for cookies (default: false) to make it true set SECURE_COOKIES === "true"
* PORT: The Port for Front-End Server Will Be Listening At (auto default: 80)
* BACKEND_PORT: The Port for Back-End Server Will Be Listening At (auto default: 5000, if changed then proxy must be changed in "/client/package.json")

# INIT VARS
* ADMIN_EMAIL: default: ""
* ADMIN_USERNAME: default "admin"
* ADMIN_PASSWORD: default "admin"
* ADMIN_PHONE_NUMBER: default ""
