import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"

const list=[
    {keyName:"Q",
     audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
     soundName:"Heater 1"
    },
    {keyName:"W",
    audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    soundName:"Heater 2"
    },
    {keyName:"E",
     audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
     soundName:"Heater 3"
    },
    {keyName:"A",
    audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    soundName:"Heater 4"
    },
    {keyName:"S",
     audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
     soundName:"Clap"
    },
    {keyName:"D",
    audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    soundName:"Open HH"
    },
    {keyName:"Z",
     audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
     soundName:"KicknHat"
    },
    {keyName:"X",
    audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    soundName:"Kick"
    },
    {keyName:"C",
    audioUrl:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    soundName:"Close HH"
    }
]

  class Display extends React.Component{
    render(){
        return (
            <div  id="display">
              <div className='control'>
                <span>
                  {this.props.displayStatusText}
                </span>
                <input onClick={this.props.onClick} type="checkbox" name="switch-button" id="switch-label" class="switch-button__checkbox"/>
                <label for="switch-label" class="switch-button__label"></label>
              </div>
              <div id="currentValue">
                <span>{this.props.value}</span> 
              </div>
              <div id='volume'>
               <input type="range" id="vol" name="vol" min="0" max="1" step="0.1" onInput={this.props.manageVolumen}/>
              </div>
            </div>           
        )
    }
  };
    
  class DrumPad extends React.Component{
    render(){
        return(
            <div class="drum-pad" id={this.props.soundName} onClick={this.props.onClick}>
                {this.props.name}
                <audio 
                id={this.props.name} 
                src={this.props.audioUrl}
                class="clip"
                type="audio/wav">   
                </audio>
            </div>          
        )
    }
  };
 
  class App extends React.Component{
    constructor(props){
      super(props)
      this.state={
        displayStatus:true,
        displayStatusText:"Apagado",
        active:"",
        volumen:1
      }
    this.handleClick=this.handleClick.bind(this)
    this.handleClickPad=this.handleClickPad.bind(this)
    this.setVolumen=this.setVolumen.bind(this)
    this.keyCapture=this.keyCapture.bind(this)
  };

  setVolumen(e){
    this.setState({
    active:(e.target.valueAsNumber*100).toFixed(),
    volumen:e.target.valueAsNumber
    })
  };
  
  playSound(sound){
    sound.volume=this.state.volumen
    !this.state.displayStatus&&sound.play()
  };

  setStyle(item){
    document.getElementById(item).classList.toggle("active")
     setTimeout(()=>document.getElementById(item).classList.toggle("active"),200)
    if(!this.state.displayStatus){
      document.getElementById(item).style.backgroundColor="#fe5e41"
      setTimeout(()=>document.getElementById(item).style.backgroundColor=null,250);
    }
  };

  handleClick(){
    this.setState({
      displayStatus:!this.state.displayStatus,
      displayStatusText:this.state.displayStatus?"Encendido":"Apagado",
      active: this.state.displayStatus&&""
    })
  };

  handleClickPad(e){
    let drumActive=e.target.textContent
    if(!this.state.displayStatus){
      this.setState(()=>({
      active: e.target.id
      }))
    }
      this.setStyle(e.target.id)
      this.playSound(document.getElementById(drumActive))
  }

  keyCapture(e){
    let drum=document.getElementById(e.key.toUpperCase())
    if(drum&&!this.state.displayStatus){
      this.setState(()=>({
        active: drum.parentNode.id
        }))
      }
        this.setStyle(drum.parentNode.id)
        this.playSound(drum)
  }
    
  render(){
      window.onload = function() {
        document.addEventListener("contextmenu", function(e){
          e.preventDefault()
        }, false);
        document.getElementById("drum-machine").focus()
       };
       
      return (
        <div className="container" id="drum-machine"  tabIndex="0"  onKeyUp={this.keyCapture}>
          
          <div className='drums'>
         
             {list.map(item=><DrumPad 
                          key={item.keyName}
                          onClick={this.handleClickPad}
                          status={this.state.displayStatus}
                          name={item.keyName}
                          audioUrl={item.audioUrl}
                          soundName={item.soundName}
                          style={this.color}
                          />)}
          </div>
              <Display
                manageVolumen={this.setVolumen}
                displayStatusText={this.state.displayStatusText}
                onClick={this.handleClick}
                value={this.state.active}/>
        </div>
      )
    }
  }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);