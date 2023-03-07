import * as React from 'react'
import { Input } from '@mui/joy'
// import "./input.module.css"

// type Props = {
//   items: User[]
// }

const List = () => (
    <div className="input">
        <Input
            // color="warning"
            disabled={false}
            placeholder="Explore new possibilities"
            size="lg"
            variant="solid"
            className="justify-center "
            />
    </div>
)

export default List
