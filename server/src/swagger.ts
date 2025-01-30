import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import groupswagger from './routes/group/group.swagger.json';
import userswagger from './routes/user/user.swagger.json';
import chatswagger from './routes/chat/chat.swagger.json';

export const setupSwagger = (app: Express): void => {
  // Manually add tags to each operation
  const addTags = (swaggerFile: any, tag: string) => {
    Object.keys(swaggerFile.paths).forEach((path) => {
      Object.keys(swaggerFile.paths[path]).forEach((method) => {
        const operation = swaggerFile.paths[path][method];
        operation.tags = operation.tags || []; // Ensure tags exist
        operation.tags.push(tag); // Add the tag for each route
      });
    });
  };

  // Apply tags to each swagger file
  addTags(groupswagger, "Group");
  addTags(userswagger, "Users");
  addTags(chatswagger, "Chat");

  // Merge schemas from different Swagger files into a single object
  const mergeSchemas = (...schemas: any[]) => {
    const mergedSchemas: { [key: string]: any } = {};

    schemas.forEach((schema) => {
      if (schema.components && schema.components.schemas) {
        Object.keys(schema.components.schemas).forEach((key) => {
          if (!mergedSchemas[key]) {
            mergedSchemas[key] = schema.components.schemas[key];
          }
        });
      }
    });

    return mergedSchemas;
  };

  // Merge the schemas from all Swagger files
  const mergedSchemas = mergeSchemas(groupswagger, userswagger, chatswagger);

  // Resolve references and replace them in the paths
  const resolveRefs = (swaggerFile: any) => {
    if (swaggerFile && swaggerFile.paths) {
      Object.keys(swaggerFile.paths).forEach((path) => {
        Object.keys(swaggerFile.paths[path]).forEach((method) => {
          const operation = swaggerFile.paths[path][method];
          if (operation.parameters) {
            operation.parameters.forEach((param: any) => {
              if (param.$ref) {
                const refPath = param.$ref.replace('#/definitions/', '');
                param.schema = mergedSchemas[refPath] || param.schema;
                delete param.$ref; // Remove $ref after resolving
              }
            });
          }
        });
      });
    }
  };

  // Resolve refs for each Swagger file
  resolveRefs(groupswagger);
  resolveRefs(userswagger);
  resolveRefs(chatswagger);

  // Merge all Swagger files into a single Swagger document
  const swaggerDocument = {
    openapi: "3.0.0", // Use OpenAPI 3.0 (Swagger 3.0)
    info: {
      version: "1.0.0",
      title: "Learning Management System (Prince)",
      description: "Combined API Documentation for Courses, Users, Instructors, and Modules"
    },
    servers: [
      {
        url: "http://localhost:8000/api"
      }
    ],
    paths: {
      ...groupswagger.paths,
      ...userswagger.paths,
      ...chatswagger.paths,
    },
    components: {
      schemas: mergedSchemas,
    },
  };

  // Serve the combined Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
