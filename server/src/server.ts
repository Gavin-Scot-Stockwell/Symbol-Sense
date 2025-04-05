import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

import dotenv from 'dotenv';
dotenv.config();
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);

// 👇 Set up __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startApolloServer = async () => {
    try {
        await server.start();
        await db();  // Ensure this resolves successfully before starting the app
    } catch (error) {
        console.error("Error starting Apollo Server or DB connection:", error);
        process.exit(1);  // Exit if there's an error
    }

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server as any, {
        context: authenticateToken as any
    }));

    if (process.env.NODE_ENV === 'production') {
        // Serve static files from the client build folder
        app.use(express.static(path.join(__dirname, '../../client/dist')));

        // Fallback route to serve index.html for single-page apps
        app.get('*', (_req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });
    }

    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};

startApolloServer();
