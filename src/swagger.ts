import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "AdvancePay",
    description:
      "AdvancePay is a Loan platform that integrates employers and employees allowing users especially employers to borrow and loan money",
  },
  host: `localhost:${process.env.PORT || 8080}`,
  basePath: "/",
  schemes: ["http", "https"],
  servers: [
    {
      url: "http://localhost:3000/api/v1", // Replace with your actual base URL
      description: "Local Development Server",
    },
  ],
};

const outputFile = "./swagger-output.json";
// const endpointsFiles = ["src/routes/index.ts"];
const routes = [
  "./src/index.ts", // Your main app entry point where setupRoutes is called
  "./src/routes/index.ts",
];

const swaggerAutogenInstance = swaggerAutogen({ openapi: "3.0.0" });

swaggerAutogenInstance(outputFile, routes, doc)
  .then(() => {
    console.log("Swagger documentation generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating Swagger documentation:", err);
  });

// swaggerAutogen()(outputFile, endpointsFiles, doc);
