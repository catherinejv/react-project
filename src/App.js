import './App.css';
import React, { useState, useEffect } from 'react';

let taskList = [
  {id : 1, task : "Design" },
  {id : 2, task : "Html Markup" },
  {id : 3, task : "Chose the best technology" },
  {id : 4, task : "Create the web application environment" }
]


function Item(props){
  return(
    <li>- {props.title}</li>
  )
}

class List extends React.Component{

  render(){
    let initialList = this.props.list;
    if(initialList && initialList.length > 0){
      let items = initialList.map((item) =><Item key={item.id.toString()} title={item.task}/>)

      return <section>
        <h3>Liste d'items</h3>
        <ul>{items}</ul>
        </section>
    }
    return( 
      <section>
        <h3>Liste d'items</h3>
        <p>Votre liste est vide</p>
      </section>)
  }
}


function UserWelcome(props){
  return (
      <header className="App-header">
      <h1>Bonjour {props.name}</h1>
      </header>)
};

class GuestWelcome extends React.Component{
  constructor(props){
    super(props)
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) 
  {
    this.setState({value: evt.target.value});
  }

  handleSubmit(evt) 
  {
    if (this.props.getCurrentName){
      this.props.getCurrentName(this.state.value);
    }
    evt.preventDefault();
  }

  render(){
    return ( <header className="App-header">
          <h1>Bienvenue</h1>
          <p>Veuillez vous inscrire</p>
            <form onSubmit={(evt)=>this.handleSubmit(evt)} className="App-form">
            <label>Nom complet
            <input type="text" value={this.state.value} onChange={(evt)=>this.handleChange(evt)}></input>
            </label>
            <input type="submit" value="Envoyer" />
            </form>
          </header>)
  }
  
};



class Welcome extends React.Component{

  constructor(props){
    super(props)
    this.state = {name: ''};
  }

  setName(newName){
    this.setState({
      name:newName})
  }
  

  isLoggedIn = this.props.isLoggedIn;
  render(){
    if(this.isLoggedIn)
  {
    return <UserWelcome/>
  }
  if(this.state.name === ''){
  return <GuestWelcome  getCurrentName={(newName) => {this.setName(newName)}}/>
  }
  return <UserWelcome name = {this.state.name}/>
  }
}

function UserProfile(props){
  return (<section>
    <h2>{props.user.description}</h2>
    <Avatar src={props.avatar.src} srcset={props.avatar.srcset} width={props.avatar.width} caption={props.user.name}></Avatar>
  </section>)
}

function Avatar(props){
  return (<figure>
    <img src={props.src} alt={props.caption} width={props.width}/>
  </figure>)
}

function FormattedDate(props){
  return(
    <h4 className="clock-h">Il est {props.date.toLocaleTimeString()}</h4>
  )
}

class Clock extends React.Component{

  constructor(props){
    super(props);
    //Seul endroit où on peut prendre this.state est le constructeur
    this.state = {date : new Date()}
  }

  componentDidMount(){
    this.timerID = setInterval(
      ()=>this.tick(),1000)
  }

  tick() {
    //Utiliser setState permet que le composant soit mis à jour après que le constructor ait été appelé
    this.setState({date:new Date()});
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  render(){
    return (
        <section>
          <h3>Date mise à jour dans un state</h3>
          <FormattedDate date = {this.state.date}/>
        </section>
        )
  }
}

class FlashControl extends React.Component{
  constructor(props){
    super(props);
    this.state = {flash:true};
  }

  toggleFlash(){
    this.setState((state)=>({flash:!state.flash}))
  }

  render(){
    let button
    if(this.state.flash){
      button = <FlashBtn flash={true} title="FlashingBtn"/>
    }
    else{
      button = <Btn
      title = "not flashing"
      />
    }


    return (
    <section>
    <h3>Changement d'attribut et setInterval sur un bouton</h3> 
    {button}
    <Btn
    onClick = {() => this.toggleFlash()}
    title = {this.props.title}
    />
    </section>)
  }


}

class FlashBtn extends React.Component{
  constructor(props){
    super(props);
    this.state = {visible:true};
  }

