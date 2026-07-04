# Data Migration Guide

## Overview

Your portfolio data has been successfully updated to support full Firestore management. All your existing static data is ready to be migrated to Firebase.

## What Gets Migrated

- ✅ **Profile** - Name, bio, contact info, avatar
- ✅ **Projects** - 6 projects with descriptions, tech stack, images
- ✅ **Experience** - 2 internship entries with highlights and tech stack
- ✅ **Services** - 4 service offerings
- ✅ **Skills** - 6 skill categories with proficiency levels
- ✅ **Certificates** - 6 certificates and achievements
- ✅ **Freelance Clients** - 3 freelance project summaries
- ✅ **Achievements** - 10 achievements across various categories
- ✅ **Messages** - Contact form submissions

**Total: 39+ items** ready to migrate

## Steps to Migrate

### 1. Ensure Firebase is Configured
- Copy `.env.example` to `.env.local` (if not done already)
- Add your Firebase credentials from Firebase Console → Project Settings
- Ensure Firestore Database is created in your Firebase project

### 2. Access the Migration Page
1. Go to `/admin` and sign in
2. Click **"Migrate Data"** in the sidebar
3. Review the data count (should show your portfolio items)

### 3. Run the Migration
- Click **"Start Migration"** button
- Watch the progress bar as each collection is migrated
- This typically takes 10-30 seconds

### 4. Verify Migration Success
- Look for green checkmarks next to each collection
- You should see "X items migrated successfully"
- All dashboard stats should update automatically

## After Migration

### Edit Your Content
1. Go to each section (Projects, Experience, etc.) in the admin panel
2. Click **"Edit"** to modify existing items
3. Click **"Add"** to create new items
4. Images can be uploaded directly or via URL

### Your Portfolio Will:
- Read from Firebase first
- Fall back to static files if Firestore is unavailable
- Update in real-time as you make changes
- Be fully manageable from the admin panel

## Data Structure Reference

### Projects
- `title` - Project name
- `description` - Detailed description
- `stack` - Array of technologies used
- `image` - Project image URL
- `githubUrl` - GitHub repository link
- `liveUrl` - Live demo URL (optional)
- `featured` - Pin to top
- `metric` - "Users", "Downloads", etc.

### Experience
- `organization` - Company/Organization name
- `role` - Job title
- `duration` - "Jun 2024 – Aug 2024"
- `type` - internship / freelance / full-time
- `summary` - Brief overview
- `highlights` - Key accomplishments
- `stack` - Technologies used

### Skills
- `label` - Category name
- `icon` - Emoji or text icon
- `color` - Hex color
- `skills` - Array of skill names with proficiency levels

### Freelance Clients
- `client` - Client name
- `category` - Type of work
- `summary` - Project overview
- `highlights` - Key results
- `stack` - Technologies used
- `link` - Portfolio/case study link

### Achievements
- `title` - Achievement name
- `organization` - Issuer/Organization
- `category` - academic / certification / leadership / community / competition
- `description` - Details about the achievement

## Troubleshooting

### Migration Fails
- **Check Firebase**: Go to Firebase Console and verify your project is active
- **Check `.env.local`**: Ensure all Firebase credentials are correct and complete
- **Check Firestore**: Make sure Firestore Database is initialized in your Firebase project
- **Network**: Ensure you have internet connectivity

### Data Doesn't Show Up
- Refresh the page after migration completes
- Check Firebase Console → Firestore → Collections
- Verify authentication is working (you should be signed in)

### Partial Migration
- If only some items migrated, there may be a network issue
- Click "Migrate Again" to retry (it will overwrite existing data)
- Check browser console for error messages

## Reverting to Static Data

If you need to go back to static data:
1. Delete the Firestore collections manually in Firebase Console
2. The app will automatically fall back to static files
3. Your static files are untouched in `/src/data/`

## Next Steps

1. ✅ Complete the migration
2. 📸 Upload better project images in each project
3. 📝 Add more details to your projects and experience
4. 🎨 Customize colors and styling per item
5. 📧 Monitor contact messages in the Messages section
6. 🔄 Keep your portfolio updated as you grow

---

**Questions?** Check the [Firebase Documentation](https://firebase.google.com/docs/firestore) or the ADMIN_SETUP.md file for more details.
