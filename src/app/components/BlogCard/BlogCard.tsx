import { Client } from "@/app/types/Client.type";
import { Link } from "@/i18n/routing";
import Image, { StaticImageData } from "next/image";
import avatarImg from '../../../../public/avatar.png'

interface Props {
    id: number
    image: StaticImageData,
    title: string,
    description: string,
    client: Client;
    isBackground: boolean;
}

const BlogCard: React.FC<Props> = ({ 
    id,
    image, 
    title, 
    description, 
    client: { 
        name, 
        avatar, 
        position
    },
    isBackground
}) => {
    return (
        <Link href={`/blog/${id}`}>
            <div className={`flex flex-col justify-between ${isBackground ? 'bg-tertiary' : 'bg-white'} rounded-2xl p-6 h-[605px]`}>
                <div>
                    <Image 
                        src={image} 
                        alt={`${image}-img`}
                        width={336}
                        height={200}
                        className="rounded-md w-full h-[200px] object-cover mb-6"
                        />
                    <p className="text-lg lg:text-2xl text-secondary text-medium mb-3">{title}</p>
                    <p className="text-main mb-3">{description}</p>
                </div>
                <div className="flex items-center mt-3">
                    <Image 
                        src={avatarImg} 
                        // src={avatar} 
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
        </Link>
    )
}

export default BlogCard;