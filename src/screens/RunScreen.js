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
    const [path, setPath] = useState([{ direction: direction, start: true, x: START_X, y: START_Y }])
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

    const handleMove = (dir) => {
        const room = {
            direction: dir,
            marked: mark,
            x: calculateX(path[path.length - 1], dir),
            y: calculateY(path[path.length - 1], dir)
        }
        setPath([...path, room])
        setMark(false)
    }



    const handleMark = () => {
        setMark(m => !m)
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
        if (path.length === 1) {
            return dir !== direction
        }

        const newX = calculateX(path[path.length - 1], dir)
        if (newX >= MAX_X || newX <= 0) {
            return true
        }

        const newY = calculateY(path[path.length - 1], dir)
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
            {/*sx={{ height: '50vh',  }} */}
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
                        <Button size={'lg'} variant={mark ? 'solid' : 'outlined'} onClick={handleMark} >Mark</Button>
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