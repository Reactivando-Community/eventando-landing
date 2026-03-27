export default function MarqueeDivider({ 
  text, 
  bgColor = "bg-yellow-400", 
  textColor = "text-black", 
  speed = "20s",
  rotate = false
}) {
  return (
    <div className={`w-full ${bgColor} border-y-4 border-black py-4 overflow-hidden flex whitespace-nowrap z-20 brutal-shadow-sm ${rotate ? 'transform -mt-2 mb-2 rotate-1' : 'relative'}`}>
      <div 
        className={`animate-marquee inline-flex flex-nowrap items-center font-black ${textColor} uppercase text-xl md:text-2xl tracking-widest`}
        style={{ animationDuration: speed }}
      >
        {Array(15).fill(text).join(" • ") + " • "}
      </div>
    </div>
  );
}
