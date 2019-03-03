import * as React from 'react';
import { Motion, spring } from 'react-motion';
import {Section, Segment, Layer, Rating, SegmentProps, Animation } from '../rezui';
import ProgrammingLanguages from '../images/languages.png';
import Hexagons from '../images/hexagons.png';
import DataViz from '../images/dataviz.png';

class State {
    page: number = 0;
}

class Props {
}

type DIV = React.ReactElement<'div'>;

interface Pagable {
    page: number;
    children?: [] | React.ReactChild;
}

interface HeaderProps extends Pagable {
    name: string;
}

interface Skill {
    caption: string;
    rating?: number;
}

interface Skills {
    values: Skill[]
}

interface Page {
    header: {
        title: string;
        position: number;
    },
    skills?: Skills
}

const pages : Page[] = [{
        header: {
            title: 'Languages',
            position: 0.1
        },
        skills: {
            values: [
                {rating: 5, caption: 'C#/C++/C'},
                {rating: 3, caption: 'Assembler'},
                {rating: 5, caption: 'Javascript'},
                {rating: 5, caption: 'SQL'},
                {rating: 4, caption: 'Java'},
                {rating: 4, caption: 'Pascal/Delphi'},
                {rating: 3, caption: 'Perl'},
                {rating: 3, caption: 'Python'},
                {rating: 4, caption: 'Verilog'},
                {rating: 2, caption: 'VHDL'},
                {rating: 5, caption: 'GCode'},
                {rating: 4, caption: 'GL Shading Language'},
                {           caption: 'and many other dead languages...'}
            ]
        }
    }, {
        header: {
            title: 'Web Skills',
            position: 0.4
        },
        skills: {
            values: [
                { rating: 4, caption: 'React' },
                { rating: 4, caption: 'React Native' },
                { rating: 4, caption: 'D3/Data Visualization' },
                { rating: 3, caption: 'Angular' },
                { rating: 3, caption: 'Angular Native' },
                { rating: 5, caption: 'jQuery' },
                { rating: 5, caption: 'HTML/CSS' },
                { rating: 4, caption: 'PHP' }
            ]
        }
    }, {
        header: {
            title: 'Data',
            position: 0.3
        },
        skills: {
                values: [
                    { rating: 5, caption: 'MS SQL Server' },
                    { rating: 5, caption: 'MySQL' },
                    { rating: 3, caption: 'Oracle' },
                    { rating: 4, caption: 'Influx' },
                    { rating: 4, caption: 'PostgreSQL' },
                    { rating: 5, caption: 'Berkeley DB' }
                ]
        }
    }, {
        header: {
            title: 'Embedded Development',
            position: 0.3
        },
        skills: {
            values: [
                { rating: 5, caption: 'Arduino' },
                { rating: 4, caption: 'Cypress PSOC' },
                { rating: 4, caption: 'EFR32 Gecko' },
                { rating: 5, caption: 'Espressif ESP32' },
                { rating: 5, caption: 'RPi / BBB' },
                { rating: 5, caption: 'Xilinx CPLD' },
                { rating: 3, caption: 'Xilinx FPGA' }
            ]
        }
    }
];


export default class SkillsModule extends React.Component<Props, State> {

