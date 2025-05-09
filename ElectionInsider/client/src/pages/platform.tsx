import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const platformItems = [
  {
    title: "Economic Development",
    description: "Building a stronger local economy",
    details: [
      "Support small business growth through tax incentives",
      "Invest in workforce development programs",
      "Attract new industries to our region",
      "Create high-paying jobs in renewable energy"
    ]
  },
  {
    title: "Education",
    description: "Investing in our future",
    details: [
      "Increase funding for public schools",
      "Reduce class sizes",
      "Support teacher pay raises",
      "Expand early childhood education programs"
    ]
  },
  {
    title: "Healthcare",
    description: "Quality care for all",
    details: [
      "Lower prescription drug costs",
      "Protect coverage for pre-existing conditions",
      "Expand rural healthcare access",
      "Support mental health initiatives"
    ]
  },
  {
    title: "Infrastructure",
    description: "Building for tomorrow",
    details: [
      "Repair roads and bridges",
      "Expand public transportation",
      "Improve water systems",
      "Invest in renewable energy infrastructure"
    ]
  }
];

export default function Platform() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Our Platform</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A comprehensive plan for building a stronger, more prosperous community for all.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {platformItems.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
