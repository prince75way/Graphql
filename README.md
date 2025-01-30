# Chat App with GraphQL Subscriptions

## Overview

This is a real-time chat application built using **GraphQL**, **Express**, **MongoDB**, and **WebSockets**. It supports user authentication, sending and receiving messages, and real-time message updates using **GraphQL subscriptions**. The backend uses **Apollo Server** to manage GraphQL operations and **graphql-ws** to handle WebSocket connections for subscriptions.

---

## Features

- **User Authentication**: Login and signup using JWT tokens.
- **Chat System**: Send and receive messages in real time.
- **Real-Time Subscriptions**: Use GraphQL subscriptions to push updates to clients when new messages are sent.
- **WebSocket Support**: WebSocket connection for real-time messaging via `graphql-ws`.

---

## Tech Stack

- **Backend**: Node.js, Express, Apollo Server
- **Database**: MongoDB (Mongoose)
- **GraphQL**: Apollo Server, `graphql-ws` for WebSockets
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time**: GraphQL Subscriptions via `graphql-ws`
- **Logging**: Morgan

---

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB instance (locally or MongoDB Atlas)
- NPM or Yarn

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/chat-app.git
cd chat-app```


###2. Start Server

```bash nodemon```

###3 . Start Client
 ``` bash npm run dev```
