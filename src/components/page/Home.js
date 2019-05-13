import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid"
import Input from '@material-ui/core/Input';
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button';
import XMLParser from 'react-xml-parser';


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            scroll: null,
            url: "",
            isLoading: false,
            data: null
        }
        this.onChange = this.onChange.bind(this)
        this.keyPress = this.keyPress.bind(this);
        this.fetch = this.fetch.bind(this)
    }
    componentDidMount(){
        this.setState({scroll: window.pageYOffset})
        window.addEventListener("scroll", () => {
            this.setState({width: window.pageYOffset})
            });
            
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", () => {
            this.setState({scroll: null})
        });
    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    keyPress(event){
        if(event.keyCode === 13){
            this.fetch(this.state.url)
        }
     }
    fetch(url){   
        this.setState({isLoading: true})
        var xml = new XMLParser().parseFromString(url);    // Assume xmlText contains the example XML
        this.setState({
            data: xml.getElementsByTagName('item'),
            isLoading: false
        })
        }

    render() {
        return(
            <div className="App" style={{color: "white", overflow: "hidden"}}>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={40}
                style={{padding: "50px 0px 50px 0px", minHeight: "100vh"}} >
                    <Grid item xs={9} lg={4}>
                        <h1 
                        style={{
                            fontWeight: 900,
                            lineHeight: 0.9,
                            fontSize: 60,
                            margin: 0
                        }}
                        >Instagram News<br/><span style={{fontWeight: 300}}>Code visualisieren</span></h1>
                    </Grid>
                    <Grid item xs={9} lg={5} style={{color: "#003a5a"}}>
                        <Paper>
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={32}>
                                <Grid item xs={10}>
                                    <h2>Meldung suchen</h2>
                                        <Grid container>
                                                <Grid item xs={10}>
                                                    <Input
                                                    name="url" 
                                                    placeholder="Code einfügen"
                                                    fullWidth={true}
                                                    onChange={this.onChange}
                                                    onKeyDown={this.keyPress}
                                                    multiline
                                                    rowsMax={6}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button onClick={() => this.fetch(this.state.url)} >Suchen</Button>
                                                </Grid>
                                        </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    {this.state.data != null ?
                    <Grid item xs={9} style={{color: "#003a5a"}}>
                        <Paper>
                        <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                            spacing={40}
                            style={{marginTop: 10}} >
                                <Grid item xs={10}>
                                    <Grid container spacing={40}>
                                    
                                        {this.state.data.map((item, i) =>
                                            <Grid item xs={12} md={6} lg={4} key={i}>
                                                {this.state.data[i].children.length === 12 ?
                                                    <div>
                                                        <h3>{this.state.data[i].children[8].value}</h3>
                                                        <h2 style={{minHeight: 99}}>{this.state.data[i].children[0].value}</h2>
                                                        <img 
                                                            alt={this.state.data[i].children[0].value}
                                                            src={this.state.data[i].children[3].attributes.url} 
                                                            onClick={()=>window.open(this.state.data[i].children[3].attributes.url)}
                                                            style={{width:"100%", cursor: "pointer"}} />
                                                        <p>{this.state.data[i].children[2].value}</p>
                                                        <p>{this.state.data[i].children[10].value}</p>
                                                    </div>
                                                : 
                                                <div>
                                                    <h3>{this.state.data[i].children[10].value}</h3>
                                                    <h2 style={{minHeight: 99}}>{this.state.data[i].children[0].value}</h2>
                                                    <img 
                                                        alt={this.state.data[i].children[0].value}
                                                        src={this.state.data[i].children[3].attributes.url} 
                                                        onClick={()=>window.open(this.state.data[i].children[3].attributes.url)}
                                                        style={{width:"100%", cursor: "pointer"}} />
                                                    <p>{this.state.data[i].children[2].value}</p>                                                            
                                                    <p>{this.state.data[i].children[12].value}</p>
                                                </div>
                                            }
                                            </Grid>
                                        )
                                    }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    : null}
                </Grid>
            
            <header >
                
            </header>
            </div>
        )
    }
}

export default Home;