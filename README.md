# ocean-crm

## TODOs
* Login/Auth
* Auth/Roles
* User Profile
* Login as other user
* Log/Activity wit all actions from users? + Widget
* Notifications
* Use Prisma.io as ORM with SQLite database
* Logo
* Favicon
* Write Readme
* Push to GitHub

## Gotchas
* We always need the request inside the layout. Therefor we always have to use "loadDynamicProperties" although we don't need it for the page itself...
* Cannot import anything that uses native node libs... Need to dynamically import... It would be nice if luna-js could figure that out for me!
* Cannot import anything for the client when using TARGET_BOTH...
