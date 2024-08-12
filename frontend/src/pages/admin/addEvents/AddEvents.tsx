import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { Input } from "../../../components/ui/input";
import { addEventFormSchema as formSchema } from "../../../schemas/addEventSchema";
import { getClubId } from "../../../utils/getclubid";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { formElements } from "../../../constants/addeventform";

export default function AddEvents() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const token = Cookies.get("token") as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      date: "",
      clubId: "",
      fee: "0",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const fee = Number(values.fee);
    let clubId = "";
    try {
      clubId = await getClubId(token);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error!",
        description: "Some error occurred",
        variant: "destructive",
      });
    }

    if (!clubId) {
      console.error("Failed to retrieve clubId");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/event/addEvent",
        {
          title: values.title,
          description: values.description,
          venue: values.venue,
          fees: fee,
          date: values.date,
          clubId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Required by authMiddleware
          },
        }
      );
      localStorage.removeItem("events");
      toast({
        title: "Success!",
        description: "Added event successfully",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while adding event!",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="m-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-md"
        >
          {formElements.map((formElement) => (
            <FormField
              control={form.control}
              name={formElement.name}
              key={formElement.labelName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-200">
                    {formElement.labelName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formElement.placeholder}
                      {...field}
                      type={formElement.type}
                      className="mt-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {/* todo -> get the value of event type from frontend */}
          <Select>
            <SelectTrigger className="w-full bg-gray-600 text-white">
              <SelectValue placeholder="Event type" />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectItem value="light">Solo Event</SelectItem>
              <SelectItem value="dark">Team Event</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
