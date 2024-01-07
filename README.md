# Film App
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)]1.0

## Features

- User Authentication and Signup Process
- Get all Film
- If login then can comment and give ratings and see other's comments and ratings
- in film detail page

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Installation 

### Backend
```sh

composer install
php artisan passport:install
php artisan migrate
php artisan db:seed
php artisan serve
```

### Frontend

```sh
npm install
ng serve
```
visit localhost:4200 and then login  or signup
and make comments and get Film reviews ratings
