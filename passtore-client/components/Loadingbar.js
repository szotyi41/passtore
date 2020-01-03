import React from 'react'
import { inject, observer } from 'mobx-react'

const LoadingBar = (props) => {
    
    const style = {
        width: ((1 / (props.loadingStore.loading + 1)) * 100) + '%', 
        opacity: props.loadingStore.loading === 0 ? 0 : 1
    }

    return (
        <div className='loading-bar' style={style}>
            <style jsx='true'>{`
            .loading-bar {
                position: fixed;
                left: 0; 
                top: 0;
                height: 4px;
                background-color: var(--blue);
                transition: all 1s ease-in-out;
                z-index: 100000;
            }
            `}</style>
        </div>
    )
}

export default inject('loadingStore')(observer(LoadingBar));