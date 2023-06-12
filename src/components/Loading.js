import React from 'react'
import { SquareLoader } from 'react-spinners'

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
            <SquareLoader
                size={50}
                color='#0D6EFD'
                loading={pageLoading}
            />
        </div>
    )
}

export default Loading