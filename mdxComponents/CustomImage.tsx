import Image, { type ImageProps } from "next/image";

export default function CustomImage(props: ImageProps) {
  return <Image {...props} />;
}
