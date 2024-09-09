import React, { memo, useState } from 'react'
import { IProductItemInterface } from '../../libs/types/types'
import { Link } from 'react-router-dom'

const ProductCard: React.FC<{ product: IProductItemInterface, innerRef?: React.Ref<HTMLParagraphElement>; }> = memo(({ product, innerRef }) => {
    const [imgUrl, setImgUrl] = useState(product.thumbnailUrl)
    return (
        <Link to={`/product/${product.id}`} key={product.id}>
            <div ref={innerRef} className="border p-4 rounded shadow-md">
                <div className='relative'>
                    <img
                        src={imgUrl}
                        alt={product.title}
                        className="w-full h-auto rounded"
                        loading="lazy"
                        width={150}
                        height={150}
                        onError={() => setImgUrl("https://via.placeholder.com/150/5e12c6")}
                    />
                    <span className='absolute top-5 left-5 px-2 py-0.5 bg-white text-black font-semibold rounded-sm'>Product Id: {product.id}</span>
                    <span className='absolute top-5 right-5 px-2 py-0.5 bg-white text-black font-semibold rounded-sm'>Album Id: {product.albumId}</span>
                </div>
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            </div>
        </Link>
    )
})

export default ProductCard