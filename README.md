# ocean-crm

## TODOs
* Notifications
* Filter Organizations/Contacts by "deleted_at"
* Dashboard Widgets (with real content?! and maybe with server sent events for updates?!)
* Manage Users
* Login/Auth
* User Profile
* Logo
* Favicon
* Use Prisma.io as ORM with SQLite database
* Write Readme
* Push to GitHub

## Gotchas
* We always need the request inside the layout. Therefor we always have to use "loadDynamicProperties" although we don't need it for the page itself...
* Cannot import anything that uses native node libs... Need to dynamically import... It would be nice if luna-js could figure that out for me!
* Cannot import anything for the client when using TARGET_BOTH...
