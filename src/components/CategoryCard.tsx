import { ReactNode } from "react";

interface Props {
  headline: string;
  description: string;
  imgPath: string;
  icon: ReactNode;
}

function CategoryCard({ headline, description, imgPath, icon }: Props) {
  return (
    <div className="group bg-neutral text-primary cursor-pointer overflow-hidden shadow-[0_0_16px_0px_black] rounded-xl">
      <div className="relative w-full h-[325px] sm:h-[350px] md:h-[375px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 transition-colors group-hover:bg-primary/30"></div>
        <img
          className="min-w-full min-h-full object-cover"
          src={imgPath}
          alt=""
        />
      </div>
      <div className="relative p-6 space-y-4">
        <div className="flex gap-x-4">
          <div className="border-r-4 border-accent"></div>
          <h2 className="text-lg md:text-2xl font-medium">{headline}</h2>
        </div>
        <p className="text-base md:text-xl">{description}</p>
        <div className="absolute top-4 left-0 !mt-0 -translate-y-full w-full flex justify-center items-end">
          <div className="h-6 w-6 md:h-10 md:w-10 mb-4 overflow-hidden">
            <div className="w-full h-full bg-transparent rounded-bl-full shadow-[0_0_0_20px_#f2f3f6]"></div>
          </div>
          <div className="w-24 md:!w-32 bg-neutral h-fit p-4 pb-0 rounded-t-full transition-colors group-hover:text-accent">
            {icon}
          </div>
          <div className="h-6 w-6 md:h-10 md:w-10 mb-4 overflow-hidden">
            <div className="w-full h-full bg-transparent rounded-br-full shadow-[0_0_0_20px_#f2f3f6]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
