import { container } from "tsyringe";

import IStorageProvider from "./models/IStorageProvider";
import DiskStorageProvider from "./implementations/DiskStorageProvider";
import S3StoregeProvider from "./implementations/S3StoregeProvider";
import upload from "@config/upload";

const providers = {
    disk: DiskStorageProvider,
    s3: S3StoregeProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    providers[upload.driver]
)
