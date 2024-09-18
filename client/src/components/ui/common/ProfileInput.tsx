import React, { FC, InputHTMLAttributes, useState } from "react";

interface ProfileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
// FIXME: image preview needs to be fixed
const ProfileInput: FC<ProfileInputProps> = React.forwardRef<
  HTMLInputElement,
  ProfileInputProps
>(function ({ error = "", ...props }, ref) {
  const [image, setImage] = useState("");

  console.log("image: ", image);
  // Taking file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log(event.target.files);
    console.log(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-full h-20 flex justify-center mb-2">
      <div className="w-20 h-full rounded-full border border-onPrimary overflow-hidden">
        <img
          src={
            image ||
            "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
          }
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <input
        type="file"
        ref={ref}
        className="absolute w-20 h-20 rounded-full bg-pink-100 top-[60%] opacity-0 cursor-pointer"
        onChange={handleFileChange}
        {...props}
      />
      {error && (
        <p className="absolute mt-1 text-[10px] font-sans font-light text-primary top-full left-[42%]">
          {error}
        </p>
      )}
    </div>
  );
});

export default ProfileInput;
