import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node Careers",
      "x-logo": {
        url: "http://localhost/Careers%20API.png",
        altText: "Api",
      },
      version: "0.0.1",
      basePath: "/",
      description: "Careers's API documentation",
    },
    servers: [{ url: "localhost:80", description: "Development server" }],
  },
  apis: [`*src/utils/api.yaml`],
};
const swaggerConfig = swaggerJSDoc(options);
console.log(swaggerConfig);

export const htmlReDoc = Buffer.from(`<!DOCTYPE html>
<html>
  <head>
    <title>API Docs</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style> body { margin: 0; padding: 0; } </style>
  </head>
  <body>
    <redoc spec-url="http://localhost:80/swagger.json" expand-responses="all"></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
  </body>
</html>`);

export default swaggerConfig;
