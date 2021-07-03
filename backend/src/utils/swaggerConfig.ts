import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Node Careers",
      "x-logo": {
        url: "data:image/png;base64, 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",
        altText: "Api",
      },
      version: "0.0.1",
      description: "Careers's API documentation",
    },
    host: "localhost:80",
  },
  apis: [`*.apiInfo.yaml`],
};
const swaggerConfig = swaggerJSDoc(options);

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
