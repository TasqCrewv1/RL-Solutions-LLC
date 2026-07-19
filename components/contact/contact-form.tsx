"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { services } from "@/lib/services";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      projectType: "",
      preferredContact: "either",
      message: "",
    },
  });

  const projectType = watch("projectType");
  const preferredContact = watch("preferredContact");

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Unable to submit form");
      }

      toast.success("Estimate request received", {
        description:
          "Thank you. RL Solutions will follow up using your preferred contact method.",
      });
      reset();
    } catch {
      toast.error("Something went wrong", {
        description: "Please call us or try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl bg-white p-6 ring-1 ring-foreground/10 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone ? (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            autoComplete="street-address"
            {...register("address")}
          />
          {errors.address ? (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectType">Project Type</Label>
          <Select
            value={projectType}
            onValueChange={(value) =>
              setValue("projectType", value ?? "", { shouldValidate: true })
            }
          >
            <SelectTrigger id="projectType" className="w-full">
              <SelectValue placeholder="Select a project type" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.slug} value={service.title}>
                  {service.title}
                </SelectItem>
              ))}
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType ? (
            <p className="text-sm text-destructive">
              {errors.projectType.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredContact">Preferred Contact Method</Label>
          <Select
            value={preferredContact}
            onValueChange={(value) =>
              setValue(
                "preferredContact",
                (value as ContactFormValues["preferredContact"]) ?? "either",
                { shouldValidate: true }
              )
            }
          >
            <SelectTrigger id="preferredContact" className="w-full">
              <SelectValue placeholder="Choose a method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="either">Either</SelectItem>
            </SelectContent>
          </Select>
          {errors.preferredContact ? (
            <p className="text-sm text-destructive">
              {errors.preferredContact.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project goals, timeline, and any details that matter."
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={submitting} className="h-11 w-full sm:w-auto">
        {submitting ? "Sending..." : "Request My Estimate"}
      </Button>
    </form>
  );
}
