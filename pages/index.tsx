import * as React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { AppBar, Autocomplete, Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Toolbar } from '@mui/material';
import axios from "axios";
import { GPTPrompt, createCharacterSummaryPrompt } from './gptPrompts.tsx';
import ReactMarkdown from 'react-markdown';

const levelOptions: readonly string[] = [
  'Level 1'
] as const

const raceOptions: readonly string[] = [
  'Human',
  'Elf',
  'Dwarf'
] as const

const classOptions: readonly string[] = [
  'Bard',
  'Wizard',
  'Sorcerer'
] as const


const queryGPT = (token: string, body: GPTPrompt) => axios.post("https://api.openai.com/v1/chat/completions",
  body,
  {
    headers: {
      "Authorization": "Bearer " + token
    }
  }
)

function Home() {
  // const [count, setCount] = useState(0)
  // const increment = useCallback(() => {
  //   setCount((v) => v + 1)
  // }, [setCount])

  // useEffect(() => {
  //   const r = setInterval(() => {
  //     increment()
  //   }, 1000)

  //   return () => {
  //     clearInterval(r)
  //   }
  // }, [increment])

  // TODO type the level, race and class
  const [level, setLevel] = useState<string | null>(levelOptions[0])
  const [race, setRace] = useState<string | null>(raceOptions[0])
  const [class_, setClass] = useState<string | null>(classOptions[0])

  const [apiIsGood, setAPIIsGood] = useState<number>(0)

  const [openAIAPIToken, setopenAIAPIToken] = useState<string>(() => "")

  const [gptResponse, setGPTResponse] = useState<string>("")

  useEffect(() => setopenAIAPIToken(localStorage.getItem("openAIAPIToken")), [])

  useEffect(() => localStorage.setItem("openAIAPIToken", openAIAPIToken), [openAIAPIToken])

  useEffect(() => {
    queryGPT(openAIAPIToken, {
      "model": "gpt-3.5-turbo",
      "messages": [{
        "role": "user",
        "content": "OK."
      }]
    }).then(_ => {
      setAPIIsGood(1)
    }).catch(_ => {
      setAPIIsGood(-1)
    })
  }, [openAIAPIToken])

  const theme = useTheme()



  return (
    <Box>
      {/* TODO style the app bar properly */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            D&D backstory generator
          </Typography>
          <Box>
            {apiIsGood}
            <TextField
              sx={{
                backgroundColor: theme.palette.background.paper
              }}
              value={openAIAPIToken}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setopenAIAPIToken(e.target.value)}
              label="OpenAI API key" />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: '75%',
          p: 12,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            width: 1
          }}
        >
          <Autocomplete

            disablePortal
            options={levelOptions}
            value={level}
            onChange={(_, val: string | null) => setLevel(val)}
            sx={{ width: 300, pr: 1 }}
            renderInput={(params) => <TextField {...params} label="Level" />}
          />
          <Autocomplete
            disablePortal
            options={raceOptions}
            value={race}
            onChange={(_, val: string | null) => setRace(val)}
            sx={{ width: 300, pr: 1 }}
            renderInput={(params) => <TextField {...params} label="Race" />}
          />
          <Autocomplete
            disablePortal
            options={classOptions}
            value={class_}
            onChange={(_, val: string | null) => setClass(val)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Class" />}
          />
          <Button variant='contained' onClick={async () => {
            setGPTResponse("loading...")
            const resp = await queryGPT(
              openAIAPIToken,
              createCharacterSummaryPrompt({level, race, class: class_})
            )

              setGPTResponse(resp.data?.choices?.[0]?.message?.content)


           }}>
            Generate
          </Button>
        </Box>
        <Box>

          this box will generate a <Typography sx={{ color: 'red' }}>{level} {race} {class_}</Typography>

        </Box>
        <Box>
          <ReactMarkdown>{gptResponse}</ReactMarkdown>
        </Box>
      </Box>

    </Box>
    // <main className={styles.main}>
    //   <h1>Fast Refresh Demo</h1>
    //   <p>
    //     Fast Refresh is a Next.js feature that gives you instantaneous feedback
    //     on edits made to your React components, without ever losing component
    //     state.
    //   </p>
    //   <hr className={styles.hr} />
    //   <div>
    //     <p>
    //       Auto incrementing value. The counter won't reset after edits or if
    //       there are errors.
    //     </p>
    //     <p>Current value: {count}</p>
    //   </div>
    //   <hr className={styles.hr} />
    //   <div>
    //     <p>Component with state.</p>
    //     <ClickCount />
    //   </div>
    //   <hr className={styles.hr} />
    //   <div>
    //     <p>
    //       The button below will throw 2 errors. You'll see the error overlay to
    //       let you know about the errors but it won't break the page or reset
    //       your state.
    //     </p>
    //     {/* <Button
    //       onClick={(e) => {
    //         setTimeout(() => document.parentNode(), 0)
    //         throwError()
    //       }}
    //     >
    //       Throw an Error
    //     </Button> */}
    //   </div>
    //   <hr className={styles.hr} />
    // </main>
  )
}

export default Home
