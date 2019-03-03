import * as React from 'react';

class State {
}

class Props {
    options: [] = [];
    value?: number;
}

export default class Barrel extends React.Component<Props, State> {
    calcOptionMetrics() {
        const { options, value } = this.props;
        const n = options.length;
        
    }

    render() {
        const { options, value } = this.props;
        let _options = options.slice(value,)
        return <div className='barrel'>

        </div>;
    }
}
