# Bun Puppeteer Docker Installation Bug

This repository demonstrates a bug when installing Puppeteer in a Docker container using Bun.

## The Issue

When building a Docker image with Bun and Puppeteer, the build process gets stuck during the `bun install` step, specifically when Puppeteer attempts to install Chrome via its postinstall script.

The installation appears to hang indefinitely, resulting in build failures.

## Reproduction Steps

1. Clone this repository
2. Run `docker compose up`
3. Observe that the build gets stuck with output similar to:
```
 => [html-to-pdf 4/5] RUN bun install --frozen-lockfile                      112.8s
 => => # bun install v1.2.12 (32a47ae4)                                            
 => => # Resolving dependencies                                                    
 => => # Resolved, downloaded and extracted [396]                                  
 => => # warn: puppeteer's postinstall cost you 30.7s                              
 => => # warn: puppeteer's postinstall cost you 1m773.5ms                          
 => => # warn: puppeteer's postinstall cost you 1m30.7s
 ...
```

## Local Development

Importantly, the application works correctly when run locally:

1. Run `bun install` (successfully installs Puppeteer and Chrome)
2. Run `bun start` (starts the application)
3. Navigate to `localhost:3000` in your browser

This confirms that the issue is specific to the Docker environment.

## Environment Details

- Bun version: 1.2.12
- Puppeteer version: 24.8.1
- Docker base image: `oven/bun:1.2.12`

## Possible Workarounds

1. **Install Chrome separately**: Instead of letting Puppeteer install Chrome, install it manually in the Dockerfile.

2. **Use the `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` environment variable**: Set this in your Dockerfile to skip the Chrome download during installation, then install Chrome separately.

3. **Use a pre-built image with Chrome**: Use a Docker image that already includes Chrome.

4. **Use Node.js instead of Bun**: If your project allows it, switching to Node.js might resolve this issue.

## File Structure

- `Dockerfile`: Simple Dockerfile using Bun with Puppeteer
- `package.json`: Project dependencies including Puppeteer
- `index.ts`: Example code using Puppeteer
- `compose.yml`: Docker Compose configuration

## License

MIT
