const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');

const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi');

//event listener

form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kisiIslemleriniYap);

//tüm kişiler diziisi


let secilenSatir = undefined;

function kaydet(e) {
    e.preventDefault();
    const eklenecekVeyaGuncellenecekKisi = {
        ad : ad.value,
        soyad : soyad.value,
        mail : mail.value,

    }

    const sonuc =  verileriKontrolEt(eklenecekVeyaGuncellenecekKisi);
    if(sonuc.durum) {
        if(secilenSatir) {
            kisiyiGuncelle(eklenecekVeyaGuncellenecekKisi);
        }else {
            kisiyiEkle(eklenecekVeyaGuncellenecekKisi);
        }

      
       
    } else{
        bilgiOlustur(sonuc.mesaj, sonuc.durum);    
    }
}

function kisiyiGuncelle(kisi) {
    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent = kisi.mail;

    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
    secilenSatir=undefined;

}

function kisiIslemleriniYap(event) {
    if(event.target.classList.contains('btn--delete')) {
        rehberdensil(event.target.parentElement.parentElement);
    }else if(event.target.classList.contains('btn--edit')) {
       document.querySelector('.kaydetGuncelle').value = "Güncelle";
       const secilenTR = event.target.parentElement.parentElement;
       const guncellenecekMail = secilenTR.cells[2].textContent;

       ad.value = secilenTR.cells[0].textContent;
       soyad.value = secilenTR.cells[1].textContent;
       mail.value = secilenTR.cells[2].textContent;

       secilenSatir = secilenTR;
    } 
}

function rehberdensil(silinecekTrElement) {
    silinecekTrElement.remove();
}

function kisiyiEkle(eklenecekKisi) {
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = `
    <td>${eklenecekKisi.ad} </td>
    <td>${eklenecekKisi.soyad} </td>
    <td>${eklenecekKisi.mail} </td>
    <td>
        <button class='btn btn--edit'> <i class="far fa-edit"></i> </button>
        <button class='btn btn--delete'> <i class="far fa-trash-alt"></i> </button>
    </td>`;
    kisiListesi.appendChild(olusturulanTrElementi);

   
    bilgiOlustur('Kişi Kaydedildi', true);


}

function verileriKontrolEt(kisi) {
    //objelerde in kullanımı
    for(const deger in kisi) {
        
        if(kisi[deger]) {

        }else {
            const sonuc = {
                durum : false,
                mesaj : "boş alan bırakma"
            }
            return sonuc; 
        }
    }
    alanlariTemizle();
    return {
        durum : true,
        mesaj : "Kaydedildi"
    }
}

function bilgiOlustur (mesaj, durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';
    if(durum) {
        olusturulanBilgi.classList.add('bilgi--success');
    }else {
        olusturulanBilgi.classList.add('bilgi--error');
    }
    document.querySelector('.container').insertBefore(olusturulanBilgi, form);

    //setTimeOut, setInvertal

    setTimeout(function(){
        const silinecekDiv = document.querySelector('.bilgi');
        if(silinecekDiv) {
            silinecekDiv.remove();
        }

    },2000);

}

function alanlariTemizle() {
    ad.value = '',
    soyad.value = '',
    mail.value = ''
}