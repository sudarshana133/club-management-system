import React from "react"
interface propsDef{
    clubName:string
}
const ClubCard: React.FC<propsDef> = ({clubName}:{clubName:string})=>{
    return(
        <div className="w-60 bg-slate-700 h-70 rounded-lg p-4 flex flex-col items-center">
            <div className="flex justify-center items-center"><img className="rounded-lg" src="/i.jpeg" alt="" /></div>
            <div className="font-mono text-2xl text-white text-center">{clubName}</div>
        </div>
    )
}

export default ClubCard