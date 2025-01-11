import ImageInput from "@/components/ImageInput";

function TestPage() {
  return (
    <main
      className="self-start md:self-center w-[min(100%,_554px)] h-fit m-6 p-6 space-y-6 md:my-6
                  text-center text-primary bg-neutral shadow-md
                  shadow-primary/30 rounded-xl"
    >
      <ImageInput
        productId={1}
        updateImageUrl={(imageUrl) => console.log(imageUrl)}
      />
    </main>
  );
}

export default TestPage;
