import { container } from "tsyringe";

import ICacheProvider from "./CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "./CacheProvider/implementations/RedisCacheProvider";

import "./StorageProvider"
import "./MailTemplateProvider"
import "./MailProvider"

container.registerInstance<ICacheProvider>(
  "CacheProvider",
  container.resolve(RedisCacheProvider),
);
