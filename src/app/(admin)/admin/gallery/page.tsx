import React, { Suspense } from "react";
import { GalleryDashboard } from "./gallery";

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          </div>
        }
      >
        {" "}
        <GalleryDashboard />
      </Suspense>
    </div>
  );
};

export default page;
