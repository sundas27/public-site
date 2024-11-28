
// displayContent.tsx
"use client";

import React from "react";
import { Typography, Box, Paper } from "@mui/material";

interface Content {
  id: number;
  title: string;
  description: string;
  titleUpdatedAt: string | null;
  descriptionUpdatedAt: string | null;
}

interface ContentDisplayProps {
  content: Content;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>
          {content.title || "No Title"}
        </Typography>
        <Typography variant="body1">
          {content.description || "No Description"}
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Title Last Updated:{" "}
          {content.titleUpdatedAt
            ? new Date(content.titleUpdatedAt).toLocaleString()
            : "Never"}
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Description Last Updated:{" "}
          {content.descriptionUpdatedAt
            ? new Date(content.descriptionUpdatedAt).toLocaleString()
            : "Never"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ContentDisplay;