import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginInput from './LoginInput';
import { Button, Box, Card, CardContent, CardActions, Switch, Slider, Select, MenuItem, Stack, SelectChangeEvent } from '@mui/material'
import './App.css'
import "./assets/Passacaglia.wav"
import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import PlayButton from "@mui/icons-material/PlayCircle"
import PauseButton from "@mui/icons-material/PauseCircle"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [quality, setQuality] = useState("normal");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };


  const handleOnlineSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      enqueueSnackbar("Your application is offline. You won't be able to share or stream music to other devices.")
    }
  };

  const handleVolumeChange = (_e: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    if (typeof value === "number") {
      if (audioRef.current) {
        audioRef.current.volume = value / 100;
      }
    }
  };

  const handleVolumeChangeCommitted = (_e: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    if (typeof value === "number") {
      if (value >= 80) {
        enqueueSnackbar("Listening to music at a high volume may cause long-term hearing loss.")
      }
    }
  };

  const handleQualityChange = (e: SelectChangeEvent) => {
    setQuality(e.target.value);
    if (e.target.value === "low") {
      enqueueSnackbar("Music quality is degraded. Increase quality if your connection allows it.")
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider />
        {!loggedIn ? (
          <form onSubmit={() => setLoggedIn(true)} id="login">
            <LoginInput type='text' placeholder='Username *' />
            <LoginInput type='password' placeholder='Password *' />
            <Button sx={{
              display: 'block',
              width: "100%"
            }} type="submit" variant='contained'>Login</Button>
          </form>
        ) : (
          <Box id="dashboard">
            <nav>
              <Button sx={{
                display: "block"
              }} onClick={() => setLoggedIn(false)} variant='contained'>Logout</Button>
              My Music App
            </nav>
            <Button onClick={togglePlay} sx={{
              borderRadius: "50%",
              aspectRatio: "1"
            }}>
              {isPlaying ? (
                <PauseButton sx={{
                  fontSize: "8rem"
                }} />) : (
                <PlayButton sx={{
                  fontSize: "8rem"
                }} />)}
            </Button>
            <audio ref={audioRef} src="src/assets/Passacaglia.wav" loop />
            <Box sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              margin: "1rem"
            }}>
              <Card sx={{
                flex: "1"
              }} variant='outlined'>
                <CardContent>
                  <h3>Online Mode</h3>
                  <p>Is this application connected to the Internet?</p>
                </CardContent>
                <CardActions>
                  <Switch
                    defaultChecked={true}
                    onChange={handleOnlineSwitchChange} />
                </CardActions>
              </Card>
              <Card sx={{
                flex: "1"
              }} variant='outlined'>
                <CardContent>
                  <h3>Master Volume</h3>
                  <p>Overrides all other sound settings in this application.</p>
                </CardContent>
                <CardActions>
                  <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                      <VolumeDown />
                      <Slider
                        defaultValue={70}
                        onChange={handleVolumeChange}
                        onChangeCommitted={handleVolumeChangeCommitted} />
                      <VolumeUp />
                    </Stack>
                  </Box>
                </CardActions>
              </Card>
              <Card sx={{
                flex: "1"
              }} variant='outlined'>
                <CardContent>
                  <h3>Sound Quality</h3>
                  <p>Manually control the music quality.</p>
                </CardContent>
                <CardActions>
                  <Select value={quality} onChange={handleQualityChange}>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </CardActions>
              </Card>
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </>
  )
}

export default App
