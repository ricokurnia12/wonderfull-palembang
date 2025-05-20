import { createImageUpload } from "novel";
import { toast } from "sonner";

const onUpload = (file: File) => {
  const promise = fetch("http://localhost:8080/api/photos", {
    method: "POST",
    body: (() => {
      const form = new FormData();
      form.append("photo", file);
      form.append("title", file.name); // opsional
      return form;
    })(),
  });

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {
        if (res.status === 200) {
          const { file_path } = await res.json();
          const url = `http://localhost:8080/api/${file_path}`;

          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
        } else {
          throw new Error("Upload gagal");
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          reject(e);
          return e.message;
        },
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
