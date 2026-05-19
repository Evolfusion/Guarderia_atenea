export const useUploadFile = () => {

  const uploadFile = async (file) => {

    const cloudinaryData =
      new FormData();

    cloudinaryData.append(
      "file",
      file
    );

    cloudinaryData.append(
      "upload_preset",
      "guarderia_atenea"
    );

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxkdlvkdq/auto/upload",
      {
        method: "POST",
        body: cloudinaryData,
      }
    );

    const result =
      await response.json();

    return result.secure_url;

  };

  return {
    uploadFile
  };

};