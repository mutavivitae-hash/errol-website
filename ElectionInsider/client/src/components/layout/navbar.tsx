import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import mountainLogo from '@/assets/ERROL TREMOLADA.png';

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center px-2 py-1" style={{ height: "11rem" }}>
        <Link href="/">
          <a className="mr-2">
            <img 
              src={mountainLogo}
              alt="Errol Tremolada for North Bend City Council Position 4"
              style={{ height: "10rem" }}
            />
          </a>
        </Link>

        <div className="w-48 md:w-64 lg:w-80"></div>

        <div className="flex items-center ml-auto">
          <div className="flex gap-4 md:gap-6 mr-6">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a
                  className={cn(
                    "text-base md:text-lg font-bold transition-colors hover:text-primary",
                    location === href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>

          <Button 
            variant="secondary" 
            size="lg" 
            className="font-bold text-lg"
            asChild
          >
            <Link href="/contact">Get Involved</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}