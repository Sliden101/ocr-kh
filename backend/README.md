# Express Production Template

This template provides a robust starting point for Express-based API development suitable for production environments. Utilizing file-based routing, advanced error handling, and TypeScript support, it streamlines the development process while ensuring scalability and maintainability.

# Features

-   **File-Based Routing:** Each file represents an endpoint, organizing routes by their respective HTTP methods.
-   **Dynamic Routing:** Easily handle dynamic segments in your URLs, allowing for flexible endpoint definitions.
-   **Prehandlers and Validations:** Implement pre-route logic and validate request bodies, headers, and parameters to ensure data integrity.
-   **Advanced Error Handling:** Utilize a comprehensive error system capable of reporting multiple issues simultaneously for improved debugging and client feedback.
-   **Prisma Database Integration:** Leverage Prisma for efficient and manageable database operations, including migrations and schema definitions.
-   **TypeScript Support:** Benefit from the safety and developer experience improvements offered by TypeScript.

# Installation Steps

```sh
# Clone the repository and cd into it
git clone https://github.com/JustArtiom/backend-express-template
cd backend-express-template

# Install the dependencies
npm install

# Initialise the database
npm run db:migrate

# Start the development as a developer
npm run dev
# or build then start it manually
npm run build
npm start
```

# Usage

Your API endpoints are defined within the routes directory. Each file represents a unique endpoint, with the file name indicating the path and method. For example, posts.get.ts would define a GET request handler for the /posts endpoint.

## Defining Endpoints

Endpoints are defined as follows: Click [here](src/routes/get.ts) to view the example

## Dynamic Routing

For dynamic segments in your route, name your file with the dynamic part enclosed in square brackets. For example, [postId].get.ts handles GET requests to /posts/:postId. Take a look an an example [here](src/routes/example/[dynamic_route].get.ts)

# Error interface

All errors adhere to the following interface, providing detailed feedback for troubleshooting:

```ts
interface APIErrorResponse {
    code: number;
    errors: {
        code: string;
        status: number;
        message: string;
    }[];
}
```

View [this file](src/routes/example/errors.get.ts) to get a better understanding of how the errors are beeing thrown

# Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. Feel free to make a pr, or open a new issue

# License

Distributed under the MIT License. See LICENSE for more information.

# Contact & Credit

Made by Artiom :D  
**Instagram:** [@im_artiom](https://instagram.com/im_artiom)  
**Discord:** [@im.artiom](https://discord.com/users/526191240962768910)  
**Github:** [JustArtiom](https://github.com/JustArtiom)

**Project Link:** https://github.com/JustArtiom/backend-express-template
