# DJ Joubi App
React frontend for DJ Joubi that maintains a session of your played songs to prevent repeating tracks if you are switching between playlists at an event.

This project is built using React + Vite.

## Prerequisites
1. Set up the [DJ Joubi Service](https://github.com/maryeprouty/dj-joubi-service) in your local development environment. 

## Local Build and Development Instructions
1. Clone the repo into Visual Studio Code or your IDE of choice.
2. In axios.helper.js, replace the baseURL with 'http://127.0.0.1:8888'.
3. In Login.jsx, replace the href with "http://127.0.0.1:8888/api/login".
4. Open a terminal and run ```npm install``` to generate node_modules.
5. Run ```npm run dev``` to start the local development server.
6. Navigate to https://127.0.0.1:5173 to view your local changes.
