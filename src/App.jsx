import React, { Component } from 'react';
import './App.css';
import logo from './logo.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Tv from "./container/tv/tv";
import Keranjang from "./container/tv/Keranjang";
import firebase from 'firebase';
import firebaseConfig from './firebase/config';

function App() {
  return (
    <Router>
      <div>
        
        <ul className="menu">
        <center>
          <li>
            <Link to="/"><span>Home</span></Link>
          </li>
          <li>
            <Link to="/list-product"><span>List Produk</span></Link>
          </li>
          <li>
            <Link to="/keranjang"><span>Keranjang</span></Link>
          </li>
          <li>
            <Link to="/about"><span>About</span></Link>
          </li>
          <li>
            {/* <Link to="/login"><i className="fa fa-user-circle"></i></Link> */}
            <Link to="/login"><span>Login</span></Link>
          </li>
          </center>
        </ul>
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/list-product">
            <Products />
          </Route>
          <Route path="/keranjang">
            <Keranjangs />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <center><p id="title-1">AC Store</p>
      <p id="p5">Menyediakan banyak pilihan merek AC berkualitas</p></center>
      {/* <img id="img-bg" src={logo} alt="Gambar" />s */}
      <center><p id="t-c-1"></p></center>
      <div id="company">
        <img src="https://toko361412219.files.wordpress.com/2017/12/logo-polytron.jpg" />
        <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/sharp-logo.png"/>
        <img src="data:image/png;base64,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"/>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATcAAACiCAMAAAATIHpEAAABUFBMVEX///8NJqfs7Oz5+fkNJagOJqUNJakOJKoOJqMEIqUNJ6Hr7fQKKaEAFpnQ1vCmsNsTJpgAE5P3+f0LIIpMWbaKjtEAGpK3vdny9v89R6kAHaTc3uoAFJAAHZkmNp0MJK4ACJkAFZ8NIrAAHIzg4vUAFKUsO5uyueS0udwAEpoAE5vm6fabosUNIbQUIJsAGIpTXKoTJ5UAAJwAAHuYm9EAAIdgaKlETaE+SaXg4ODIzeyxuOSmrN7Z3fS/xOqxt9+Dibd6grpsdbcfK49faLKZotJ8hclOWakuO5AeLIZsdMHq8P/Bx9kzQYwpNo49T5OBkswpNqdvebBjasBSX6WmrMxhbqRLUrNMVIcJG3fCxNAmNqgnN5mDj9qhp995fs+OjKuMi7MLI8FZX8UhKXtKTJQ0OoMwOK6fnq1ESbeLmcCstMsABLBKVHp1gbJudM/jX6yeAAAWtElEQVR4nO2d/1/ayLrHzTGTSUKCAWzAQBgI4ooIGNcKh2qVb2p73Fa3unva9Wy7e07vntPeu/f//+0+z0wAq7ZCtGrvK5/d9RVCCJk3M8+X+bYzM5HC6a9/iTS1Zmdm/nLfP9w3qNmIWyhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzj9v+CWTCZj1Wy83X765Ml38M/WBmjrydaTJztP2+14thpLJm/5K79ZbrHYdvvpzmC30+3Pzy8spRqNRi5QQshMwLHNz/QOmmv9bmfwXXs7djsEvy1uyVgsG19e3djr7x886/mW7VZM03E0TZNlWZLg38uSJVmmDsg0TVe3zprP9wZPt6uZmz3Jt8ItA7iOuidAy60UCpWi41EdRCRNuZLWp1KoIhEVLvc8j5UL6wXHWnj+If238M/z4Ln9LXt4erT5wwvfhKoFFUvTDV1XCcJQNApiyiTcAC6CMwz4LJEpY5pr9168PEovhnush8stGdt+utE9aeUbtu3ylgikQPKw9SE0PHE9NknGTxGC5HQVmi1VVAL8VM2sHPcHiyFM3oPklswerv64v/Q4sVJ0HKxSKGAky4CJMkoDZAADG98E3GROm0j8g/gxqHfwwvNUC0zk/GDqWvfAuCWz2+ndV3mzWFzRsH6owyaGpURqsoxnueA0mjhDnYibEBBTdcOydISON5JkYlglu/Q8HZvqQR8Qt0x89c951akUig7WLqRiWFAvdCgeHgoZ2Fp5dcOWh+9MzA0/hPUO4FP8ArB2hioDSSKzSuOHuWma6wPhtp0+2s+rhbIHMQXWCSiKrGEDVZAL2nGFFz8wZ9zUDWvQZO2UY5OhdhKowmNfArf2PCrrOjXt5vLkD3z/3GLxrc2mn3DB9kM14xiIKgWUKDRLIskBpbFbOM/kemwjeFi3RtZO4v4CbspkcBKUSm6pP7Gdu19u1acbJ0sJiMYmLvzXkgzVkGn2s9MJn/z+uFXbu2tWAsJ9aCnsvrGhqSQKU6zUxmRPfy/cZmPp3ZMlt+hI3LBDJHvf2CT0rgRMnZLrTFaEu+cWX9237JyrKYwJbA+CG/gGA8BBWx1MUog75pZN/3hgVTCYRQMv84gWc8b7xiZRyHcNA52G1jucoCB3yC25vXHSS6w4FFMmgsGTAQ6NPgxuMkQ8mLwaqmLvTxDI3RW3THt3P1d2HHxECSoZZDqW72NIC3kimSAE+9rcFAJBsASBnCzndq4vz51wq65uHtSLZYYxpyKr+LvK1KvVaoyH/TyoukoAVIS20k3JjhOtz0U8mPPLjMngHVaePwRusdNXlusSDVIbEjwhDz4xWfp8MURSCvkjplwQl06STX0BG0/NMDvDf8Zx7xV4iS55f1Tvm1t1+ZVvmgS7fa4I9b8sck43gSZuxqFgahtkZ5+9UCeelr1XbrH0Ty9ymufxhggPHaa8qoWpPcTyN8ooeL+bxOudfC03yavfI7fZ9l4+50poaYlEvvSkVz8+4dkoWmuR2N+Um8qpDS3dly6VPOu+uM1uD342VzSKEYZhkSmS7/PcKDYqjPSmbeFXSXSqYy/vl6u+qitO637sW/K0X6qUPajxFHs48EE5iWmslOBGVAnQY4x8MxMHZk30sau6MBmf/yHgK83N68t4+9zij16UbAggsadL+EQl6N2flpsi6b5FZMK7lm6CDbgFmTDaOfJFbvDN9gSdIrfMLfnx768f5+oaVHeDMvyrE40xHOGUiKaNHlfWRhLnLr5GbhATlEoNPiwzKmlw0bl7XLzhucvGdEjdtW270XAJVjj6BW6y5C5N0GV+y9yyb94cpjdaSrlGIYnC4Q9F+iWfz5/l+R+dKqoELVcxgnNnx3kDE1U9nx9e9YsGyKB4kubmT4520umtvX3fZRQ7HRUKNzuGf1Voub/w649VNJ6aEdzg+NjADvRj/hIOeT1VrdJS/xHe6h/zvl1X2BVeZmj3FHmixP7r+IX4qwqxCFE8VS++qoJi4k/TY75Uk1RnH17EUNXqWlFX6VI7Jq6KVR+VCfUkXXWPt0a/e7ajOYz6BvV+5dc9sajsPsJPx9qWTOGGb4NPVxcPPFVy52J4vLEO/BWq2Qero+H5xa5lsstjrsTQ0QVpEnMOJhmhuS1uycPZT14fuZIC5SfqyvmOwG6R+qSm6k7/3JVFnTjz41R6UNYVT6ZO/xOnlu55nmVQJ81fxS1KcnP8MJYCbvrKo/H9HODW5ofL6wSrd2n/k7ji6QvrirFDVWEUrIrnlSYaZbgdbsnl5uqFM/NlRgike4nzj/FrhVoEKqFzMj73RNNJ8RzHuQLkicQ5vhALbBQ9ndB6wM1XVHvIDTyHYY65tSE9qY+4EUrrSxdGDeZeq5cDEWy8hlVnlbvrt8wsv0wNK3f2MKg5cxVwC5SqJdGbJSi0HyuGyoiuneMWt1SpeO5hlwsGYWpjeCYb3Lhqaboy5iaNuamyaiTG3KoLqhxwSxdkqEWNi/YquV+uXXIHOCQEDtxem2w08ObckoN8RTN/FC+W/9U4EV+cXQEjRZi2JIi9E2VKQeVi6pAbfvlMtkfk4hZ/yU+mCxZh9ZTAndk8eBkXt27WdcrMK7jpn3Kb2XTH3CCC1FJBddvY77eDo/XaRccgU9UitZr7w/WpwujRb8Qt/f6xo7CysGLJkxIriIZZZTUJzIXzUrzxE6eZaWqqDv7UEZFlDB8y2dIUk39GPHK6AvWNBKnOzrpXWBNf1LUhsnHG3Eb2TYVkLODG6+ZOTnLFZYJb0BR2HpcLS8ngKy51lMqKbqm18tmE2G7ILTn3MuU6siWVfxUnTkqeKXr9Mr9QyTJqRVERq01R7X4yJR1iA6fLX2U/4t81U6lj7YodBoU1oNE4ogDL61Q7EPXweUJX5FE71aQRN7D8Q/vGjUTV18zT4FaQp7lB923H9LRn4q6Hpct+QSaqUTrYnrTkN+K2vZYzJQg28mpQ32baPVPvrq6uDgZHviT5Vq0sjMth0Fh2K4oOIW15j7/K7uLf7oqTR6pv3gWF1WmNUlHC5ImtHQ/gfqurP3tgfqyhP2VyYuRPmTLkdorok/PFIbd1aI71gFvXVqSe4NK2L/kFWfJqiUkb6cyNuFU7KRsiLYnJOlkJ7NvM9knDLFQSlfUyBO6G4RWEdTr9XpiWnaKk62Nu3I1u2M48v+adKGxBpR4rBqYoc2SWi4lCeaVU96Bw9RE3ZcRNA0cYcHv6G/7dNVeG3CDncIMYp1uC5r/Wff68252vj7iBw2WQBusS84qtybGF55ZcfeFScEKiS9Y6GIYNs6dLReJbjOk6JToN7NTWY1HKeBESV2noPxcX8FPpnsn5dXihZ9p1olDq7A2/aPuVW7d0qisM4pNx/Daub+fa6dMmMjosFcV76QJlujbk5kJMa5pOsVh2zlU3nIqp63WJJjanmZEUlhvUKwuAgbWCrIlRIzWOJKobPdv73etZEI9qP4tA/VHhSJQSp1HJI255rI3Z1y6HdCK4xQ2igCHLj4OudNPWajLD+O06bim8YaZVETb2U24a8XuQhx1D1OvQYfP0mOH7hDE3dTRV+cNxy2xYiTrvByRUxg4PyUidi5LiXafGfAtMrRsEtP1K0DfzT1c3CCkH3HzEEDuwMQyJ/WtXfNjArhBq7o/BJQfHps5q0MLr13Br8HvsPRY+/RNuP1bmFyFHw/+2XvsjbtT3Dc8zm+npCITi9uZloeZhpi1hXAnGQWGKs753LmKc62keNgZXsEg2nR/EG3vgUFVSFsVctPBtCF7QXMdT4lrgBtGUp6YOno7vt/g+RT1Ig6zruPGwdflKboVXw7sdpoyRO+BdfLnN63sqP1UYboNUAiybjH0WlHlUNVScO8pWFs4VNN2reWD6bFGA2JJ2JiZvr5qySobud9EShu11jBd2l5+MWzp2dPrPUlZnXJrYievp6nXc2raPP0E2JbK+z3FrF71z+ZXn9Caa2vCJpudW7a/UPIMLDA5jimpAEqjpBis7/XH8M3CYrtKSOLHoa744ipsauJIhN2MBy/Tbe/x7NOZGxPAX8/Knozq8feYQWb2mnbZzPIJOvn/HX15sp9XA8h+6w7hXhrjY3gwxp3xqbvFW0RMdkiofB0X7pimkXrKsulkp7Q6dUuyFBh61FwToOTkI4RdN+IA+4uZijdr5CV88L+zyk9s+DuRotd/LTrmceN8efvFeQmL0Om5umUfUv70TX/uJXzDV/H8Fca899AuSlntxoUdiMk3Lba7nQvSpg1XDudkEjLwER069td98+feXTSPXGhrYTVNXi/PieCMnFcXjVf+ACjrmtoJY2uhIk6114Sy2j4Gb2ms2m+9fruWdUif4JdrgVL1ruMXdWhMvb7/jLy/FIdZFbit+Z1rLJjQltw2zruK8HUolHAHnA2wE4hHz6UxydnY2c6I5btBxtGtrNIhvwRuQwEPMvCp6RC8IbnHVRJoZhFEtrYsrFvME4ql9LM7szFxZTQSeeLtHmGKN8lM6zLMsDxK3oP9t29dsNLLJf/OXEPcqqjvKFyTFD7g1VAMCXeY2+vFpYJ3TdNw6tnYhPyGGCrGIlxDNKXlisvK+yCc3bFZbF2Wb2XeIHRR/t1Cj6vqWKD4R/Si8ipjlXX5yMa/JktYScV+6zGgwr2r7jBDVEj/KNrjrYX0rATdaCepbyhAB81/Fp9fBwdSDnqEfcx7zx3kWZU5umonQFzQVt27i8gQ/HQecWMBt5qTolZviOf/hKlQLcC7VWP1AnD7NMWIURB4Up9qou2t1zM1hrPYf4X7TpueVhnUMLGniAz+OITdxOvYaRwVyImrddiW3OV6xhv1v1A2eZ+OxV7ZEo0yv1Gpa6f3pucBpWk3DrVPx6GVuEga+QaOZmSuVvt8Vh6/qRH0hPNVivuZJPWGn4j3VsCofxbE87J6D6mAWd4OLweNqQXdv5mUjF3SlpE1w0JXg5p1S6kTcb/uZLqtSYN+2V6juj3266EcKOkGq/fxS0PswqDi5pcF0Cz0uaApuqzmwCZe5KRD4EnuY16c/BL9i8kDz6HtxfGjVGPGFKYk905iyHtQ3QysFuXRyzQ2YVJd0y7fsoALHTleDKwZFCOCKwRSr5OHHoNg7KQK/3dC+JRzLHg9oIDePpoatcRiGzGx+v/ThRtSm4bZc91T98vgZ5NsQ+OpLF91SvOT9LoKCmZmPOUhkG8FobrP8e+2/Rf4Yt7RGUKjqC2Vllx9lDuqQ+he7F+6XaTpoyM4uxFrJNZPJupoLEpCSbLk/j95MF4jMqPXywlrTN/9zGs6JntPE3BaPy1CxrrBv1CMG0ewL5UyeuJKSCEKjo5wMbXNXvNjLyXpg37IWq/8pzmZTLGinmaamsFrNupAw7pYIzpdrXPieQcKDjEUXeenMYkrStT9GDTVdgByQqqnuJ4Zs9s0N6xq/yaTcNoueCqbsKm4SOHW51D3/NNV+ToLGFpT9fxPEMspBExs0LD8Y5Ipb3nBka8tlpkCYWUC/UNPO5s7dL3NU0g2Zsbru/niuxmU+WAxifiKZe8kMKN6jilwc8ONMJrlV1iH2ZvXST5NMdZ5Kk3JLJ/iavMsTmDk3pca04g+nwULOZHYjj8bI8/qdt3t7nc4fmmyotf/8ufd2r7P3z7InefOdPdAry6v90u3svX379j8OsVpv4f0/nxuQ8Rq+6iRe7VTFqER29X2xJltqjRmkZub3DnGfgWQsO2jazLMsSfJ+V1vNhWar5TNP1vKtBaFfmG5ZiscU1+//ms5Ws1N0TN4Ot2TTxI4Pctmf4sCuikPdrN7w5/vdbrc/n8ppFBIK5rm5lUTCbkhYURlpJEwzkdCYB04ul8Dl7ir8EHYOjlYchRh1OLBtF+dS8dDazPWaa2tr+wtWrs746JgCt1EkN7fUXNtvthoJvIFuSPBNVNOcer2uQyyuqRquwSSa49VwKBm7CLXy+uPvX/77zrktpyDJgWf48kQ0zXGcYtG5vdVWeEPH0S7dT9OuPB0Ipzfj8hdctSam9hI9cbw2uLEzmJ7bZgmiCnBzl+vbA5TM+Fx1WfV7BljKmue4S7u3V9Wm4Bbr1eFHM/Qr7NsDFNFVil7WsizCmJPo9XdusHPDTbhl6w5VeP/kfTOZTKrl+xZEltS1U2sfbrN9Tsft0MSRK4iFvol2iushe74ll8v2UufwBknoLXCjfGLdfROZTESXKXMq9VZn+RYi3Jtwy7oS7qwAfum+mUwiMMSmebx3eMOtfG6BW9XHxUuerD4UbsEqmvH2FtJwWQ3GbRAap7+GUZua2+xayWIQRJJQa15uV8FuK9jRjAOGOLKGuzzgRhkQ47q23+q0v45Nm57bzGmDevJEW3XchcR6X0zzxR4suD4BjmXNPN7f2P6azXOkifOsck0H1z7JpjpfWZDt8U0/PFyDiRkZDn9BBmGa+f7WxPOwbqpJ8/rtnkMh2X4A8Rsu4MC9egyxWg6kqbnSi5ON9ldznldo4n6kuRJjhF2aF3v3wgXSOi6WVrkj0Bw31doLux1ZaE3e37tqebUHsBBe0nHimMdw6ZfpllLN7tz27PVPf9uaYnzh1CorxvXl+soi2H/pwU9YNq3W5lb2LhvnOU0zntVulqzPlOYuMwkNArTc2UF3OX4nnvNqTTV+mhycmXWiia0/cGGoLNbBSspwsyYxZ+S6xbGyfGG1tlijyzfbkvmqS1x9r+AsK1yMT8Rn4JVETDPnL/W3DmP30DbPa8p5Dovdnq1BkYjC9wuQRQH58jpZJmL7P75zFt904HOion+Ar5UU+IZ7Lg7Xccti5y0Mz/j8Hdz1yTFd/6z5KJ29x2o20vTzkf580XA1qmN0juty+dLSYFkn36aTBgX/YtcJz4pUdVjPcIs8PjFMH+7Egjvm6TwdYFSru3Y9cTy/d3qnocYXFWLeYHXQTNl1IMWbpIXRsAoNDwNQLDRf3f1FA0WGK2j5dgGqWLot9qkQe4tAMqCISou77ub8Vr/z5LY2LL4lhZqnmjzcbZmmyQ2PKDbOLOdtlgXcvrS6WSRHfCtZ+olwnjXfuFLWvFrRcRu9VnNzI5299d7amyvsfPLM08Fmq1QpYk8+ziM0VJzeIvabuH41PQn2XBQ7CMoK9zK4DwE0UahiiYS10Ox3Vj8efuVejfC6yXqZanujv2SYFbcutjeFRgZhvIGHaPM/jw1A4cbYuHKe20ZDBWTAa2Wl7p8drO0NluPVB9UqL+um69oy8fSHbrNnQ5n5PuHgRflUwmu2p9EITg43qFMEA5ZwS73Xz5pre7tz6fhNNw6/I93Kut1kLP5ko9NvLvi2CdGC65qO4+DWqMH2AKNNAxwhvMS2S6VUb2F+rd/Z3fouHkvec0A2pW5zfX0yls3GdwaPuidr8/MLCwtLQmep1Flw2Gq1mvv7ayebj462nrTj2Wzs26hdl/XV9vlJZjLVrNCbw+Aglrz1/3/Efen+9+/9NhVxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxC6eIWzhF3MIp4hZOEbdwiriFU8QtnCJu4RRxCyfOLdL0uu8f7pvV/wE37n2wZ58FGAAAAABJRU5ErkJggg=="/>
      </div>
    </div>
  );
}

