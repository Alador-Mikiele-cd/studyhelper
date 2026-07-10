export default function onBoarding(){
    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-gray-500 font-sans dark:bg-black">
        <main className=" w-full max-w-3xl flex-col items-center justify-between py-32 px-16 ">
            <div className=" flex  flex-col items-center justify-center gap-5 bg-white py-[40px]"> 
                 <button className="border-black border-2 px-[30px] py-[10px]"> Natural science</button>
                 <button className="border-black border-2 px-[30px] py-[10px]"> Socail science</button>
            </div>
        </main>
        </div>

    )
}