# Twiglet - structured micro-logging

Twiglet is a very minimalistic structured (JSON) logging library for use with Microservices, and designed for constructor injection.

## Design vision

Inspired by the book ['I <3 Logs'](https://www.goodreads.com/book/show/23237460-i-heart-logs) by Jay Kreps, the author of Apache Kafka, this is a tiny helper library to help with the consistent output of structured logs from microservices.

A structured log entry looks something like this:

```json
{
  "service": "basket",
  "event": "query-items",
  "timestamp": "2019-09-17T09:20:07.589Z",
  "level": "INFO",
  "info": {
    "number-of-items": 3,
    "correlation-id": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
    "latency-ms": 12
  }
}
```

N.B. Here we have pretty-printed for readability, but the actual log output would be on a single line.

## Example of use (JS)

First install the library

> npm install --save @gowerstreet/twiglet

Now your service wrapper needs to import twiglet, create a logger and inject it into your application:

```javascript
var http = require('http'),
    twiglet = require('twiglet'),
    app = require('./my-app')

    PORT = 8080,
    logger = twiglet.create-logger({service: 'my-service-name',
                                    output: (x) => console.log(JSON.stringify x),
                                    events: {startup: 'Service startup',
                                             http-request: 'HTTP request'
                                             db-query: 'Database query'}}),
     service = app.init(logger)

http.create-server(service).listen(PORT, "0.0.0.0")
```

In your application HTTP handler:

```javascript
module.exports =
  { 
    init: (logger) =>
            (req res) => {
               logger.info( 'http-request', 
                            { 
                               method: req.method,
                               url: req.url.path,
                               more_stuff: 'goes here' 
                            })
               res.writeHead(200, { 'Content-Type': 'application/json' })
               res.end(JSON.stringify({ message: 'Hello Microservice World!'}))
            }
  }
```

There are multiple different ways of closing over the injected logger so as to be able to use it in all of your application code, which one you choose is mostly a matter of preference.

## Example of use (Sibilant)

Install the library as above. In your service wrapper code import twiglet, create a logger and inject it into your application:

```clojure
(var http (require "http")
     twiglet (require "twiglet")
     app (require "./my-app")
     
     PORT 8080
     logger (twiglet.create-logger {'service "my-service-name"
                                    'output (# (x) (console.log (JSON.stringify x)))
                                    'events  {'startup "Service startup"
                                              'http-request "HTTP request"
                                              'db-query "Database query"}})
     service (app.init logger))

(pipe http
     (.create-server service)
     (.listen PORT "0.0.0.0"))
```

In your application HTTP handler:

```clojure
(assign module.exports 
        {'init (# (logger)
                  (def handler (req res)
                    (logger.info 'http-request {'method req.method
                                                'url req.url.path
                                                'more-stuff "goes here"})
                    (res.write-head 200 { "Content-Type" "application/json" })
                    (res.end (JSON.stringify {'message "Hello Microservice World!"}))))})
```

## How to build

Twiglet is built in [Sibilant](https://sibilant.org/) - an s-expression language that compiles to readable and idiomatic JavaScript. In order to make changes simply edit the file [twiglet.sibilant](twiglet.sibilant). Test your changes by running the tests with:

> npm test

If you want to use the library from JavaScript, then compile the Sibilant source into the file [index.js](index.js) with:

> npm run compile

Simples.
