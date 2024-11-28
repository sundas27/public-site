import React from "react";
import { supabase } from "@/lib/supabaseClient";
import { ContentFetcher } from "./home";

const fetchContent = async () => {
  try {
  const { data, error } = await supabase.from("content").select("*").single();
  if (error) {
    console.log("Error fetching content:", error);
    return { content: {} }; 
  }
  return { content: data };
} catch(error) {
  
  console.log("Error fetching content:", error);
  return { content: {} }
}
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
