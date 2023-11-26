import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useFormik } from 'formik'
import RenderTimer from './timer/timer'

const Timer = () => {
    const [timer, setTimer] = useState({hour: 0, minute: 0, second: 0})
    const [loadingCountDown, setLoadingCountDown] = useState(false);

    const onSubmit = (values, actions) => {
        setTimer(values)
        actions.resetForm()
        setLoadingCountDown(false)
    }
    console.log(timer)
    return (
        <RenderTimer onSubmit = {onSubmit} timer = {timer} loadingCountDown={loadingCountDown} setLoadingCountDown={setLoadingCountDown}/>
    )
}

export default Timer