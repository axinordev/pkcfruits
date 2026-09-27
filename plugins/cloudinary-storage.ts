import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";
import { v2 as cloudinary } from "cloudinary";
import type { Plugin } from "payload";

const folder = "pkc-fruits";

function publicId(filename: string) {
  const name = filename.split(".").slice(0, -1).join(".") || filename;
  return `${folder}/${name}`;
}

const adapter: Adapter = () => ({
  name: "cloudinary",
  generateURL: ({ filename }) =>
    cloudinary.url(publicId(filename), {
      secure: true,
      resource_type: "image",
    }),
  handleUpload: async ({ file }) => {
    const options = {
      folder,
      public_id: file.filename.split(".").slice(0, -1).join("."),
      overwrite: true,
      resource_type: "image" as const,
    };
    if (file.tempFilePath) {
      await cloudinary.uploader.upload(file.tempFilePath, options);
      return;
    }
    if (file.buffer) {
      const dataUri = `data:${file.mimeType};base64,${file.buffer.toString("base64")}`;
      await cloudinary.uploader.upload(dataUri, options);
      return;
    }
    throw new Error("No file data provided for upload");
  },
  handleDelete: async ({ filename }) => {
    await cloudinary.uploader.destroy(publicId(filename), {
      resource_type: "image",
    });
  },
  staticHandler: (_req, { params }) => {
    const url = cloudinary.url(publicId(params.filename), {
      secure: true,
      resource_type: "image",
    });
    return Response.redirect(url, 302);
  },
});

export function cloudinaryStorage(): Plugin {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return cloudStoragePlugin({
    collections: {
      media: {
        adapter,
        disableLocalStorage: true,
        disablePayloadAccessControl: true,
        generateFileURL: ({ filename }) =>
          cloudinary.url(publicId(filename), {
            secure: true,
            resource_type: "image",
          }),
      },
    },
  });
}
