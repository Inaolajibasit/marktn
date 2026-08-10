import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";
const builder = imageUrlBuilder({ projectId, dataset });
export const urlFor = (source: unknown) => builder.image(source as never);
