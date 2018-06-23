# Food computer server

This is hosted site for the [food computer](https://github.com/venepe/foodcomputer), storing temperature and humidity data on MongoDB and images in an AWS bucket.  Moreover, the server loads the [dashboard](https://github.com/venepe/foodcomputer-dashboard), allowing a gardener to view the their plants anywhere.

## Getting started

### Using docker-compose

1.) ```docker-compose up --build```

Requests are served from [8002](http://localhost:8002)

### Using node and MongoDB

1.) [Install and run](https://docs.mongodb.com/manual/installation/) MongoDB.

2.) ```npm install``` or ```yarn```

3.) ```npm start``` or ```yarn start```

Requests are served from [8002](http://localhost:8002)

## Routes

## Snapshots

### GET `/snapshots`
Payload:
```
{
  id
  createdAt
  uri
}
```

### POST `/snapshots`
Form-Data:

| Key | Value |
| --- | --- |
| image | /path/to/image |
| createdAt | '2018-06-23T03:01:00.000Z'


### GET `/snapshots/:id`
Payload:
```
{
  id
  createdAt
  uri
}
```

### GET `/temperatures`
Payload:
```
{
  id
  createdAt
  value
}
```

### POST `/temperatures`
Body:
```
{
  temperature: {
    createdAt
    value
  }
}
```

### GET `/humidities`
Payload:
```
{
  id
  createdAt
  value
}
```

### POST `/humidities`
Body:
```
{
  humidity: {
    createdAt
    value
  }
}
```
