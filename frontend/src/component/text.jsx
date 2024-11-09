import React, { useEffect, useRef, useState } from 'react';


const Text = ({ input, areaSize, fontSize, colour, setEditTextPopup }) => {
    const [clickTimeout, setClickTimeout] = useState(null);
    const [finalClickTime, setFinalClickTime] = useState(0);
    
    const handleClick = () => {
        const currentTime = Date.now();
        if (currentTime - finalClickTime <= 500) {
            
            // Open up edit popup
            setEditTextPopup(true);
            
            console.log('Double-click detected');      
            if (clickTimeout) {
                clearTimeout(clickTimeout);
                setClickTimeout(null);
            }
        } else {
            const timeout = setTimeout(() => {
                console.log('Single click action');
                setClickTimeout(null);
            }, 500);
        
            setClickTimeout(timeout);
        }
    
        setFinalClickTime(currentTime);
    };
    
    const MyText = () => {
        return <>
            <div
                onClick={handleClick}
                style={{
                    width: `${areaSize}%`,
                    height: `${areaSize}%`,
                    fontSize: `${fontSize}em`,
                    color: `${colour}`,
                    borderWidth: '1px',
                    borderColor: 'lightgrey',
                    borderStyle: 'solid',
                    overflow: 'hidden',
                    position: 'absolute',
                }}
                >
                {input}
            </div>
        </>
    }
    return <>
        <MyText>
        </MyText>
    </>
}

export default Text;