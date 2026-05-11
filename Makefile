.PHONY: help install dev test lint format run compose build clean

help:
	@echo "Available commands:"
	@echo "  make dev       Install Node dependencies for the MCP gateway"
	@echo "  make test      Run Node unit tests"
	@echo "  make lint      Lint the Node MCP gateway"
	@echo "  make format    Format the Node MCP gateway"
	@echo "  make run       Start the Node MCP gateway locally"
	@echo "  make compose   Build and start the full development stack"
	@echo "  make clean     Remove local build artifacts"

install:
	cd mcp-server && npm install

dev:
	cd mcp-server && npm install

test:
	cd mcp-server && npm test

lint:
	cd mcp-server && npm run lint

format:
	cd mcp-server && npm run format

run:
	cd mcp-server && npm run dev

compose:
	docker compose up --build

clean:
	rm -rf mcp-server/node_modules mcp-server/dist python-document-engine/__pycache__ __pycache__
