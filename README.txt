This is the first homework for the Pirple Node Masterclass. Written by Bryce Collins

This program runs from the command line taking a NODE_ENV variable to determine the ports it is running on.
It automatically routes anything that is not '/hello' to the not_found route. All of the routes have been placed in a file I called "router.js". 

Get and Post both work with the 'hello' path, but if you a JSON object complete with a 'name' field, it will return a different message complete with the name sent and how many times the name has been sent to the server since it was started up.
