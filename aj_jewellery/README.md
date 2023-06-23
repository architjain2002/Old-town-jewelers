# Frontend Part - Using React and Material UI

Old-town-jewels is a react based application for e-commerce jewellery store, with admin side and user side.


</br>

## Deployment

Use this URL to access our website:  [Old-Town-Jewels](https://old-town-jewelers.azurewebsites.net/)


****
</br>


## Installation

### To run this locally in your computer follow these steps:


1. Clone this github-repository 
``` bash
git clone https://github.com/architjain2002/Old-town-jewelers.git

```
2.  Go to the aj_jewellery directory (frontend-directory)
```bash
cd aj_jewellery
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
#Backend Server - run after running python server
REACT_APP_BACKEND_URL=http://localhost:3001/

REACT_APP_ADMIN=(admin-email)
REACT_APP_PASSWORD=(react-admin-password with salt)
REACT_APP_SALT=(Add you own salt)

#Python Server - run first
REACT_APP_API_URL=http://127.0.0.1:5000/
```

6. Start the server

``` bash
npm start
```


****
</br>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

