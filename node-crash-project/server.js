import http from "http";
import fs from "fs/promises";
import url, { pathToFileURL } from "url";
import path, { dirname } from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`File name: ${__filename}`);
console.log(`Dir name: ${__dirname}`);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Not Found");
      }
      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed!!");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
});
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
