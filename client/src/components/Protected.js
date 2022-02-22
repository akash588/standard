import React, { useState } from 'react';


function Protected(props) {
    let Cmp = props.Cmp
    return(
        <div>
            <Cmp />
        </div>
    )
}


export default Protected