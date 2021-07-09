import React, { Component } from "react";
import './tv.css';
import PostKeranjang from "../../component/tv/PostKeranjang";
import firebase from 'firebase';
import firebaseConfig from '../../firebase/config'
/**backend */
class tv extends Component {

    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        this.state = {
            listKeranjang: [],
            user: {}
        }

        this.authListener();

    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                })

                this.ambilDataDariServerAPI(user.uid);

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
        const userRef = firebase.database().ref('keranjang/' + this.state.user.uid);
        userRef.once('value', (snapshot) => {
            let newUserState = [];
            snapshot.forEach(data => {
                const dataVal = data.val()
                newUserState.push({
                    id: data.key,
                    nama: dataVal.nama,
                    harga: dataVal.harga,
                    gambar: dataVal.gambar,
                    stok: dataVal.stok,
                    qty: dataVal.qty
                })
            })
            this.setState({
                listKeranjang: newUserState
            })
            // console.log(this.state);
        })
    }

    componentDidMount() {

        this.ambilDataDariServerAPI()
    }
    handleHapusTelevisi = (idProduk) => {
        const { listKeranjang } = this.state;
        const newState = listKeranjang.filter(data => {
            return data.id !== idProduk;
        })
        this.setState({
            ...this.state,
            listKeranjang: newState
        })

        firebase.database().ref("keranjang/" + this.state.user.uid + "/" + idProduk).remove();
    }

    handleUpdateTelevisi = (idProduk, name, price, imageUrl, stock, counter) => {

        firebase.database().ref("keranjang/" + this.state.user.uid + "/" + idProduk)
            .set({
                id: idProduk,
                nama: name,
                harga: price,
                gambar: imageUrl,
                stok: stock,
                qty: counter
            });
    }

    /**menampilkan */
    render() {
        var no = 0;
        var total = 0;
        return (
            <div className="post-tv">
                {
                /* <div className="form pb-2 border-bottom">
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div> */}
                <center><h2>Keranjang</h2></center>
                <div className="tgh">
                    <table border="1" cellpadding="5" width="100%">
                        <tr>
                            <th align="center">No</th>
                            <th align="center">ID Produk</th>
                            <th align="left">Nama</th>
                            <th align="center">Harga</th>
                            <th align="center">Qty</th>
                            <th align="center">Subtotal</th>
                            <th align="center">Opsi</th>
                        </tr>
                        {
                            this.state.listKeranjang.map(tv => {
                                no += 1;
                                total += tv.harga * tv.qty
                                return (
                                    <PostKeranjang
                                        no={no}
                                        key={tv.id}
                                        id={tv.id}
                                        nama={tv.nama}
                                        harga={tv.harga}
                                        gambar={tv.gambar}
                                        stok={tv.stok}
                                        qty={tv.qty}
                                        tambahtv={this.handleGettv}
                                        updateTelevisi={this.handleUpdateTelevisi}
                                        hapusTelevisi={this.handleHapusTelevisi} />
                                )
                            })
                        }
                        <tr>
                            <td colspan="6" align="right">Total : </td>
                            <td align="center">{total}</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}



export default tv;