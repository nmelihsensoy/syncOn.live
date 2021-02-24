# SyncOn.live

## Project setup

### Build VueJs Front-End

```
yarn install
yarn run build
```

### Build Server

```
cd Server
npm install
```

### Run Without Process Manager

```
sudo node server.js
```

### Run With PM2

```
npm install pm2 -g 
sudo pm2 start server.js
pm2 list
```