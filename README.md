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

## Setup Instructions

### Prerequisites

* Vanilla app, so no prerequisites

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/kagi-email-client.git
   ```

2. Update Firebase configuration in `login.js`:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### Seed Data

Seed data is automatically populated via a `script` tag in `email.html` when the page loads.

## Usage

* **Demo Login:** Click on "Demo User" to access email without creating an account.
* **Register/Login:** Create a new account or log in with your existing credentials.
* **Send Email:** Compose and send an email with or without encryption.
* **Read/Decrypt:** View emails and decrypt, if necessary.
* **Delete/Trash:** Move emails to trash or permanently delete in a second step after confirmation.

## Testing

* Site can be viewed by running the index.html file in the root folder.


## Deployment

* Site is automatically deployed when pushed and merged into the main branch.

