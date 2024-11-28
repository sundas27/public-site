"use client"; // Ensure this is a client component

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ContentDisplay from "./displayContent";
import { RealtimeChannel } from "@supabase/supabase-js";

// Define Content interface for type safety
interface Content {
  id: number;
  title: string;
  description: string;
  titleUpdatedAt: string | null;
  descriptionUpdatedAt: string | null;
}

interface ContentFetcherProps {
  initialContent: Content;
}

export const ContentFetcher: React.FC<ContentFetcherProps> = ({ initialContent }) => {
  const [content, setContent] = useState<Content | null>(initialContent);

  useEffect(() => {
    let channel: RealtimeChannel;

    // Set up real-time subscription
    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel("content_updates_" + Math.random()) // Unique channel name
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "content",
          },
          (payload) => {
            console.log("Received update:", payload);
            setContent(payload.new as Content); // Update content if the ID matches
          }
        )
        .subscribe((status) => {
          console.log("Subscription status:", status);
        });
    };

    setupRealtimeSubscription();

    // Cleanup on component unmount
    return () => {
      if (channel) {
        console.log("Unsubscribing from channel");
        channel.unsubscribe();
      }
    };
  }, []);

  return content ? <ContentDisplay content={content} /> : <div>Loading...</div>;
};
