import * as React from 'react';
import './micro-ring.css';

class State {
}

class Props {
    id ?: string;
    className ?: string;
    title ?: string;
    discrete?: boolean;
    discreteLimit?: number;
    limit ?: number;
    lapLimit ?: number;
    value ?: any;
    unit ?: string | null;
    unitPlacement ?: string;
    decimals ?: number;
    angleOffset ?: number;
    color ?: string;
}

interface Point {
    x: number;
    y: number;
}

interface Band {
    begin: number;
    end: number;
}

/*interface Arc {
    angle: Array<number>;
    radius: number;
    width: number;
}*/

export default class MicroRing extends React.Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        className: 'micro-kpi',
        discrete: false,
        limit: 100.0,
        value: 0.0,
        lapLimit: 50,
        angleOffset: 0.0,
        color: '#1e66b7',
        unit: null,
        unitPlacement: 'after',
        decimals: 0
    };


    protected polarToCartesian(centerX : number, centerY : number, radius : number, angleInDegrees : number) : Point {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    protected describeArc(radius : number, startAngle : number, endAngle : number) {
        let x : number = 60, y : number = 60;
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = (endAngle - startAngle) <= 180 ? '0' : '1';

        var d = [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');

        return d;
    }

    protected arc(radius : number, startAngle : number, endAngle : number, color ?: string, className ?: string) : React.ReactNode {
        return <path className={className} fill="none" stroke={color?color:this.props.color} d={this.describeArc(radius, startAngle, endAngle)}/>
    }

    protected valueArc(value : number) : React.ReactNode {
        if(this.props.limit) {
            if(this.props.value > this.props.limit)
                value = this.props.value % this.props.limit;
        }
        if(this.props.discrete || (this.props.discreteLimit && this.props.value<=this.props.discreteLimit)) {
            value = Math.floor(value);
            let scale = value / this.min(100, this.props.limit, this.props.discreteLimit) * 280;
            let ofs = -140;//this.ifnull<number>(this.props.angleOffset, 70.0);

            return <g className="discrete">
                { this.arc(44, ofs + 285, ofs + 355, this.props.color, "radial-segment-zero") }
                {
                this.bands(value)    // returns array of arcs representing the bands split around a 360deg circle, we then convert these bands to arc nodes
                    .map((v) => {
                        return this.arc(45, ofs + v.begin * scale, ofs + v.end * scale, this.props.color, "radial-segment")
                    })
                }</g>;
        } else {

            let percent = value / this.ifnull<number>(this.props.limit, 100);
            let ofs = this.ifnull<number>(this.props.angleOffset, 180.0);
            if (percent > 0.999) percent = 0.999; else if (percent < 0) percent = 0.0;
            return this.arc(45, ofs, ofs + percent * 360.0, this.props.color, "radial-value");
        }
    }

    protected bands(count: number) : Array<Band>
    {
        count = Math.floor(count);
        // for 0 or 1 bands we need no computation
        if(count==0)
            return [];
        else if(count==1)
            return [{ begin: 0, end: 0.999 }];

        // compute bands
        let _bandgap = 0.15;                // 10% of space dedicated to band gaps
        let _w = (1.0 - _bandgap) / count;  // width of each segment
        _bandgap /= count;                  // bandgap as distributed amoung the count
        let _b = [];
        for(let a = _bandgap/2, i=0; i<count; i++) {
            _b.push({ begin: a, end: a+_w });
            a += _w + _bandgap;             // next band start
        }
        return _b;
    }

    protected laps() : React.ReactNode {
        // return segment arcs representing the number of laps (multiples of the limit prop)
        if(!this.props.limit || this.props.value <= this.props.limit)
            return null;

        let segments = this.props.value / this.props.limit;
        if(this.props.lapLimit && segments > this.props.lapLimit) segments = this.props.lapLimit;   // clamp on visible laps
        return this
            .bands(segments)    // returns array of arcs representing the bands split around a 360deg circle, we then convert these bands to arc nodes
            .map( (v) => { return this.arc(55, v.begin*360, v.end*360, this.props.color, "lap") });
    }

    protected min(def:number, a?:number, b?:number): number { return (a!==undefined && b!=undefined) ? Math.min(a,b) : a?a:b?b:def; }

    protected ifnull<T>(v: T | undefined | null, def: T) : T {
        return (v===undefined || v===null) ? def : v;
    }

    protected makeIdentifier(value : string) : string | undefined {
        return value.replace(/[^a-zA-Z0-9_]+/g,'-');
    }

    protected getUnitId(value : string) : string {
        if(value=='%')
            return 'percent';
        else if(value.startsWith('/'))
            return 'per-'+value.substr(1);
        else
            return this.ifnull<string>(this.makeIdentifier(value), 'unknown');
    }

    protected getId() : string | undefined {
        return(this.props.id)
            ? this.props.id
            : this.props.title
                ? this.makeIdentifier(this.props.title)
                : undefined;
    }

    protected valueNode() {
        return <tspan className="value">{ isNaN(this.props.value) ? this.props.value : this.props.value.toFixed(this.props.decimals) }</tspan>;
    }

    protected unitNode(placement: string) {
        if(placement!==this.props.unitPlacement) return null;
        return this.props.unit
            ? <tspan className={`unit unit-${this.getUnitId(this.props.unit)}`}>{ this.props.unit }</tspan>
            : null;
    }

    render() {
        return <div id={this.getId()} className={this.props.className}>
            <svg className="micro-ring" width="64" height="64" viewBox="0 0 120 120">
                <circle className="radial-track" cx="60" cy="60" r="45" fill="none" stroke={this.props.color} opacity="0.1" />
                { this.valueArc(this.props.value) }
                <g className="laps">{this.laps()}</g>
                <text className="value" x="60" y="57" textAnchor="middle" fill={this.props.color}>
                    {this.unitNode('before')}
                    {this.valueNode()}
                    {this.unitNode('after')}
                </text>
                <text className="title" x="60" y="75" textAnchor="middle" fill={this.props.color}>{ this.props.title }</text>
                <text className="sub-line" x="60" y="90" textAnchor="middle" fill="#aaa">
                    {this.unitNode('bottom')}
                </text>
            </svg>
        </div>;
    }
}
