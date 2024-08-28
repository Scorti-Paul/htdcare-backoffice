import Button from "./Button";

export default function DoubleButton({ buttonText, loading }: any) {
  return (
    <>
      <div className="md:flex md:justify-end mt-5 mb-3 mr-1">
        <div className="">
          <Button
            type="primary"
            path=""
            loading={loading}
            hasIcon={false}
            onClick={() => null}
            text={buttonText}
          />
        </div>
      </div>
    </>
  );
}
