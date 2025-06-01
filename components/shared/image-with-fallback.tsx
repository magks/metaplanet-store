'use client';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ImageWithFallback = ({
    fallbackSrc,
    ...props
}: {
    fallbackSrc: string | StaticImport;
} & React.ComponentProps<typeof Image> 
) => {
    const { src, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => { setImgSrc(fallbackSrc);}}
            onLoad={(result: React.SyntheticEvent<HTMLImageElement, Event>) => {
                // ignore linter 
                if (result.naturalWidth === 0) {
                    // Broken image
                    setImgSrc(fallbackSrc);
                }
            }}
        />
    );
};

export default ImageWithFallback;