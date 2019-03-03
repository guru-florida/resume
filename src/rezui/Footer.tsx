import * as React from 'react';

class State {
}

class Props {
}

export default class Footer extends React.Component<Props, State> {
    render() {
        return <footer>{ this.props.children }</footer>;
    }
}
