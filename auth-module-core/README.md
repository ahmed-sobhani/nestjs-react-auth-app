# NestJS Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/your/repository/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/your/repository/graphs/commit-activity)

## Description

Modern and scalable backend API built with [Nest](https://github.com/nestjs/nest) framework.

## Features

- 🔐 JWT Authentication & Authorization
- 📚 MongoDB Database Integration
- 📝 Swagger API Documentation
- 🔄 Refresh Token Rotation
- 🚫 Rate Limiting
- 🌍 Environment Configuration
- 🔍 Request Validation
- 🎯 Error Handling
- 📋 Logging System
- 🔒 Security Headers

## Prerequisites

```bash
node >= 18.x
npm >= 9.x
mongodb >= 6.x
```

## Installation

```bash
# Clone repository
$ git clone <repository-url>

# Install dependencies
$ npm install

# Create environment file
$ cp .env.sample .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## API Documentation

Swagger documentation is available at:
```
http://localhost:{PORT}/api
```

## Environment Variables

Create `.env` file from `.env.sample`:


## Available Commands

```bash
# Start application
$ npm run start        # Normal mode
$ npm run start:dev    # Watch mode
$ npm run start:debug  # Debug mode
$ npm run start:prod   # Production mode

# Build application
$ npm run build

# Generate new resource
$ npm run nest g resource [name]
```


## Environment Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Application port | 3000 |
| NODE_ENV | Environment mode | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/db |
| JWT_ACCESS_SECRET | JWT access token secret | - |
| JWT_ACCESS_EXPIRE | JWT access token expiration | 15m |
| JWT_REFRESH_SECRET | JWT refresh token secret | - |
| JWT_REFRESH_EXPIRE | JWT refresh token expiration | 7d |

## Security Implementations

- 🔒 Helmet middleware for security headers
- 🚫 Rate limiting protection
- 🔑 JWT token authentication
- 🔐 Password hashing
- ✅ Request validation
- 🛡️ MongoDB injection protection
- 🌐 CORS configuration

## Error Handling

Custom exception filters handle:
- HTTP Exceptions
- Validation Errors
- MongoDB Errors
- Unauthorized Access
- Rate Limit Exceeded

## Support

For support, email your team at `ahmad.sobhani@hotmail.com`

## Stay in touch

- Author - Ahmad Sobhani

## License

This project is [MIT licensed](LICENSE).
