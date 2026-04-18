export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  duration: string;
}

export const playlist: Song[] = [
  {
    id: "1",
    title: "Attention",
    artist: "Charlie Puth",
    url: "/music/Attention.mp3",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    duration: "3:31"
  },
  {
    id: "2",
    title: "FRIENDS",
    artist: "Marshmello & Anne-Marie",
    url: "/music/FRIENDS.mp3",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
    duration: "3:22"
  },
  {
    id: "3",
    title: "Heat Waves",
    artist: "Glass Animals",
    url: "/music/Heat Waves.mp3",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    duration: "3:58"
  },
  {
    id: "4",
    title: "Wannabe",
    artist: "ITZY",
    url: "/music/Wannabe.mp3",
    cover: "https://images.unsplash.com/photo-1459749411177-042180ce6742?w=300&h=300&fit=crop",
    duration: "3:11"
  },
  {
    id: "5",
    title: "positions",
    artist: "Ariana Grande",
    url: "/music/positions.mp3",
    cover: "https://images.unsplash.com/photo-1514525253344-a812ef9ee276?w=300&h=300&fit=crop",
    duration: "2:52"
  }
];
