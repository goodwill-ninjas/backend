# Blood Donor - Server

The main REST API backend responsible for serving stateful data for the Blood Donor mobile apps.

## Building & Running
This package uses Python and Docker, make sure you've got that installed. \
Required environment variables template available in `env.example` file.

To spin up the containers:
```
$ docker-compose up -d --build && docker-compose logs -f
```

To migrate the PostgreSQL db:
```
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

To create an admin user:
```
docker-compose exec backend python manage.py createsuperuser
```

Afterwards, you can confirm the setup by logging into the Django administration:
> http://127.0.0.1:8080/admin/

## Structure
Structure of models will follow similar conventions. _Users_ will be used as an example:
* `users/apps.py` - Declares _Users_ class that represents CRUD API app and its configuration
* `users/models.py` - Defines _Users_ data model class
* `users/serializers.py` - Manages serialization and deserialization - translates Django models into JSON strings
* `users/views.py` - Contains functions to process HTTP requests
* `users/urls.py` - Defines URL patterns along with request functions in Views
* `users/migrations/*.py` - Used for generating PostgreSQL tables