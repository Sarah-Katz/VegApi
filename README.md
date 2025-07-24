# Vegan Recipe API

Welcome to the Vegan Recipe API! This project provides a RESTful API for accessing a collection of vegan recipes from [this GitHub repository](https://github.com/aklipf/vegan-recipes/tree/main). and make them available to fetch in a normalized Json

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- Fetch vegan recipes from [this GitHub repository](https://github.com/aklipf/vegan-recipes/tree/main) by aklipf.
- Store recipes in a local SQLite database.
- Retrieve recipes via a RESTful API.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Sarah-Katz/VegApi.git
    cd vegapi
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your GitHub personal Access Token:

    ```plaintext
    GITHUB_TOKEN=your_github_token_here
    ```

4. **Initialize the database:**

    The database will be automatically initialized when you run the application.

## Usage

1. **Start the server:**

    ```bash
    npm run server
    ```

2. **Fetch and store recipes:**

    To fetch recipes from the GitHub repository and store them in the database, run:

    ```bash
    npm run fetch-recipes
    ```

3. **Access the API:**

    The API will be available at `http://localhost:3000`.

## API Endpoints

- **GET /recipes**: Retrieve all recipes.
- **GET /recipes/:id**: Retrieve a specific recipe by ID.

## Exemple Data

Here is a quick exemple of the data to expect:

```json
{
    "id": 0,
    "title": "string",
    "description": "string",
    "authors": [],
    "tags": [],
    "ingredients": [],
    "image": "string",
    "cookingTime": "string",
    "instructions": "string"
}
```
