# Browse/Search Surf Videos

you can use whatever frameworks you’d like. we use React here at drift and have found create-react-app to be a great way to get started.

To get started just fork this repo and get hacking, try to commit often, the goal of this exercise is to see your thought process during development.

docs: ```https://developers.google.com/youtube/v3/getting-started```

apikey: ```AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo (or generate your own in the google api console)```

sample request:
```
https://www.googleapis.com/youtube/v3/search?key=AIzaSyBeimXtjgzfQcogY-fP8_CHPybmLpFaieo&part=snippet&type=video&q=surf
```

## Min Requirements
  - have a home page that lists and either paginates or infinite scrolls surf videos
  - allow videos to be opened in a new page to play
  - allow search within the category (ex: q = surf + query)
  - show description/title/thumbnail per video on home page

## Extra credit
  - show comments on video detail page
  - show videos from same author on detail page
  - allow for sorting and advanced filtering on home page
  - make it sexy
  - go crazy with available end points :)

## Getting started

1. nvm install
2. nvm use
3. npm install
4. npm start
