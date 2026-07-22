import Ssection from "@/app/components/Ssection";
const SsectionData = [
    {
        sparkl:"Every Step, A Statement.",
        title: "Iconic in Every Frame",
        desc : "Discover the timeless appeal of the Air Force 1 through a collection of carefully curated visuals. Every angle highlights its legendary silhouette, premium craftsmanship, and effortless versatility—capturing the details that have made it a lasting icon in sneaker culture",
        vid : "a10.webm",
        alignx: "right",
        aligny: "center",
    },
    {
        sparkl:"Engineered for everyday excellence.",
        title: "A Legacy Captured",
        desc : "Experience the Air Force 1 through a visual journey where every frame celebrates craftsmanship, timeless design, and enduring style. A collection that reflects the essence of an icon, one detail at a time.",
        vid : "a11.webm",
        alignx: "left",
        aligny: "center",
    },
    {
        sparkl:"Every Step, A Statement",
        title: "Iconic in Every Frame",
        desc : "More than a sneaker, the Air Force 1 is a symbol of enduring style. This collection highlights its refined details, bold character, and the craftsmanship behind one of the world's most recognizable silhouettes.",
        vid : "a14.webm",
        alignx: "right",
        aligny: "center",
    },
]
export default function BSsection(){
    return(
    <section id="shop-section" className="py-20 bg-white border-b border-slate-100">
        {SsectionData.map((item, index)=>(
          <Ssection key={index} sparkl={item.sparkl} title={item.title} desc={item.desc} vid ={item.vid} aligny={item.aligny} alignx={item.alignx}/>
        ))}
    </section>
    );
}