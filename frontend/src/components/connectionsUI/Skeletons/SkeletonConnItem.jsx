export default function SkeletonConnItem() {
    return (
      <div className="bg-light2 p-12 rounded-lg shadow-md animate-pulse space-y-3">
        {/* Header - User & Date */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
              <div className="h-3 w-16 bg-gray-300 rounded-md mt-1"></div>
            </div>
          </div>
        </div>
  
        {/* Title & Description */}
        <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-4 w-full bg-gray-300 rounded-md"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded-md"></div>
  
        {/* Location & Date */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-40 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
        </div>
  
        {/* Likes & Comments Count */}
        <div className="flex justify-end">
          <div className="flex items-center space-x-1 bg-dark text-light2 p-3 rounded-3xl">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-6 bg-gray-300 rounded-md"></div>
          </div>
        </div>
  
        {/* Comments Section */}
        <div className="space-y-3">
          <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
        </div>
  
        <div className="w-full flex justify-center">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }
  