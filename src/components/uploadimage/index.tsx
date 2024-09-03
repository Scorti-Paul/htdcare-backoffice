import defaultImg from "assets/images/defaultImage.jpg";
const UploadImage = ({ tempUrl, defaultImage, uploadHeaderText }: any) => {
  return (
    <>
      <div className="flex gap-5">
        <div className="border rounded-full p-1 h-44 w-44 mx-auto flex justify-center">
          <img
            src={tempUrl || defaultImage || defaultImg}
            alt=""
            className="max-w-full rounded-full"
          />
        </div>
        <div className="mt-4"> 
          <h3 className="text-darkBlue text-xl font-medium">{uploadHeaderText !== '' ? uploadHeaderText : 'Upload your picture'}</h3>
          <p className="text-darkBlue/50 max-w-sm text-sm">For best results, use an image at least 600px by 600px in either .jpg or .png format</p>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
