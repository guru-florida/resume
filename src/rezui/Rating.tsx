import * as React from 'react';

class State {
}

class Props {
    value: number = 5;
}

export default class Rating extends React.Component<Props, State> {
    getStars(n: number) {
        let stars = [];
        for(let i=0; i<5; i++)
            stars.push( <i key={i} className={(i<n)?'on':'off'} /> );
        return stars;
    }

    render() {
        const { children, value } = this.props;
        return <div className='rating'>{children} <span>{this.getStars(value)}</span></div>;
    }
}
