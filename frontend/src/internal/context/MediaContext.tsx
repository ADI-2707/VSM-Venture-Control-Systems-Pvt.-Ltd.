"use client";

import { createContext, useContext, useReducer } from "react";

export type Media = {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
  createdAt: string;
};

type PageMediaMap = {
  [page: string]: string[];
};

type MediaState = {
  media: Media[];
  pageMedia: PageMediaMap;
};

type MediaAction =
  | { type: "UPLOAD_MEDIA"; payload: Media }
  | {
      type: "ASSIGN_MEDIA_TO_PAGE";
      payload: { page: string; mediaId: string };
    }
  | {
      type: "REMOVE_MEDIA_FROM_PAGE";
      payload: { page: string; mediaId: string };
    };


function mediaReducer(state: MediaState, action: MediaAction): MediaState {
  switch (action.type) {
    case "UPLOAD_MEDIA":
      return {
        ...state,
        media: [action.payload, ...state.media],
      };

    case "ASSIGN_MEDIA_TO_PAGE": {
      const { page, mediaId } = action.payload;
      const existing = state.pageMedia[page] || [];

      if (existing.includes(mediaId)) return state;

      return {
        ...state,
        pageMedia: {
          ...state.pageMedia,
          [page]: [...existing, mediaId],
        },
      };
    }

    case "REMOVE_MEDIA_FROM_PAGE": {
      const { page, mediaId } = action.payload;

      return {
        ...state,
        pageMedia: {
          ...state.pageMedia,
          [page]: (state.pageMedia[page] || []).filter(
            (id) => id !== mediaId
          ),
        },
      };
    }

    default:
      return state;
  }
}

const MediaContext = createContext<{
  state: MediaState;
  dispatch: React.Dispatch<MediaAction>;
} | null>(null);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mediaReducer, {
    media: [
      {
        id: "1",
        url: "/images/gallery/team/1.jfif",
        name: "team1.jpg",
        type: "image",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        url: "/images/gallery/team/2.jfif",
        name: "team2.jpg",
        type: "image",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        url: "/images/gallery/team/3.jfif",
        name: "team3.jpg",
        type: "image",
        createdAt: new Date().toISOString(),
      },
    ],
    pageMedia: {},
  });

  return (
    <MediaContext.Provider value={{ state, dispatch }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error("useMedia must be used within MediaProvider");
  return ctx;
}