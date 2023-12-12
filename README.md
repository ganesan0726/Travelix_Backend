# Travel API

This Node.js application, built with Express.js and MySQL, serves as an API for managing travel destinations and hotel lists.

## Features

- **Destinations:**
  - Add new destinations: `POST /api/upload/destination`
  - Retrieve destination information: `GET /api/list/destination`
  - Delete a destination by ID: `DELETE /api/delete/destination/:id`

- **Hotel Lists:**
  - Add new hotel lists: `POST /api/upload/hotelLists`
  - Retrieve hotel lists: `GET /api/list/hotelLists`
  - Delete a hotel list by ID: `DELETE /api/delete/hotelLists/:id`

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
