import React, { Component } from "react";
import './tv.css';
import Post from "../../component/tv/Post";
import firebase from 'firebase'
import firebaseConfig from '../../firebase/config';
/**Backend */
class tv extends Component {

    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            listtv: [],
            user: {},
            listKeranjang: []
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

    ambilDataDariServerAPI = () => {
        const userRef = firebase.database().ref('televisi');
        userRef.on('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                const dataVal = data.val()
                newUserState.push({
                    id: data.key,
                    nama: dataVal.nama,
                    harga: dataVal.harga,
                    gambar: dataVal.gambar,
                    stok: dataVal.stok
                })
            })
            this.setState({
                listtv: newUserState
            })
            console.log(this.state);
        })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI();
        this.authListener();
        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
    }

    getDatabyId = userId => {
        const Ref = firebase.database().ref('televisi/' + userId);
        Ref.on('value', (snapshot) => {
            const data = snapshot.val();
            this.writeData(data.id, data.nama, data.harga, data.gambar, data.stok);
            console.log(data);
        })
    }

    writeData = (userId, name, price, imageUrl, stock) => {

        var counter = 0;
        var counter2;
        let uid = this.state.user.uid;

        const userRef = firebase.database().ref('keranjang/' + uid + "/" + userId);
        userRef.on('value', function (snapshot) {
            if (snapshot.exists()) {
                const data = snapshot.val();
                counter = data.qty;
                console.log("qty:" + counter);
                // alert(counter);
            }
        })

        counter2 = counter + 1;

        firebase.database().ref('keranjang/' + uid + "/" + userId).set({
            id: userId,
            nama: name,
            harga: price,
            gambar: imageUrl,
            stok: stock,
            qty: counter2
        });
    }

    /*menampilkan */
    render() {
        return (
            <div className="post-tv">
                {
                /* <div className="form pb-2 border-bottom">
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div> */}
                <center><h2>Daftar Barang</h2></center>
                <div className="tgh">
                    {
                        this.state.listtv.map(tv => {
                            return (
                                <Post
                                    key={tv.id}
                                    id={tv.id}
                                    nama={tv.nama}
                                    harga={tv.harga}
                                    gambar={tv.gambar}
                                    stok={tv.stok}
                                    tambahtv={this.getDatabyId}
                                    users={this.state.user ? this.state.user.email : null} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default tv;