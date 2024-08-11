import React from "react";

interface PropsDef {
  clubName: string;
}

const ClubCard: React.FC<PropsDef> = ({ clubName }) => {
  return (
    <div className="w-full max-w-xs bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105">
      <div className="flex justify-center items-center mb-4">
        <img className="w-20 h-20 object-cover rounded-full border-4 border-teal-500" src="/i.jpg" alt={`${clubName} logo`} />
      </div>
      <div className="font-mono text-lg text-white text-center">
        {clubName}
      </div>
    </div>
  );
};

export default ClubCard;
