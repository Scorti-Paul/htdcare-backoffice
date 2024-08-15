import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
// import { toast } from 'react-toastify'
import storage from '../../firebase.config'
export default function useUploadImage() {
  const [loading, setLoading] = useState(false)
  // const [progress, setProgress] = useState(0)

  const uploadImage = async (file: any) => {
    setLoading(true)
    let url = ''

    const storageRef = ref(storage, 'images/' + file?.name)

    const uploadTask = uploadBytesResumable(storageRef, file)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    await uploadTask
      .then(async (snapshot: any) => {
        const ul = await getDownloadURL(snapshot?.ref)
        url = ul
        return ul
      })
      ?.catch((e: any) => {
        setLoading(false)
        return ''
      })

    return url
  }

  return { uploadImage, loading }
  // return { uploadImage, loading, progress }
}

//  (
//       "state_changed",
//       (snapshot) => {
//         // Observe state change events such as progress, pause, and resume
//         setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//         }
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//         setLoading(false);
//         toast?.warning(error?.message);
//       },

//       () => {
//         getDownloadURL(uploadTask.snapshot.ref)
//           .then((downloadURL) => {
//             setLoading(false);

//             return setUrl(downloadURL);
//           })
//           ?.catch((e) => {
//             setLoading(false);
//             return toast?.warning("There was an error getting the url");
//           });
//       }
//     );
//   };
