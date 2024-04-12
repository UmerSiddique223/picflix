import Image from "next/image";

const PostCard = ({ source }) => {
    return (
        <div className="bg-card rounded-3xl border border-border p-5 lg:p-7 w-full max-w-screen-sm">
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                    <Image
                        src="/images/hq720.jpg"
                        alt="creator"
                        className="w-12 h-12 rounded-full"
                        width={48}
                        height={48}
                    />

                    <div className="flex flex-col">
                        <p className="text-base font-medium lg:font-bold">
                            Maaz Ahmad
                        </p>
                        <div className="flex-center gap-2">
                            <p className="text-xs font-semibold  lg:small-regular ">
                                24-2-2024
                            </p>
                            •
                            <p className="text-xs font-semibold  lg:small-regular">
                                Kachupura
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <img
                src={source}
                alt="post image"
                className="h-64 sm:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5"
            />

            {/* <PostStats post={post} userId={user.id} /> */}
        </div>
    );
};

export default PostCard;
