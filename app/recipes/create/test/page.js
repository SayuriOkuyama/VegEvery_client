'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function page() {
  const [image, setImage] = useState(null)

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    setImage({
      file,
      preview: URL.createObjectURL(file),
    })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select image</p>
      </div>
      {image && (
        <div className="image-preview">
          <img src={image.preview} alt="Uploaded Image" />
        </div>
      )}
    </div>
  )
}
