"use client"
import Image from "next/image";
import { useState } from "react";
import 'dotenv/config'
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";


const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function Home() {

  const [file, setFile] = useState<File | null>(null);

  const [base64, setBase64] = useState<string | null>(null);

  const [text, setText] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // Convert the file to base64
    const base64 = await toBase64(file as File);

    setBase64(base64 as string);

    try {
      // Send a POST request
      let result = await axios({
        method: 'post',
        url: process.env.API_ENDPOINT,
        data: {
          base64Image: base64,
        }
      });
      setText(result.data.text as string);
    } 
    catch( e:any ) {
      console.log(e);
    }

    setFile(null);
    setBase64(null);
  };


  return (
    <div>
      <h1>Upload Image</h1>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={onFileChange}
          onClick={onClick}
        />
        <button type="submit">Upload</button>
      </form>
      {base64 && (
        <Image src={base64} width={300} height={400} alt="Uploaded Image" />
      )}    
      {text && (
        <Textarea placeholder={text} />
      )}    


    </div>
  )
}
