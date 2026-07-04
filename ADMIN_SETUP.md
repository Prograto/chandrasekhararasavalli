# Admin Panel Setup Guide

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"** (or use an existing one)
3. Follow the setup wizard

## 2. Enable Authentication

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider:
   - Click on Google
   - Toggle to enable
   - Select your project from the dropdown
   - Save
4. Go to the **Users** tab → **Add user**
5. Enter your admin email and password
6. This is what you'll use to log into `/admin`

## 3. Create Firestore Database

1. In Firebase Console → **Firestore Database** → **Create database**
2. Start in **production mode**
3. Choose your region (e.g., `asia-south1` for India)

## 4. Firestore Security Rules

In Firestore → **Rules**, paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can READ all content
    match /siteContent/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /projects/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /experience/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /services/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /skillCategories/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /certificates/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // Contact messages: anyone can create, only auth can read/update/delete
    match /contactMessages/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 5. Get Your Firebase Config

1. In Firebase Console → **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** → Click **"Add app"** → Choose **Web** (</> icon)
3. Register the app (name doesn't matter)
4. Copy the config values

## 6. Add Config to Your Project

1. Copy `.env.example` to `.env.local`
2. Fill in the values from step 5:

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

3. Restart your dev server: `npm run dev`

## 7. Access the Admin Panel

1. Go to `http://localhost:5173/admin`
2. Sign in with the email/password you created in step 2
3. Start adding your content!

## How It Works

- **Admin panel** writes to Firestore collections
- **Public portfolio** reads from static files by default
- When Firestore data exists, it takes priority over static files
- Contact form submissions save to `contactMessages` collection
- All writes require authentication (Firestore rules enforce this)

## Firestore Collections

| Collection | Purpose |
|---|---|
| `siteContent/profile` | Your profile info |
| `projects` | Portfolio projects |
| `experience` | Work experience & internships |
| `services` | Freelance service offerings |
| `skillCategories` | Skill categories with skills |
| `certificates` | Certifications |
| `contactMessages` | Contact form submissions |
