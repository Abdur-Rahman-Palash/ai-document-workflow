FROM node:20-alpine

WORKDIR /app/mcp-server

COPY mcp-server/package.json mcp-server/package-lock.json ./
RUN npm ci --production && npm ci --only=dev

COPY mcp-server/tsconfig.json ./
COPY mcp-server/src ./src

RUN npm run build

EXPOSE 8000
ENV PORT=8000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
