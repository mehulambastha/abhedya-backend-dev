# Backend for Abhedya - 2024
with a simple makeshift frontend to demontrate the API requests

## 1. Clone the repo
```bash
    git clone https://github.com/istenith/abhedya24-backend.git
```

## 2. Move into the dir
```bash
  cd abhedya24-backend
```

## 3. Install the dependencies
```bash
  npm install
```

## 4. Run the backend 
```bash
  nodemon index
```
The backend is now live on port 5001 (oe 5002 if that doesn't work)

## 5. Host the simple frontend on localhost
```bash
    cd ./frontend/ 
```
```bash
    npm run dev
```
The frontend is live on port 3000

## 6. Visit the url
```url
  http://localhost:3000/register/
```
Register new user here. You will then recieve an email. Open that email and you have a dyanmic login link. Follow the link to login and play.

## 7. Game screen
```url
  http://localhost:3000/play/
```

# Admin Panel
Access the admin panel from
```url
  http://localhost:3000/admin/
```
### The login credentials are 
username: superuser
password: superpassword

## Important guidelines to use the admin panel
1. The 'unique identifier' is the username in case of users and the questionId (including the # symbol) in case of levels
2. All the new data (while adding or modifying) should be entered in properly formatted JSON format.
3. The property names should be properly enclosed in "" and include the curly braces ({}) too.
