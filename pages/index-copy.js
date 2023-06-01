// import Head from "next/head";
// import { useState } from "react";
// import * as React from 'react'
// import styles from "./index.module.css";
//
// const dsUrl = 'https://create.editorx.com/html/editor/web/renderer/render/document/45a425f4-24e4-4966-b8b8-29809d145ef7?metaSiteId=82886fa8-dee5-43a5-afe7-c2f073b53082&editorSessionId=a6868c13-13e1-494d-b82f-b884982cd214&esi=a6868c13-13e1-494d-b82f-b884982cd214&isEdited=true&isSantaEditor=true&dsOrigin=wixwiz&ds=true&forceResponsive=true&configName=responsive&enableScopes=true'
// const urlSuffix = '&isReadOnly=true&disableSave=true&DmSource=https://localhost:8080&debug=dm'
// const dsSrc = `${dsUrl}${urlSuffix}`
//
// export default function Home() {
//   const [valueInput, setValueInput] = useState("");
//   const [documentServicesLoaded, setDocumentServicesLoaded] = useState(false);
//
//   const sendDsMessage = message => {
//     const dsMessage = {ds: true, message}
//     document.getElementById('ds').contentWindow.postMessage(dsMessage, '*')
//   }
//
//   async function navigate(title) {
//     console.log('Navigate to', title)
//     try {
//       sendDsMessage({type: 'clear'})
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ value: title }),
//       });
//
//       const data = await response.json();
//       if (response.status !== 200) {
//         throw data.error || new Error(`Request failed with status ${response.status}`);
//       }
//
//       const {result} = data
//       const {sections} = result
//
//       console.log(sections)
//       sendDsMessage({type: 'add', sections})
//     } catch(error) {
//       // Consider implementing your own error handling logic here
//       console.error(error);
//       alert(error.message);
//     }
//   }
//
//   async function onSubmit(event) {
//     event.preventDefault();
//     await navigate(valueInput)
//   }
//
//   const onDsLoaded = () => {
//     console.log("**** document services is loaded")
//     setDocumentServicesLoaded(true)
//   }
//
//   React.useEffect(() => {
//     if (typeof window !== 'undefined') {
//       addEventListener('message', (event) => {
//         if (event?.data === 'documentServicesLoaded') {
//           onDsLoaded()
//         } else if (event?.data?.type === 'navigate') {
//           console.log('Navigate to', event?.data?.title)
//           if (valueInput) {
//             navigate(`Tell me more about "${event?.data?.title}" in the context of "${valueInput}"`)
//           } else {
//             console.log('What?')
//           }
//         }
//       })
//     }
//   })
//
//   return (
//     <div>
//       <Head>
//         <title>OpenAI Quickstart</title>
//         <link rel="icon" href="/dog.png" />
//       </Head>
//
//       <main className={styles.main}>
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="question"
//             placeholder="Ask a question"
//             value={valueInput}
//             onChange={(e) => setValueInput(e.target.value)}
//           />
//           {documentServicesLoaded ? <input type="submit" value="Answer"/> : null}
//         </form>
//         <iframe className={styles.result}
//             id='ds'
//             src={dsSrc}
//             width='100%'
//             height='2000'
//         />
//       </main>
//     </div>
//   );
// }
