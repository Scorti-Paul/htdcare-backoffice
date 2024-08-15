import { UserIcon } from "@heroicons/react/24/outline";

export default function FarmerCard({ farmer }: { farmer: any }) {
  return (
    <div className="flex gap-5 border rounded-sm items-center px-5 py-3">
      <div className="rounded-full p-2 bg-green-50">
        <UserIcon className="w-8 text-green-600" />
      </div>
      <div className="flex flex-col">
        <span className="text-base text-black">
          {farmer.firstName} {farmer.surname}
        </span>
        <span className="text-xs">
          {farmer?.farmLocation?.district} - {farmer?.region}
        </span>
        <span className="text-xs">{farmer?.phone}</span>
      </div>
    </div>
  );
}
