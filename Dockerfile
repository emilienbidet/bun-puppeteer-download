FROM oven/bun:1.2.12

WORKDIR /app

COPY package.json .
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000
ENTRYPOINT ["bun", "run", "start"]
