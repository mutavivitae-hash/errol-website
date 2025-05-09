import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import NewsletterForm from "@/components/newsletter-form";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="mt-4 flex justify-center lg:justify-start gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>


        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Errol Tremolada for North Bend City Council. All rights reserved.</p>
          <p className="mt-1">Paid for by Errol Tremolada for City Council Committee</p>
        </div>
      </div>
    </footer>
  );
}