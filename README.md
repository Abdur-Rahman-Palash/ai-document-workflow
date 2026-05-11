# AI Document Workflow — MCP Platform

[![MCPize](https://mcpize.com/badge/@abdurrahmanpalashbd/ai-document-workflow)](https://mcpize.com/mcp/ai-document-workflow)

A scalable AI-native document workflow platform with a Node.js TypeScript MCP gateway and a Python FastAPI document engine.

## Connect via MCPize

Use this MCP server instantly with no local installation:

```bash
npx -y mcpize connect @abdurrahmanpalashbd/ai-document-workflow --client claude
```

Or connect at: **https://mcpize.com/mcp/ai-document-workflow**

## Overview

This repository implements a modular microservice architecture for AI-powered style-preserving document automation. It is designed for:

- CV/resume editing and ATS-friendly resume regeneration
- Contracts, invoices, proposals, and HR document workflows
- Template-based document generation and export to DOCX/PDF
- Intelligent content updates with section-aware modification

## Architecture

- `mcp-server/`: Node.js + TypeScript MCP gateway
- `python-document-engine/`: FastAPI document engine for DOCX/PDF analysis, reconstruction, update, and export
- `postgres`: relational storage for templates, version history, and metadata
- `redis`: queue backend for async workflow tasks

## Quick Start

```bash
make dev
make run
```

Or start the full stack:

```bash
make compose
```

Service endpoints:

- MCP gateway: `http://localhost:8080/mcp`
- Health: `http://localhost:8080/health`
- Python engine: `http://localhost:8000/health`

## Development Commands

- `make dev` — install Node dependencies for the MCP gateway
- `make test` — run Node unit tests
- `make lint` — lint the MCP gateway
- `make format` — format TypeScript code
- `make run` — start the MCP gateway locally
- `make compose` — bring up the full Docker stack
- `make clean` — remove local build artifacts

## Folder Structure

```
├── mcp-server/                     # Node.js TypeScript MCP gateway
│   ├── src/                        # gateway source code
│   ├── tests/                      # unit tests
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── python-document-engine/         # Python FastAPI document engine
│   ├── app.py
│   ├── pyproject.toml
│   └── Dockerfile
├── docker-compose.yml             # local stack orchestration
├── .env.example                   # development environment variables
├── Makefile
└── README.md
```

## Key MCP Tools

The gateway exposes the core document workflow tools:

- `analyze_document_style`
- `recreate_document`
- `update_document_content`
- `generate_document_from_template`
- `export_document`

These tools delegate document parsing, style extraction, rendering, and export logic to the Python service.

## Environment

Copy `.env.example` to `.env` and update secrets before running.

## Docker Compose

Start the full stack with:

```bash
docker compose up --build
```

## Notes

This repository scaffolds a production-ready architecture while keeping business logic outside the MCP gateway. The gateway is responsible for authentication, request orchestration, and service integration.

## License

MIT