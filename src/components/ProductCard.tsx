import { ReactNode } from "react";

interface Props {
  headline: string;
  description: string;
  imgPath: string;
  icon: ReactNode;
}

function ProductCard({ headline, description, imgPath, icon }: Props) {
  return (
    <div className="group cursor-pointer overflow-hidden shadow-[0_0_3px_1px_white] rounded-xl">
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 transition-colors group-hover:bg-neutral/30"></div>
        <img
          className="min-w-full min-h-full object-cover"
          src={imgPath}
          alt=""
        />
      </div>
      <div className="relative p-6 space-y-4">
        <div className="flex gap-x-4">
          <div className="border-r-4 border-secondary"></div>
          <h2 className="text-2xl font-medium">{headline}</h2>
        </div>
        <p className="text-lg">{description}</p>
        <div className="absolute top-4 left-0 !mt-0 -translate-y-full w-full flex justify-center items-end">
          <div className="h-10 w-10 mb-4 overflow-hidden">
            <div className="w-full h-full bg-transparent rounded-bl-full shadow-[0_0_0_20px_#22273A]"></div>
          </div>
          <div className="bg-neutral h-fit p-4 pb-0 rounded-t-full transition-colors group-hover:text-secondary">
            {icon}
          </div>
          <div className="h-10 w-10 mb-4 overflow-hidden">
            <div className="w-full h-full bg-transparent rounded-br-full shadow-[0_0_0_20px_#22273A]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
