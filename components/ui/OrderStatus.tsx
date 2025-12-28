import clsx from "clsx";

interface StatusPillProps {
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export const OrderStatusPill = ({ status }: StatusPillProps) => {
  let colorClass = "";

  // Mapping status to the light green/red seen in the image
  switch (status) {
    case 'Processing':
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case 'Shipped':
    case 'Delivered':
      // The light green color from the image
      colorClass = "bg-green-100 text-green-800"; 
      break;
    case 'Cancelled':
      colorClass = "bg-red-100 text-red-800";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800";
  }

  return (
    <div className={clsx("inline-flex px-3 py-1 text-xs font-medium rounded-full", colorClass)}>
      {status}
    </div>
  );
};