FROM node:20-buster-slim

# Set working directory
WORKDIR /app

# Copy the application files into the container
COPY . .

RUN npm install

EXPOSE 3000

# Set the default command to execute after the container starts
CMD ["sh", "-c", "echo \"$SA_JSON\"&& npm run start"]
