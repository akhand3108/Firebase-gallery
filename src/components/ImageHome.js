import React, { useState, useEffect } from "react"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import { useParams } from "react-router-dom"
import { projectFirestore } from "../firebase/config"
import AddFileButton from "./AddFileButton"

function ImageHome() {
  const [selectedImg, setSelectedImg] = useState(null)
  const { albumId } = useParams()
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    return projectFirestore
      .collection("albums")
      .doc(albumId)
      .onSnapshot((snapshot) => {
        setAlbum(snapshot.data())
      })
  }, [albumId])
  return (
    <div className="album-view">
      <h2 class="display-2 text-center text-danger">{album?.name}</h2>
      <AddFileButton albumId={albumId} />
      <hr class="divider"></hr>
      <div className="content">
        {album && (
          <ImageGrid images={album.images} setSelectedImg={setSelectedImg} />
        )}
        {selectedImg && (
          <Modal
            albumId={albumId}
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
          />
        )}
      </div>
    </div>
  )
}

export default ImageHome
