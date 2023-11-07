# swagger-orm
Swagger-ORM is a runtime-driven, object-oriented mapping tool for describing routes and routers without the need for a separate JSON configuration, streamlining the process during startup.

The available functionalities are limited, and if you wish to incorporate additional features, you have the option to implement them yourself or submit an issue for consideration.
<br>
<br>
# definitions
- describing a server
```ts
import { Router } from 'express'
import { serve, setup } from 'swagger-ui-express';
import swagger from 'swagger-orm';

import { path as auth } from 'routes/auth.js';
import { path as users } from 'routes/users/index.js';

const router = Router();

router.use('/', serve, setup(
    swagger.compile({
        ...auth,
        ...users
    })
));

export default router;
```
<br>

- describing a router
```ts
import { Swagger } from 'swagger-orm';

// auth.domain.tdl, leave as undefined if no subdomain, would be transpiled as domain.tdl
export const path = Swagger.ToPath('auth', {
  '/sign-in': signIn.define
    
  /*
  '/multiple-http-methods': [
    get.define,
    post.define,
    put.define,
    delete.define
  ]
  */
});
```
<br>

- describing a route
```ts
import { Swagger } from 'swagger-orm';

export const route = ...;

export const define = new Swagger('post', 'auth-sign-up')
  .tags('Authorization', 'Authentication')
  .requestBody({
    username: 'john_doe',
    password: 'my-password',
    email: 'john_doe@domain.tdl'
  })
  .responses([
    new Swagger.Response(200),
    new Swagger.Response(400),
    new Swagger.Response(409, {
      message: 'This username or email is already taken',
      data: {
        // any additional data?
      }
    }),
    new Swagger.Response(500)
  ]);
  // security(); <- only supports header authorization jwt, i dont mind adding more supports just hit me up with an issue
```
