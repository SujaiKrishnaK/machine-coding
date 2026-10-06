import React, { useState } from "react";

const FileUpload = (formData) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const uploadFile = async (formData) => {
    try {
      const response = await fetch(`https://httpbun.com/post`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        setError(`Error - ${response.status}`);
      }
      const res = await response.json();
    } catch (error) {
      setError(error.message);
    }
  };
  const upload = (e) => {
    let files = e.target.files;
    setFile([...files]);
    let formData = new FormData();
    formData.append("files", files);

    uploadFile(formData);
  };
  return (
    <div className="bg-black text-amber-50 h-screen justify-center flex items-center flex-col gap-5">
      {error && <p className="">{error}</p>}
      <input
        type="file"
        className="border-2 text-[red] p-2"
        onChange={upload}
        multiple
      ></input>
      <div className="grid grid-rows-3 grid-cols-3 gap-5">
        {file?.length > 0 &&
          file?.map((file) => (
            <>
              <span className="border p-2">Name: {file && file.name}</span>
              <span className="border p-2">Type: {file && file.type}</span>
              <span className="border p-2">
                Size: {file && (file.size / 1024).toFixed(2)}
              </span>
            </>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
