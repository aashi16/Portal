# portal-app : SPA
This portal will offer existing users the option to have online access through an account.
Users will have to have use their email address to register/login and no two users can have the same email address. Problem is that a lot of our users, usually married couples, share the same email address. We want to allow both of them to access the portal through the same email/password.
 
User Profile will be connected to a User only. One user can have optionally have more than one user profile.The way this would work is that after a user logs in, in case they have more than one profile they will be asked to select one, kind of like one does in Netflix. If the user has just one profile, this step must be skipped. In both cases the user will be redirected to the homepage.

<img width="593" alt="Screen Shot 2021-08-07 at 11 29 37 AM" src="https://user-images.githubusercontent.com/83874139/128590448-4a830634-c563-4ab4-9919-777219969830.png">
<img width="1405" alt="Screen Shot 2021-08-07 at 11 31 28 AM" src="https://user-images.githubusercontent.com/83874139/128590450-902282c5-9d7e-4935-93c7-8e31f206f88c.png">
<img width="892" alt="Screen Shot 2021-08-07 at 11 31 48 AM" src="https://user-images.githubusercontent.com/83874139/128590452-b5f5e08b-b1dc-488f-bb77-08b53d8de645.png">


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Install JSON Server and Create a db.json file

```
npm install -g json-server
```

### Start JSON Server

```
json-server --watch db.json
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
