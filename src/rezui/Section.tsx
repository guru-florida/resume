import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import classNames from 'classnames';

class State {
}

class Props {
    className?: string;
    inverted?: boolean = false;
    transparent?: boolean = false;
    vertical?: boolean = false;
    height?: number;
    onClick?: () => void;
}

export default class Section extends React.Component<Props, State> {
    static Header = Header;

    getBgColor() {
        const { inverted, transparent } = this.props;
        return transparent
            ? 'transparent'
            : inverted
                ? 'inverted'
                : undefined;
    }

    render() {
        const { children, className, vertical, height, onClick } = this.props;
        return <div
                className={classNames('section', className, vertical ? 'vertical' : undefined, this.getBgColor() )}
                style={{ height: height }}
                onClick={onClick}
            >
            { React.Children.map(children, (t: any) => t && t.type ==Header && t) }
            <div className='section-content responsive'>
                { React.Children.map(children, (t: any) => t && t.type!=Header && t.type!=Footer && t) }
            </div>
            { React.Children.map(children, (t: any) => t && t.type ==Footer && t) }
        </div>;
    }
}
