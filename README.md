# YouTube Clone

A simple and responsive YouTube clone built with React and Tailwind CSS, powered by the [YouTube v3.1 API on RapidAPI](https://rapidapi.com/ytdlfree/api/youtube-v31).

## 🚀 Features

- **Home Page (`/`)**: Displays trending or popular videos.
- **Video Detail (`/video/:id`)**: View and play a selected video with details.
- **Channel Page (`/channel/:id`)**: View videos from a specific YouTube channel.
- **Search Page (`/search?q=keyword`)**: Search and display videos based on user queries.
- **Watch History (`/history`)**: View history of watched videos, stored in `localStorage`.

## 🛠️ Tech Stack

- **React**: Frontend framework
- **React Router DOM**: For SPA routing
- **Axios**: API requests
- **Tailwind CSS**: Utility-first CSS framework for styling
- **useState & useEffect**: For managing state and side effects
- **localStorage**: To persist watch history

## 🔐 API Integration

- Uses the [YouTube v3.1 API](https://rapidapi.com/ytdlfree/api/youtube-v31) from RapidAPI
- API Key must be stored in a `.env` file using:

  ```env
  VITE_API_KEY=your_rapidapi_key_here
## Getting Started

**Clone the repository**

   ```bash
   git clone https://github.com/shashankktiwarii3/youtube-clone-reactjs
   cd youtube-clone
   vite build
   npm run dev
