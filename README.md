# ocean-crm

## TODOs
* Auth/Roles
* Notifications (for Contacts Pages?) like Flash Messages
* Use Model classes
* Don't pass all fields from db to frontend
* Preview Modal for resources from overview
* Svg partials/helpers instead of inline copies
* Logo
* Favicon
* Layout improvements and fixes
* Write Readme
* Push to GitHub

## Gotchas
* We always need the request inside the layout. Therefor we always have to use "loadDynamicProperties" although we don't need it for the page itself...
* Pages can't be reactive on the client, which gets limiting quite fast
* Cannot import anything that uses native node libs... Need to dynamically import... It would be nice if luna-js could figure that out for me!
* Cannot import anything for the client when using TARGET_BOTH...
* I think fallback routes are not the right tool for 404 and 500 error pages... First of all I cannot know the difference and second I cannot have the correct http headers... I think luna needs another concept for these kind of routes.
* When the app gets bigger, creating new pages/components is a lot of typing... I think it would be nice to have some generators via the cli to create pages, components, apis, services etc.
* Cannot invoke put/delete api handlers via standard form post requests...
* I would like to add middleware functions just for the eg. delete methods