const About = () => { //setless componen
  return (
    <div>
      <div className="About">
        {/* <center><h2>About Product</h2></center> */}
        <div id="bio">
          <p id="p1">Penjualan AC</p>
          <p id="p2">Semua Merek AC: 
          Visi kami menjadi pelopor inovasi teknologi dan hiburan dalam keluarga. Misi kami untuk 
          meningkatkan pengalaman konsumen melalui teknologi, servis, dan produk</p>
          <p id="p3">Terbaru</p>
          <p id="p4">Menyediakan Berbagai Merek AC </p>
          <p id="p5">Produk Konsumen</p>
          <p id="p5">Mobile, TV, AV, Appliances</p>
        </div>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div>
      <Tv />
    </div>
  )
}

function Keranjangs() {
  return (
    <div>
      <Keranjang />
    </div>
  )
}

class Login extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    this.onLoginGoogle = this.onLoginGoogle.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      user: {}
    }
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        })
        console.log("User adalah : " + user.email)
      }
      else {
        this.setState({
          user: null
        })
      }
    })
  }

  componentDidMount() {
    this.authListener();
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
      // (<Redirect to="/list-product" />)
    }).catch((err) => {
      console.log(err);
    })
  }

  signup(e) {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
    }).catch((err) => {
      console.log(err);
    })
  }



  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout() {
    firebase.auth().signOut();
  }

  onLoginGoogle = () => {
    console.log("OnLoginGoogle");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        // var user = result.user;

      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    return this.state.user ? (
      <div className="User">
        {/* <div></div> */}
        {
          this.state.user.photoURL ? (<img src={this.state.user.photoURL} alt="gambar" style={{ width: "100px", height: "100px", marginTop: "20vh" }} />) : (<img src="https://buddymantra.com/wp-content/uploads/2018/04/user-icon-png-pnglogocom.png" alt="gambar" style={{ width: "120px", height: "120px", marginTop: "20vh" }} />)
        }
        <center><h1>Welcome {this.state.user.email}</h1></center>
        <br /><br />
        <center><button onClick={this.logout}>Logout</button></center>
      </div>
    ) : (
      <div className="form">
        <div className="login">
          <center><p id="login-title">Login<br /> </p></center>
          <form>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            /> <br />
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              id="password"
              placeholder="Password"
              value={this.state.password}
            /> <br /><br />
            <center><button className="btn-login" onClick={this.login}>Login</button></center><br />
            <center><button className="btn-login" onClick={this.signup}>Signup</button></center>
            <br /><br />


          </form>
        </div>
      </div >
    )
  }
}

export default App;
