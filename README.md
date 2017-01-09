This repo reproduces a bug in Jest. The tests pass in Mocha but fail in Jest.

```
$ npm install
$ npm start &
$ npm run test:mocha
$ npm run test:jest
```

I have a test suite written in Mocha that makes requests to an endpoint and makes some assertions about the cookies in the HTTP response.

To make these requests, I'm using the `node-fetch` package, which internally just calls node's `http.request`.

As an example, the raw headers from `http.request` look like this:

```js
{
    "x-powered-by": "Express",
    "set-cookie": [
        "test=foo; Path=/"
    ],
    "content-type": "text/html; charset=utf-8",
    "content-length": "19",
    "etag": "W/\"13-1sRJGKLXRCQyY8QPKPqBEg\"",
    "date": "Mon, 09 Jan 2017 16:03:17 GMT",
    "connection": "close"
}
```

`node-fetch` does several conditional checks to determine how to parse each response header. In the case of the `set-cookie` header, it should match the [array condition](https://github.com/bitinn/node-fetch/blob/master/lib/headers.js#L38) which checks if the header is an `instanceof Array`.

In Mocha, this check succeeds and `node-fetch` parses the cookies header just fine.

In Jest, this check fails saying the `set-cookie` header is *not* an `instanceof Array`.

`Array.isArray` succeeds in both Mocha and Jest, so I've [submitted a PR](https://github.com/bitinn/node-fetch/pull/220) to update `node-fetch` to do so.

