## Inventory Application (Musical Instruments)

A Node.js inventory management app for a musical instruments store, built with Express, EJS templates, and PostgreSQL.

## Live Demo

The app is deployed on Render using a Supabase PostgreSQL database:

[View Inventory App on Render](https://inventory-management-app-jb4e.onrender.com)

## Features

Categories & Items

Musical instrument categories: Strings, Percussion, Keyboards, Wind Instruments.

Items belong to categories.

### Full CRUD support for both categories and items:

Create: Add new category or item.

Read: View categories and items in each category.

Update: Edit category or item details.

Delete: Remove categories (only if no items exist) or items.

### Validation

Basic validation for item fields (e.g., name, price, quantity).

Prevent deleting categories with items (foreign key ON DELETE RESTRICT).

### Search & Filtering (optional in future)

Can be extended to filter items by category, brand, or name.

## File Overview

app.js – main server file. Loads routes and starts Express server.

models/ – contains categoriesModel.js and itemsModel.js for database operations.

controllers/ – contains categoriesController.js and itemsController.js for handling routes.

views/ – EJS templates for displaying categories and items.

routes/ – Express routers for categories and items.

### Database

Local Development: connect to local PostgreSQL (inventory_app)

Production: connected to Supabase Postgres via environment variable DATABASE_URL.