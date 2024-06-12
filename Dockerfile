FROM node:20-buster-slim

WORKDIR /app

COPY . .

RUN apt-get update && \ 
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \ 
    libc6-dev \
    gnupg

RUN echo $SA_JSON > credentials.json

RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]
