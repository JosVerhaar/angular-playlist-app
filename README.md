# Angular-Playlist-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.3.

The next commands you need to run from the `angular-playlist-app`path.

## Development server

### database
As a database JSON server is used. Run `json-server --watch db.json` to start the database. Navigate to `http://localhost:3000/`.

### install dependencies

To install all node_modules run the command `npm install`.

### development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

When you run `npm run test:coverage` Jest will check the test coverage. You can find the report as an HTML page here `angular-playlist-app/coverage/lcov-report/index.html`

## How does Angular-Playlist-App work?
When the database and development server both run, navigate to `http://localhost:4200/` (standard port). This is the homepage.
With the navigation menu you can navigate to: `Playlists` and `Artists`.

### Search
Every page has a search component. With this component you can search on (parts of) the name. Type in your search string and click `Search`. With the x-symbol you can clear the searchfield.

### Pagination
Every page has a pagination component. You can set the preferred amount of items you want to see on a single page.

### Playlists
When you navigate to `Playlists` you will see the added Playlists. When there are no playlists yet, you will see an empty-state.

#### Add new Playlist
With the button `Add new` you create a new Playlist. Only fill-in the mandatory name (does not have to be unique) and press `Create`. The newly created Playlist is visible in the overview.

#### View Playlist
To view the details of a Playlist you press the cassette-icon. When there are no songs added yet, you can navigate to the `Artists` by clicking the empty-state.

#### Delete Playlist
To delete a Playlist, press the trash-icon.

#### Delete song from Playlist
You can only delete a song from a Playlist in the Playlist view mode. Every song-card has a trash-icon. Clicking this will delete the song from this playlist.

#### Add song to Playlist
See `Artists > Add song to Playlist`.

### Artists
On the `Artists` page you see a list of the Artists. When there are no Artists to show, an empty-state is shown.

#### View Artists
By clicking the cassette-icon on the Artists-card you can view the songs of this Artist. When there are no songs available an empty-state will be shown.

#### Add song to Playlist
From the View Artists view (you see the songs of an Artist) you can add a song to a Playlist by clicking on the add-icon. Select the Playlist you want to add the song to and click `Ok`.
