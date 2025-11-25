import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const LazyImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
        };
    }, [src]);

    return (
        <>
            {isLoading && (
                <div className={`${className} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse`} />
            )}
            {imageSrc && (
                <LazyLoadImage
                    src={imageSrc}
                    alt={alt}
                    className={`${className} ${isLoading ? 'hidden' : 'block'}`}
                    loading="lazy"
                />
            )}
        </>
    );
}