import React from "react";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as DefaultWheel } from '../assets/default-visual.svg';
import { ReactComponent as BottleneckWheel } from '../assets/focus-bottleneck.svg';
import { ReactComponent as RoleWheel } from '../assets/focus-roles.svg';
import '../custom.scss';
import PropTypes from 'prop-types';

const CircleVisual = ({ onClick, selectedItem }) => {
    const svgRef = useRef(null);
    const [wheelType, setWheelType] = useState('');

    const wheel_types = [
        { name: 'Roles of public finance', value: '1', color:'#f74b65'},
        { name: 'Public Finance Bottlenecks', value: '2', color:'#4d9fd2' },
    ];
    const handleButtonClick = (e) => {
         setWheelType(e.currentTarget.value)
         onClick(e);
    }
    useEffect(() => {
        if (selectedItem === 'group0') return;

        if (svgRef.current) {
            for (const node of svgRef.current.children) {
                if (node.tagName === 'g') {
                    if (node.id === selectedItem) {
                        node.classList.add('highlighted');
                    } else {
                        node.classList.remove('highlighted');
                    }
                }
            }
        }
        if (selectedItem.endsWith('roles') || /[A-D]$/.test(selectedItem)) {
            // Do something specific for group-roles
            setWheelType('1');
        }else if (selectedItem.endsWith('bottlenecks') || /([1-9]|10)$/.test(selectedItem)) {
            setWheelType('2');
        }else{
            setWheelType('');
        }
    }, [selectedItem]);

    useEffect(() => {
        if (wheelType == '1') {
            if (!/[A-D]$/.test(selectedItem)) {
                // Do something specific for group-roles
                onClick(null, 'role_A');
            }
        }
        if (wheelType == '2') {
            if (!/([1-9]|10)$/.test(selectedItem)) {
                // Do something specific for group-bottlenecks
                onClick(null, 'bottleneck_1');
            }
        }
    }, [wheelType]);

    const MySvg = wheelType === '1' ? RoleWheel : wheelType === '2' ? BottleneckWheel : DefaultWheel;

    return (
        <>
        <div className="bg-paper d-flex justify-content-center" style={{ gap: '10px', padding: '10px' }}>
        {/* {wheel_types.map((radio, idx) => (
          <Button
            key={idx}
            id={`radio-${idx}`}
            variant={idx % 2 ? 'outline-bottleneck' : 'outline-role'}
            name="radio"
            value={radio.value}
            active={wheelType === radio.value}
            onClick={(e) => handleButtonClick(e)}
          >
            {radio.name}
          </Button>
        ))} */}
        </div>
        <div style={{
            flex: 1,
            minHeight: 0, // Important for flex children
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease-in-out'
        }}>
            <MySvg
                ref={svgRef}
                className="file-svg"
                onClick={onClick}
                style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                }}
            />
        </div>
        </>
    );
};

CircleVisual.propTypes = {
    onClick: PropTypes.func,
    selectedItem: PropTypes.string,
};

export default CircleVisual;
