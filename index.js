function str2number(s) {
    return Number(s.replace(' ', '')).toFixed(2);
}
function str2number2(s) {
    return Number(s.replace(' ', '').replace('.', '').replace(',', '.')).toFixed(2);
}
function priceMask(input) {
    return '999 999 999.99';
    // console.log($money($input, '.', ' ', 2));

}
function dfltMask(input) {
    //$money($input, '.', ' ', 2)
    return '999 999 999.99';

}
function formatNumber(x) {

    var parts = x.toFixed(2).split(".");
    var integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    var formattednumber = integerPart + "." + parts[1];


    //console.log(x, formattednumber);
    // Output: 123,456,789.12
    return formattednumber;
}
function formatNumber0(x) {
    return x.toLocaleString(undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
}
function recalcul_piece() {
    var qt = document.getElementsByName('quantite');
    var pu = document.getElementsByName('prix_u');
    var rm = document.getElementById('remise').value;
    h_t = 0; t_v_a = 0; t_t_c = 0; m_t = 0; n_e_t = 0;
    for (var i = 0; i < qt.length; i++) {
        m_t = str2number(pu[i].value) * str2number(qt[i].value);
        t_t_c += m_t;
        console.log(qt[i].value, '\t', pu[i].value, '\t', m_t)
    }
    n_e_t = t_t_c - rm; t_v_a = n_e_t / 6; h_t = n_e_t - t_v_a;
    console.log('TTC:', t_t_c, ' remise:', rm, ' Net:', n_e_t, ' HT:', h_t, ' TVA 20%:', t_v_a);
}
document.addEventListener('alpine:init', () => {
    Alpine.data(
        'signupForm', () => ({
            username: '',
            password: '',
            passwordconfirm: '',

            defaultUsername() {
                this.username = "default_username"
            }
        }),
    )
});
document.addEventListener('alpine:init', () => {
    Alpine.data(
        'objbox', (initialValeur = '0', initialOpen = true) => ({
            current_valeur: initialValeur,
            open: initialOpen,
            get valeur() { return this.current_valeur; },
            set valeur(v) { this.current_valeur = v; },
            increment() { this.current_valeur++; },
            decrement() { this.current_valeur--; },
            trigger: {
                ['@click']() { this.increment(); },
                ['@mouseover']() { console.log('leave:' + this.valeur + this.open); },
                ['@keyup']() { this.open = !this.open; },
                ['@click.cmd']() { this.decrement(); },
                ['x-show']() { return this.open; },
            },
            dialogue: {
                ['x-show']() { return this.open },
            },
        }),
    )
});
document.addEventListener('alpine:init', () => {
    Alpine.data(
        'objline', (iID = 0, iArticle = '', iQte = 1, iPu = 0) => ({
            ID: iID, article: iArticle, qte: iQte, pu: iPu, mt: 0,
            smt: '',

            /* console.log('updateTotaux:',oldmt, newmt, this.ttc, this.tva, this.ht);*/
            get quantite() { return this.qte; },
            get prix_u() { return this.pu; },
            get montant() { return this.pu * this.qte; },

            updateMontant() {
                this.mt = this.prix_u * this.quantite;
                this.smt = formatNumber(this.mt);
            },

            set quantite(q) {
                this.qte = str2number(q);
                this.updateMontant();
                //   console.log('quantite:', q, this.qte);
            },

            set prix_u(p) {
                this.pu = str2number(p);
                this.updateMontant();
                //  console.log('prix_u:', p, this.pu);
            },

            set montant(m) {
                this.mt = m;// str2number(m);
                //  console.log('montant:', m, this.montant);
            },

            incrementQte() { this.qte++ },
            incrementPu() { this.pu += 10 },
        }),
    )
});

document.addEventListener('alpine:init', () => {
    Alpine.data(
        'objentete', (ilastID = 0, iht = 0.00, itva = 0.00, ittc = 0.00, iisremise = false, iremise = 0.00, inet = 0.00, itauxtva= 0.2) => ({
            ht: iht, tva: itva, ttc: ittc, lremise: iremise, net: inet, isremise: iisremise, typepiece: '1',
            sht: '', stva: '', sttc: '', sremise: '', snet: '',  lastID: ilastID, ltauxtva :itauxtva, stauxtva:'20.00',
            npiece: '', piecevalide: false, pieceremise: false, datepiece: '', client: '', adresse: '', ville: '',
            references: '', rows_nbre: 3, left_show: true, central_show: true,
            sstd: "<td alt=\"supprimer ligne\"><svg  class=\"svg-icon\" style=\"width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z\" @click=\"deleterow(ID)\" /></svg> </td><td><input size=\"3\" type=\"text\" class=\"nbre\" x-model.lazy=\"ID\" readonly></td><td><input type=\"text\" class=\"article\" x-model.lazy=\"article\" onfocus=\"this.select();\"></td><td><input type=\"text\" name=\"quantite\" class=\"quantite\" x-model.lazy=\"quantite\" onfocus=\"this.select();\" x-mask:dynamic=\"$money($input,\'.\',\' \',2)\"></td><td><input type=\"text\" name=\"prix_u\" class=\"prix\" x-model.lazy=\"prix_u\" onfocus=\"this.select();\" x-mask:dynamic=\"$money($input,\'.\',\' \',2)\"></td><td><input type=\"text\" name=\"mt\" class=\"montant\" x-model=\"smt\" disabled x-init=\"$watch(\'montant\', (value,oldvalue) => updateTotaux(oldvalue,value))\"></td>",
            sstr: "<tr x-ref=\"rowid_ID\" x-id=\"rowid_ID\" x-sort:item x-html=\"" + this.sstd + "\" class=\"sdk\" x-data=\"objline(ID,\'Article________________________________________\'+ID,0,1000)\" x-init=\"updateTotaux(0,prix_u*quantite)\"></tr>",

            get tauxtva() { return this.ltauxtva},
            set tauxtva(ttva) { 
                console.log('Taux de Tva:', ttva);
                this.ltauxtva = ttva/100;
                this.updateNet();
                 console.log('Taux de Tva:', ttva, this.ltauxtva);
            },
            get remise() { return this.lremise; },
            set remise(r) {
                this.lremise = str2number(r);
                this.lremise = (this.lremise <= this.ttc ? this.lremise : 0.00);
                this.updateNet();
                console.log('remise:', r, this.lremise);
            },
            updateNet() {
                this.net = this.ttc - this.remise;
                this.ht = this.net/(1+this.tauxtva);
                this.tva = this.net - this.ht;
                //this.tva = this.net / 6;
                //this.ht = this.net - this.tva;
                this.stauxtva = formatNumber0(this.tauxtva*100);
                this.sht = formatNumber(this.ht);
                this.sttc = formatNumber(this.ttc);
                this.stva = formatNumber(this.tva);
                this.snet = formatNumber(this.net);
                this.sremise = formatNumber0(this.remise);
            },
            updateTotaux(oldmt, newmt) {
                this.ttc = this.ttc - oldmt + newmt;
                this.updateNet();
            },
            recalcul_piece() {
                var qt = document.getElementsByName('quantite');
                var pu = document.getElementsByName('prix_u');
                var rm = document.getElementById('remise').value;
                h_t = 0; t_v_a = 0; t_t_c = 0; m_t = 0; n_e_t = 0;
                for (var i = 0; i < qt.length; i++) {
                    m_t = str2number(pu[i].value) * str2number(qt[i].value);
                    t_t_c += m_t;
                    console.log(qt[i].value, '\t', pu[i].value, '\t', m_t)
                }
                n_e_t = t_t_c - rm; t_v_a = n_e_t / 6; h_t = n_e_t - t_v_a;
                this.ttc = t_t_c; this.lremise = rm;
                console.log('TTC:', t_t_c, ' remise:', rm, ' Net:', n_e_t, ' HT:', h_t, ' TVA 20%:', t_v_a);
                this.updateNet();
            },
            deleterow(id) {
                console.log("delete row:", id, 'rowid_' + id)
                document.getElementById('rowid_' + id).remove();
                this.recalcul_piece();
            },
            newrow() {
                this.lastID++;
                this.rows_nbre++;
                newtr = document.createElement('tr');
                newtr.setAttribute('id', "rowid_" + this.rows_nbre);
                newtr.setAttribute('x-data', "objline(lastID,\'Article_______________________________\'+lastID,1,250)");
                newtr.setAttribute('class', 'sdk');
                newtr.setAttribute('x-html', 'sstd');
                newtr.setAttribute('x-init', 'updateTotaux(0, prix_u*quantite)');
               
                return newtr;
            },
            nouvelleligne() {
                this.lastID++;
                this.rows_nbre++;
                newtr = document.createElement('tr');
                newtr.setAttribute('id', "rowid_" + this.rows_nbre);
                newtr.setAttribute('x-data', "objline(lastID,\'Article_______________________________\'+lastID,1,250)");
                newtr.setAttribute('class', 'sdk');
                newtr.setAttribute('x-html', 'sstd');
                newtr.setAttribute('x-init', 'updateTotaux(0, prix_u*quantite)');
               document.getElementById('corps').appendChild(newtr);
               document.getElementById('corps').scrollHeight;
               // return newtr;
            },

        }),
    )
});
/*
ssr:‘<tr x-sort:item class=\"sdk\" x-data=\"objline(\'Article_______________________________\'+nbre,0,1000)\">'
<td class=\"nbre\" x-text=\"nbre\"></td><td><input type=\"text\" class=\"article\" x-model.lazy=\"article\"></td><td><input type=\"text\" class=\"quantite\" x-model.lazy=\"quantite\" onfocus=\"this.select();\" x-mask:dynamic=\"$money($input,\'.\',\' \',2)\"></td><td><input type=\"text\" class=\"prix\" x-model.lazy=\"prix_u\" onfocus=\"this.select();\" x-mask:dynamic=\"$money($input,\'.\',\' \',2)\"></td><td><input type=\"text\" class=\"montant\" x-model=\"smt\" disabled x-init=\"$watch(\'montant\', (value,oldvalue) => updateTotaux(oldvalue,value))\"></td></tr>',
function nombreEnLettres(nombre) {
    // Initialiser les tableaux de mots pour les unités, dizaines, centaines, etc.
    const unites = ["", "un", "deux"];
    const dizaines = ["", "dix", "vingt"];
    // ... et ainsi de suite pour les dizaines-unités, centaines, milliers, etc.

    let resultat = "";

    // Traitement pour les grands nombres (milliers, millions, etc.)
    if (nombre >= 1000) {
        resultat += nombreEnLettres(Math.floor(nombre / 1000)) + " mille ";
        nombre %= 1000;
    }

    // Traitement pour les centaines, dizaines, unités (détails complexes)
    // ...

    return resultat.trim();


    // Exemple d'utilisation
    const montant = 12345;
    const montantEnLettres = nombreEnLettres(montant);
    console.log(montantEnLettres); // Devrait afficher "douze mille trois cent quarante-cinq"
}
    */