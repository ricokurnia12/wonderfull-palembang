import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Trash2 ,Copy} from "lucide-react"; // adjust this import based on your icon lib

interface Photo {
  id: string | number;
  url?: string;
  title: string;
  description?: string;
}

interface CardImageProps {
  photo: Photo;
  setSelectedPhoto: (photo: Photo) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}

const CardImage: React.FC<CardImageProps> = ({
  photo,
  setSelectedPhoto,
  setDeleteDialogOpen,
}) => {
  return (
    <Card className="overflow-hidden">
        
      <div className="relative aspect-square cursor-pointer ">
        <Image
          src={`${process.env.PUBLIC_API_URL}${photo.url}`}
          alt={photo.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onClick={() => setSelectedPhoto(photo)}
          priority={false}
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base truncate">{photo.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {photo.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedPhoto(photo)}
        >
          View
        </Button>
        <Copy className="text-black top-2 right-2 w-4 h-4 bg-amber-950"/>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setSelectedPhoto(photo);
            setDeleteDialogOpen(true);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardImage;
