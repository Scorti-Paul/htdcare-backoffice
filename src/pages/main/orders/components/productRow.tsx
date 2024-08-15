import Input from "components/Input";

export default function ProductRow({
  item,
  order,
  handleOnAgreedPriceChange,
  index,
}: any) {
  const {product} = item;
  return (
    <div className="flex space-x-5 pb-3 items-center flex-row">
      <div className="bg-gray-50 h-26  w-24 rounded-lg border p-4">
        <img src={product?.image} alt="product_image" className="h-26  w-24" />
      </div>
      <div className="flex  w-full justify-between">
        <div className="flex justfy-center flex-col">
          <span className="text-gray-600  font-extralight text-lg">
            {product?.name}{" "}
          </span>
          <span className="text-gray-400 font-extralight mt-1">
            {product?.description?.slice(0, 30)}
            {"... "}
          </span>
        </div>
        <div className="flex justify-center items-end flex-col">
          <span className="text-gray-800  font-extralight text-lg">
            GHS {item?.cost?.toFixed(2)}{" "}
          </span>
          <span className="text-gray-400 font-extralight mt-1">
            QTY: {item?.quantity} ({item?.unit})
          </span>
        </div>
        {order?.status === "pending" ? (
          <div className="flex justify-center items-end flex-col">
            <Input
              label="Agreed Price"
              name="costPrice"
              inputLength="small"
              type="number"
              field="input"
              value={product?.agreedPrice}
              onChange={(e) => handleOnAgreedPriceChange(e, index)}
              hasShowPassword="disable"
              required
              optionalLabel={true}
              placeholder="237.00"
              autoComplete="true"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