    PageItem = (props: Pagable & SegmentProps) => (this.state.page === props.page)
        ? React.createElement(Segment, props, props.children) : null;
    Header = (props: HeaderProps) => (this.state.page === props.page) ? <span>{props.name}</span> : null;

    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0
        };
        this.advancePage = this.advancePage.bind(this);
    }

    advancePage() {
        this.setState({ page: (this.state.page+1)%4 })
    }

    renderSkills(skills: Skills) {
        return (
            <React.Fragment>
                { skills.values.map( (s,i) => (s.rating===undefined)
                    ? <div key={i} className='rating'>{s.caption}</div>
                    : <Rating key={i} value={s.rating}>{s.caption}</Rating>)
                }
            </React.Fragment>
        );
    }

    renderPage(page: Page, pageNumber: number) {
        return (
            <React.Fragment>
                { page.skills && this.renderSkills(page.skills) }
            </React.Fragment>
        )
    }

    render() {
        const { PageItem, Header } = this;
        const { page } = this.state;
        const dec1Motions = [{
            height: spring(270),
            translateX: spring(-165),
            translateY: spring(17),
            rotateZ: spring(-46),
            rotateX: spring(15)
        }, {
            height: spring(190),
            translateX: spring(38),
            translateY: spring(-70),
            rotateZ: spring(-35),
            rotateX: spring(17)
        }, {
            height: spring(340),
            translateX: spring(-234),
            translateY: spring(-44),
            rotateZ: spring(-80),
            rotateX: spring(37)
        }, {
            height: spring(450),
            translateX: spring(350),
            translateY: spring(0),
            rotateZ: spring(-40),
            rotateX: spring(0)
        }];
        return (
            <React.Fragment>
                <Section className="skills" height={270} onClick={this.advancePage}>
                    <Layer z={0} className='bg-decorations'>
                        <Motion
                            defaultStyle={{ height: 100, translateX: -500, translateY: 0, rotateZ: -90, rotateX: 0 }}
                            style={dec1Motions[page]}
                        >
                            { style => <div className="bg-dec1" style={{
                                height: style.height,
                                transform: `perspective(200px) translateX(${style.translateX}px) translateY(${style.translateY}px) rotateZ(${style.rotateZ}deg) rotateY(${style.rotateX}deg)`
                            }}
                        /> }
                        </Motion>
                    </Layer>

                    <Layer z={1} absolute style={{ alignSelf: 'flex-start'}}>
                        <h2>
                            <Header page={0} name='Languages' />
                            <Header page={1} name='Web Technologies' />
                            <Header page={2} name='Data Engineering ' />
                            <Header page={3} name='Embedded Design' />
                        </h2>
                    </Layer>

                    <Layer z={10} absolute>
                        <PageItem page={0} slide={{ from:'left', start:500 }}>
                            { pages[0].skills && this.renderSkills(pages[0].skills)}
                        </PageItem>
                        <PageItem page={0} slide={{ from:'left', start:-500 }}>
                            <img src={ProgrammingLanguages} width={400} />
                        </PageItem>
                    </Layer>

                    <Layer z={11} absolute>
                        <PageItem page={1} style={{ top: 50 }} slide={{ from:'left', start:500, end: 65 }}>
                                { pages[1].skills && this.renderSkills(pages[1].skills)}
                        </PageItem>
                        <PageItem page={1} slide={{ from:'left', start:-500 }}>
                            <img src={Hexagons} width={400} />
                        </PageItem>
                    </Layer>

                    <Layer z={12} absolute>
                        <PageItem page={2} slide={{ from:'left', start:500 }}>
                            { pages[2].skills && this.renderSkills(pages[2].skills)}
                        </PageItem>
                        <PageItem page={2} style={{ top:10 }} slide={{ from:'left', start:-500, end:-150 }}>
                            <img src={DataViz} height={290} />
                        </PageItem>
                    </Layer>

                    <Layer z={13} absolute>
                        <PageItem page={3} slide={{ from:'left', start:500 }}>
                            { pages[3].skills && this.renderSkills(pages[3].skills)}
                        </PageItem>
                        <PageItem page={3} slide={{ from:'left', start:-500 }}>
                            <img src={Hexagons} width={400} />
                        </PageItem>
                    </Layer>
                </Section>

                <Section inverted>


                    <Segment>
                        <Section.Header><h2>Embedded</h2></Section.Header>
                        <Rating value={5}>Arduino</Rating>
                        <Rating value={4}>Cypress PSOC</Rating>
                        <Rating value={4}>EFR32 Gecko</Rating>
                        <Rating value={5}>Espressif ESP32</Rating>
                        <Rating value={5}>RPi / BBB</Rating>
                        <Rating value={5}>Xilinx CPLD</Rating>
                        <Rating value={3}>Xilinx FPGA</Rating>
                    </Segment>
                </Section>
            </React.Fragment>
        );
    }
}
