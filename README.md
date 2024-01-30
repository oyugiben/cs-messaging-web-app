A scalable customer messaging platform designed to handle a high volume of customer inquiries for effective customer service. The application facilitates a streamlined communication process by allowing a team of agents to log in simultaneously and respond to incoming messages from customers.

## Getting Started 🏁

Follow these steps to set up and run the CS Messaging Web Application on your machine.

### Prerequisites 🛠️

Make sure you have the following installed on your machine:

- [Node.js and npm](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

Ensure mongodb is running on the default port `localhost:27017`

The project uses parse-server LTS version for the backend so be sure to check the compatibility for the resources mentioned above at https://github.com/parse-community/parse-server?tab=readme-ov-file#compatibility.

### Clone the Repository 📂

```bash
$ git clone https://github.com/oyugiben/cs-messaging-app.git
$ cd cs-messaging-web-app
```

### Configure Parse Server ⚙️

Check if there's any configuration needed for Parse Server. Go into the index.js file and define the parse config variables that will be used on your specific machine. You can do this by creating your own .env file or change them directly in the index.js file.

### Install Dependencies and Run 🪟

When running for the first time, Install dependencies first.

```bash
$ npm install $$ npm start
```

The frontend build files have already been compiled therefore, otherwise just run. The agent portal is exposed at `http:localhost:1337`.

```bash
$ npm start
```

## Additional Information ℹ️

If you have any issues or questions, please feel free to contact me at sirbensonoyugi@gmail.com
