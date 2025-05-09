import { 
  type ContactSubmission, 
  type InsertContactSubmission,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type Event,
  type AdminUser,
  type InsertAdminUser,
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
  getAllEvents(): Promise<Event[]>;

  // Admin methods
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;
  getAdmin(id: number): Promise<AdminUser | undefined>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;

  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  private events: Map<number, Event>;
  private admins: Map<number, AdminUser>;
  private currentId: number;
  public sessionStore: session.Store;

  constructor() {
    this.contactSubmissions = new Map();
    this.newsletterSubscribers = new Map();
    this.events = new Map();
    this.admins = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });

    // Add some sample events
    const sampleEvents: Event[] = [
      {
        id: this.currentId++,
        title: "Town Hall Meeting",
        date: new Date("2024-04-15T18:00:00"),
        location: "City Community Center",
        description: "Join us for an open discussion about local issues."
      },
      {
        id: this.currentId++,
        title: "Campaign Rally",
        date: new Date("2024-04-20T14:00:00"),
        location: "Central Park",
        description: "Come show your support and hear about our vision for the future."
      }
    ];

    sampleEvents.forEach(event => this.events.set(event.id, event));
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentId++;
    const newSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const existing = await this.getNewsletterSubscriberByEmail(subscriber.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = this.currentId++;
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id,
      createdAt: new Date()
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    return Array.from(this.newsletterSubscribers.values()).find(
      subscriber => subscriber.email === email
    );
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      a.date.getTime() - b.date.getTime()
    );
  }

  async createAdmin(admin: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentId++;
    const newAdmin: AdminUser = {
      id,
      email: admin.email,
      passwordHash: admin.password, // Note: In real implementation, this would be hashed
      isActive: true,
      createdAt: new Date()
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }

  async getAdmin(id: number): Promise<AdminUser | undefined> {
    return this.admins.get(id);
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.admins.values()).find(
      admin => admin.email === email
    );
  }
}

export const storage = new MemStorage();