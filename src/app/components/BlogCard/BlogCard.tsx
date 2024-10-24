import Image, { StaticImageData } from "next/image";

interface Props {
    image: StaticImageData,
    title: string,
    description: string,
    client: {
        name: string;
        avatar: StaticImageData;
        position: string;
    }
}

const BlogCard: React.FC<Props> = ({ 
    image, 
    title, 
    description, 
    client: { 
        name, 
        avatar, 
        position
    }}
) => {
    return (
        <div className="flex flex-col bg-tertiary rounded-2xl p-6">
            <Image 
                src={image} 
                alt={`${image}-img`}
                width={336}
                height={200}
                className="rounded-md w-full h-[200px] object-cover mb-6"
                />
            <p className="text-2xl text-secondary text-medium mb-3">{title}</p>
            <p className="text-main mb-3">{description}</p>
            <div className="flex items-center mt-3">
                <Image 
                    src={avatar} 
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-full" 
                />
                <div className="flex flex-col ml-3">
                    <p className="text-secondary font-bold">{name}</p>
                    <p className="text-secondary text-xs">{position}</p>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;