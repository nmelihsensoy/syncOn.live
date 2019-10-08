# SyncOn.live

## Project setup

# Youtube Data Api
If you are using Heroku add your api key to the Config Vars with YOUTUBE_API name. If you are not enter your api key into api.keys.js.

# Build VueJs Front-End

```
yarn install
yarn run build
```

# Build Server

```
cd Server
npm install
```

# Run Without Process Manager

```
sudo node server.js
```

# Run With PM2

```
npm install pm2 -g 
sudo pm2 start server.js
pm2 list
```