import { ImageAttributesEntry } from '../../interfaces/GraphQL/Image';

const imageTypeGuard = (
  image: any,
): image is { attributes: ImageAttributesEntry } => !!image?.attributes?.url;

const formatImages = (entries: unknown[]) => {
  if (Array.isArray(entries)) {
    return entries.map((entry) => {
      if (imageTypeGuard(entry)) {
        return entry.attributes;
      }

      throw Error('Wrong type of entries passed! Must be Image entries');
    });
  }

  throw Error('Entry must me array!');
};

export default formatImages;
