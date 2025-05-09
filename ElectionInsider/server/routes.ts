import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertSubscriberSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const submission = insertContactSchema.parse(req.body);
      const result = await storage.createContactSubmission(submission);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriber = insertSubscriberSchema.parse(req.body);
      const result = await storage.createNewsletterSubscriber(subscriber);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Email already subscribed") {
          res.status(409).json({ message: error.message });
        } else {
          res.status(400).json({ message: fromZodError(error).message });
        }
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
