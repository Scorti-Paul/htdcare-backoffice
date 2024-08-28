import { GiftIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function List({ data }: any) {
  return (
    <>
      {data?.map((item: any) => (
        <div
          key={item._id}
          className="relative cat-card flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <GiftIcon className="h-10 w-10" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
            </div>
          </div>
          <div className="remove-btn">
            <TrashIcon className="h-6  w-6 text-red-600 bg-red-100 rounded-full p-1" />
          </div>
        </div>
      ))}
    </>
  );
}
