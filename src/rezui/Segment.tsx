import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { Slidable } from './Animation';
import Header from './Header';
import Footer from './Footer';
import classNames from 'classnames';
import {CSSProperties} from "react";

class State {
}

export class SegmentProps {
    className?: string;
    cols?: number;
    style?: {};
    slide?: Slidable;
}

export default class Segment extends React.Component<SegmentProps, State> {
    static defaultProps = {
        cols: 4
    };

    static Header = Header;

    getStyles(extraStyles ?: CSSProperties) {
        const { cols, slide } = this.props;
        return {
            ...this.props.style,
            position: slide ? 'relative' : undefined,
            maxWidth: (( (cols || 4)/12)*80)+'vh',
            ...extraStyles
        } as CSSProperties;
    }

    renderSegment(extraStyles?: CSSProperties) {
        const { children, className  } = this.props;
        return <div className={classNames('segment', className)} style={this.getStyles(extraStyles)}>
            { React.Children.map(children, (t: any) => t && t.type ==Header && t) }
            <div className='content'>
                { React.Children.map(children, (t: any) => t && t.type!=Header && t.type!=Footer && t) }
            </div>
            { React.Children.map(children, (t: any) => t && t.type ==Footer && t) }
        </div>;
    }

    render() {
        const { slide } = this.props;
        return slide
            ? <Motion
                defaultStyle={{ left: -slide.start}}
                style={{left: spring(slide.end || 0)}}
            >
                { style => this.renderSegment(style) }
            </Motion>
            : this.renderSegment();
    }
}
