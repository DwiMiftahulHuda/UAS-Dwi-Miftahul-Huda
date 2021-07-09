import React from "react";

const Post = (brg) => {
    return (

        <div className="tv">
            <div className="konten-tv">

                <div className="isi-tv">
                    ID : {brg.id}<br />
                    Nama : {brg.nama}<br />
                    Harga : {brg.harga}<br />
                    Stok : {brg.stok}
                </div>
                <div className="gambar-tv"><center><img src={brg.gambar} width="150" height="150" alt="" /></center></div>
                <button className="btn btn-sm btn-warning" onClick={() => {
                    if (brg.users) {
                        brg.tambahtv(brg.id);
                        alert("Berhasil ditambahkan")
                    } else {
                        window.confirm("Silahkan Login Terlebih dahulu")
                    }
                }} >Beli</button>
                {console.log(brg.users)}
            </div>
        </div>

    )
}

export default Post;