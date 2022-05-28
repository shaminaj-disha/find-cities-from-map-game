import React, { useEffect, useState } from 'react';

const ScorePart = ({locations}) => {

    return (
        <div>
            {locations && <h3>Find the locations for {
                locations[0]?.cities?.map(city => <span key={city?.id}>, {city?.name} </span>)
            }</h3>}
        </div>
    );
};

export default ScorePart;