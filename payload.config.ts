import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Awards } from "./collections/Awards";
import { Enquiries } from "./collections/Enquiries";
import { Gallery } from "./collections/Gallery";
import { Media } from "./collections/Media";
import { News } from "./collections/News";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { HomePage } from "./globals/HomePage";
import {
  AwardsPage,
  ContactPage,
  GalleryPage,
  NewsPage,
  ProductsPage,
} from "./globals/PageSettings";
import { seedSite } from "./lib/seed/seed-site";
import { cloudinaryStorage } from "./plugins/cloudinary-storage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  routes: {
    admin: "/axinor/administrate",
  },
  admin: {
    theme: "light",
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      // Replaces the default Payload favicon in the admin tab.
      icons: [
        {
          type: "image/jpeg",
          rel: "icon",
          url: "/axinor.jpeg",
        },
      ],
    },
    components: {
      beforeDashboard: ["@/components/admin/SeedDashboardButton#default"],
      graphics: {
        Logo: "@/components/admin/Logo#default",
      },
    },
  },
  collections: [Users, Media, Products, News, Gallery, Awards, Enquiries],
  globals: [
    HomePage,
    AboutPage,
    ProductsPage,
    AwardsPage,
    GalleryPage,
    NewsPage,
    ContactPage,
  ],
  plugins: [cloudinaryStorage()],
  endpoints: [
    {
      path: "/seed-site",
      method: "post",
      handler: async (req) => {
        if (!req.user)
          return Response.json(
            { message: "Sign in to seed content." },
            { status: 401 },
          );
        const result = await seedSite(req.payload);
        return Response.json(result);
      },
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
    connectOptions: {
      dbName: "pkc-fruits",
      serverSelectionTimeoutMS: 10000,
    },
  }),
  sharp,
});
