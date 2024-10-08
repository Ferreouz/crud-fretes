# CRUD Fretes

Purpose: A tests of my skills in full stack development for a job, made in less than a week

[Details](https://github.com/Ferreouz/crud-fretes/blob/main/.metadata/challenge.pdf)

I actually improved a bit and enjoy my time doing this, so even if I don't get the job it was WORTH IT! 
I plan on improving some aspects and refactor a bit, but who knows ¯\_(ツ)_/¯

## How to run
You are gonna need docker to run this :)

1. Clone the repo
```bash
git clone https://github.com/Ferreouz/crud-fretes
cd crud-fretes
```

2. IMPORTANT! change your db password and JWT secret in docker-compose.yml
Good way to generate a good token/password is:
```bash
openssl rand -base64 36
```


3. Create the frontend environment file to work correctly
_edit the file if you configured a different port or is working with a domain_
```bash 
cp frontend/.env.example frontend/.env
```

4. Build and start the containers
```bash
docker compose up -d
```

That's it, now the API is running on port 8080 and go to http://localhost/ to see the frontend

To access as the Administrator, the login is: admin@admin.com and password: senha


Thank you for your patience ;)

## Rebuild the images (when the repo updates)

run the utility:
```bash
sudo bash rebuild.sh
```

*OBS*: it will reset the DB (to be fixed)


## TODO
- CHECK report generation (DONE)
- CRUD Vehicles (DONE)
- Validation of FRONTEND fields (DONE)
- Message of errors DB: duplicate key (DONE); Freight relation with Vehicle on delete (DONE); fields missing (DONE)
- CRUD Users (DONE) 
- Auth Backend (DONE)
- Edit Vehicles Weights (DONE) 
- Vision of drivers (DONE)
- Driver request and Admin accept (DONE)
- Driver change freight status (DONE) 
- Generate report (DONE)
- When Driver asks for freight and receives it, price and rate are stored in db (DONE)
- Create tests logic (DONE)
- REMOVE open from freights table, replace with driver_id != null (DONE)
- Install on Docker (DONE)
- Publish live demo (DONE)
- Beautify the interface
- Make the api more robust (more tests required)
- README (DONE)
- ADD persistence db

## Bugs 
 - Array of DriverRequests when null returns as array of null from db
 - When user logs, freights are not shown (DONE)
