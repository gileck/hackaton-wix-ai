import Head from "next/head";
import {useState} from "react";
import * as React from 'react'
import styles from "./index.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CircularProgress from '@mui/material/CircularProgress';

import Backdrop  from "@mui/material/Backdrop";


const dsUrl = 'https://create.editorx.com/html/editor/web/renderer/render/document/45a425f4-24e4-4966-b8b8-29809d145ef7?metaSiteId=82886fa8-dee5-43a5-afe7-c2f073b53082&editorSessionId=a6868c13-13e1-494d-b82f-b884982cd214&esi=a6868c13-13e1-494d-b82f-b884982cd214&isEdited=true&isSantaEditor=true&dsOrigin=wixwiz&ds=true&forceResponsive=true&configName=responsive&enableScopes=true'
const urlSuffix = '&isReadOnly=true&disableSave=true&DmSource=https://localhost:8080&debug=dm'
const dsSrc = `${dsUrl}${urlSuffix}`

export default function Home() {
    const [valueInput, setValueInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [documentServicesLoaded, setDocumentServicesLoaded] = useState(false);
    const [items, setItems] = useState([])

    async function navigate(title) {
        setLoading(true)
        console.log('Navigate to', title)
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({value: title}),
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
            setLoading(false)


        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
            setLoading(false)

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


    return (

        <div>
            <style jsx global>
                {`
                  .link:hover {
                    color: #102457;
                  }

                  body {
                    background: #ededed;
                        font-family: sans-serif;
                  }
                `}
            </style>
            <Head>
                <title>OpenAI Quickstart</title>
                <link rel="icon" href="/dog.png"/>
            </Head>

            <main className={styles.main}>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="question"
                        placeholder="How Can I Help?"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                    />
                    {documentServicesLoaded ? <input type="submit" value="Answer"/> : null}
                </form>

                {!loading && <Display items={items} onFollowupClick={onFollowupClick}/>}

                {loading && <CircularProgress sx={{color: '#5c5c5c'}} />}


            </main>
        </div>
    );
}

function Display(props) {
    const {items, onFollowupClick} = props

    const CompsById = {
        'comp-leq228ux': MediaCard,
        'comp-leqqmqit': ItemNoImage,
    }


    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '80%'

        }}>
            {items ? items.map((item) => {
                const Comp = CompsById[item.id]
                return <div key={item.title}>
                    <Comp onFollowupClick={onFollowupClick} post={item}/>
                </div>
            }) : ''}
        </div>
    )
}


function ItemWithImage(props) {
    const {post} = props;

//style={{width: '80%', margin: '10px'}}
    return (
        <Card style={{border: 'none'}}>
            <Card sx={{display: 'flex'}}>
                <CardContent sx={{flex: 1}}>
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
                            <Typography onClick={() => props.onFollowupClick(q)} component={'a'}
                                        href={'#'}> {q} </Typography>
                        </div>)}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{width: '30%', display: {xs: 'none', sm: 'block'}}}
                    image={post.image}
                />
            </Card>
        </Card>
    );
}

function ItemNoImage(props) {
    const {post} = props;


    return (
        <div style={{height: '200px', padding: '15px'}}>
            <Grid item key={post.title}>
                <div>
                    <Card sx={{display: 'flex', boxShadow: 'none'}}>
                        <CardContent sx={{flex: 1}}>
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                {post.followups && post.followups.map(q => <div key={q}>
                                    <div onClick={() => onFollowupClick(q)} className='link' style={{color: '#8ab4f8', cursor: "pointer"}}>
                                        {q}
                                    </div>
                                </div>)}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </div>
    );
}

function MediaCard({post, onFollowupClick}) {
    return (
        <div style={{padding: '15px'}}>
            <Card sx={{maxWidth: 345, height: 500, boxShadow: 'none'}}>
                <CardMedia
                    sx={{height: 200}}
                    image={post.image}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.description}
                    </Typography>
                    <div style={{marginTop: '20px'}}>
                        <Typography variant="body3" color="text.secondary">
                            {post.followups && post.followups.map(q => <div key={q}>
                                <div onClick={() => onFollowupClick(q)} className='link' style={{color: '#8ab4f8', cursor: "pointer"}}>
                                    {q}
                                </div>
                            </div>)}
                        </Typography>
                    </div>
                </CardContent>

            </Card>
        </div>
    );
}