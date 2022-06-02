# ocean-crm

## TODOs
* Auth/Roles
* User Profile
* Login as other user (https://stackoverflow.com/questions/28143064/how-can-i-impersonate-another-user-with-passport-js-in-node)
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
* I think fallback routes are not the right tool for 404 and 500 error pages... First of all I cannot know the difference and second I cannot have the correct http headers... I think luna needs another concept for these kind of routes.
