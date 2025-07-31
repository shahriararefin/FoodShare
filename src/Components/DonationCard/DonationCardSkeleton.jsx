// src/components/DonationCard/DonationCardSkeleton.jsx

const DonationCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
      {/* Left side: text placeholders */}
      <div className="flex-grow space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      {/* Right side: status and button placeholders */}
      <div className="flex flex-col items-end gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-9 bg-gray-200 rounded w-32 mt-2"></div>
      </div>
    </div>
  );
};

export default DonationCardSkeleton;