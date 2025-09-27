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
            // Modern design version
            sstdModern: "<td class=\"text-center\"><button @click=\"deleterow(ID)\" class=\"delete-btn text-lg\" title=\"Supprimer cette ligne\">🗑️</button></td><td><input type=\"text\" x-model.lazy=\"ID\" readonly class=\"table-input text-center bg-gray-50 text-gray-500 font-mono font-bold\"></td><td><input type=\"text\" x-model.lazy=\"article\" onfocus=\"this.select();\" placeholder=\"✏️ Description de l'article ou service\" class=\"table-input font-medium text-gray-800\"></td><td><input type=\"number\" name=\"quantite\" x-model.lazy=\"quantite\" onfocus=\"this.select();\" step=\"0.01\" min=\"0\" placeholder=\"0\" class=\"table-input-number font-mono\"></td><td><input type=\"number\" name=\"prix_u\" x-model.lazy=\"prix_u\" onfocus=\"this.select();\" step=\"1\" min=\"0\" placeholder=\"0.00\" class=\"table-input-number font-mono\"></td><td><input type=\"text\" name=\"mt\" x-model=\"smt\" disabled class=\"table-input-number bg-gradient-to-r from-green-50 to-green-100 text-green-800 font-mono font-bold border-green-200\" x-init=\"$watch('montant', (value,oldvalue) => updateTotaux(oldvalue,value))\"></td>",
            // Enhanced version with emojis and better styling
            sstdEnhanced: "<td class=\"text-center\"><button @click=\"deleterow(ID)\" class=\"delete-btn text-xl hover:scale-125\" title=\"Supprimer cette ligne\">🗑️</button></td><td><input type=\"text\" x-model.lazy=\"ID\" readonly class=\"table-input text-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-mono font-bold border-blue-200\"></td><td><input type=\"text\" x-model.lazy=\"article\" onfocus=\"this.select();\" placeholder=\"✨ Description détaillée de l'article ou service\" class=\"table-input font-medium text-gray-800 placeholder-gray-400\"></td><td><input type=\"number\" name=\"quantite\" x-model.lazy=\"quantite\" onfocus=\"this.select();\" step=\"1\" min=\"0\" placeholder=\"1\" class=\"table-input-number font-mono font-semibold\"></td><td><input type=\"number\" name=\"prix_u\" x-model.lazy=\"prix_u\" onfocus=\"this.select();\" step=\"0.01\" min=\"0\" placeholder=\"0.00\" class=\"table-input-number font-mono font-semibold\"></td><td><div class=\"relative\"><span class=\"absolute left-2 top-2 text-green-600 text-sm\"></span><input type=\"text\" name=\"mt\" x-model=\"smt\" disabled class=\"table-input-number bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 font-mono font-bold border-green-200 pl-8\" x-init=\"$watch('montant', (value,oldvalue) => updateTotaux(oldvalue,value))\"></div></td>",
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
            nbreArticles() {
                return this.rows_nbre;
                //document.getElementsByName('quantite').length ;
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
                this.rows_nbre--;
            },
            newrow(modern = false) {
                this.lastID++;
                this.rows_nbre++;
                newtr = document.createElement('tr');
                newtr.setAttribute('id', "rowid_" + this.rows_nbre);
                newtr.setAttribute('x-data', "objline(lastID,\'Article professionnel \'+lastID,1,250)");
                newtr.setAttribute('class', modern ? 'hover:bg-gray-50 group' : 'sdk');
                newtr.setAttribute('x-html', modern ? 'sstdModern' : 'sstd');
                newtr.setAttribute('x-init', 'updateTotaux(0, prix_u*quantite)');

                return newtr;
            },
            nouvelleligne(enhanced = true) {
                this.lastID++;
                this.rows_nbre++;
                newtr = document.createElement('tr');
                newtr.setAttribute('id', "rowid_" + this.rows_nbre);
                newtr.setAttribute('x-data', "objline(lastID,\'Article professionnel \'+lastID,1,250)");
                newtr.setAttribute('class', enhanced ? 'row-hover' : 'sdk');
                newtr.setAttribute('x-html', enhanced ? 'sstdEnhanced' : 'sstd');
                newtr.setAttribute('x-init', 'updateTotaux(0, prix_u*quantite)');
               document.getElementById('corps').appendChild(newtr);
               const scrollContainer = document.getElementById('mcorps');
               if (scrollContainer) {
                   scrollContainer.scrollTop = scrollContainer.scrollHeight - 8;
               }
            },

            imprimerPiece() {
                // Créer le contenu à imprimer
                const typeNames = { '1': 'devis', '2': 'bon de livraison', '3': 'facture', '4': 'avoir' };
                const typeName = typeNames[this.typepiece] || 'document';

                // Calculer le montant en lettres
                const montantEnLettres = nombreEnLettresEuros(this.ttc);

                // Créer une nouvelle fenêtre pour l'impression
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Impression ${typeName.charAt(0).toUpperCase() + typeName.slice(1)}</title>
                        <style>
                            @media print {
                                @page {
                                    margin: 2cm;
                                    size: A4;
                                }
                                body {
                                    font-family: Arial, sans-serif;
                                    font-size: 12pt;
                                    line-height: 1.4;
                                    color: black;
                                }
                                .print-header {
                                    text-align: center;
                                    margin-bottom: 30px;
                                    border-bottom: 2px solid #333;
                                    padding-bottom: 20px;
                                }
                                .print-info {
                                    display: grid;
                                    grid-template-columns: 1fr 1fr;
                                    gap: 20px;
                                    margin-bottom: 30px;
                                }
                                .print-table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    margin-bottom: 30px;
                                }
                                .print-table th, .print-table td {
                                    border: 1px solid #333;
                                    padding: 8px;
                                    text-align: left;
                                }
                                .print-table th {
                                    background-color: #f0f0f0;
                                    font-weight: bold;
                                }
                                .print-table .text-right {
                                    text-align: right;
                                }
                                .print-totals {
                                    width: 50%;
                                    margin-left: auto;
                                    margin-bottom: 30px;
                                }
                                .print-footer {
                                    margin-top: 40px;
                                    border-top: 1px solid #333;
                                    padding-top: 20px;
                                    font-style: italic;
                                }
                                .no-print { display: none !important; }
                            }
                            body {
                                font-family: Arial, sans-serif;
                                margin: 20px;
                                color: black;
                                background: white;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="print-header">
                            <h1>${typeName.toUpperCase()}</h1>
                            <p><strong>Numéro:</strong> ${this.npiece || 'Non spécifié'}</p>
                            <p><strong>Date:</strong> ${this.datepiece || new Date().toLocaleDateString('fr-FR')}</p>
                        </div>

                        <div class="print-info">
                            <div>
                                <h3>Informations Client</h3>
                                <p><strong>Client:</strong> ${this.client || 'Non spécifié'}</p>
                                <p><strong>Adresse:</strong> ${this.adresse || 'Non spécifiée'}</p>
                                <p><strong>Ville:</strong> ${this.ville || 'Non spécifiée'}</p>
                                ${this.references ? '<p><strong>Références:</strong> ' + this.references + '</p>' : ''}
                            </div>
                            <div>
                                <h3>Paramètres</h3>
                                <p><strong>Taux TVA:</strong> ${this.stauxtva}%</p>
                                ${this.lremise > 0 ? '<p><strong>Remise:</strong> ' + formatNumber(this.lremise) + ' €</p>' : ''}
                            </div>
                        </div>

                        <table class="print-table">
                            <thead>
                                <tr>
                                    <th style="width: 8%">ID</th>
                                    <th style="width: 50%">Article</th>
                                    <th style="width: 12%">Quantité</th>
                                    <th style="width: 15%">Prix Unitaire</th>
                                    <th style="width: 15%">Montant</th>
                                </tr>
                            </thead>
                            <tbody id="print-lines">
                                <!-- Les lignes seront ajoutées ici -->
                            </tbody>
                        </table>

                        <table class="print-totals print-table">
                            <tr>
                                <td><strong>Total HT:</strong></td>
                                <td class="text-right"><strong>${this.sht} €</strong></td>
                            </tr>
                            <tr>
                                <td><strong>TVA ${this.stauxtva}%:</strong></td>
                                <td class="text-right"><strong>${this.stva} €</strong></td>
                            </tr>
                            <tr style="border-top: 2px solid #333;">
                                <td><strong>Total TTC:</strong></td>
                                <td class="text-right"><strong>${this.sttc} €</strong></td>
                            </tr>
                        </table>

                        <div class="print-footer">
                            <p><strong>Arrêté la présente ${typeName} à la somme de : ${this.sttc} € (${montantEnLettres})</strong></p>
                        </div>

                        <script>
                            // Ajouter les lignes d'articles
                            const tbody = document.getElementById('print-lines');
                            const rows = parent.document.querySelectorAll('#corps tr[x-sort\\\\:item]');

                            rows.forEach((row, index) => {
                                const inputs = row.querySelectorAll('input');
                                if (inputs.length >= 5) {
                                    const id = inputs[0].value || (index + 1);
                                    const article = inputs[1].value || 'Article non spécifié';
                                    const quantite = inputs[2].value || '0';
                                    const prix = inputs[3].value || '0,00';
                                    const montant = inputs[4].value || '0,00';

                                    if (article !== 'Article non spécifié' || quantite !== '0') {
                                        const tr = document.createElement('tr');
                                        tr.innerHTML =
                                            '<td>' + id + '</td>' +
                                            '<td>' + article + '</td>' +
                                            '<td class="text-right">' + quantite + '</td>' +
                                            '<td class="text-right">' + prix + ' €</td>' +
                                            '<td class="text-right">' + montant + ' €</td>';
                                        tbody.appendChild(tr);
                                    }
                                }
                            });

                            // Lancer l'impression
                            setTimeout(() => {
                                window.print();
                                setTimeout(() => window.close(), 1000);
                            }, 500);
                        </script>
                    </body>
                    </html>
                `);
                printWindow.document.close();
            },

        }),
    )
});
/*
ssr:‘<tr x-sort:item class=\"sdk\" x-data=\"objline(\'Article_______________________________\'+nbre,0,1000)\">'
<td class=\"nbre\" x-text=\"nbre\"></td><td><input type=\"text\" class=\"article\" x-model.lazy=\"article\"></td><td><input type=\"text\" class=\"quantite\" x-model.lazy=\"quantite\" onfocus=\"this.select();\" x-mask:dynamic=\"$money($input,\'.\',\' \',2)\"></td><td><input type=\"text\" class=\"prix\" x-model.lazy=\"prix_u\" onfocus=\"this.select();\" x-mask:dynamic=\"$money($input,\'.\',\' \',2)\"></td><td><input type=\"text\" class=\"montant\" x-model=\"smt\" disabled x-init=\"$watch(\'montant\', (value,oldvalue) => updateTotaux(oldvalue,value))\"></td></tr>',
*/

// Fonction de conversion de nombres en lettres (français)
function nombreEnLettres(nombre) {
    if (nombre === 0) return "zéro";

    const unites = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const dizaines = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];
    const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];

    function convertirGroupe(n) {
        let resultat = "";

        // Centaines
        if (n >= 100) {
            const centaines = Math.floor(n / 100);
            if (centaines === 1) {
                resultat += "cent";
            } else {
                resultat += unites[centaines] + " cent";
            }
            if (n % 100 === 0 && centaines > 1) {
                resultat += "s";
            }
            n %= 100;
            if (n > 0) resultat += " ";
        }

        // Dizaines et unités
        if (n >= 20) {
            const diz = Math.floor(n / 10);
            resultat += dizaines[diz];

            n %= 10;
            if (n > 0) {
                if (diz === 8) { // quatre-vingt
                    resultat += "-" + unites[n];
                } else if (diz === 7 || diz === 9) { // soixante-dix, quatre-vingt-dix
                    if (diz === 7) {
                        resultat = "soixante-" + teens[n];
                    } else {
                        resultat = "quatre-vingt-" + teens[n];
                    }
                } else {
                    if (n === 1 && (diz === 2 || diz === 3 || diz === 4 || diz === 5 || diz === 6)) {
                        resultat += " et " + unites[n];
                    } else {
                        resultat += "-" + unites[n];
                    }
                }
            } else if (diz === 8) {
                resultat += "s"; // quatre-vingts
            }
        } else if (n >= 10) {
            resultat += teens[n - 10];
        } else if (n > 0) {
            resultat += unites[n];
        }

        return resultat;
    }

    let resultat = "";

    // Millions
    if (nombre >= 1000000) {
        const millions = Math.floor(nombre / 1000000);
        if (millions === 1) {
            resultat += "un million";
        } else {
            resultat += convertirGroupe(millions) + " millions";
        }
        nombre %= 1000000;
        if (nombre > 0) resultat += " ";
    }

    // Milliers
    if (nombre >= 1000) {
        const milliers = Math.floor(nombre / 1000);
        if (milliers === 1) {
            resultat += "mille";
        } else {
            resultat += convertirGroupe(milliers) + " mille";
        }
        nombre %= 1000;
        if (nombre > 0) resultat += " ";
    }

    // Unités, dizaines, centaines
    if (nombre > 0) {
        resultat += convertirGroupe(nombre);
    }

    return resultat.trim();
}

function nombreEnLettresEuros(montant) {
    const euros = Math.floor(montant);
    const centimes = Math.round((montant - euros) * 100);

    let resultat = nombreEnLettres(euros) + " euro" + (euros > 1 ? "s" : "");

    if (centimes > 0) {
        resultat += " et " + nombreEnLettres(centimes) + " centime" + (centimes > 1 ? "s" : "");
    }

    return resultat;
}

/* End of file */