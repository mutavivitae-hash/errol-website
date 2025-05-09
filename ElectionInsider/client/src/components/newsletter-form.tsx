import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertSubscriberSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function NewsletterForm() {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="flex gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          Subscribe
        </Button>
      </form>
    </Form>
  );
}
