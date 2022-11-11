import * as React from 'react'
import { Box, Avatar, Typography } from '@mui/material'

function AvatarCustom({ name }) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection= "column">
            <Avatar>{name[0]}</Avatar>
            <Typography noWrap maxWidth={100}>{name}</Typography>
        </Box>
    );
}
export default AvatarCustom;