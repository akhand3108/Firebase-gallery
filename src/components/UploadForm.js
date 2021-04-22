import { useState } from "react"
import ProgressBar from "./ProgressBar"
import imageCompression from "browser-image-compression"
import { Ring } from "react-css-spinners"

function UploadForm() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [optimizing, setOptimizing] = useState(false)
  const types = ["image/jpeg", "image/png"]

  const changeHandler = async (e) => {
    let selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try {
        setOptimizing(true)
        const compressedFile = await imageCompression(selected, options)
        setFile(compressedFile)
        setOptimizing(false)
        e.target.value = null
        // write your own logic
      } catch (error) {
        console.log(error)
      }
    } else {
      setFile(null)
      setError("Please select a file with valid image extension.")
    }
  }

  return (
    <form>
      <input id="file-input" type="file" onChange={changeHandler} />
      <div className="output">
        {optimizing && (
          <div>
            <p>"Optimizing your Image"</p>
            <Ring color="#3282b8" />
          </div>
        )}
        {error && <div className="error">{error}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  )
}

export default UploadForm
