//================================================//

// Script de la liste des membres

$("#Back").on("click", RevenirEnArriere);

function RevenirEnArriere() {
    document.getElementById("content").style.display = "block";
    document.getElementById("Membres").style.display = "none";
}
var monvue = new Vue({
    el: "#content",
    data: {
        database,
        member: Object,
        search: ""
    },
    computed: {
        filtreNom() {
            return this.database.filter(adherent => {
                return adherent.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        memberSelection: function (adherent) {
            this.member = adherent;
            document.getElementById("content").style.display = "none";
            document.getElementById("Membres").style.display = "block";
            document.getElementById("resultat1").innerHTML = "<h3>Nom:</h3>" +
                adherent.name;
            document.getElementById("resultat2").innerHTML = "<h3>Adresse:</h3>" +
                adherent.address;
            document.getElementById("resultat3").innerHTML = "<h3>A Propos:</h3>" +
                adherent.about;
        }
    }
})

////////////////////////////////////////////////////////////////////////////////////
// STATISTIQUES HOMMES - FEMMES //

var homme = 0;
var femme = 0;

for (var i = 0; i < database.length; i++) {
    if (database[i].gender == "female") {
        femme++;
    } else {
        homme++;
    }
}

//console.log("femmes = " + femme);
//console.log("hommes = " + homme);

var accumule = 0;

for (var n = 0; n < database.length; n++) {
    accumule += database[n].age;
}
//console.log(accumule);
var moyenne = Math.round(accumule / database.length);
//console.log(moyenne);

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
        labels: ["Femmes", 'Hommes'],
        datasets: [{
            label: "% hommes / femmes",
            backgroundColor: ["#d1686a", "#312e5b"],
            data: [femme, homme]
      }]
    },
    options: {
        title: {
            display: false,
            text: 'Taux Hommes/Femmes'
        }
    }
});

//console.log(homme + femme)
// STATISTIQUES AGES //

var mineurs = 0;
var age1825 = 0;
var age2635 = 0;
var ageplus36 = 0;

for (var n = 0; n < database.length; n++) {
    if (database[n].age < 18) {
        mineurs++;
    } else if (database[n].age >= 18 && database[n].age < 25) {
        age1825++;
    } else if (database[n].age >= 26 && database[n].age < 35) {
        age2635++;
    } else if (database[n].age >= 36) {
        ageplus36++;
    }

}


//console.log("-18: " + Math.round((mineurs / (database.length - 1)) * 100) + "%");
//console.log("18-25: " + Math.round((age1825 / (database.length - 1)) * 100) + "%");
//console.log("26-35: " + Math.round((age2635 / (database.length - 1)) * 100) + "%");
//console.log("36+: " + Math.round((ageplus36 / (database.length - 1)) * 100) + "%");

new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
        labels: ["-18ans", "18-25ans", "26-35ans", "+36"],
        datasets: [
            {
                label: "Pourcentage par tranches d'âges",
                backgroundColor: ["#ff7b00", "#a30901", "#353535", "#d1baa1"],
                data: [mineurs, age1825, age2635, ageplus36]
        }
      ]
    },
    options: {
        title: {
            display: false,
            text: "Pourcentage par tranches d'âges"
        }
    }
});
