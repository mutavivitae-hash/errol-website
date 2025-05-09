import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import errolImage from '@/assets/IMG_4875.jpg';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[url('https://flic.kr/p/2r1iAoj')] bg-cover bg-center py-32">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Leadership That Works For North Bend
            </h1>
            <p className="mt-6 text-xl">
              Join Errol Tremolada's campaign for a stronger, more prosperous future for North Bend.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" variant="default" className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/platform">Learn More</Link>
              </Button>
              <Button size="lg" variant="secondary" className="font-semibold bg-white text-gray-900 hover:bg-gray-100" asChild>
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <img
                src={errolImage}
                alt="Errol Tremolada"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Meet Errol Tremolada</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A dedicated resident of North Bend, Errol Tremolada has been committed to serving our community.
                With extensive experience in local governance and community organizing, he understands
                the unique challenges facing North Bend and has the expertise to address them effectively.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/platform">Read More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Issues */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Key Issues</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Local Business Growth",
                description: "Supporting our local businesses and attracting new opportunities to North Bend.",
              },
              {
                title: "Community Safety",
                description: "Ensuring North Bend remains a safe and welcoming community for all residents.",
              },
              {
                title: "Infrastructure",
                description: "Improving our roads, parks, and public spaces for better quality of life.",
              },
            ].map((issue, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{issue.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{issue.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">Join Our Campaign</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Together, we can make North Bend an even better place to live. Sign up for updates and learn how you can get involved.
          </p>
          <Button size="lg" variant="default" className="mt-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/contact">Get Involved</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}