new Vue ({
    el: '#app',
    data: {
        yourHealth: 100,
        monsterHealth: 100,
        inGame: false,
        gameLog: {
            playerLog: [1, 2],
            monsterLog: [3, 4]
        },
        monsterDamage: 0,
        yourDamage: 0,
        yourHealing: 0,
    },
    computed: {
        yourStyles: function() {
            this.yourHealth += this.yourDamage;
            return {
                width: this.yourHealth + '%'
            }
        },
        monsterStyles: function() {
            this.monsterHealth += this.monsterDamage;
            return {
                width: this.monsterHealth + '%'
            }
        }
    },
    methods: {
        attack: function(special) {

            var bonusDamage = 0;
            if (special) {
                bonusDamage = special;
            }
            this.monsterDamage -= this.damageCalculator() + bonusDamage;
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0
                this.endGame();
            }
            this.yourDamage -= this.damageCalculator();

            this.updateLog(this.yourDamage, this.monsterDamage);

            if (this.yourHealth < 0) {
                this.yourHealth = 0
                this.endGame();
            }
        },
        heal: function() {
            if (this.yourHealth === 100) {
                alert("already full health you dumby")
            } else {
                // your health increase
                this.yourHealing += this.damageCalculator() + 5;
                // full health ceiling
                if (this.yourDamage > 100) {
                    this.yourDamage = 100;
                }
                //monster still attacks
                this.yourDamage -= this.damageCalculator();

                // update log
                this.updateLog(this.yourDamage, this.yourHealing);

                // theoretically might be still possible that you die
                this.endGame();
            }
        },
        endGame: function() {
            if (this.yourHealth === 0) {
                alert("you lost, and you should give up gaming")
                this.restart();
            } else if (this.monsterHealth < 0) {
                alert("Congratulations, you won and your not super stupid")
                this.restart();
            }
        },
        restart: function() {
            this.yourDamage = 0;
            this.monsterDamage = 0;
            this.yourHealth = 100;
            this.monsterHealth = 100;
            inGame = true;
        },
        damageCalculator: function() {
            return Math.floor((Math.random() * 10) + 1)
        },
        updateLog: function(playerDamage, monsterDamage) {
            this.log.playerLog.push(monsterDamage);
            this.log.monsterLog.push(playerDamage);
        }
    }
})