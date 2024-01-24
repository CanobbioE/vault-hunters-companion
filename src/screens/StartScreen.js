import { Button, Grid, Typography } from '@mui/joy';
import { useState } from 'react';
import ToggleButton from '../components/ToggleButton';

const btnStyle = { width: '50px' }

const StartScreen = (props) => {
    const [selected, setSelected] = useState('')
    const toggleBtn = v => setSelected(s => s === v ? '' : v)

    const makeToggleBtn = (val) => (<ToggleButton style={btnStyle} text={val} pressed={selected === val} onClick={() => toggleBtn(val)} />)

    return (
        <Grid container spacing={8} xs={12} justifyContent={'center'}>
            <Grid xs={10} >
                <Typography textAlign={'center'}>Select the direction towards which the vault is facing.</Typography>
            </Grid>
            <Grid textAlign={'center'} spacing={3} container alignItems={'center'} direction={'row'} xs={10} >
                <Grid xs={3}>
                    {makeToggleBtn('W')}
                </Grid>
                <Grid container spacing={3} direction='column' xs={6}>
                    <Grid>
                        {makeToggleBtn('N')}
                    </Grid>

                    <Grid >
                        <Button size='lg' variant={'solid'} disabled={!selected} onClick={() => props.onStart(selected)}>start</Button>
                    </Grid>

                    <Grid>
                        {makeToggleBtn('S')}
                    </Grid>
                </Grid>
                <Grid xs={3}>
                    {makeToggleBtn('E')}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StartScreen