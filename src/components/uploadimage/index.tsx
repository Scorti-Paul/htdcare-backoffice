import defaultImg from "assets/images/defaultImage.jpg";
const UploadImage = ({ tempUrl, defaultImage }: any) => {
  return (
    <>
      <div className="flex items-center gap-5">
        <div className="border rounded-full p-1 h-44 w-44 mx-auto flex justify-center">
          <img
            src={tempUrl || defaultImage || defaultImg}
            alt=""
            className="max-w-full rounded-full"
          />
        </div>
        <div>
          <h3 className="text-darkBlue text-2xl font-medium">Upload your picture</h3>
          <p className="text-darkBlue/50 max-w-sm">For best results, use an image at least 600px by 600px in either .jpg or .png format</p>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
