# linksvip-getter
Get direct link from linksvip (account required).

## How to use

### Basic

```javascript
  const linksvip = require('linksvip-getter')
  
  // You need to specify login info for LinksVip service in an object  
  const loginInfo = {
    username: "youremail@email.com",
    password: "password",
  }
  
  linksvip.getLinksVip('fshare/4share url to get', loginInfo)
  .then(directUrl => {
    console.log(directUrl);
  })
  .catch(e => {
    console.log("some thing wrong");
  });
```

### Use hashed password

```javascript
  const linksvip = require('linksvip-getter')
  
  // You need to specify login info for LinksVip service in an object  
  const loginInfo = {
    username: "youremail@email.com",
    password: "5f4dcc3b5aa765d61d8327deb882cf99", // password
    hashed: true
  }
  
  linksvip.getLinksVip('fshare/4share url to get', loginInfo)
  .then(directUrl => {
    console.log(directUrl);
  })
  .catch(e => {
    console.log("some thing wrong");
  });
```
