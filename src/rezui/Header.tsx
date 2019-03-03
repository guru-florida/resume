import * as React from 'react';

class State {
}

class Props {
}

export default class Header extends React.Component<Props, State> {
    render() {
        return <header>{ this.props.children }</header>;
    }
}
