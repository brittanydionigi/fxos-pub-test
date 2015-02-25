#fxos-pub-test

## getting started
```git clone git@github.com:brittanystoroz/fxos-pub-test.git```  
```npm install```

In index.js, replace lines 10 and 11 with your own consumer key & secret. You can generate those here: https://marketplace-dev.allizom.org/developers/api.

## run 
```node index.js```

## notes

##### oauth lib is forcing `content-type` to `application/x-www-form-urlencoded`.
I believe the request needs to be sent with `application/json`?? (https://firefox-marketplace-api.readthedocs.org/en/latest/topics/overview.html#requests). But even after tweaking the source of oauth.js to override it, still receiving 403 "You do not have permissions..." error.

To try this out, change lines 492-500 in node_modules/lib/oauth.js to: 

```javascript
  if( typeof post_content_type == "function" ) {
    callback= post_content_type;
    post_content_type= null;
  }
  if ( typeof post_body != "string" && !Buffer.isBuffer(post_body) ) {
    post_content_type= "application/x-www-form-urlencoded"
    extra_params= post_body;
    post_body= null;
  }
```

##### authorization headers generated by oauth don't include an `oauth_body_hash` value.
Is this needed? It gets passed in the Marketplace.Python package, which hits the endpoint successfully. Not sure how to generate this value & send it in the header. Other than that the headers seem equivalent.
