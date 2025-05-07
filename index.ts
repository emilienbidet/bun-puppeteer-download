import { serve } from "bun";
import puppeteer from "puppeteer";

console.log("Starting browser");
const browser = await puppeteer.launch();
console.log("Browser launched");
    
console.log("Starting server");
const server = serve({
    routes: {
        "/": async (req) => {
            const page = await browser.newPage();
            await page.setContent("<h1>Hello World</h1>");
            const pdfStream = await page.createPDFStream()
            return new Response(pdfStream, {
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "inline"
                }
            });
        }
    }
})

console.log(`Server running on ${server.url}`);