import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const newsItems = [
  {
    title: "Campaign Kickoff Rally Draws Hundreds",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1718446534398-df2ee0018e0b",
    summary: "Jane Smith launched her congressional campaign with a powerful message of unity and progress."
  },
  {
    title: "New Education Initiative Announced",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    summary: "Candidate Smith unveils comprehensive plan to improve local schools and support teachers."
  },
  {
    title: "Community Leaders Endorse Campaign",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    summary: "Key community leaders announce their support for Jane Smith's congressional bid."
  }
];

export default function News() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Latest News</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Stay updated with the latest developments from our campaign.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {newsItems.map((item, index) => (
          <Card key={index}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-l-lg"
                />
              </div>
              <div className="md:col-span-2 flex flex-col justify-center p-6">
                <CardHeader className="p-0">
                  <CardDescription>{item.date}</CardDescription>
                  <CardTitle className="mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <p className="text-muted-foreground">{item.summary}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