  componentDidMount(){
    if(this.props.flash){
       this.flashID = setInterval(()=>this.flash()
    ,1000)
    }
  } 
  
  componentWillUnmount(){
    if(this.props.flash){
      clearInterval(this.flashID)
    }
  }


  flash(){
    this.setState(state =>({visible:!state.visible}));
  }

  handleClick = (e) =>{
    console.log(this)
    console.log( e)
    this.setState(state =>({visible:!state.visible}));
  }

  render(){ 
    return (<p><button className = "App-btn"
      style={{
        visibility: this.state.visible ? "visible" : "hidden"
    }} 
    onClick={(e)=>this.handleClick(e)}
    id={this.props.id}
    control = {this.props.control}
    >{this.props.title}</button>
    </p>)
  }
}

class Btn extends React.Component{
  constructor(props){
    super(props);
    this.state = {visible:true};
  }

  render(){ 
    return (<p><button className = "App-btn"
    onClick={(e)=>this.props.onClick(e)}
    >{this.props.title}</button>
    </p>)
  }

}

const profile = {
  user : {
    name:"React",
    description:"Démonstration de fonctionnalités React",
  },
  avatar:{
    src:`${process.env.PUBLIC_URL}/logo512.png`,
    srcset:"`${process.env.PUBLIC_URL}/logo192.png 1x`, `${process.env.PUBLIC_URL}/logo512.png 2x`",
    width: "100px"
  }
}

const scales = {
  c: {name: 'Celsius', symbol: '°C'},
  f: {name: 'Fahrenheit', symbol: '°F'}
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function TemperatureInput(props){

  const scale = props.scale;

  //const [temperature, setTemperature] = useState('');

  const temperature = props.temperature;


  const handleChange = (value) =>{
    props.onTemperatureChange(value);
    //setTemperature(value)
  }

  return(
    <fieldset>
      <legend>Saissez la température en {scales[scale].name} </legend>
      <p>
        <input value = {temperature} onChange = { (evt) => handleChange(evt)}></input>
        <span> {scales[scale].symbol} </span>
       </p>
    </fieldset>
  )
}

function Calculator(props){

  const initialValues = {                   
    temperature: '',
    scale: 'c'
    };

  const [values, setValues] = useState(initialValues); 

  //Pour appeler si à la place du callBack dans setState au besoin
  /*useEffect(()=>{
    console.log('test',values)
  })*/

  //Si on veut changer seulement des propriétés spécifiques du state
  /*const handleChange = (e) => {                
    setValues({
      ...values,                                // spreading the unchanged values
      [e.name]: e.value,          // changing the state of *changed value*
    });
  };*/

  const handleCelsiusChange = (e) => {
    setValues({temperature: e.target.value, scale:"c"})
  }

  const  handleFahrenheitChange = (e) => {
    setValues({temperature: e.target.value, scale:"f"})
  }

  const celcius = values['scale'] === "f" ? tryConvert(values['temperature'], toCelsius): values['temperature'];
  const fahrenheit = values['scale'] === "c" ? tryConvert(values['temperature'], toFahrenheit): values['temperature'];

  return(
    
    <section className="Temperature">
      <hgroup>
        <h3>Convertisseur de température </h3> 
        <h4> Échanges de données entre composants fonctionnels</h4>
      </hgroup>
      <TemperatureInput scale = "c" temperature = {celcius} onTemperatureChange = {(e)=>handleCelsiusChange(e)}/>
      <TemperatureInput scale = "f" temperature = {fahrenheit} onTemperatureChange = {(e)=>handleFahrenheitChange(e)}/>
    </section>
  )
}


function App() {
  return (
    <div className="App">
        <Welcome isLoggedIn={false} name={profile.user.name}></Welcome>
      <main>
        <UserProfile  user={profile.user} avatar = {profile.avatar}/>
        <FlashControl title="FlashToggle"/>
        <List list={taskList}/>
        <Calculator/>
        <Clock/>
      </main>
    </div>
  );
}

export default App;
