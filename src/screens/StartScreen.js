import { Button, Grid } from '@mui/joy';
import { useState } from 'react';
import ToggleButton from '../components/ToggleButton';
const StartScreen = () => {

    const [selected, setSelected] = useState('')
    const toggleBtn = v => setSelected(s => s === v ? '' : v)

    const makeToggleBtn = (val) => (<ToggleButton text={val} pressed={selected === val} onClick={() => toggleBtn(val)} />)

    return (
        <Grid textAlign={'center'} spacing={3} container alignItems={'center'} direction={'row'} xs={8} >
            <Grid xs={3}>
                {makeToggleBtn('W')}
            </Grid>
            <Grid container spacing={3} direction='column' xs={6}>
                <Grid>
                    {makeToggleBtn('N')}
                </Grid>

                <Grid >
                    <Button size='lg' variant={'solid'} disabled={!selected} onClick={() => alert(`vault is facing ${selected}`)}>start</Button>
                </Grid>

                <Grid>
                    {makeToggleBtn('S')}
                </Grid>
            </Grid>
            <Grid xs={3}>
                {makeToggleBtn('E')}
            </Grid>
        </Grid>
    )
}

export default StartScreen