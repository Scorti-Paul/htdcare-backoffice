import Button from "./Button";

export default function DoubleButton({ buttonText, loading }: any) {
  return (
    <>
      <div className="px-4 md:flex md:justify-end mt-5">
        <div className="grid gap-3 md:w-1/2 md:grid-cols-2">
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
