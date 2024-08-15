import defaultImg from "assets/images/defaultImage.jpg";
const UploadImage = ({ tempUrl, defaultImage }: any) => {
  return (
    <>
      <div className="border rounded-md p-4 h-60 mx-auto flex justify-center">
        <img
          src={tempUrl || defaultImage || defaultImg}
          alt=""
          className="max-w-full"
        />
      </div>
    </>
  );
};

export default UploadImage;
