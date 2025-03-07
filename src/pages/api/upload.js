import formidable from "formidable";
import { readFileSync } from "fs";

// Next.js not to parse the body as JSON
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    // Parse the multipart form data
    const form = formidable();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Get the file
    const file = Array.isArray(files.bankStatement)
      ? files.bankStatement[0]
      : files.bankStatement;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Read the file content
    const fileContent = readFileSync(file.filepath || file.path);

    // Create a new FormData
    const formData = new FormData();

    // Create a Blob from the file content
    const blob = new Blob([fileContent], { type: "application/pdf" });
    formData.append("bankStatement", blob, file.originalFilename || file.name);

    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error:", error);
    if (error.code === "ECONNREFUSED") {
      res.status(503).json({ error: "Cannot connect to upload service" });
    } else {
      res.status(500).json({ error: "Failed to upload file" });
    }
  }
}
