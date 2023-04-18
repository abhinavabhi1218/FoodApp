import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./game.css";
import "./mine.css";
import "./style.css";
import "./responsive.css";
import "./form.css";
import locker from "./mines/locker.png"
import lockerOpen from "./mines/locker-open.png"
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";


function Game() {
  // const {str} = useParams();
  // // alert(str);
  // const [data, setData] = useState([]);
  // const [userPrise, setUserPrise] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`http://localhost:8081/game/ripe9CT8K,laysPJtjvXNO5eky`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         param1: str,
  //         param2: 'value2'
  //       })
  //     });
  //     const json = await response.json();
  //     setData(json);
  //     setUserPrise(json['play and win ']);
  //     // console.log(json['play and win ']);
  //     console.log(userPrise);
      
  //   };
  //   fetchData();
  // }, []);
  const { str } = useParams();
  const [data, setData] = useState({});
  const [userPrize, setUserPrize] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8081/game/${str}`,
          {
            param1: str,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setData(response.data);
        setUserPrize(response.data['play and win ']);
        console.log(userPrize);
        console.log(str);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [str]);
console.log(data);
const keys = Object.keys(data);

  const firstKey = keys[0];
  // if (firstKey==="play and win "){

    return (
      <div>
        <main>
          <Navbar/>
          <div className="mainContainer">
            <div className="centerBox">
              <div className="gameAreaBox">
                <div className="gameControl">
                  <div className="balance-add">
                  {/* <form method="post" action="">
                      <fieldset>
                        <p>Amount in ₹</p>
                        <input
                          placeholder="₹1000"
                          id="invest_input"
                          type="Number"
                          tabindex="1"
                          autofocus
                          required
                        />
                      </fieldset>
                      <fieldset>
                            <p>No of Cops</p>
                            <input placeholder="Enter number of cops" type="Number" tabindex="1"  autofocus min='1' id="myInput"  max='24'required/>
  
                        </fieldset>
                        <fieldset>
                            <div className="no-of-cops">
  
                                <ul>
                                    <li className="cop myButton"><a  className="myButton" >3</a></li>
                                    <li className="cop myButton"><a  className="myButton" value="5">5</a></li>
                                    <li className="cop myButton"><a  className="myButton" value="10">10</a></li>
                                    <li className="cop myButton"><a  className="myButton" value="24">24</a></li>
                                </ul>
                            </div>
                        </fieldset>
                      <fieldset>
                        <button
                          name="submit"
                          type="button"
                          id="submit_button"
                        
                        >
                          Start BET
                        </button>
                      </fieldset>
                      <fieldset>
                        <button
                          name="submit"
                          type="button"
                          id="#clime_btn"
                        
                        >
                          clime Amount
                        </button>
                      </fieldset>
                    </form> */}
                      <form id="contact" >
                                  <fieldset>
                                      <p>Amount in ₹</p>
                                      <input placeholder="₹1000" type="number" tabIndex="-1" id="invest_amount" required  value={userPrize}/>
                                      {/* <span className="info">
                                         </span> */}
                                  </fieldset>
  
                                  <fieldset>
                                      <p>Number of cops</p>
                                      <div className="custom-select" id="myInput">
                                          <select>  
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                              <option value="6">6</option>
                                              <option value="7">7</option>
                                              <option value="8">8</option>
                                              <option value="9">9</option>
                                              <option value="10">10</option>
                                              <option value="11">11</option>
                                              <option value="12">12</option>
                                              <option value="13">13</option>
                                              <option value="14">14</option>
                                              <option value="15">15</option>
                                              <option value="16">16</option>
                                              <option value="17">17</option>
                                              <option value="18">18</option>
                                              <option value="19">19</option>
                                              <option value="20">20</option>
                                              <option value="21">21</option>
                                              <option value="22">22</option>
                                              <option value="23">23</option>
                                              <option value="24">24</option>
                                          </select>
                                      </div>
                                  </fieldset>
                                  <fieldset>
                                  <p id="next">Profit on Next Tile </p>
                                      <button 
                                       
                                       id="next_value_rewards"
                                          data-submit="...Sending">0.00</button>
                                  </fieldset>
                                  <fieldset>
                                  <p id="current">Total profit</p>
                                      <button 
                                        
                                        id="current_value_rewards"
                                          data-submit="...Sending">0.00</button>
                                  </fieldset>

                                  <fieldset>
                                      <button  name="submit"
                                        type="button"
                                        id="submit_button"
                                          data-submit="...Sending">Start BET</button>
                                  </fieldset>
                                  <fieldset>
                                      <button  name="clime"
                                        type="button"
                                        id="clime_button">claim Amount</button>
                                  </fieldset>
  
                              </form>
                  </div>
                </div>
                <div className="gamePlayActivity">
                  <div className="result-board">
                    {/* <div className="speed-count">
                      <ul>
                        <li className="active">
                          <a href="#" title="1.08x">
                            1.08x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="1.23x">
                            1.23x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="1.42x">
                            1.42x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="1.64x">
                            1.64x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="1.92x">
                            1.92x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="2.25x">
                            2.25x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="2.68x">
                            2.68x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="3.21x">
                            3.21x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="3.90x">
                            3.90x
                          </a>
                        </li>
                        <li>
                          <a href="#" title="4.50x">
                            4.50x
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                  <div className="main-section min-game">
                    <div className="locker-area wow fadeInRight animated">
                      <div className="all-locker image-container">
                        <ul>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                alt="locker"
                                src={locker}
                              />
                              <img
                                className="open"
                                id="1"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                               
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="2"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="3"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="4"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="5"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="6"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="7"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                               
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="8"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="9"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="10"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                               
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="11"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="12"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="13"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="14"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="15"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="16"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="17"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
          
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="18"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="19"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="20"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="21"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="22"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="23"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="locker">
                              <img
                                className="close"
                                src={locker}
                                alt="locker"
                               
                              />
                              <img
                                className="open"
                                id="24"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                          <li className="locker-alert">
                            <a href="#" title="locker">
                              <img
                                className="close"
                                
                                
                                src={locker}
                                alt="locker"
                              />
                              <img
                                className="open"
                                id="25"
                                src={lockerOpen}
                                alt="locker"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
      
    );
  }
 
// }

export default Game;
