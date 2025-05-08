# Kagi Email

## Project Overview

Kagi Email is a vanilla full stack, terminal-inspired web application for email.

## Features

* User authentication.
* Send, receive, send to trash folder and permanently delete emails.
* Emails are organized into Inbox, Sent, and Trash folders.
* Encrypt and decrypt email messages using a passphrase.
* Demo mode for quick access.

## Tech Stack

* **Frontend:** Vanilla JavaScript, HTML and CSS
* **Backend:** Firebase Firestore & Firebase Functions
* **Authentication:** Firebase Authentication
* **Encryption:** OpenPGP.js
* **Deployment:** Vercel

## Goals

- [x] Email client can either be in the terminal (i.e. a TUI) or a web app
- [x] Should have basic email viewing + sending functionality
- [x] Can use a fake backend (DB, in-memory, etc) or real IMAP/POP/JMAP/etc backend
  - [x] Uses a firebase DB
- [x] Does not have to handle rich text messages, just plaintext
- [x] Deploy
  - [x] Deployed with Vercel at kagi-email.vercel.app
- [x] Readme file with setup instructions
- [x] Code quality and organization
  - [x] Organization of code is based on limitations to deploy to Vercel, the login page must be titled `index.js`, the corresponding `css` and `js` files must also be at the root, there cannot be a `pages` directory as that's reserved for `next.js`.  
- [x] Problem-solving approach
  - [x] There were many constraints while building while also challenging myself to create a fully vanilla site, without any frameworks or node packages for considerations for security. Several options were considered for the backend including having the full IMAP functionalty, instead for the tradeoffs of time and complexity I went with a NoSQL DB. The site could be refactored further by converting more of the JS to HTML with first desire of getting the site working before polishing.

### Stretch Goals
- [x] Adding your own personal touches
  - [x] Added encryption
  - [x] Added simple styling that reminded me of the current Kagi brand of simplicity with hidden pops of color
  - [x] Seeded for easier testing
  - [x] Pre-populated most fields for ease of testing 
  - [x] Added trash and a second step to confirm deletion from DB
  - [x] Fully responsive layout for mobile accessibility

## Setup Instructions

### Prerequisites

* Python3

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/kagi-email-client.git
   ```

2. Update Firebase configuration in `localFirebaseConfig.js` with the emailed config object.

   ```javascript
   const localFirebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

3. Uncomment the `import`s in three files: `/index.js`, `/backend/firebase.js` and `/seed.js`.

4. In the root folder, run:
   ```bash
    python3 -m http.server 8000
   ```

5. Open [http://[::]:8000/](http://[::]:8000/) in the browser
   

### Seed Data

Seed data is automatically populated via a `script` tag in `email.html` when the page loads.

## Usage

* **Demo Login:** Click on "Demo User 1" (demo@kagi.com) or "Demo User 2" (test@test.com) to access email without creating an account, you can easily correspond between the two accounts.
* **Register/Login:** Create a new account or log in with your existing credentials.
* **Send Email:** Compose and send an email with or without encryption.
* **Read/Decrypt:** View emails and decrypt, if necessary.
* **Delete/Trash:** Move emails to trash or permanently delete in a second step after confirmation.

## Testing

* Site can be viewed by running the index.html file in the root folder.


## Deployment

* Site is automatically deployed when pushed and merged into the main branch.
