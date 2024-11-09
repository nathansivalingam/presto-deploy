import React, { useEffect, useRef, useState } from 'react';


const Text = ({ input, areaSize, fontSize, colour }) => {
    const [message, setMessage] = useState('');
    const divRef = useRef(null);

    useEffect(() => {
        const handleDoubleClick = () => {
            console.log('Double-clicked on text!');
        };

        const divElement = divRef.current;
        
        if (divElement) {
            divElement.addEventListener('dblclick', handleDoubleClick);
        }

        return () => {
            if (divElement) {
                divElement.removeEventListener('dblclick', handleDoubleClick);
            }
        };
    }, []);
    
    const MyText = () => {
        return <>
            <div
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
        <MyText></MyText>
    </>
}

export default Text;