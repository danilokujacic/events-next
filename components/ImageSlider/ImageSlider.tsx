import Image from 'next/image';
import { FunctionComponent, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import formatImages from '../../utils/GraphQL/formatImages';
import URLBuilder from '../../helpers/imageUrlBuilder';
import { ImageAttributesEntry, ImageEntry } from '../../interfaces/GraphQL/Image';

interface IImageSider {
  imageEntry: ImageEntry;
}

const ImageSlider: FunctionComponent<IImageSider> = ({ imageEntry }) => {
  const [images, setImages] = useState<ImageAttributesEntry[]>();
  useEffect(() => {
    if (imageEntry) {
      setImages(formatImages(imageEntry.data));
    }
  }, [imageEntry]);

  if (!images) {
    return <></>;
  }

  return (
    <Carousel>
      {images.map((image) => (
        <Carousel.Item key={image.name}>
          <Image src={URLBuilder(image.url)} layout='fill' />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
