### SSO Demo

This is a sample app demonstrating the SSO between the single page applications using **OAuth.**

#### Configurations

In this example, I have built two small apps:

* APP - 1 (SPA)
* APP - 2 (SPA)

#### Running the app

In order to see working of SSO, each app has its own domain. Assuming the `APP-1` folder to be the current working directory, Run

```

npm install 
npm start

Server is listening on port 3000

```
`APP-1` is now running at [`http://localhost:3000`](http://localhost:3000). Open the other tab in your terminal and do the same for the `APP-2`. Once that's done, `APP-2` will be running at [`http://localhost:8000`](http://localhost:8000). 
