# My Notes

A simple notes app using the MongoDB Node.js driver. Add a note to save it in MongoDB Community Server, or select **Delete** to remove it.

## Requirements

- Node.js
- MongoDB Community Server installed on your computer

## Run on Windows

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community). During setup, enable **Install MongoD as a Service**.
2. Start the MongoDB service in PowerShell (run as Administrator if needed):

   ```powershell
   Start-Service MongoDB
   ```

3. In this folder, install the app packages and start it:

   ```powershell
   npm install
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The app connects to `mongodb://127.0.0.1:27017/notes_app`. If `Start-Service MongoDB` says the service cannot be found, install MongoDB Community Server with the service option enabled.

## View notes in MongoDB Compass

1. Install and open [MongoDB Compass](https://www.mongodb.com/products/tools/compass).
2. Connect using `mongodb://127.0.0.1:27017`.
3. Open the `notes_app` database and its `notes` collection. Notes added in the app appear there.

Compass lets you browse the database; MongoDB Community Server must still be running for the app and Compass to connect.
