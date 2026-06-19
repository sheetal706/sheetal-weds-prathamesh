import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

// Parse JSON bodies
app.use(express.json());

// Initialize RSVP file
async function ensureDataFileExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      // Create empty file with empty array
      await fs.writeFile(DATA_FILE, JSON.stringify([
        {
          id: "seed-1",
          name: "Ramesh & Shaila Patil",
          phone: "9876543210",
          attending: "yes",
          guestsCount: 4,
          foodPreference: "veg",
          blessing: "Congratulations! Wishing Sheethal & Prathamesh a lifetime of love, joy, and prosperity. God bless the beautiful couple! ಶೀತಲ್ ಮತ್ತು ಪ್ರಥಮೇಶ ಜೋಡಿಗೆ ಶುಭ ಹಾರೈಕೆಗಳು.",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "seed-2",
          name: "Dr. K. N. Kulkarni & Family",
          phone: "9448123456",
          attending: "yes",
          guestsCount: 2,
          foodPreference: "veg",
          blessing: "ಮದುವೆಯ ಶುಭ ಸಂದರ್ಭದಲ್ಲಿ ನವದಂಪತಿಗಳಿಗೆ ಶುಭ ಕೋರುತ್ತೇವೆ. ಸದಾ ಸುಖವಾಗಿ ಬಾಳಿ!",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ], null, 2));
    }
  } catch (error) {
    console.error("Error creating data directory/file:", error);
  }
}

// REST Endpoints
app.get("/api/rsvp", async (req, res) => {
  try {
    await ensureDataFileExists();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const rsvps = JSON.parse(data);
    
    // For general public, only return blessings (and omit PII like phone number)
    const publicBlessings = rsvps
      .filter((r: any) => r.blessing && r.blessing.trim().length > 0 && r.attending === "yes")
      .map((r: any) => ({
        id: r.id,
        name: r.name,
        blessing: r.blessing,
        createdAt: r.createdAt
      }));

    res.json(publicBlessings);
  } catch (error) {
    console.error("Error fetching rsvps:", error);
    res.status(500).json({ error: "Failed to fetch blessings" });
  }
});

// Admin endpoint to fetch full RSVPs (protected by basic password)
app.get("/api/admin/rsvps", async (req, res) => {
  const password = req.headers["x-admin-password"];
  if (password !== "sheethalwedsprathamesh") {
    return res.status(401).json({ error: "Unauthorized. Incorrect admin key." });
  }

  try {
    await ensureDataFileExists();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const rsvps = JSON.parse(data);
    res.json(rsvps);
  } catch (error) {
    console.error("Error fetching full RSVPs:", error);
    res.status(500).json({ error: "Failed to load RSVP reports" });
  }
});

// Post a new RSVP
app.post("/api/rsvp", async (req, res) => {
  const { name, phone, attending, guestsCount, foodPreference, blessing } = req.body;

  if (!name || !phone || !attending) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    await ensureDataFileExists();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const rsvps = JSON.parse(data);

    const newRsvp = {
      id: "rsvp-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestsCount: parseInt(guestsCount, 10) || 0,
      foodPreference: foodPreference || "not-applicable",
      blessing: (blessing || "").trim(),
      createdAt: new Date().toISOString()
    };

    rsvps.push(newRsvp);
    await fs.writeFile(DATA_FILE, JSON.stringify(rsvps, null, 2));

    res.status(201).json({ success: true, rsvp: newRsvp });
  } catch (error) {
    console.error("Error writing rsvp:", error);
    res.status(500).json({ error: "Could not submit your RSVP" });
  }
});

// Action to clear all RSVPs (Admin option during testing)
app.delete("/api/admin/rsvps", async (req, res) => {
  const password = req.headers["x-admin-password"];
  if (password !== "sheethalwedsprathamesh") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    res.json({ success: true, message: "Cleared all RSVP data successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset RSVP data" });
  }
});

async function startServer() {
  await ensureDataFileExists();

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
