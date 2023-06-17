import React from 'react'
import { PropagateLoader } from 'react-spinners'

function Loading({ pageLoading }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 500,
            }}
        >
            <PropagateLoader
                size={15}
                color='#F2D2BD'
                loading={pageLoading}
            />
        </div>
    )
}

export default Loading