FROM node:20-buster-slim

# Set working directory
WORKDIR /app

# Copy the application files into the container
COPY . .

RUN apt update && apt install -y python3 && npm install

EXPOSE 3000

# Set the default command to execute after the container starts
CMD ["sh", "-c", "echo \"$SA_JSON\" && echo \"$SA_JSON\" > credentials.json && ls -la && python3 -m json.tool < credentials.json && npm run start"]

