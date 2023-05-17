import * as React from 'react';
import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'
import { AppBar, Autocomplete, Box, TextField, Typography } from '@mui/material';

// function throwError() {
//   console.log(
//     // The function body() is not defined
//     document.body()
//   )
// }

const levelOptions: readonly string[] = [
  'Level 1'
] as const

const raceOptions: readonly string[] = [
  'Human',
  'Elf',
  'Dwarf',
  'Draug'
] as const

const classOptions: readonly string[] = [
  'Bard',
  'Wizard',
  'Sorcerer'
] as const


function Home() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

  // TODO type the level, race and class
  const [level, setLevel] = useState<string | null>(levelOptions[0])
  const [race, setRace] = useState<string | null>(raceOptions[0])
  const [class_, setClass] = useState<string | null>(classOptions[0])

  return (
    <Box>
      {/* TODO style the app bar properly */}
      <AppBar>AppBar</AppBar>
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
            flexDirection: 'row',
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
        </Box>
        <Box>

          this box will generate a <Typography sx={{ color: 'red' }}>{level} {race} {class_}</Typography>

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
