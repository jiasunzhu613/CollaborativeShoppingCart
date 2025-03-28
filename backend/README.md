# Backend Quickstart

## PostgreSQL Local Host Set-up

1. Download Postgres
2. Create a local DB using: `createdb [db_name]`
3. Access the DB that was created: `psql [db_name]`
4. Create a `.env` file in the `backend` directory and add a field name `DATABASE_URL`, following the following formating:
   `DATABASE_URL=postgresql+psycopg2://user:password@hostname/database_name`

> USEFUL COMMANDS (for the future):
>
> 1.  `psql --list` will list all existing local DB's
> 2.  Once inside DB, run: `\conninfo` to find connection information
> 3.  Once inside DB, run: `\du` details of the users of the DB
> 4.  To create or change a user's password to the DB, use:
>     `ALTER USER user_name WITH PASSWORD 'new_password';`
> 5.  Inside the DB, run: `\d` to see all existing tables

## Flask-SQLAlchemy Quickstart

1. `cd backend` (if you are not yet in the backend folder)
2. Create a virtual environment
    1. run `python3 -m venv env` to create virtual environment folder
    2. run `source env/bin/activate` to get into virtual environment
3. Inside virtual environment, run `pip install -r requirements.txt` to install dependencies
4. `flask init-db`
    - this will create or reset the db
5. `flask run`
    - this will start the local host where endpoints can be accessed

#### Making database migrations

Resource: https://flask-migrate.readthedocs.io/en/latest/

1. run `flask db migrate -m ""` to create a new migration
    - note: this creates a migration script that can be found in the migrations folder. Refer to the Flask-Migrate resources to find what cannot be changed via command and needs to be added manually (such as table and column name changes)
2. run `flask db upgrade` to perform the migration
