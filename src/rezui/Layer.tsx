import * as React from 'react';
import {CSSProperties} from "react";
import classNames from 'classnames';

class State {
}

class Props {
    z: number = 0;
    absolute?: boolean = false;
    className ?: string;
    style?: CSSProperties;
}

export default class Layer extends React.Component<Props, State> {
    getStyle(extraStyles?: CSSProperties) {
        const { z, absolute } = this.props;
        return {
            ...extraStyles,
            zIndex: z,
            position: absolute ? 'absolute' : undefined
        } as CSSProperties;
    }

    render() {
        const { children, className, style } = this.props;
        return <div className={classNames('layer', className)} style={this.getStyle(style)}>{ children }</div>;
    }
}
