import Image from "next/image";

export default function BannerHomePage() {
  return (
    <div className="w-full px-5 mt-5">
      <Image
        src="/Banner-Hero.svg"
        alt="Agende nos melhores com FSW Barber"
        width={100}
        height={100}
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}
