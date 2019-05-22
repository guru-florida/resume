import React, { Component } from 'react';
import { Section, Segment } from './rezui';
import Skills from './components/Skills';
import portrait from './images/profile.jpeg';
import CanadianFlag from './images/canadian.svg';
import AmericanFlag from './images/usa.svg';
import MicroRing from './kpi/micro-ring';
import './css/App.css';
import './css/blue-theme.css';
import './kpi/kpi.css';
import './kpi/micro-ring.css';
import D3HexTiles from "./kpi/d3-hex";


class App extends Component {
  render() {
    return (
      <div className="App">
            <Section inverted>
                <Segment className='portrait'>
                    <img src={portrait} alt="fancy meeting you here" />
                </Segment>
                <Segment>
                    <header>
                        <h1>WHO AM I</h1>
                    </header>
                    <p>Through years of working in the field I have obtained a high level of expertise in software engineering
                    & digital electronics. I have been eagerly learning the art of programming and electronics since grade
                    3 and grade 6, respectively. Consequently, at a young age I have developed a natural ability to understand
                        technology that borders on instinct.</p>
                </Segment>
                <Segment>
                    <header>
                        <h1>Contact</h1>
                    </header>
                    <p>Phone
                        (727) 366-1830

                        Address
                        9603 108th Ave
                        Largo, Florida
                        33773, USA
                    </p>
                    <h3><img className="flag" src={CanadianFlag} /> Citizenship <img className="flag" src={AmericanFlag} /></h3>
                </Segment>
            </Section>
            <Section>
                    <D3HexTiles
                        id='web-skills-tiles' width={1000} height={350} radius={75} margin={4}
                        visibility={0.26}
                        tiles={[
                            { rating: 4, caption: 'React', detail:'Strong skills using\nvirtual DOM based\nweb libraries' },
                            { rating: 4, caption: 'React Native', detail:'Native iOS/Android\napps using the power\nof React' },
                            { rating: 4, caption: 'D3', detail:'Data visualization\nusing advanced SVG\nbased declaritive\nstyle library' },
                            { rating: 3, caption: 'Angular' },
                            { rating: 3, caption: 'Angular Native' },
                            { rating: 5, caption: 'jQuery', detail:'The original power\nlibrary for Javascript' },
                            { rating: 5, caption: 'HTML', detail:'Powerful skills in\ngeneral web design'},
                            { rating: 5, caption: 'CSS', detail:'Fluent understanding\nof cascading stylesheets\nincluding CSS3\nexpressions' },
                            { rating: 4, caption: 'PHP' }
                        ]}
                    />
            </Section>
            <Section>
                <Segment cols={12}>
                    <Section.Header><h1>SYSTEM ARCHITECT, ENTREPRENEUR</h1></Section.Header>
                        <p>I have had the fortune of great mentors in my life who continue to this day to show me how to
                            build strong teams of people and develop autonomous business systems. These things have given
                            me the edge to succeed and lead with confidence in my industry.</p>

                        <p>I am recognized by my superiors for producing cost effective and superior technical solutions
                            over those of competing companies. Similarly, I am recognized by my peers and subordinates
                            as a source of inspiration and encouragement in their work. I have a strong work ethic and I
                            am committed to the companies I work for long term.</p>
                </Segment>
            </Section>
            <Section className='rings'>
                <Segment>
                    <Segment.Header><h2>Programming</h2></Segment.Header>
                    <MicroRing color='#00d1ff' title='EXPERT' limit={16} discreteLimit={10} value={15} />
                    <p>Over 15 languages</p>
                </Segment>
                <Segment>
                    <Segment.Header><h2>Firmware Development</h2></Segment.Header>
                    <MicroRing color='#00d1ff' title='ADEPT' limit={100} discreteLimit={10} value={78} />
                    <p>Kernel drivers, RTOS, Device Tree</p>
                </Segment>
                <Segment>
                    <Segment.Header><h2>Electronic Design</h2></Segment.Header>
                    <MicroRing color='#00d1ff' title='ADEPT' limit={100} discreteLimit={10} value={78} />
                    <p>Embedded CPUs, Digital circuits</p>
                </Segment>
                <Segment>
                    <Segment.Header><h2>PCB Design / EDA</h2></Segment.Header>
                    <MicroRing color='#00d1ff' title='ADEPT' limit={100} discreteLimit={10} value={78} />
                    <p>High speed circuits, DFM</p>
                </Segment>
            </Section>
            <Section inverted vertical>
                <Section.Header><h1>Work Experience</h1></Section.Header>
                <Segment cols={12}>
                    <h4>2009 - Present</h4>
                    <h2>Ineoquest Inc, div of Telestream LLC</h2>
                    <h3>Principle Software Engineer, Lead AMP</h3>
                    <p>Primarily led the development of Big Data and analytical systems for digital set-top and Internet
                        video MSOs. Designed control and analytical HTTP/Rest APIs.</p>
                </Segment>
                <Segment cols={12}>
                    <h4>2014 - Present</h4>
                    <h2>Flying Einstein, LLC</h2>
                    <h3>Sole Proprietor</h3>
                    <p>Designed and manufactured multi-rotor/drone flight control electronics and GPS positioning systems.
                        Now exclusively licensed to RobotShop.com.</p>
                </Segment>
                <Segment cols={12}>
                    <h4>2001 - 2009</h4>
                    <h2>Record Transcripts Inc</h2>
                    <h3>Chief Technology Officer</h3>
                    <p>Developed management applications for the capture, archival and transcription of digitally recorded
                        judicial court proceedings in Tampa, Florida.</p>
                </Segment>
            </Section>
            <Skills />
      </div>
    );
  }
}

export default App;
