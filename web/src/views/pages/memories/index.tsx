import DomeGallery from "@/components/DomeGallery";

export function MemoriesPage(){
    return (
        <div className="p-6 h-full w-full rounded-[20px] ">
            {/* <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/> */}
            <DomeGallery />
        </div>
    )
}