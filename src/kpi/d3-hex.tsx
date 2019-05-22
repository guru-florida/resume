import * as React from 'react';
import * as d3 from 'd3';

interface Tile {
    caption: string;
    detail?: string;
    rating?: number;
}

class State {
}

class Props {
    id!: string;
    width: number = 600;
    height: number = 350;
    radius: number = 22;
    margin: number = 4;
    visibility: number = 0.5;
    tiles?: Tile[]
}

interface Point {
    x: number;
    y: number;
}

interface HexTile extends Point, Tile {
    visible: boolean;
    lines?: string[];
    height: number;
}

export default class D3HexTiles extends React.Component<Props, State> {

    private hexShape = d3.line<Point>()
            .x(function(d: Point) { return d.x; })
            .y(function(d: Point) { return d.y; })
            .curve(d3.curveCardinalClosed.tension(0.9));

    private tiles ?: HexTile[];

    componentWillMount() {
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.tiles = this.createTiles();
        this.drawFirstChart();
        window.requestAnimationFrame(this.tick);
    }

    componentWillUnmount(): void {
        this.tiles = undefined;
    }

    drawFirstChart() {
        const { width, height, radius } = this.props;
        const svg = d3.select("div#" + this.props.id)
            .append("svg")
            .attr("class", "hex-tiles")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `${-width/2} ${-height/2} ${width} ${height}`);

        const g = svg.append("g")
            .attr("class", "hexagons")
            .attr("transform", "skewX(-20)");
        //.attr("transform", 'perspective(200px) translateX(0) translateY(0) rotateZ(-35deg) rotateY(17deg)');
    }

    drawChart() {
        const { width, height, radius } = this.props;
        if(this.tiles === undefined)
            return;

        // find the hexagon group
        const g = d3.select("div#" + this.props.id+ " svg g.hexagons");

        // find all hexagons
        const data = g.selectAll(".hex")
        //    .data(this.tiles.filter(t=>t.visible));
            .data(this.tiles);

        // create the hexagons
        const hex = data.enter()
            .append("g")
            .attr("class", s => s.visible ? "hex visible" : "hex hidden")
            .attr("transform", s=> `translate(${s.x} ${s.y})` );
        hex.append("path")
                .attr("d", s => this.hexShape( this.hexVertices(0, 0, radius) ))
                .attr("class", s => s.visible ? "tile visible" : "tile hidden");

        const visible_hex = hex.filter(s => s.visible);
        visible_hex.append("text")
                .attr("class", "head")
                .attr("text-anchor", "middle")
                .attr("y", -radius*0.5)
                .text(s => s.caption);
        visible_hex.filter(s=>!!s.lines).append("text")
            .attr("class", "detail")
                .attr("text-anchor", "middle")
                .each(function (d : HexTile, i: number) {
                    d3.select(this)
                        .selectAll("tspan")
                        .data( s => d.lines || [] )
                        .enter()
                        .append("tspan")
                        .attr("x", 0)
                        .attr("y", (l, i) => i*15-6)
                        .text(s => s);
                });

        // update existing hexagons
        data
            .attr("transform", s=> `translate(${s.x} ${s.y})` );

        // delete any removed hexagons
        data.exit().remove();
    }

    render() {
        return <div id={this.props.id} />
    }

    private tick() {
        if(this.tiles === undefined)
            return false;

        const { width, height, radius, margin, visibility } = this.props;
        const space = radius - 10 + margin;
        const dx = (space*2 -16 + margin);
        const dy = space*2 + 1;

        this.tiles = this.tiles.map( t => {
            t.y -= 3;
            if(t.y < -height) {
                t.y += Math.floor(height * 2 / dy) * dy;
                t.visible = Math.random() < visibility;
            }
            return t;
        });
        this.drawChart();
        window.requestAnimationFrame(this.tick);
    }

    private createTiles() {
        const { tiles, radius, margin, visibility } = this.props;
        const space = radius - 10 + margin;
        const dx = (space*2 -16 + margin);
        const dy = space*2 + 1;
        let hextiles : HexTile[] = [];
        if(tiles === undefined) return;
        for(let iy=-3; iy<3; iy++) {
            for (let ix = -4; ix < 4; ix++) {
                const xodd = (ix % 2) ? space : 0;
                const rnd_idx = Math.floor(Math.random()*tiles.length );
                const rnd_tile = tiles[rnd_idx];
                hextiles.push({
                    visible: Math.random() < visibility,
                    x: ix*dx, // was 28 for 22
                    y: iy*dy + xodd,
                    height: Math.random()*10,
                    caption: rnd_tile.caption,
                    detail: rnd_tile.detail,
                    lines: rnd_tile.detail ? rnd_tile.detail.split('\n') : undefined,
                    rating: rnd_tile.rating
                });
            }
        }
        return hextiles;
    }

    private hexVertices(xp:number, yp:number, radius:number) : Point[] {
        const h = (Math.sqrt(3)/2);
        return [
            { x: radius+xp,   y: yp},
            { x: radius/2+xp,  y: radius*h+yp},
            { x: -radius/2+xp,  y: radius*h+yp},
            { x: -radius+xp,  y: yp},
            { x: -radius/2+xp,  y: -radius*h+yp},
            { x: radius/2+xp, y: -radius*h+yp}
        ];
    }
}
