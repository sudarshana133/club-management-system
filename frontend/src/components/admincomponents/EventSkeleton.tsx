import { Skeleton } from "../ui/skeleton";

const EventSkeleton = () => {
  return (
    <div className="border border-gray-700 p-6 rounded-lg cursor-pointer hover:shadow-lg hover:border-teal-400 transition-shadow duration-200 ease-in-out bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-300 capitalize">
          <Skeleton className="w-32 h-6" />
        </h2>
        <div className="flex space-x-2">
          <Skeleton className="p-2 flex items-center rounded-full border border-white w-10 h-10" />
          <Skeleton className="p-2 rounded w-14 h-8" />
          <Skeleton className="p-2 rounded w-14 h-8" />
        </div>
      </div>
      <Skeleton className="mb-4 w-full h-24" />
      <div className="flex justify-between items-center text-gray-500 relative">
        <span className="flex-1 text-left">
          <Skeleton className="w-20 h-4" />
        </span>
        <span className="flex-1 text-center">
          <Skeleton className="w-28 h-4" />
        </span>
        <span className="absolute right-0 bot0">
          <Skeleton className="w-20 h-6" />
        </span>
      </div>
    </div>
  );
};

export default EventSkeleton;
