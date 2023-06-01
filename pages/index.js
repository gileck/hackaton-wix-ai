import Head from "next/head";
import { useState } from "react";
import * as React from 'react'
import styles from "./index.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const dsUrl = 'https://create.editorx.com/html/editor/web/renderer/render/document/45a425f4-24e4-4966-b8b8-29809d145ef7?metaSiteId=82886fa8-dee5-43a5-afe7-c2f073b53082&editorSessionId=a6868c13-13e1-494d-b82f-b884982cd214&esi=a6868c13-13e1-494d-b82f-b884982cd214&isEdited=true&isSantaEditor=true&dsOrigin=wixwiz&ds=true&forceResponsive=true&configName=responsive&enableScopes=true'
const urlSuffix = '&isReadOnly=true&disableSave=true&DmSource=https://localhost:8080&debug=dm'
const dsSrc = `${dsUrl}${urlSuffix}`

export default function Home() {
  const [valueInput, setValueInput] = useState("");
  const [documentServicesLoaded, setDocumentServicesLoaded] = useState(false);
  const [items, setItems] = useState([])

  async function navigate(title) {
    console.log('Navigate to', title)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: title }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      const {result} = data
      const {sections} = result

      console.log(sections)

      const items = sections.map(section => {
        return {
            id: section.id,
            title: section.match.title,
            description: section.match.text1,
            image: section.match.image1,
            followups: section.match.followups,
        }
      })
      setItems(items)

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  function onFollowupClick(followupQuestion) {
    setItems([])
    setValueInput(followupQuestion)
    navigate(followupQuestion)
  }

  async function onSubmit(event) {
    setItems([])
    event.preventDefault();
    await navigate(valueInput)
  }

  const CompsById = {
    'comp-leq228ux': ItemWithImage,
    'comp-leqqmqit': ItemNoImage,
  }


  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Ask a question"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
          {documentServicesLoaded ? <input type="submit" value="Answer"/> : null}
        </form>
        {items ? items.map((item) => {
          const Comp = CompsById[item.id]
          return <div style={{width: '80%',margin: '10px'}} key={item.title}>
            <Comp onFollowupClick={onFollowupClick} post={item}/>
          </div>
        }) : ''}


      </main>
    </div>
  );
}

function ItemWithImage(props) {
  const { post } = props;


  return (
        <Grid item key={post.title}>
          <Card>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {post.followups && post.followups.map(q => <div key={q}>
                    <Typography onClick={() => props.onFollowupClick(q)} component={'a'} href={'#'}> {q} </Typography>
                  </div>)}
                </Typography>
              </CardContent>
              <CardMedia
                  component="img"
                  sx={{ width: '30%', display: { xs: 'none', sm: 'block' } }}
                  image={post.image}
              />
            </Card>
          </Card>
        </Grid>
  );
}

function ItemNoImage(props) {
  const { post } = props;


  return (
      <Grid item key={post.title}>
        <Card>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {post.followups && post.followups.map(q => <div key={q}>
                  <Typography onClick={() => props.onFollowupClick(q)} component={'a'} href={'#'}> {q} </Typography>
                </div>)}
              </Typography>
            </CardContent>
          </Card>
        </Card>
      </Grid>
  );
}