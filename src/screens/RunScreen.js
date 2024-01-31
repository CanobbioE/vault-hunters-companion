import { Button, Grid } from '@mui/joy';
import { useState } from 'react';
import MagicPath from '../components/MagicPath';


const BTN_SIZE = 'md'
const MAX_X = 20
const MAX_Y = 21

const START_X = 7
const START_Y = 11

const btnStyle = { width: '45px' }

const RunScreen = (props) => {
    const { direction } = props
    const [path, setPath] = useState([{ marked: false, direction: direction, start: true, x: START_X, y: START_Y }])
    const [mark, setMark] = useState(false)

    const calculateX = (old, dir) => {
        switch (dir) {
            case 'E':
                return old.x + 1
            case 'W':
                return old.x - 1
            default:
                return old.x
        }
    }

    const calculateY = (old, dir) => {
        switch (dir) {
            case 'S':
                return old.y + 1
            case 'N':
                return old.y - 1
            default:
                return old.y
        }
    }

    const isFirstRoom = () => {
        const rooms = path.length
        // prevend edge case when evaluating currentRoom
        if (rooms === 0) {
            return true
        }

        const currentRoom = path[rooms-1]
        return rooms === 1 || (currentRoom.x === START_X && currentRoom.y === START_Y)
    }

    const handleMove = (dir) => {
        const room = {
            direction: dir,
            x: calculateX(path[path.length - 1], dir),
            y: calculateY(path[path.length - 1], dir)
        }
        setMark(false)
        setPath([...path, room])
    }

    const handleMark = () => {
        const room = path.pop()
        setMark(m => {
            room.marked = !m
            return !m
        })
        
        setPath([...path, room])

        console.log(path)
    }

    const opposite = dir => {
        switch (dir) {
            case 'E':
                return 'W'
            case 'W':
                return 'E'
            case 'S':
                return 'N'
            case 'N':
                return 'S'
            default:
                return
        }
    }

    const shouldDisable = dir => {
        if (isFirstRoom()) {
            return dir !== direction
        }
        const currentRoom = path[path.length-1]

        const newX = calculateX(currentRoom, dir)
        if (newX >= MAX_X || newX <= 0) {
            return true
        }

        const newY = calculateY(currentRoom, dir)
        if (newY >= MAX_Y || newY <= 0) {
            return true
        }

        if (dir !== opposite(direction) && newX === START_X && newY === START_Y) {
            return true
        }
        if (path.length > 1) {
            return false
        }
        return false
    }

    return (
        <Grid container spacing={8} xs={12} justifyContent={'center'}>
            <Grid xs={12} sx={{ height: '50vh', padding: '0' }}>
                <MagicPath path={path} />
            </Grid>

            <Grid textAlign={'center'} spacing={3} container alignItems={'center'} direction={'row'} xs={8} >
                <Grid container xs={3}>
                    <Button disabled={shouldDisable('W')} style={btnStyle} sx={{ width: '100%' }} size={BTN_SIZE} onClick={() => handleMove('W')}> W </Button>
                </Grid>


                <Grid container spacing={3} justifyContent={'center'} direction='column' xs={6}>
                    <Grid sx={{ paddingBottom: '10px' }}>
                        <Button disabled={shouldDisable('N')} style={btnStyle} size={BTN_SIZE} onClick={() => handleMove('N')}> N</Button>
                    </Grid>

                    <Grid >
                        <Button disabled={isFirstRoom()} size={'lg'} variant={mark ? 'solid' : 'outlined'} onClick={handleMark} >Mark</Button>
                    </Grid>

                    <Grid sx={{ paddingTop: '10px' }}>
                        <Button disabled={shouldDisable('S')} style={btnStyle} size={BTN_SIZE} onClick={() => handleMove('S')}> S </Button>
                    </Grid>
                </Grid>

                <Grid xs={3}>
                    <Button disabled={shouldDisable('E')} style={btnStyle} size={BTN_SIZE} onClick={() => handleMove('E')}> E </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RunScreen