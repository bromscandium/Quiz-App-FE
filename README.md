# Quiz App FE

This guide explains how to set up and run the Quiz App frontend using Docker and Docker Compose.

## Commands

### Build Docker image

```bash
docker-compose build
```

### Run the app (dev mode)

```bash
docker-compose up
```

### Stop containers

```bash
docker-compose down
```

### Production mode

- Remove `volumes` from `docker-compose.yml`
- Change command to `npm start`
- Build and run:

```bash
docker-compose build
docker-compose up -d
```
