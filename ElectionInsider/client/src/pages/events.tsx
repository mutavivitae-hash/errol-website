import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-64 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Join us at one of our upcoming campaign events.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {events?.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardDescription>
                {format(new Date(event.date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
              </CardDescription>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Location: {event.location}</p>
              <p className="mt-2 text-muted-foreground">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
