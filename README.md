# Makeen-poc

## Introduction
Some basic apis are created to show POC of backend

## How To Run

`docker-compose.yml` is created at root through that services can easily start to run.

### Dependencies
* Docker

### Run through docker-compose.yml
After cloning repo, run below command at root

```
docker compose up --build -d
```

It will up two services

* Backend Apis exposed at port `3000`
* mongodb at exposed port `27017`

Inorder to stop services, run below command at root of repo

```
docker compose down
```

## API docs


* POST /api/login (To login user) - `this will return access token that is expected to be passed as Authorization header as an` [OAuth2 Bearer token](https://oauth.net/2/bearer-tokens/) in every api request for authorization.
```
// body
{
    "username": "username",
    "password": "password"
}
```

* POST /api/register (To create user)
```
// body
{
    "username": "username",
    "firstName": "firstName",
    "lastName": "lastName",
    "email": "test@test.com",
    "password": "password"
}
```

* POST /api/group (To create group)

```
    {
        title: 'Foundation'
    }
```

* POST /api/group/role (To create role)

```
    {
        role: 'manager',
        groupId: ${groupId}
    }
```

* GET /api/group (To all groups)

* POST /api/collection (To create collection)

```
    {
    name: "first collection",
    groupId: ${groupId}
    }
```
* GET /api/collection (To get all collections)

* POST /api/item (To create item)


