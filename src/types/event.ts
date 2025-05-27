export interface Event {
  id: number;
  title: string;
  description: string;
  content: string;
  englishcontent: string;
  date: string;
  location: string;
  province: string;
  category: string;
  image: string;
  featured?: boolean;
  map_url:string
}
