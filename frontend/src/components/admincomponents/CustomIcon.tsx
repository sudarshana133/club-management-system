import { PlusCircle, Sparkle, Users } from "lucide-react";

export const AddMember = () => {
  return (
    <div className="relative mr-2">
      <Users className="" />
      <PlusCircle
        className="absolute right-[-10px] top-[-12px] md:top-[-10px] md:right-[-5px] w-4 h-4 text-teal-500"
      />
    </div>
  );
};
export const AIIcon = ()=> {
  return (
    <div className="relative">
      <Sparkle size={13} className="absolute top-[-4px] right-[-1px]"/>
      <Sparkle size={21} className="mr-[4.5px]"/>
      <Sparkle size={13} className="absolute bottom-[-4px] right-[-1px]"/>
    </div>
  )
}
