# Backend Part - Using NodeJS, ExpressJS and SocketIO

Old-town-jewels (our website) is powered by a nodeJs backend with NoSQL database MongoDB and expressJs backend framework.


</br>

## Deployment

Use this URL to access our backend server:  [Old-Town-Jewels-Backend](https://aj-backend.azurewebsites.net/)


****
</br>


## Installation

### To run this locally in your computer follow these steps:


1. Clone this github-repository 
``` bash
git clone https://github.com/architjain2002/Old-town-jewelers.git

```
2.  Go to the aj_jewellery_backend directory (backend-directory)
```bash
cd aj_jewellery_backend
```
3. Execute cmd 'npm install' to install necessary libraries

``` bash
npm install
```

4. Create .env file in the repository

``` bash
echo > ".env"
```

5. In .env create these values

```bash
PORT=3001
MONGODB_URL=(mongo-db connection string)
SALT= (salt for password)

```

6. Start the server

``` bash
node app.js
```


7. If python server is also used locally

Go to  app.js and change the url, in socket-Connection
    
```bash
    http://127.0.0.1:5000/chat
```

****
</br>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

