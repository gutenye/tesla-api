tesla-api, Unofficial API Wrapper for Tesla Model S and X
===================================================

[Homepage](https://github.com/gutenye/tesla-api) |
[API Documentation](https://timdorr.docs.apiary.io) | 
[Issue Tracker](https://github.com/gutenye/tesla-api/issues) |
[MIT License](http://choosealicense.com/licenses/mit) |
[by Guten](http://guten.me) |
[Gratipay](https://gratipay.com/gutenye) |
[Bountysource](https://www.bountysource.com/teams/gutenye)

|                |                                                            |
|----------------|------------------------------------------------------------|
| **Install**    |                                                            |
| Node           | yarn add tesla-api                                    |

Philosophy
-----------

API wrappers [should reflect the idioms of the language in which they were written](http://wynnnetherland.com/journal/what-makes-a-good-api-wrapper). tesla-api wraps the Tesla API in a flat API client that follows Javascript conventions and requires little knowledge of REST.

Getting started
---------------

With ES2015 and Async Functions

```javascript
import Tesla from "tesla-api"

async function main() {
  try {
    const vehicles = await Tesla.login({email: x, password: y})
    const vehicle = vehicles[0]
    const chargeState = await vehicle.chargeState()
    console.log(chargeState)              //-> { chargeState: 'Completed', ... }
  } catch (err) {
    if (err.status) {                     // 4xx, 5xx response error
      console.log(`<${err.status} ${err.message}>`, err.response.body)
    } else {                              // Network failures, timeouts, and other errors
      console.error(err.stack)
    }
  }
}
main()
```

Streaming driving state

```
vehicle.stream().subscribe(
  data => console.log(data.speed),
  err => console.error(err),
  () => console.log("complete")
)
```

stream returns a [Observable](https://github.com/ReactiveX/RxJS).

**Follows Javascript Conventions**

Convert response key from underscore to camelCase

```
{
  response: {
    display_name: "Hello",
    remote_start_enabled: true
  }
}

->

{
  response: {
    displayName: "Hello",
    remoteStartEnabled: true
  }
}
```

**Automatical re-Authentication**

When credientals are expires, automatically authenticate it again.

**Units Support**

```
Tesla.login({distanceUnit: "km"})
```

odometer, batteryRange, etc returns in kilometer unit instead of mile

**API Reference**

Read the source for now :), also see [API Documentation](https://timdorr.docs.apiary.io) for a reference.

Projects using this library
---------------------------

> Feel free to send a PR to include your projects.

- [tesla-slack](https://github.com/heikkipora/tesla-slack) Integrates your Tesla Model S/X fleet to Slack.

Development
===========

Contributing
-------------

* Submit any bugs/features/ideas to GitHub issue tracker.
* Thanks to [all contributors](https://github.com/gutenye/tesla-api/contributors).

Resource
--------

* [Unofficial documentation of the Tesla API](https://github.com/timdorr/model-s-api)

Copyright
---------

The MIT License

Copyright (c) 2015 Guten Ye

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
