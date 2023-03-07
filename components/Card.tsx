import * as React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';

// import "./input.module.css"

type Props = {
  name: String
  courseid: String
  description: String
  units: Number
  key: any
}

const ReactCard = (props: Props) => (
    <Card key={props.key} variant="outlined" sx={{ width: 320 }} style={{
        background: "#FFE073",
        border: 0,
        padding: "1.5rem",
        margin: "10px"
    }}>

      <Typography className="cardfont" level="h1" fontSize="xl" sx={{ mb: 0.5 }}>
       { props.name }
       {/* Plants and Society */}
      </Typography>
      <Typography className="cardfont" level="body2"> {props.description} </Typography>

      
        <Grid container={true} spacing={2} sx={{ flexGrow: 1 }} style={{"margin-top": "0.5rem"}}>
        <Grid xs={4} component="div">
        <Typography className="cardfont" level="h1" fontSize="sm" sx={{ mb: 0.5 }}>
        { props.units + " "}units
      </Typography>
        </Grid>
        <Grid xs={4} component="div">
        <Typography className="cardfont" level="h1" fontSize="sm" sx={{ mb: 0.5 }}>
       {/* { props.name } */}
       { props.courseid }
      </Typography>
        </Grid>
        <Grid xs={4} component="div">
        <Typography className="cardfont" level="h1" fontSize="sm" sx={{ mb: 0.5 }}>
       {/* { props.name } */}
       See prereqs
      </Typography>
        </Grid>
      </Grid>

      {/* <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2,900
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box> */}
    </Card>
)

export default ReactCard
