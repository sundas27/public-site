import React from "react";
import { supabase } from "@/lib/supabaseClient";
import { ContentFetcher } from "./home";

const fetchContent = async () => {
  const { data, error } = await supabase.from("content").select("*").single();
  if (error) {
    console.error("Error fetching content:", error);
    return { content: null }; // Return empty content on error
  }
  return { content: data };
};

// Server Component to fetch content
export default async function Home() {
  const { content } = await fetchContent();

  return (
    <div>
      {/* Pass content as prop to the ContentFetcher (Client Component) */}
      <ContentFetcher initialContent={content} />
    </div>
  );
}
